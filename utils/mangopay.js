const mangopay = require('mangopay2-nodejs-sdk');

const mangoApi = new mangopay({
    clientId: 'testmyalfredv2',
    clientApiKey: 'cSNrzHm5YRaQxTdZVqWxWAnyYDphvg2hzBVdgTiAOLmgxvF2oN',
});


const createMangoClient = user => {
  User.findById(user)
    .then(user => {

        var userData={
            PersonType: user.is_alfred'NATURAL',
            FirstName: user.firstname,
            LastName: user.name,
            Birthday: moment(user.birthday).unix(),
            Nationality: 'FR',
            CountryOfResidence: 'FR',
            Email: user.email,
        }

        mangoApi.Users.create(userData)
            .then(newUser=> {
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
                      res.json(wallet)
                    })
            })
    })
    .catch(err => console.log(err))
};

const createMangoSeller = (user, shop) => {
  User.findById(user)
    .then(user => {

        var userData={
            PersonType: user.is_alfred'NATURAL',
            FirstName: user.firstname,
            LastName: user.name,
            Birthday: moment(user.birthday).unix(),
            Nationality: 'FR',
            CountryOfResidence: 'FR',
            Email: user.email,
        }

        mangoApi.Users.create(userData)
            .then(newUser=> {
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
                      res.json(wallet)
                    })
            })
    })
    .catch(err => console.log(err))
};


module.exports={mangoApi};
