
export const generateUUID = () => {
  
    let pooruuid = new Uint32Array(1);
    crypto.getRandomValues(pooruuid);
  
    let uuid = `${pooruuid.at(0)}`
  
    if (crypto && crypto.randomUUID) {
      uuid = crypto.randomUUID()
    }
  
    return uuid
}