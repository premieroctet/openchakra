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
const Company = require('../../server/models/Company')
const Subscription = require('../../server/models/Subscription')
const ProductCategory = require('../../server/models/CategoryProduct')

const entries = {
  product_category: 2,
  company: 3,
  user: 10,
  subscription: 10,
}


/**
 * PRODUCT CATEGORIES
 */

const productCategoryFactory = factory(ProductCategory, {
  __v: {
    skip: true,
  },
})

const productCategories = Array.from({length: entries.product_category}, () => productCategoryFactory.generate({
  _id: faker.database.mongodbObjectId(),
  name: faker.vehicle.vehicle(),
  parent: null,
}))


/**
 * COMPANIES
 */

const companyFactory = factory(Company, {
  __v: {
    skip: true,
  },
})

const companies = Array.from({length: entries.company}, () => companyFactory.generate({
  _id: faker.database.mongodbObjectId(),
  name: faker.company.name(),
  website: faker.internet.url(),
}))

/**
 * USERS
 */
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
  __v: {
    skip: true,
  },
})

const users = Array.from({length: entries.user}, () => userFactory.generate({
  _id: faker.database.mongodbObjectId(),
  'lastname': faker.name.lastName(),
  'firstname': faker.name.firstName(),
  'photo': faker.image.avatar(),
  'job': faker.name.jobTitle(),
  'company': companies[Math.floor(Math.random() * entries.company)]._id,
  'contact': {
    'email': `${faker.internet.email()}`,
    'linkedIn': `${faker.internet.url()}`,
    'twitter': `${faker.internet.url()}`,
  },
  password: `${PASSWD}`,
  cgv_validation_date: `${faker.date.between()}`,
}))

/**
 * COMPANIES
 */

const subscriptionFactory = factory(Subscription, {
  __v: {
    skip: true,
  },
})

const subscriptions = Array.from({length: entries.subscription}, () => subscriptionFactory.generate({
  _id: faker.database.mongodbObjectId(),
}))


async function loadData() {
  try {
    await Company.insertMany(companies)
    await User.insertMany(users)
    await Subscription.insertMany(subscriptions)
    
    await ProductCategory.insertMany(productCategories)
    console.log('👍👍👍👍👍 Cooool ! Import done !')
    process.exit()
  }
  catch(e) {
    console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n')
    console.log(e)
    process.exit()
  }
}

loadData()

