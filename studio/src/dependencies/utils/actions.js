import axios from 'axios'
import { getComponentDataValue, clearComponentValue } from './values'

const API_ROOT = '/myAlfred/api/studio'
export const ACTIONS = {
  login: ({ props, index }) => {
    const email = getComponentDataValue(props.email, index)
    const password = getComponentDataValue(props.password, index)
    let url = `${API_ROOT}/login`
    return axios.post(url, { email, password }).catch(err => {
      throw new Error(err.response?.data || err)
    })
  },
  sendMessage: ({ props, index }) => {
    const destinee = getComponentDataValue(props.destinee, index)
    const contents = getComponentDataValue(props.contents, index)
    let url = `${API_ROOT}/action`
    return axios
      .post(url, {
        action: 'sendMessage',
        destinee: destinee,
        contents: contents,
      })
      .then(res => {
        clearComponentValue(props.destinee, index)
        clearComponentValue(props.contents, index)
        return res
      })
  },
  openPage: ({ value, model, query, props }) => {
    const queryParams = query
    let url = `/${props.page}`
    if (value && value._id) {
      queryParams.set(model, value._id)
    }
    url = `${url}?${queryParams.toString()}`
    // new page
    if (props.open && !(props.open === 'false')) {
      return Promise.resolve(window.open(url, 'blank'))
    } else {
      return Promise.resolve((window.location = url))
    }
  },
  create: ({ value, props }) => {
    let url = `${API_ROOT}/${props.model}`
    return axios.post(url).then(res => ({
      model: props.model,
      value: res.data,
    }))
  },
  levelUp: ({ value, props, context }) => {
    let url = `${API_ROOT}/action`
    return axios.post(url, {
      action: 'levelUp',
      parent: context,
      child: value._id,
    })
  },
  levelDown: ({ value, props, context }) => {
    let url = `${API_ROOT}/action`
    return axios.post(url, {
      action: 'levelDown',
      parent: context,
      child: value._id,
    })
  },
  next: ({ value, props }) => {
    let url = `${API_ROOT}/action`
    return axios
      .post(url, { action: 'next', id: value._id })
      .then(res => res.data)
  },
  previous: ({ value, props }) => {
    let url = `${API_ROOT}/action`
    return axios
      .post(url, { action: 'previous', id: value._id })
      .then(res => res.data)
  },
  delete: ({ value, props, context }) => {
    let url = `${API_ROOT}/action`
    return axios.post(url, {
      action: 'delete',
      parent: context,
      child: value._id,
    })
  },
  gotoSession: ({ value, props }) => {
    let url = `${API_ROOT}/action`
    return axios
      .post(url, { action: 'session', id: value._id })
      .then(res => res.data)
  },
  addChild: ({ value, props, context, index }) => {
    const childId = getComponentDataValue(props.child, index)
    let url = `${API_ROOT}/action`
    const body = { action: 'addChild', parent: context, child: childId }
    return axios.post(url, body)
  },
  putValue: ({ value, props, context }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'put',
      model: props.dataModel,
      parent: context,
      attribute: props.attribute,
      value: value,
    }
    return axios.post(url, body)
  },
  setOrderItem: ({ value, props, context, index }) => {
    const quantity = getComponentDataValue(props.quantity, index)
    let url = `${API_ROOT}/action`
    const body = {
      action: 'setOrderItem',
      parent: value?._id,
      context,
      quantity,
    }
    return axios.post(url, body)
  },
  removeOrderItem: ({ value, context }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'removeOrderItem',
      parent: value?._id,
      context,
    }
    return axios.post(url, body)
  },
  inviteGuest: ({ value, props, context, index }) => {
    const [email, phone] = ['email', 'phone'].map(att =>
      getComponentDataValue(props[att], index),
    )
    let url = `${API_ROOT}/action`
    const body = {
      action: 'inviteGuest',
      parent: context,
      email,
      phone,
    }
    return axios.post(url, body)
  },
}
