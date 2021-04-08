const express = require('express');
const router = express.Router();
const axios = require('axios')

const WP_URL='http://my-alfred.io:2000'
const WP_URL2 = 'http:\/\/my-alfred.io:2000'

const WP_URL_RE = new RegExp('http://my-alfred.io:2000/blog', 'g')
const WP_URL_RE2 = new RegExp('http:\/\/my-alfred.io:2000', 'g')
// @Route GET /myAlfred/api/blog
// add a recurrent availability for current user
// access private
router.get('/:p1?/:p2?/:p3?/:p4?/:p5?/:p6?/:p7?/:p8?/:p9?/:p10?/:p11?/:p12?/:p13?/:p14?/:p15?/:p16?/:p17?', (req,res)=> {
  const src_url = req.originalUrl
  var dst_url=`${WP_URL}${req.originalUrl}`
  console.log(`Converting ${src_url} to ${dst_url}`)
  axios.get(dst_url)
    .then( result => {
      var data= result.data
      if (!(data instanceof Object)) {
        while (data.includes(WP_URL)) {
          console.log(`URL ${src_url}:replacing`)
          data=data.replace(WP_URL_RE, '/blog')
        }
        while (data.includes(WP_URL2)) {
          console.log(`URL ${src_url}:replacing`)
          data=data.replace(WP_URL_RE2, '')
        }
      }
      res.set(result.headers).status(result.status).send(data)
    })
    .catch(err => {
      if (err.response) {
        console.error(err.response.status)
      }
      else {
        console.error(err)
      }
      res.status(err.response.status).send(err.response.data)
    })
});

module.exports = router;
