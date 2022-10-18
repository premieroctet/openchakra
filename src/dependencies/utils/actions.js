import axios from 'axios';

import { getComponentDataValue } from './values';

const API_ROOT='/myAlfred/api/studio'
export const ACTIONS={
  openPage: ({value, props, backend}) => {
    let url=`/${props.page}`
    if (value && value._id) {
      url=`${url}?id=${value._id}`
    }
    return Promise.resolve(window.open(url))
  },
  create: ({value, props, backend}) => {
    let url=`${backend}${API_ROOT}/${props.model}`
    return axios.post(url)
  },
  levelUp: ({value, props, backend, context}) => {
    let url=`${backend}${API_ROOT}/action`
      return axios.post(url, {action: 'levelUp', parent:context , child:value._id})
  },
  levelDown: ({value, props, backend, context}) => {
    let url=`${backend}${API_ROOT}/action`
    return axios.post(url, {action: 'levelDown', parent:context , child:value._id})
  },
  next: ({value, props, backend}) => {
    let url=`${backend}${API_ROOT}/action`
    return axios.post(url, {action: 'next', id: value._id})
  },
  previous: ({value, props, backend}) => {
    let url=`${backend}${API_ROOT}/action`
    return axios.post(url, {action: 'previous', id: value._id})
  },
  publish: ({value, props, backend}) => {
    let url=`${backend}${API_ROOT}/action`
    return axios.post(url, {action: 'publish', id: value._id})
  },
  delete: ({value, props, backend, context}) => {
    let url=`${backend}${API_ROOT}/action`
    return axios.post(url, {action: 'delete', parent: context, child: value._id})
  },
  backToSession: ({value, props, backend}) => {
    let url=`${backend}${API_ROOT}/action`
    return axios.post(url, {action: 'session', id: value._id})
  },
  addChild: ({value, props, backend, context}) => {
    const childId=getComponentDataValue(props.child)
    let url=`${backend}${API_ROOT}/action`
    const body={action: 'addChild', parent: context, child: childId}
    return axios.post(url, body)
  }
}
