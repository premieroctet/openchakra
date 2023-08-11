const waitLong = (title, timeSeconds) => {
  return new Promise((resolve, reject) => {
    console.log(`${title} : je travaille pendant ${timeSeconds} secondes`)
    setTimeout(() => {reject()}, timeSeconds*1000)
  })
}

const wait= async title => {
  console.log(`Starting ${title}`)
  return waitLong(title, 4)
    .then(() => console.log(`$${title} : terminé`))
}


const main = async() => {
  wait('Première')
  wait('Deuxième')
}

main()
