
import { getAvailableAttributes } from '../../utils/dataSources';
import lodash from 'lodash'
import project from '../data/attributesProject.json'
import models from '../data/dataModel.json'

const COMPONENTS=Object.values(project.pages)[0].components

describe('DataSources tests', () => {
  test('Get attributes for program provider', () => {
    const EXPECTED=lodash.pickBy(models.find(m => m.name=='program')?.attributes, a => a.multiple)
    const components=Object.values(project.pages)[0].components
    const component=COMPONENTS['comp-ProgramsBox']
    const attributes:any = getAvailableAttributes(component, COMPONENTS, models)
    return expect(attributes).toMatchObject(EXPECTED)
  })

  test('Get attributes for program name', () => {
    const EXPECTED=lodash.pickBy(models.find(m => m.name=='program')?.attributes, a => !a.multiple)
    const components=Object.values(project.pages)[0].components
    const component=COMPONENTS['comp-ProgramName']
    const attributes:any = getAvailableAttributes(component, COMPONENTS, models)
    return expect(attributes).toMatchObject(EXPECTED)
  })

  test('Get attributes for themes box', () => {
    const EXPECTED=lodash.pickBy(models.find(m => m.name=='program')?.attributes, a => a.multiple)
    const components=Object.values(project.pages)[0].components
    const component=COMPONENTS['comp-ThemesBox']
    const attributes:any = getAvailableAttributes(component, COMPONENTS, models)
    return expect(attributes).toMatchObject(EXPECTED)
  })

  test('Get attributes for theme name', () => {
    const EXPECTED=lodash.pickBy(models.find(m => m.name=='theme')?.attributes, a => !a.multiple)
    const components=Object.values(project.pages)[0].components
    const component=COMPONENTS['comp-ThemeName']
    const attributes:any = getAvailableAttributes(component, COMPONENTS, models)
    return expect(attributes).toMatchObject(EXPECTED)
  })

})
