const lodash=require('lodash')
const traversal=require('tree-traversal')

const treeOptions = {

  subnodesAccessor: node => {
    console.log(`Children of ${node}`)
    if (node.split('.').length-1==1) { return [] }
    return lodash.range(3).map(i => `${node}.${i}`)
  },

  userdataAccessor: (node, userdata) => {
    // console.log(`Visiting ${node} with ${JSON.stringify(userdata)}`)
    userdata.visited.push(node)
    return userdata
  },

  userdata: {visited: []},
}


describe('Tree traversal tests', () => {

  test('first traversal', async() => {
    return traversal.depth('1', treeOptions, (res, err) => console.log(res))
    // return console.log(treeOptions.userdata)
  })

})
