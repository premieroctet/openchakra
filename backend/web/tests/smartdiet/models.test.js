const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')
forceDataModelSmartdiet()

const {
  getAvailableContents
} = require('../../server/plugins/smartdiet/functions')
const {
  ACTIVITY,
  EVENT_COLL_CHALLENGE,
  GENDER,
  HOME_STATUS
} = require('../../server/plugins/smartdiet/consts')

const { STATUS } = require('../../server/plugins/aftral/consts')
const CollectiveChallenge = require('../../server/models/CollectiveChallenge')
const moment=require('moment')
const mongoose = require('mongoose')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const {ROLE_CUSTOMER, ROLE_ADMIN, STATUS_FAMILY} = require('../../server/plugins/smartdiet/consts')

const Accessory=require('../../server/models/Accessory')
const AccessoryCategory=require('../../server/models/AccessoryCategory')
const Album=require('../../server/models/Album')
const Appointment=require('../../server/models/Appointment')
const Availability=require('../../server/models/Availability')
const Billing=require('../../server/models/Billing')
const Booking=require('../../server/models/Booking')
const Category=require('../../server/models/Category')
const ChatRoom=require('../../server/models/ChatRoom')
const Cigar=require('../../server/models/Cigar')
const CigarCategory=require('../../server/models/CigarCategory')
const Commission=require('../../server/models/Commission')
const Company=require('../../server/models/Company')
const Contact=require('../../server/models/Contact')
const Content=require('../../server/models/Content')
const Conversation=require('../../server/models/Conversation')
const Device=require('../../server/models/Device')
const Drink=require('../../server/models/Drink')
const DrinkCategory=require('../../server/models/DrinkCategory')
const Equipment=require('../../server/models/Equipment')
const Event=require('../../server/models/Event')
const EventLog=require('../../server/models/EventLog')
const FilterPresentation=require('../../server/models/FilterPresentation')
const Group=require('../../server/models/Group')
const Guest=require('../../server/models/Guest')
const Job=require('../../server/models/Job')
const Key=require('../../server/models/Key')
const LoggedUser=require('../../server/models/LoggedUser')
const Meal=require('../../server/models/Meal')
const MealCategory=require('../../server/models/MealCategory')
const Measure=require('../../server/models/Measure')
const Message=require('../../server/models/Message')
const Newsletter=require('../../server/models/Newsletter')
const Objective=require('../../server/models/Objective')
const Offer=require('../../server/models/Offer')
const OrderItem=require('../../server/models/OrderItem')
const Payment=require('../../server/models/Payment')
const Post=require('../../server/models/Post')
const Prestation=require('../../server/models/Prestation')
const PriceList=require('../../server/models/PriceList')
const Product=require('../../server/models/Product')
const Program=require('../../server/models/Program')
const Quotation=require('../../server/models/Quotation')
const Reminder=require('../../server/models/Reminder')
const ResetToken=require('../../server/models/ResetToken')
const Resource=require('../../server/models/Resource')
const Review=require('../../server/models/Review')
const Service=require('../../server/models/Service')
const ServiceUser=require('../../server/models/ServiceUser')
const Session=require('../../server/models/Session')
const ShipRate=require('../../server/models/ShipRate')
const Shop=require('../../server/models/Shop')
const Specificity=require('../../server/models/Specificity')
const Target=require('../../server/models/Target')
const Theme=require('../../server/models/Theme')
const TrainingCenter=require('../../server/models/TrainingCenter')
const UIConfiguration=require('../../server/models/UIConfiguration')
const User=require('../../server/models/User')
const UserSessionData=require('../../server/models/UserSessionData')

jest.setTimeout(20000)

