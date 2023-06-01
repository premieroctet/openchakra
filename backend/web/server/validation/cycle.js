const findCycle = require('find-cycle/directed')

/**
Params:
 - ids: ids of nodes : array of string
 - linkFn: function returning destination nodes : string => [string]
*/
const hasCycle = (ids, linkFn) => {
  const res=findCycle(ids, linkFn)
  return res
}

module.exports=hasCycle
