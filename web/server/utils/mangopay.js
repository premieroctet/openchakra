const moment = require('moment')
const path = require('path')
const {emptyPromise} = require('../../utils/promise')
const {MANGOPAY_CONFIG, is_development, get_host_url} = require('../../config/config')
const mangopay = require('mangopay2-nodejs-sdk')
const KycDocumentType = require('mangopay2-nodejs-sdk/lib/models/KycDocumentType')
const KycDocumentStatus = require('mangopay2-nodejs-sdk/lib/models/KycDocumentStatus')
const PersonType = require('mangopay2-nodejs-sdk/lib/models/PersonType')
const mangoApi = new mangopay(MANGOPAY_CONFIG)
const process=require('process')
const request = require('request')
const {MANGOPAY_ERRORS}=require('../../utils/mangopay_messages')
const {ADMIN, MANAGER}=require('../../utils/consts')

const createMangoClient = user => {
  return new Promise((resolve, reject) => {
    if (user.id_mangopay) {
      resolve(user)
    }
    let userData = {
      PersonType: PersonType.Natural,
      FirstName: user.firstname,
      LastName: user.name,
      Nationality: 'FR',
      CountryOfResidence: 'FR',
      Email: user.email,
      Tag: `Client ${user._id} / ${user.firstname} ${user.name}`,
      Birthday: moment(user.birthday).unix(),
    }

    mangoApi.Users.create(userData)
      .then(newUser => {
        console.log(`Created Mango User ${JSON.stringify(newUser)}`)
        mangoApi.Wallets.create({
          Owners: [newUser.Id],
          Description: `Wallet ${user._id} / ${user.firstname} ${user.name} client`,
          Currency: 'EUR',
        })
          .then(wallet => {
            console.log(`Created Wallet ${JSON.stringify(wallet)}`)
            user.id_mangopay=newUser.Id
            resolve(user)
          })
          .catch(err => {
            reject(`Création wallet user ${user.full_name}:${JSON.stringify(err)}`)
          })
      })
      .catch(err => {
        reject(`Création mangopay user ${user.full_name}:${JSON.stringify(err)}`)
      })
  })
}

const createMangoProvider = (user, shop) => {

  console.log(`Creating mango provider for ${user.name}`)
  let userData = {
    PersonType: shop.is_particular ? PersonType.Natural : PersonType.Legal,
    FirstName: user.firstname,
    LastName: user.name,
    Birthday: moment(user.birthday).unix(),
    Nationality: 'FR',
    CountryOfResidence: 'FR',
    Email: user.email,
    Tag: `Provider ${user._id} / ${user.firstname} ${user.name}`,
  }
  if (shop.is_professional) {
    const addr = user.billing_address
    userData.LegalPersonType = 'SOLETRADER'
    userData.Name = shop.company.name
    userData.CompanyNumber = shop.company.siret
    userData.LegalRepresentativeFirstName = user.firstname
    userData.LegalRepresentativeLastName = user.name
    userData.LegalRepresentativeBirthday = moment(user.birthday).unix()
    userData.LegalRepresentativeNationality = 'FR'
    userData.LegalRepresentativeCountryOfResidence = 'FR'
    userData.LegalRepresentativeEmail = user.email
    const mangoAddr = new mangoApi.models.Address({
      AddressLine1: addr.address,
      AddressLine2: '',
      City: addr.city,
      Region: '',
      PostalCode: addr.zip_code,
      Country: 'FR',
    })
    userData.HeadquartersAddress = mangoAddr
    userData.LegalRepresentativeAddress = mangoAddr
  }

  mangoApi.Users.create(userData)
    .then(newUser => {
      console.log(`Created Mango Provider ${JSON.stringify(newUser)}`)
      user.mangopay_provider_id = newUser.Id
      user.mangopay_provider_status = newUser.PersonType
      user.save().then().catch()
      mangoApi.Wallets.create({
        Owners: [newUser.Id],
        Description: `${user._id} / ${user.full_name} provider`,
        Currency: 'EUR',
      })
        .then(wallet => {
          console.log(`Created Wallet ${JSON.stringify(wallet)}`)
        })
    })
    .catch(err => {
      console.error(`Error @ creating mangopay provider for ${user._id}:${JSON.stringify(err)}`)
    })
}