describe('Test models ', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must know required models', async() => {
    expect(Accessory).toBeFalsy()
    expect(AccessoryCategory).toBeFalsy()
    expect(Album).toBeFalsy()
    expect(Appointment).toBeFalsy()
    expect(Availability).toBeFalsy()
    expect(Billing).toBeFalsy()
    expect(Booking).toBeFalsy()
    expect(Category).toBeTruthy()
    expect(ChatRoom).toBeFalsy()
    expect(Cigar).toBeFalsy()
    expect(CigarCategory).toBeFalsy()
    expect(Commission).toBeFalsy()
    expect(Company).toBeTruthy()
    expect(Contact).toBeFalsy()
    expect(Content).toBeTruthy()
    expect(Conversation).toBeFalsy()
    expect(Device).toBeFalsy()
    expect(Drink).toBeFalsy()
    expect(DrinkCategory).toBeFalsy()
    expect(Equipment).toBeFalsy()
    expect(Event).toBeTruthy()
    expect(EventLog).toBeFalsy()
    expect(FilterPresentation).toBeFalsy()
    expect(Group).toBeTruthy()
    expect(Guest).toBeFalsy()
    expect(Job).toBeFalsy()
    expect(Key).toBeTruthy()
    expect(LoggedUser).toBeTruthy()
    expect(Meal).toBeFalsy()
    expect(MealCategory).toBeFalsy()
    expect(Measure).toBeFalsy()
    expect(Message).toBeFalsy()
    expect(Newsletter).toBeFalsy()
    expect(Objective).toBeFalsy()
    expect(Offer).toBeTruthy()
    expect(OrderItem).toBeFalsy()
    expect(Payment).toBeFalsy()
    expect(Post).toBeFalsy()
    expect(Prestation).toBeFalsy()
    expect(PriceList).toBeFalsy()
    expect(Product).toBeFalsy()
    expect(Program).toBeFalsy()
    expect(Quotation).toBeFalsy()
    expect(Reminder).toBeFalsy()
    expect(ResetToken).toBeFalsy()
    expect(Resource).toBeFalsy()
    expect(Review).toBeFalsy()
    expect(Service).toBeFalsy()
    expect(ServiceUser).toBeFalsy()
    expect(Session).toBeFalsy()
    expect(ShipRate).toBeFalsy()
    expect(Shop).toBeFalsy()
    expect(Specificity).toBeFalsy()
    expect(Target).toBeTruthy()
    expect(Theme).toBeFalsy()
    expect(TrainingCenter).toBeFalsy()
    expect(UIConfiguration).toBeFalsy()
    expect(User).toBeTruthy()
    expect(UserSessionData).toBeFalsy()
  })

  it('Mandatory attributes for user role', () => {
    const ex=buildAttributesException('activity birthday gender dataTreatmentAccepted cguAccepted pseudo home_status'.split(' '))
    expect(User.create({email: 'a@a.com', lastname: 'Auvray', firstname: 'Sébastien'}))
      .resolves
      .toBeTruthy()
    const ex2=buildAttributesException('activity birthday gender dataTreatmentAccepted cguAccepted pseudo child_count'.split(' '))
    expect(User.create({
      role: ROLE_CUSTOMER, email: 'a@a.com',
      lastname: 'Auvray', firstname: 'Sébastien', home_status: STATUS_FAMILY}))
      .rejects
      .toThrow(ex2)
  })

  it('Optional attributes for not user roles', () => {
    return User.create({
      role: ROLE_ADMIN, email: 'a@a.com',
      lastname: 'Auvray', firstname: 'Sébastien',
    })
      .catch(err => { console.error(err) })
  })

  it('CollectiveChallenge should inherit from Event', async () => {
    await CollectiveChallenge.create({
      spoons:1, name: 'Challenge collectif',
      start_date: moment(), end_date: moment()
    })
    expect(Event.create({
      type: EVENT_COLL_CHALLENGE,
      spoons:1, name: 'Challenge collectif',
      start_date: moment(), end_date: moment()
    }))
    .rejects
    .toThrow(/.*doit.*CollectiveChallenge.*/)
    const events=await Event.find()
    expect(events.length).toBe(1)
  })

  it('Should return target events', async () => {
    const cat=await Category.create({name: 'Poids', picture: 'hop'})
    const target=await Target.create({name: 'Cible poids', category: cat})
    const target2=await Target.create({name: 'Cible poids 2', category: cat})
    const user=await User.create({
      activity: Object.keys(ACTIVITY)[0],
      gender: Object.keys(GENDER)[0],
      dataTreatmentAccepted: true, cguAccepted: true,
      home_status: Object.keys(HOME_STATUS)[0],
      pseudo: 'seb', birthday: moment(),
      role: ROLE_CUSTOMER, email: 'a@a.com',
      lastname: 'Auvray', firstname: 'Sébastien',
      targets:[target, target2]
    })
    const key=await Key.create({name: 'name', picture: 'hop'})
    const content=await Content.create({
      name: 'name', key: key, duration: 1,
      contents: 'contenu', default: false, picture: 'hop', type: 'VIDEO',
      targets:[target, target2]
    })
    const contents=await getAvailableContents(user)
  })
})
