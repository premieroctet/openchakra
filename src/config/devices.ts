type Devices = {
  [id: string]: Device
}

type Device = {
  width: string
  height: string
}

const devices: Devices = {
  iphone12: {
    width: '390px',
    height: '844px',
  },
  ipad: {
    width: '810px',
    height: '1080px',
  },
  desktop: {
    width: '100%',
    height: '100%',
  },
}

export default devices