const createOrUpdateMangoCompany = company => {

  if (!company.representative.birthday) {
    throw "La date de naissance de l'administrateur est requise"
  }

  console.log(`Creating/updating mango company for company ${company.name}, representative is ${company.representative.full_name}`)

  var address=new mangoApi.models.Address({
      AddressLine1: company.billing_address.address,
      AddressLine2: '',
      City: company.billing_address.city,
      Region: '',
      PostalCode: company.billing_address.zip_code,
      Country: 'FR',
  })

  var companyData = {
    PersonType: PersonType.Legal,
    Name: company.name,
    Email: company.representative.email,
    LegalPersonType: 'BUSINESS',
    LegalRepresentativeFirstName: company.representative.firstname,
    LegalRepresentativeLastName: company.representative.name,
    LegalRepresentativeEmail: company.representative.email,
    HeadquartersAddress: address,
    LegalRepresentativeBirthday: moment(company.representative.birthday).unix(),
    LegalRepresentativeAddress: address,
    LegalRepresentativeNationality: 'FR',
    LegalRepresentativeCountryOfResidence: 'FR',
    CompanyNumber: company.siret,
    Tag: `Company ${company.name}/Repr. ${company.representative.full_name}`
  }

  const is_update = company.id_mangopay

  const method = is_update ?
      mangoApi.Users.update({Id : company.id_mangopay, ...companyData})
      :
      mangoApi.Users.create(companyData)

  method
    .then(mangopay_company => {
      console.log(`Created Mango company ${JSON.stringify(mangopay_company)}`)
      company.id_mangopay = mangopay_company.Id
      company.save()
        .then( res => console.log(`Created/update company ${JSON.stringify(company)}`))
        .catch( err => console.error(err))
      if (!is_update) {
        mangoApi.Wallets.create({
          Owners: [mangopay_company.Id],
          Description: `${company._id} / ${company.name} company`,
          Currency: 'EUR',
        })
          .then(wallet => {
            console.log(`Created Wallet ${JSON.stringify(wallet)}`)
          })
          .catch(err => {
            console.log(`Could not create Wallet:${err}`)
          })
      }
    })
}

const addIdIfRequired = user => {
  console.log('addIdIfRequired')

  const objStatus = {
    Type: KycDocumentType.IdentityProof,
  }
  const id = user.mangopay_provider_id

  mangoApi.Users.createKycDocument(id, objStatus)
    .then(result => {
      const documentId = result.Id
      console.log(`Create identity proof ${documentId} for provider ${id}`)
      user.identity_proof_id = documentId
      user.id_card_status = KycDocumentStatus.Created
      user.save()
        .then(u => console.log(`User saved id proof ${user.identity_proof_id}`))
        .catch(err => console.error(err))

      const id_recto = path.resolve(user.id_card.recto)
      mangoApi.Users.createKycPageFromFile(id, documentId, id_recto)
        .then(resultRecto => {
          console.log(`Created KyCPage recto ${id_recto}`)
          const id_verso = user.id_card.verso ? path.resolve(user.id_card.verso) : null

          const prom = id_verso == null ? emptyPromise() : mangoApi.Users.createKycPageFromFile(id, documentId, id_verso)
          prom.then(resultVerso => {
            console.log(resultVerso ? `Created KyCPage verso ${id_verso}` : `No verso required`)
            // TODO : PersonType.Legal : ask for validation only on first resrvation
            console.log('Asking for KYC validation')
            const updateObj = {Id: documentId, Status: KycDocumentStatus.ValidationAsked}
            mangoApi.Users.updateKycDocument(user.mangopay_provider_id, updateObj)
              .then(() => console.log('Validation asked OK'))
              .catch(err => console.error('Validation asked error:${err}'))
            user.id_card_status = KycDocumentStatus.ValidationAsked
            user.save()
              .then(u => console.log(`User ${user._id} set ${user.identity_proof_id} to ${KycDocumentStatus.ValidationAsked}`))
              .catch(err => console.error(err))
          })
            .catch(err => {
              console.error(`While creating KycPageFromFile:${JSON.stringify(err)}`)
            })
        })
    })
    .catch(err => console.error(err))
}

