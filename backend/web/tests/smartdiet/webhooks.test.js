const axios = require("axios")
const https=require('https')
const mongoose=require('mongoose')

describe('Registration', () => {

  const DATAOK={
    "patient_email": "sebastien.auvray@wappizy.com",
    "diet_email": "annelaure.meunier75@gmail.com",
    "coaching_date": "2019-09-18 14:00:00",
    "assessment": true
  }


  let axiosInstance=null

  beforeAll(async() => {
    axiosInstance=axios.create({
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
    axiosInstance.defaults.auth = {
      username: 'undefined',
      password: 'undefined',
    };
  })

  const postData = async (url, data) => {
    try {
      const response = await axiosInstance.post(url, data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
  
  it('must refuse coaching if unkown diet or patient', async() => {
    const res=await await postData('https://localhost/myAlfred/api/smartdiet/coaching', {...DATAOK, diet_email: 'piip@jklj'})
    expect(res.status).toEqual(404)
    const res2=await await postData('https://localhost/myAlfred/api/smartdiet/coaching', {...DATAOK, patient_email: 'piip@jklj'})
    expect(res2.status).toEqual(404)
  })

  it('must create coaching', async() => {
    const res=await await postData('https://localhost/myAlfred/api/smartdiet/coaching', DATAOK)
    console.log(res.data)
    expect(res.status).toEqual(200)
    expect(mongoose.isValidObjectId(res.data)).toEqual(true)
  })

})