const admin = require('firebase-admin')
const {getDataModel}=require('../../config/config')

const firebaseConfig=require(`../../${getDataModel()}-firebase-adminsdk.json`)
const app = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
})

const sendNotification = (user_id, message) => {
  let payload = {
    notification: {
      title: 'Message du fumoir',
      body: message,
      imageUrl: 'https://my-alfred-data-test.s3-eu-west-3.amazonaws.com/fumoir/Logo%20Le%20Fumoir%20George%20Or&B.svg'
    },
  }

  const topic=`user_${user_id}`

  console.log(topic)
  return app.messaging().sendToTopic(topic, payload)
    .then(response => {
      console.log(JSON.stringify(response))
      return response
    })
}

module.exports={
  sendNotification,
}
