type Devices = {
  [id: string]: Device
}

type Device = {
  width: string
  height: string
  p?: string
  border?: string
  borderRadius?: string
  img?: string
  category: string
}

const devices: Devices = {
  iphone12: {
    width: '390px',
    height: '844px',
    p: '6',
    border: '1px solid',
    borderRadius: '3xl',
    img: 'icons/mobile.svg',
    category: 'mobile',
  },
  ipad: {
    width: '810px',
    height: '1080px',
    overflowY: 'scroll',
    border: '1px solid',
    img: 'icons/tablet.svg',
    category: 'tablet',
  },
  desktop: {
    width: '100%',
    height: '100%',
    img: 'icons/desktop.svg',
    category: 'desktop',
  },
}

export default devices
