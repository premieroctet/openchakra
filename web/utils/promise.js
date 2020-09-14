function emptyPromise(val = null) {
  return new Promise((resolve) => {
    resolve(val);
  });
}

module.exports = emptyPromise;
