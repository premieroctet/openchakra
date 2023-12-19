const { retainRequiredFields } = require("../../../server/utils/database")

describe('Retain fields test', () => {

  it('Must retain simple attributes', () => {
    const data={id:12, text:'hop', number:12, subs:[{a:{x:1, y:19}, b:2}, {a:{x:2, t:19}, b:6}]}
    const returned=retainRequiredFields({data, fields:['text', 'subs.a.x']})
    expect(returned).toEqual({id:12, text:'hop', subs:[{a:{x:1}}, {a:{x:2}}]})
  })

})
