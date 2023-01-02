const {GENDER, MEASURE_TYPE} = require('../../../../utils/dekuple/consts')
const {declareEnumField} = require('../../database')

const USER_MODELS=['user', 'loggedUser']
USER_MODELS.forEach(m => {
  declareEnumField({model: m, field: 'gender', enumValues: GENDER})
})

declareEnumField({model: 'measure', field: 'type', enumValues: MEASURE_TYPE})
