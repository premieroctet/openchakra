import React from 'react';
import {
  deviceType,
  osName,
  isAndroid,
  isIOS,
  fullBrowserVersion,
  isWearable,
  engineVersion,
  getUA,
  isWinPhone,
  deviceDetect,
} from 'react-device-detect';
import {isApplication, isMobile} from '../../utils/context';

export default class device extends React.Component {

  render() {
    return (
      <>
        <p>deviceType : {deviceType}</p>
        <p>isMobile: {isMobile.toString()}</p>
        <p>osName: {osName}</p>
        <p>isAndroid: {isAndroid.toString()}</p>
        <p>isIOS: {isIOS.toString()}</p>
        <p>isWinPhone: {isWinPhone.toString()}</p>
        <p>fullBrowserVersion: {fullBrowserVersion}</p>
        <p>isWearable: {isWearable.toString()}</p>
        <p>engineVersion: {engineVersion}</p>
        <p>getUA: {getUA}</p>
        <p>isMobile: {isMobile().toString()}</p>
        <p>isWebView: {isApplication().toString()}</p>
        <p>DeviceDetect: {JSON.stringify(deviceDetect())}</p>
      </>
    )
  }
}
