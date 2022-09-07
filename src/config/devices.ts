type Devices = {
  [id: string]: Device
}

type Device = {
  width: string
  height: string
  p?: string
  border?: string
  borderRadius?: string
}

const devices: Devices = {
  iphone12: {
    width: '390px',
    height: '844px',
    p: '6',
    border: '1px solid',
    borderRadius: '3xl',
  },
  ipad: {
    width: '810px',
    height: '1080px',
    border: '1px solid',
  },
  desktop: {
    width: '100%',
    height: '100%',
  },
}

export default devices
