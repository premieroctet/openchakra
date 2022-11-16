const mongoose = require('mongoose')
const {factory} = require('fakingoose')
const {faker} = require('@faker-js/faker/locale/fr')
const bcrypt=require('bcryptjs')
const {getDatabaseUri} = require('../../config/config')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const PASSWD=bcrypt.hashSync('password', 10)

mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
const User = require('../../server/models/User')
const Subscription = require('../../server/models/Subscription')


const userFactory = factory(User, {
  lastname: {
    type: 'lastname',
  },
  firstname: {
    type: 'firstname',
  },
  contact: {
    email: {
      type: 'email',
    },
  },
  last_login: {
    skip: true,
  },
})

const users = Array.from({length: 3}, () => userFactory.generate({
  _id: faker.database.mongodbObjectId(),
  'lastname': faker.name.lastName(),
  'firstname': faker.name.firstName(),
  'photo': faker.image.avatar(),
  'job': faker.name.jobTitle(),
  'contact': {
    'email': `${faker.internet.email()}`,
    'linkedIn': `${faker.internet.url()}`,
    'twitter': `${faker.internet.url()}`,
  },
  password: `${PASSWD}`,
  cgv_validation_date: `${faker.date.between()}`,
}))

console.log(users)


async function loadData() {
  try {
    await User.insertMany(users)
    // console.log('👍👍👍👍👍👍👍👍 Done!')
    process.exit()
  }
  catch(e) {
    console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n')
    console.log(e)
    process.exit()
  }
}

loadData()

