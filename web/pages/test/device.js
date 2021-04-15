import React from 'react';
import {deviceType, isMobile, osName, isAndroid, isIOS, fullBrowserVersion, deviceDetect} from 'react-device-detect';


export default class device extends React.Component{

  render() {
    return(
      <>
        <p>deviceType : {deviceType}</p>
        <p>isMobile: {isMobile.toString()}</p>
        <p>osName: {osName}</p>
        <p>isAndroid: {isAndroid.toString()}</p>
        <p>isIOS: {isIOS.toString()}</p>
        <p>fullBrowserVersion: {fullBrowserVersion}</p>
        <p>DeviceDetect: {JSON.stringify(deviceDetect())}</p>
      </>
    )
  }
}
