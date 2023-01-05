import lodash from 'lodash'
import axios from 'axios'

import { getComponent, getComponentDataValue, clearComponentValue } from './values'

const API_ROOT = '/myAlfred/api/studio'
export const ACTIONS = {
  login: ({ props, level }) => {
    const email = getComponentDataValue(props.email, level)
    const password = getComponentDataValue(props.password, level)
    let url = `${API_ROOT}/login`
    return axios.post(url, { email, password }).catch(err => {
      throw new Error(err.response?.data || err)
    })
  },
  sendMessage: ({ value, props, level }) => {
    const destinee = props.destinee ? getComponentDataValue(props.destinee, level) : value._id
    const contents = getComponentDataValue(props.contents, level)
    let url = `${API_ROOT}/action`
    return axios
      .post(url, {
        action: 'sendMessage',
        destinee,
        contents,
      })
      .then(res => {
        clearComponentValue(props.destinee, level)
        clearComponentValue(props.contents, level)
        return res
      })
  },
  createPost: ({ props, level }) => {
    const contents = getComponentDataValue(props.contents, level)
    const mediaComp = document.getElementById(props.media)
    const value=mediaComp && mediaComp.getAttribute('data-value')
    let url = `${API_ROOT}/action`
    return axios
      .post(url, {
        action: 'createPost',
        contents: contents,
        media: value,
      })
      .then(res => {
        clearComponentValue(props.contents, level)
        return res
      })
  },
  openPage: ({ value, model, query, props }) => {
    const queryParams = query
    let url = `/${props.page}`
    if (value && value._id) {
      queryParams.set(model, value._id)
      queryParams.set('id', value._id)
    }
    url = `${url}?${queryParams.toString()}`
    // new page
    if (props.open && !(props.open === 'false')) {
      return Promise.resolve(window.open(url, 'blank'))
    } else {
      return Promise.resolve((window.location = url))
    }
  },
  create: ({ value, context, props }) => {
    let url = `${API_ROOT}/${props.model}?context=${context}`
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
      //parent: context,
      child: value._id,
    })
  },
  gotoSession: ({ value, props }) => {
    let url = `${API_ROOT}/action`
    return axios
      .post(url, { action: 'session', id: value._id })
      .then(res => res.data)
  },
  addChild: ({ value, props, context, level }) => {
    const childId = getComponentDataValue(props.child, level)
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
      value:JSON.stringify(value),
    }
    return axios.post(url, body)
  },
  setOrderItem: ({ value, props, context, level }) => {
    const quantity = getComponentDataValue(props.quantity, level)
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
  inviteGuest: ({ value, props, context, level }) => {
    const [email, phone] = ['email', 'phone'].map(att =>
      getComponentDataValue(props[att], level),
    )
    let url = `${API_ROOT}/action`
    const body = {
      action: 'inviteGuest',
      parent: context,
      email,
      phone,
    }
    return axios.post(url, body)
    .then(res => {
      ['email', 'phone'].map(att =>
        clearComponentValue(props[att], level))
      return res
    })
  },
  registerToEvent: ({ context }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'registerToEvent',
      context,
    }
    return axios.post(url, body)
  },
  save: ({ value, props, context, dataSource, level }) => {
    let url = `${API_ROOT}/${props.model}${dataSource._id ? `/${dataSource._id}`:''}`
    const components=lodash(props).pickBy((v, k) => /^component_/.test(k) && !!v).values()
    const body = Object.fromEntries(components.map(c =>
      [getComponent(c, level)?.getAttribute('attribute'), getComponentDataValue(c, level)||null]
    ))
    const httpAction=dataSource._id ? axios.put : axios.post
    return httpAction(url, body)
      .then(res => {
        components.forEach(c => clearComponentValue(c, level))
        return res
      })
  },

  pay: ({ context, props }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'pay',
      customer: props.customer,
      amount: props.amount,
      context,
    }
    return axios.post(url, body)
  },
  previous: () => {
    window.history.back()
  }
}
