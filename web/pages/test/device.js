import React from 'react';
import {
  deviceType,
  isMobile,
  osName,
  isAndroid,
  isIOS,
  fullBrowserVersion,
  isWearable,
  engineVersion,
  getUA,
  isDesktop,
  isWinPhone,
  deviceDetect
} from 'react-device-detect';
import {is_application, is_mobile} from '../../utils/context';

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
        <p>isDesktop: {isDesktop}</p>
        <p>isMobile: {is_mobile().toString()}</p>
        <p>isWebView: {is_application().toString()}
        </p>
        <p>DeviceDetect: {JSON.stringify(deviceDetect())}</p>
      </>
    )
  }
}