const addRegistrationProof = user => {
  console.log('addRegistrationProof')

  if (!user.mangopay_provider_id) {
    console.log(`User ${user._id}:pas besoin d'envoyer de preuve d'immatriculation pour un client`)
    return false
  }

  const objStatus = {Type: KycDocumentType.RegistrationProof}

  const id = user.mangopay_provider_id

  mangoApi.Users.createKycDocument(id, objStatus)
    .then(result => {
      const documentId = result.Id
      console.log(`Create identity proof ${documentId} for provider ${id}`)
      user.registration_proof_id = documentId
      user.registration_proof_status = KycDocumentStatus.Created
      user.save()
        .then(u => console.log(`User saved registration proof ${user.identity_proof_id}`))
        .catch(err => console.error(err))

      const id_reg = path.resolve(user.registration_proof)
      mangoApi.Users.createKycPageFromFile(id, documentId, id_reg)
        .then(result => {
          console.log(`Created KyCPage recto ${id_reg}`)

          console.log('Asking for KYC validation')
          const updateObj = {Id: documentId, Status: KycDocumentStatus.ValidationAsked}
          mangoApi.Users.updateKycDocument(user.mangopay_provider_id, updateObj)
            .then(() => console.log('Validation asked OK'))
            .catch(err => console.error('Validation asked error:${err}'))
          user.registration_proof_status = KycDocumentStatus.ValidationAsked
          user.save()
            .then(u => console.log(`User ${user._id} set ${user.registration_proof_id} to ${KycDocumentStatus.ValidationAsked}`))
            .catch(err => console.error(err))
        })
    })
    .catch(err => console.error(err))
}

const payAlfred = booking => {
  console.log(`Starting paying of booking ${booking._id}`)
  const amount = (booking.amount - booking.fees) * 100
  const id_mangopay_alfred = booking.alfred.mangopay_provider_id
  const role = booking.user_role

  const promise= [ADMIN, MANAGER].includes(role) ? Company.findById(booking.user.company) : emptyPromise(booking.user)

  // TODO payAlffred pour client Avocotés : alfred_amount pour Alfred, fees pour My Alfred
  promise
    .then(entity => {
      const id_mangopay_user=entity.id_mangopay
      console.log(`payAlfred : Got entity ${entity._id}, mangopay_id:${id_mangopay_user}`)
      mangoApi.Users.getWallets(id_mangopay_user)
        .then(wallets => {
          const wallet_id = wallets[0].Id
          mangoApi.Users.getWallets(id_mangopay_alfred)
            .catch(err => {
              console.error(`GetWallets Alfred ${id_mangopay_alfred}:${JSON.stringify(err)}`)
              return
            })
            .then(wallet_alfred => {
              const id_wallet_alfred = wallet_alfred[0].Id

              const transferPromise = booking.mangopay_transfer_id ?
                emptyPromise()
                :
                mangoApi.Transfers.create({
                  AuthorId: id_mangopay_user,
                  DebitedFunds: {Currency: 'EUR', Amount: amount},
                  Fees: {Currency: 'EUR', Amount: 0},
                  DebitedWalletId: wallet_id,
                  CreditedWalletId: id_wallet_alfred,
                })

              transferPromise.then(trsf => {
                if (trsf) { // Transfer did not already exist
                  if (trsf.Status == 'FAILED') {
                    console.error(`Transfer failed:${trsf.ResultMessage}`)
                    return
                  }
                  booking.mangopay_transfer_id = trsf.Id
                  booking.save()
                    .then(b => console.log(`Set transfer to ${trsf.Id} to booking ${b._id}]`))
                    .catch(err => {
                      console.log(`Error creating transfer for booking ${b._id}:${err}`)
                      return
                    })
                }
                mangoApi.Users.getBankAccounts(id_mangopay_alfred)
                  .catch(err => {
                    console.error(err)
                    return
                  })
                  .then(accounts => {
                    accounts = accounts.filter(a => a.Active)
                    if (accounts.length == 0) {
                      console.log(`No active bank account for Alfred ${id_mangopay_alfred}`)
                      return
                    }
                    mangoApi.PayOuts.create({
                      AuthorId: id_mangopay_alfred,
                      DebitedFunds: {Currency: 'EUR', Amount: amount},
                      Fees: {Currency: 'EUR', Amount: 0},
                      BankAccountId: accounts[0].Id,
                      DebitedWalletId: id_wallet_alfred,
                      BankWireRef: 'My Alfred',
                      PaymentType: 'BANK_WIRE',
                    })
                      .then(po => {
                        console.log(`Create payout OK:${JSON.stringify(po)}`)
                        booking.mangopay_payout_id = po.Id
                        booking.paid = true
                        booking.date_payment = moment()
                        booking.save().then().catch()
                      })
                      .catch(err => {
                        console.error(`Create Payout error:${JSON.stringify(err)}`)
                      })
                  })
              })
                .catch(err => {
                  console.error(`Create transfer error:${err}`)
                })
            })
        })
        .catch(err => {
          return console.error(`payAlfred:${err}`)
        })
    })
}

