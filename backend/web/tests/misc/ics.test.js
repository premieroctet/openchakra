const moment=require('moment')
const fs=require('fs')
const { generateIcs } = require("../../utils/ics")

describe('ICS tests', () => {

  test('Must generate ics', async() => {
    const result=await generateIcs({start: moment(), end: moment().add(1, 'hour'), title: 'Webinaire', url: 'https://www.google.fr'})
    console.log(result)
    fs.writeFileSync('/home/seb/a.ics', result)
  })

})
