import { getAvailableAttributes, getFieldsForDataProvider } from '../../utils/dataSources'
import lodash from 'lodash'
import project from '../data/attributesProject.json'
import models from '../data/dataModel.json'

// @ts-ignore
describe('DataSources tests', () => {

  test('Get attributes for session provider', () => {
    const components=project.pages['page-L8VM99NLPD123'].components
    const EXPECTED = lodash.pickBy(models.session?.attributes, a => a.multiple,
    )
    const component = components['comp-L947UEF7AJ5UH']
    const attributes: any = getAvailableAttributes(component, components, models)
    return expect(attributes).toMatchObject(EXPECTED)
  })

  test('Get attributes for resource provider', () => {
    const components=project.pages['page-L8VM99NLPD123'].components
    const EXPECTED = lodash.pickBy(models.resource?.attributes, a => a.multiple)
    const component = components['comp-L9QUTVVF04ZVU']
    const attributes: any = getAvailableAttributes(component, components, models)
    return expect(attributes).toMatchObject(EXPECTED)
  })

  // @ts-ignore
  test.only('Get fields for non-root dataSource', () => {
    const components=project.pages['page-L8VM99NLPD123'].components
    const EXPECTED = lodash.pickBy(models.resource?.attributes, a => a.multiple)
    const fields:String[] = getFieldsForDataProvider('comp-L9QV07F8BOEES', components)
    return expect(fields).toEqual(['name'])
  })

})