// TODO : update hook s'il existe pour éviter les warning au démarrage
const install_hooks= (hook_types, url) => {
  return
  if (is_development() && !['darwin', 'linux'].includes(process.platform)) {
    return console.log(`Dev mode: skipped install_hooks(${hook_types})`)
  }

  var host=get_host_url()
  if (is_development()) {
    host=host.replace('https', 'http')
  }
  const hook_url = new URL(url, host)

  mangoApi.Hooks.getAll()
    .then (declared_hooks => {

      const hook_data={
        Tag: 'MyAlfred hook',
        Status: 'ENABLED',
        Validity: 'VALID',
        Url: hook_url,
      }

      hook_types.forEach(hook_type => {
        const hook = declared_hooks.find(h => h.EventType == hook_type)
        var request
        if (hook) {
          request = mangoApi.Hooks.update({ Id: hook.Id, EventType: hook_type, ...hook_data})
        }
        else {
          request = mangoApi.Hooks.create({EventType: hook_type, ...hook_data})
        }
        request
          .then( res => {
            console.log(`${hook ? 'Updated' : 'Created'} ${hook_type} to ${hook_url}`)
          })
          .catch ( err => {
            console.error(`Error for ${hook_type}:${err}`)
            //console.error(err)
          })
      })
    })
    .catch (err => {
      console.error(err)
    })
}

const createCard = (id_mangopay, card_number, expiration_date, csv) => {
  return new Promise((resolve, reject) => {
    mangoApi.CardRegistrations.create({UserId: id_mangopay,Currency: 'EUR', })
      .then(function (cardRegistrationData) {
        const options = {
          url: cardRegistrationData.CardRegistrationURL,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          form: {
            data: cardRegistrationData.PreregistrationData,
            accessKeyRef: cardRegistrationData.AccessKey,
            cardNumber: card_number,
            cardExpirationDate: expiration_date,
            cardCvx: csv,
          },
        }
        request.post(options, function (err, data, result) {
          if (result.includes("errorCode")) {
            const code=parseInt(result.split('=')[1])
            console.log(`Card creation error:${code}`)
            const errMsg = MANGOPAY_ERRORS[code] || `Erreur inconnue #${code}`
            reject(errMsg)
            return
          }
          cardRegistrationData.RegistrationData = result
          mangoApi.CardRegistrations.update(cardRegistrationData)
            .then(newCard => {
              resolve(newCard)
            })
        }, options)
      })
      .catch (err => {
        console.error(err)
        reject(err)
      })
  })
}

module.exports = {
  mangoApi,
  createMangoClient,
  createMangoProvider,
  createOrUpdateMangoCompany,
  addIdIfRequired,
  addRegistrationProof,
  payAlfred,
  install_hooks,
  createCard,
}
