import { attributesComparator } from '../../../server/utils/database';

describe('Attributes order test', () => {

  test('Sort simple attributes', () => {
    const attributes=['name', 'firstname', 'birthday', 'aaaa']
    let sorted=[...attributes].sort(attributesComparator)
    expect(sorted).toStrictEqual([...attributes.sort()])
  })

  test('Sort complex attributes', () => {
    const attributes=['user.full_name', 'name.test', 'youyou', 'user.birthday']
    let sorted=attributes.sort(attributesComparator)
    expect(sorted).toStrictEqual(['youyou', 'name.test', 'user.birthday',  'user.full_name'])
  })

})
