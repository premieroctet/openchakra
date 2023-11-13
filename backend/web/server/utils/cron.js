const cron=require('node-cron')
const {isMaster}=require('../../config/config')
class CustomCron {

  schedule(interval, fn) {
    const customFn=() => isMaster() ? fn() : console.log(`No scheduling because isMaster===false`)
    return cron.schedule(interval, customFn)
  }

}

const customCron=new CustomCron()

module.exports=customCron
