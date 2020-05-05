const moment = require('moment');
const path = require('path');
const fs = require('fs');
const {getHost}=require('./mailing')
const emptyPromise = require('./promise');
const mangopay = require('mangopay2-nodejs-sdk');

// PROD !!!!!
const mangoApi = new mangopay({
  clientId: 'myalfredprod',
  clientApiKey: 'j8R8fLZmUderNNp27siCqMAJ3y7Bv7BB82trfGuhqSKcYpEZ91',
  baseUrl: 'https://api.mangopay.com',
});

/**
const mangoApi = new mangopay({
  clientId: 'testmyalfredv2',
  clientApiKey: 'cSNrzHm5YRaQxTdZVqWxWAnyYDphvg2hzBVdgTiAOLmgxvF2oN',
});
*/

const HOOK_TYPES="KYC_CREATED KYC_SUCCEEDED KYC_FAILED KYC_VALIDATION_ASKED".split(' ')
/** Hook Mangopay */

HOOK_TYPES.forEach(hookType => {
  const hook_url=new URL('/myAlfred/api/payment/mangopay_hook', getHost());
  console.log(`Setting hook ${hook_url} for ${hookType}`);
  mangoApi.Hooks.create({
    Tag: "MyAlfred hook",
    EventType: hookType,
    Status: "ENABLED",
    Validity: "VALID",
    Url: hook_url,
  });
})



const createMangoClient = user => {
  var userData = {
    PersonType: "NATURAL",
    FirstName: user.firstname,
    LastName: user.name,
    Birthday: moment(user.birthday).unix(),
    Nationality: 'FR',
    CountryOfResidence: 'FR',
    Email: user.email,
    Tag: `Client ${user._id} / ${user.FirstName} ${user.LastName}`,
  }

  mangoApi.Users.create(userData)
    .then(newUser => {
      console.log(`Created Mango User ${JSON.stringify(newUser)}`)
      user.id_mangopay = newUser.Id;
      user.save().then().catch();
      mangoApi.Wallets.create({
          Owners: [newUser.Id],
          Description: `Wallet ${user._id} / ${newUser.FirstName} ${newUser.LastName} client`,
          Currency: 'EUR'
        })
        .then(wallet => {
          console.log(`Created Wallet ${JSON.stringify(wallet)}`)
        })
        .catch (err => {
          console.error(`Création wallet user ${user.firstname} ${user.name}:${JSON.stringify(err)}`)
        })
    })
    .catch (err => {
      console.error(`Création mangopay user ${user.firstname} ${user.name}:${JSON.stringify(err)}`)
    })
};

const createMangoProvider = (user, shop) => {

  console.log(`Creating mango provider for ${user.name}`)
  var userData = {
    PersonType: shop.is_particular ? "NATURAL" : "LEGAL",
    FirstName: user.firstname,
    LastName: user.name,
    Birthday: moment(user.birthday).unix(),
    Nationality: 'FR',
    CountryOfResidence: 'FR',
    Email: user.email,
    Tag: `Provider ${user._id} / ${user.FirstName} ${user.LastName}`,
  }
  if (shop.is_professional) {
    const addr = user.billing_address
    userData.LegalPersonType = "SOLETRADER"
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
      AddressLine2: "",
      City: addr.city,
      Region: "",
      PostalCode: addr.zip_code,
      Country: "FR"
    })
    userData.HeadquartersAddress = mangoAddr
    userData.LegalRepresentativeAddress = mangoAddr
  }

  mangoApi.Users.create(userData)
    .then(newUser => {
      console.log(`Created Mango User ${JSON.stringify(newUser)}`)
      user.mangopay_provider_id = newUser.Id;
      user.mangopay_provider_status = newUser.PersonType
      user.save().then().catch();
      mangoApi.Wallets.create({
          Owners: [newUser.Id],
          Description: `Wallet ${user._id} / ${newUser.FirstName} ${newUser.LastName} provider`,
          Currency: 'EUR'
        })
        .then(wallet => {
          console.log(`Created Wallet ${JSON.stringify(wallet)}`)
        })
    })
};

