const projectTest=require('../data/testProject.json')
const {validateJSON}=require('../../utils/validation')

describe('JSON project validation', () => {
  it('should validate', () => {
    expect(validateJSON(projectTest)).toBe(undefined)
  })
})
