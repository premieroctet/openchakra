import axios from 'axios'

function packageToComponent(packageName) {
  var component
  component = packageName.replace('@', '')
  const myArray = component.split('.')
  component = ''
  var arrayLen = myArray.length
  for (var i = 0; i < arrayLen; i++) {
    component += myArray[i]
    if (i != arrayLen - 1) component += '/'
  }
  component = component.replace('/', '.')
  return component
}

export default async function handler(req, res) {
  const component = req.body.component
  const path = req.body.path
  try {
    //BIT Login to get cookie

    var data = JSON.stringify({
      username: process.env.NEXT_BIT_USERNAME,
      password: process.env.NEXT_BIT_PASSWORD,
    })

    var config = {
      method: 'post',
      url: 'https://api.bit.cloud/user/login',
      headers: {
        authority: 'api.bit.cloud',
        accept: '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'content-type': 'application/json',
        cookie:
          '_gcl_au=1.1.1924747083.1669372703; cb_user_id=null; cb_group_id=null; cb_anonymous_id=%22e14c5117-9d15-42a7-814d-fa88ad7296bb%22; referer_path=direct; _gid=GA1.2.731403469.1670248903; ln_or=d; cocyclesSession=s%3AW44an3oK-62v2V1uRvUz1L90tI4aKIs6.lIzYZneIKlOdviJE%2Fj2v%2FhGh7wnI7zKmQtBqCEqaQko; _ga=GA1.1.1193013459.1669372704; _gat=1; mp_fa529c1fe4fd43bc992862da641e450a_mixpanel=%7B%22distinct_id%22%3A%20%22184ed6881ed3a7-04ca49f048f43b-17525635-16a7f0-184ed6881ee1ae6%22%2C%22%24device_id%22%3A%20%22184ed6881ed3a7-04ca49f048f43b-17525635-16a7f0-184ed6881ee1ae6%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fbit.cloud%2F%22%2C%22%24initial_referring_domain%22%3A%20%22bit.cloud%22%2C%22total_page_views%22%3A%202%2C%22__mps%22%3A%20%7B%22%24os%22%3A%20%22Mac%20OS%20X%22%2C%22%24browser%22%3A%20%22Chrome%22%2C%22%24browser_version%22%3A%20108%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fbit.cloud%2F%22%2C%22%24initial_referring_domain%22%3A%20%22bit.cloud%22%2C%22sessions_count%22%3A%201%2C%22internal%22%3A%20false%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%22total_page_views%22%3A%202%2C%22pages_in_session%22%3A%201%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%2C%22sessions_count%22%3A%201%2C%22pages_in_session%22%3A%202%2C%22lastPageViewTS%22%3A%20%222022-12-07T16%3A26%3A05.274Z%22%2C%22lastEventTS%22%3A%20%222022-12-07T16%3A26%3A05.274Z%22%2C%22newSession%22%3A%20false%7D; _ga_C0T2GH2G99=GS1.1.1670430016.24.1.1670430366.56.0.0; cocyclesSession=s%3AKNKpLJXYL94pUKM8sggRrK6_BpIrxNZp.clQjf00U39LEUxTmXzssb5F%2FQafpS11%2F6We8xD5AY7U',
      },
      data: data,
    }

    var cookieHeaders = []

    await axios(config)
      .then(function(response) {
        cookieHeaders = response.headers['set-cookie']
      })
      .catch(function(error) {
        console.log(error)
      })

    // BIT GraphQL API to get props of a component

    var data = JSON.stringify({
      query:
        '\n  query getComponentDocs($id: String!) {\n    getHost {\n      id # for gql caching\n      getDocs(id: $id) {\n        abstract\n        properties {\n          name\n          description\n          required\n          type\n          default: defaultValue {\n            value\n          }\n        }\n      }\n    }\n  }\n',
      variables: {
        id: packageToComponent(path),
      },
      operationName: 'getComponentDocs',
    })

    var config = {
      method: 'post',
      url: 'https://ghrqsfc.scopes.bit.cloud/graphql',
      headers: {
        authority: 'ghrqsfc.scopes.bit.cloud',
        accept: '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'content-type': 'application/json',
        cookie: cookieHeaders[0],
      },
      data: data,
    }

    var parameters

    await axios(config)
      .then(function(response) {
        parameters = response.data['data']['getHost']['getDocs']['properties']
      })
      .catch(function(error) {
        console.log(error)
      })

    res.status(200).json(parameters)
  } catch (err) {
    console.log(err)
    res.status(400).json({ err })
  }
}