const addIdIfRequired = user => {
  console.log("addIdIfRequired")
  if (!user.mangopay_provider_id) {
    console.log(`User ${user._id}:pas besoin d'envoyer l'ID pour un client`)
    return false;
  }
  const objStatus = {
    Type: 'IDENTITY_PROOF',
  }
  const id = user.mangopay_provider_id;

  mangoApi.Users.createKycDocument(id, objStatus)
    .catch(error => {
      console.error(`createKycDocument(${id}, ${JSON.stringify(objStatus)}) : ${JSON.stringify(error)}`)
    })
    .then(result => {
      const documentId = result.Id;
      console.log(`Create identiy proof ${documentId} for provider ${id}`)
      user.identity_proof_id=documentId;
      user.save()
        .then ( u => console.log(`User saved id proof ${user.identity_proof_id}`) )
        .catch ( err => console.error(err) )

      const id_recto = path.resolve(user.id_card.recto);

      // FIX vérifier sous quelle forme envoyer le fichier
      const base64Recto = fs.readFileSync(id_recto, 'base64');
      const KycPageRecto = new mangoApi.models.KycPage({"File": base64Recto});

      mangoApi.Users.createKycPage(id, documentId, KycPageRecto)
        .catch(error => {
          console.error(`createKycPage(${id}, ${documentId}, KycPageRecto : ${JSON.stringify(error)}`)
        })
        .then(resultRecto => {
          const id_verso = user.id_card.verso ? '../../../' + user.id_card.verso : null;

          // Natural provider : KYX check is free => send
          if (user.mangopay_provider_status=='NATURAL') {
            console.log("Natural provider => require KYC")
            try {
              requireKycValidation(user, documentId);
            }
            catch (err) {
              console.error(err)
            }
          }
          if (id_verso !== null) {
            const base64Verso = fs.readFileSync(path.resolve(id_verso), 'base64');
            const KycPageVerso = new mangoApi.models.KycPage({"File": base64Verso});

            mangoApi.Users.createKycPageFromFile(id, documentId, KycPageVerso)
              .then(resultVerso => console.log(`Created KyCPage verso ${JSON.stringify(resultVerso)}`))
              .catch(err => console.error(err))
          }
        })
        .catch(err => console.error(res))

  })
  .catch (err => console.error(err))
}

const requireKycValidation = (user, documentId) => {

  console.log("Requiring validation");
  const updateObj = {
      Id: documentId,
      Status: "VALIDATION_ASKED"
  };

  mangoApi.Users.updateKycDocument(user.mangopay_provider_id, updateObj)
    .then(updKyc => console.log(`Required validation for document ${JSON.stringify(updKyc)}`))
    .catch(err => console.error(`Error ${err}`))
}


const payAlfred = booking => {
  console.log(`Starting paying of booking #${booking._id}`)
  const amount = (booking.amount-booking.fees) * 100;
  const id_mangopay_user = booking.user.id_mangopay;
  const id_mangopay_alfred = booking.alfred.mangopay_provider_id;

  api.Users.getWallets(id_mangopay_user)
    .catch( err => {
      console.error("Err:"+JSON.stringify(err));
      return;
    })
    .then(wallets => {
      const wallet_id = wallets[0].Id;
      api.Users.getWallets(id_mangopay_alfred)
        .catch(err => {
          console.error(`GetWallets Alfred ${id_mangopay_alfred}:${JSON.stringify(err)}`)
          return
        })
        .then(wallet_alfred => {
          const id_wallet_alfred = wallet_alfred[0].Id;

          const transferPromise=booking.mangopay_transfer_id ?
            emptyPromise()
            :
            api.Transfers.create({
              AuthorId: id_mangopay_user,
              DebitedFunds: { Currency: 'EUR', Amount: amount },
              Fees: { Currency: "EUR", Amount: 0 },
              DebitedWalletId: wallet_id,
              CreditedWalletId: id_wallet_alfred,
            })

            transferPromise.then( trsf => {
                if (trsf) { // Transfer did not already exist
                    if (trsf.Status == 'FAILED') {
                      console.error(`Transfer failed:${trsf.ResultMessage}`);
                      return
                    }
                    booking.mangopay_transfer_id = trsf.Id;
                    booking.save()
                      .then( b => console.log(`Set transfer to ${trsf.Id} to booking ${b._id}]`))
                      .catch( err => {
                        console.log(`Error creating transfer for booking ${b._id}`)
                        return
                      })
                }
                api.Users.getBankAccounts(id_mangopay_alfred)
                  .catch (err => {
                    console.log(err);
                    return
                  })
                  .then ( accounts => {
                      accounts = accounts.filter ( a => a.Active);
                      if (accounts.length==0) {
                        console.log(`No active bank account for Alfred ${id_mangopay_alfred}`);
                        return
                      }
                      api.PayOuts.create({
                          AuthorId: id_mangopay_alfred,
                          DebitedFunds: { Currency: "EUR", Amount: amount },
                          Fees: { Currency: "EUR", Amount: 0 },
                          BankAccountId: accounts[0].Id,
                          DebitedWalletId: id_wallet_alfred,
                          BankWireRef: "My Alfred",
                          PaymentType: "BANK_WIRE"
                        })
                        .catch ( err => {
                          console.log(err);
                          return
                        })
                        .then(
                          po => {
                            console.log('Create payout OK:' + JSON.stringify(po));
                            booking.mangopay_payout_id = po.Id;
                            booking.paid = true;
                            booking.date_payment = moment()
                            booking.save().then().catch();
                          },
                          err => {
                            console.error('Create Payout error:' + JSON.stringify(err))
                          }
                      )
                })
              },
               err => { err => console.error('Create transfer error:' + JSON.stringify(err)) }
            )
        })
    })
}



module.exports = {
  mangoApi,
  createMangoClient,
  createMangoProvider,
  addIdIfRequired,
  requireKycValidation
};
