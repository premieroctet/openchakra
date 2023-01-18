import { getAvailableAttributes, getFieldsForDataProvider } from '../../utils/dataSources'
import lodash from 'lodash'
import project from '../data/attributesProject.json'
import modelsAftral from '../data/dataModel.json'
import dashboardPage from '../data/dashboardAlfred.json'
import models4Select from './models.json'
import page4Select from './pageSelect.json'


// @ts-ignore
describe('DataSources tests', () => {

  test('Get attributes for session provider', () => {
    const components=project.pages['page-L8VM99NLPD123'].components
    // @ts-ignore
    const EXPECTED = lodash.pickBy(models.session?.attributes, a => a.multiple)
    const component = components['comp-L947UEF7AJ5UH']
    // @ts-ignore
    const attributes: any = getAvailableAttributes(component, components, models)
    return expect(attributes).toMatchObject(EXPECTED)
  })

  test('Get attributes for resource provider', () => {
    const components=project.pages['page-L8VM99NLPD123'].components
    // @ts-ignore
    const EXPECTED = lodash.pickBy(models.resource?.attributes, a => a.multiple)
    const component = components['comp-L9QUTVVF04ZVU']
    // @ts-ignore
    const attributes: any = getAvailableAttributes(component, components, models)
    return expect(attributes).toMatchObject(EXPECTED)
  })

  test('Get fields for non-root dataSource', () => {
    const components=project.pages['page-L8VM99NLPD123'].components
    // @ts-ignore
    const EXPECTED = ['name']
    // @ts-ignore
    const fields:String[] = getFieldsForDataProvider('comp-L9QV07F8BOEES', components)
    return expect(fields).toEqual(EXPECTED)
  })

  test('Get fields for non-root dataSource with select', () => {
    const components=dashboardPage.components
    // @ts-ignore
    const EXPECTED = ['parent', 'name']
    // @ts-ignore
    const fields:String[] = getFieldsForDataProvider('comp-LCKMBTLMRM5TU', components)
    return expect(fields).toEqual(EXPECTED)
  })

  test('Get fields for Select with dataSource and subDataSource', () => {
    const components=page4Select.pages['page-L9QSPE0HX8JV2'].components
    // @ts-ignore
    const EXPECTED = ['guests.email']
    // @ts-ignore
    const fields:String[] = getFieldsForDataProvider('root', components)
    return expect(fields).toEqual(EXPECTED)
  })

})
