const admin = require('firebase-admin')
const {getDataModel}=require('../../config/config')

const firebaseConfig=require(`../../${getDataModel()}-firebase-adminsdk.json`)
console.log(`Loaded firebase for project ${firebaseConfig.project_id}`)

const app = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
})

const sendUserNotification = ({user, title, message}) => {

  if (!user || !title || !message || !user._id) {
    throw new Error(`Expected user (including _id), title, message`)
  }

  console.log(`Sending notification to ${user._id}:${title}/${message}`)

  const payload = {
    notification: {
      title: title,
      body: message,
    },
  }
  const topic=`user_${user._id}`

  return app.messaging().sendToTopic(topic, payload)
    .then(response => {
      console.debug(`Sent ${topic}/${payload.notification.title}/${payload.notification.body}:${JSON.stringify(response)}`)
      return response
    })
}

const sendAppNotification = ({title, message}) => {
  if (!user || !title || !message) {
    throw new Error(`Expected title, message`)
  }

  console.log(`Sending notification to ALL:${title}/${message}`)

  const payload = {
    notification: {
      title: title,
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
