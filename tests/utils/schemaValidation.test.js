const projectTest=require('../data/testProject.json')
const {validateJSON}=require('../../src/utils/validation')

describe('JSON project validation', () => {
  it('should validate', () => {
    expect(validateJSON(projectTest)).toBe(undefined)
  })
})
