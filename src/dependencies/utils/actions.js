import axios from 'axios';

const BACKEND_SERVER='my-alfred.io:4002'

export const ACTIONS={
  openPage: ({value, props}) => {
    let url=`/${props.page}`
    if (value && value._id) {
      url=`${url}?id=${value._id}`
    }
    return Promise.resolve(window.open(url))
  },
  create: ({value, props}) => {
    let url=`${props.domain}/${props.model}`
    return axios.post(url)
  },
  levelUp: ({value, props}) => {
    let url=`${props.domain}/action`
      return axios.post(url, {action: 'levelUp', id: value._id})
  },
  levelDown: ({value, props}) => {
    let url=`${props.domain}/action`
    return axios.post(url, {action: 'levelDown', id: value._id})
  },
  next: ({value, props}) => {
    let url=`${props.domain}/action`
    return axios.post(url, {action: 'next', id: value._id})
  },
  previous: ({value, props}) => {
    let url=`${props.domain}/action`
    return axios.post(url, {action: 'previous', id: value._id})
  },
  publish: ({value, props}) => {
    let url=`${props.domain}/action`
    return axios.post(url, {action: 'publish', id: value._id})
  },
  delete: ({value, props}) => {
    let url=`${props.domain}/action`
    return axios.post(url, {action: 'delete', id: value._id})
  },
  backToSession: ({value, props}) => {
    let url=`${props.domain}/action`
    return axios.post(url, {action: 'session', id: value._id})
  }
}

