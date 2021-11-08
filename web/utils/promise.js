
function emptyPromise(val = null) {
  return new Promise(resolve => {
    resolve(val)
  })
}

const delayedPromise = (delay_ms, promise_fn) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      promise_fn()
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    },
    delay_ms)
  })
}

module.exports = {emptyPromise, delayedPromise}
