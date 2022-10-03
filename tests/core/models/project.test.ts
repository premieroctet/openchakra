import { getComponent } from '../../../src/core/models/project'

import lodash from 'lodash'
import { unlinkDataSource } from '../../../src/core/models/project'

const SOURCE_PROJECT = {
  activePage: 'p1',
  rootPage: 'p1',
  pages: {
    p1: {
      pageId: 'p1',
      pageName: 'Page 1',
      selectedId: 'comp1',
      rootPage: false,
      components: {
        comp1: {
          id: 12,
          children: [],
          type: 'Box',
          parent: 'root',
          props: {
            dataSource: 'ds',
            attribute: 'att',
          },
        },
        comp2: {
          id: 15,
          children: [],
          type: 'Box',
          parent: 'root',
          props: {
            text: 'ds',
            attribute: 'att',
          },
        },
      },
    },
  },
}
describe('Model reducers', () => {
  it('should remove datasource', () => {
    const res = unlinkDataSource(SOURCE_PROJECT, 'ds')
    expect(
      lodash.get(res, 'pages.p1.components.comp1.props.dataSource'),
    ).toBeUndefined()
    return expect(lodash.get(res, 'pages.p1.components.comp2.props.text')).toBe(
      'ds',
    )
  })

  it('should find component', () => {
    const comp = getComponent(SOURCE_PROJECT, 'comp1')
    return expect(comp).toBeTruthy()
  })
})
