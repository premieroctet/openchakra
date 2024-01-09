const { handleReliesOn } = require("../../server/utils/database")

describe('relies on', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  it('Must display groups', async() => {
    const requiredFields= [ 'company', 'diet_appointments_count', 'diet_patients', 'diet_patients.company.name', 'diet_patients.fullname', 'diet_patients.picture', 'diet_patients_count', 'firstname', 'picture' ]
    const directAttribute='diet_patients'
    const reliesOn='diet_coachings.user'
    const result=handleReliesOn(directAttribute, reliesOn, requiredFields)
    //const expected=[ 'company', 'diet_appointments_count', 'diet_coachings.user', 'diet_coachings.user.company.name', 'diet_coachings.user.fullname', 'diet_coachings.user.picture', 'diet_coachings.usercount', 'firstname', 'picture' ]
    console.log(result)
    //expect(result).toEqual(expected)
  })
})
