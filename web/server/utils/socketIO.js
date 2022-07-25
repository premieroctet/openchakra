/**
SocketIO is ued for server-side sorcketio notifications
initIO creates IO engine using the http/https server
getIO returns the created io allogin emit messages
*/
const SocketIo = require('socket.io')

let io=null

const initIO = server => {
  io=SocketIo(server)
  return io
}

const getIO = () => {
  return io
}

module.exports={getIO, initIO}
