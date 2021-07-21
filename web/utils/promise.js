
function emptyPromise(val = null) {
  return new Promise(resolve => {
    resolve(val)
  })
}

const delayedPromise = (delay_ms, promise_fn) => {
  console.log(`Preparing promise with delay ${delay_ms}`)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Lauching promise ${promise_fn}`)
      promise_fn()
        .then(res => {
          console.log('delayedPromise ok')
          resolve(res)
        })
        .catch(err => {
          console.error('delayedPromise NOK')
          reject(err)
        })
    },
    delay_ms)
  })
}

module.exports = {emptyPromise, delayedPromise}
