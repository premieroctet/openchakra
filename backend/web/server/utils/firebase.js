const admin = require('firebase-admin')
const {getDataModel}=require('../../config/config')

const firebaseConfig=require(`../../${getDataModel()}-firebase-adminsdk.json`)
const app = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
})

const sendUserNotification = (user_id, message) => {

  const payload = {
    notification: {
      title: 'Message personnel',
      body: message,
    },
  }
  const topic=`user_${user_id}`

  return app.messaging().sendToTopic(topic, payload)
    .then(response => {
      console.debug(`Sent ${topic}/${payload.notification.title}/${payload.notification.body}:${JSON.stringify(response)}`)
      return response
    })
}

const sendAppNotification = (message) => {
  const payload = {
    notification: {
      title: 'Message général',
      body: message,
    },
  }
  const topic=`user_ALL`

  return app.messaging().sendToTopic(topic, payload)
    .then(response => {
      console.debug(`Sent ${topic}/${payload.notification.title}/${payload.notification.body}:${JSON.stringify(response)}`)
      return response
    })
}

module.exports={
  sendUserNotification,
  sendAppNotification,
}
