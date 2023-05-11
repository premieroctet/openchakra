import axios from 'axios'
import lodash from 'lodash'
import {jsPDF} from 'jspdf'
import { clearToken } from './token';
import {getComponent, clearComponentValue} from './values'

const API_ROOT = '/myAlfred/api/studio'
export const ACTIONS = {
  login: ({ props, level, getComponentValue }) => {
    const email = getComponentValue(props.email, level)
    const password = getComponentValue(props.password, level)
    let url = `${API_ROOT}/login`
    return axios.post(url, { email, password })
  },
  sendMessage: ({ value, props, level, getComponentValue }) => {
    const destinee = props.destinee ? getComponentValue(props.destinee, level) : value._id
    const contents = getComponentValue(props.contents, level)
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
  createPost: ({ props, level, getComponentValue }) => {
    const contents = getComponentValue(props.contents, level)
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
  openPage: ({ value, model, query, props, getComponentValue }) => {
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
  create: ({ value, context, props, level, getComponentValue }) => {
    const components=lodash(props).pickBy((v, k) => /^component_/.test(k) && !!v).values()
    const body = Object.fromEntries(components.map(c =>
      [getComponent(c, level)?.getAttribute('attribute') || getComponent(c, level)?.getAttribute('data-attribute'),
        getComponentValue(c, level)||null]
    ))
    'job,mission,quotation'.split(',').forEach(property => {
      if (props[property]) {
        const dataId=document.getElementById(`${props[property]}${level}`)?.getAttribute('_id')
        body[property]=dataId
      }
    })
    let url = `${API_ROOT}/${props.model}?context=${context}`
    return axios.post(url, body).then(res => ({
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
  delete: ({ value}) => {
    let url = `${API_ROOT}/action`
    return axios.post(url, {
      action: 'delete',
      //parent: context,
      id: value._id,
    })
  },
  gotoSession: ({ value, props }) => {
    let url = `${API_ROOT}/action`
    return axios
      .post(url, { action: 'session', id: value._id })
      .then(res => res.data)
  },
  addChild: ({ value, props, context, level, getComponentValue }) => {
    const childId = getComponentValue(props.child, level)
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
  setOrderItem: ({ value, props, context, level, getComponentValue }) => {
    const quantity = getComponentValue(props.quantity, level)
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
  inviteGuest: ({ value, props, context, level, getComponentValue }) => {
    const [email, phone] = ['email', 'phone'].map(att =>
      getComponentValue(props[att], level),
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
  registerToEvent: ({ value }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'registerToEvent',
      value: value._id,
    }
    return axios.post(url, body)
      .then(res => {
        return {_id: res.data}
      })
  },
  unregisterFromEvent: ({ value }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'unregisterFromEvent',
      value: value._id,
    }
    return axios.post(url, body)
      .then(res => {
        return {_id: res.data}
      })
  },
  save: ({ value, props, context, dataSource, level, getComponentValue }) => {
    let url = `${API_ROOT}/${props.model}${dataSource?._id ? `/${dataSource._id}`:''}`
    const components=lodash(props).pickBy((v, k) => /^component_/.test(k) && !!v).values()
    const body = Object.fromEntries(components.map(c =>
      [getComponent(c, level)?.getAttribute('attribute') || getComponent(c, level)?.getAttribute('data-attribute'), getComponentValue(c, level)||null]
    ))
    const httpAction=dataSource?._id ? axios.put : axios.post
    return httpAction(url, body)
    .then(res => {
      components.forEach(c => clearComponentValue(c, level))
      return ({
        model: props.model,
        value: res.data,
      })
    })
  },

  payEvent: ({ context, props }) => {
    let url = `${API_ROOT}/action`
    const body = {action: 'payEvent', context,...props}
    return axios.post(url, body)
      .then(res => {
        if (res.data.redirect) {
          let redirect=res.data.redirect
          redirect = /^http/.test(redirect) ? redirect : `/${redirect}`
          window.location=redirect
        }
      })
  },

  payOrder: ({ context, props }) => {
    let url = `${API_ROOT}/action`
    const body = {action: 'payOrder', context,...props}
    return axios.post(url, body)
      .then(res => {
        if (res.data.redirect) {
          let url=res.data.redirect
          url=/^http/.test(url) ? url : `/${url}`
          window.location=url
        }
      })
  },

  cashOrder: ({ context, value, level, props, getComponentValue }) => {
    const [guest, amount]=[props.guest, props.amount, props.mode].map(c => getComponentValue(c, level))
    let url = `${API_ROOT}/action`
    const body = {action: 'cashOrder', context, ...props, guest, amount, mode:props.mode}
    return axios.post(url, body)
  },

  previous: () => {
    window.history.back()
  },

  register: ({ value, props, dataSource, level, getComponentValue }) => {
    let url = `${API_ROOT}/register`
    const components=lodash(props).pickBy((v, k) => /^component_/.test(k) && !!v).values()
    const body = Object.fromEntries(components.map(c =>
      [getComponent(c, level)?.getAttribute('attribute'), getComponentValue(c, level)||null]
    ))
    const bodyJson=lodash.mapValues(body, v => JSON.stringify(v))
    return axios.post(url, bodyJson)
      .then(res => {
        components.forEach(c => clearComponentValue(c, level))
        return ({
          model: 'user',
          value: res.data,
        })
      })
  },

  registerAndLogin: ({ value, props, dataSource, level, getComponentValue }) => {
    let url = `${API_ROOT}/register-and-login`
    const components=lodash(props).pickBy((v, k) => /^component_/.test(k) && !!v).values()
    const body = Object.fromEntries(components.map(c =>
      [getComponent(c, level)?.getAttribute('attribute'), getComponentValue(c, level)||null]
    ))
    const bodyJson=lodash.mapValues(body, v => JSON.stringify(v))
    return axios.post(url, bodyJson)
      .then(res => {
        components.forEach(c => clearComponentValue(c, level))
        return ({
          model: 'user',
          value: res.data,
        })
      })
  },

  logout: () => {
    clearToken()
    window.location='/'
    return Promise.resolve()
  },

  // From https://developer.withings.com/sdk/v2/tree/sdk-webviews/device-setup-webview
  openWithingsSetup: params => {
    window.location='https://localhost/myAlfred/api/withings/setup'
  },

  // From https://developer.withings.com/sdk/v2/tree/sdk-webviews/device-settings-webview
  openWithingsSettings: params => {
    window.location='https://localhost/myAlfred/api/withings/settings'
  },

  forgotPassword: ({ value, props, level, getComponentValue }) => {
    const email=getComponentValue(props.email, level)
    let url = `${API_ROOT}/anonymous-action`
    const body = {
      action: 'forgotPassword',
      email,
    }
    return axios.post(url, body)
    .then(res => {
      ['email', 'phone'].map(att =>
        clearComponentValue(props[att], level))
      return res
    })
  },

  getCigarReview: ({ value}) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'getCigarReview',
      value: value._id,
    }
    return axios.post(url, body)
    .then(res => {
      return ({
        model: 'review',
        value: res.data,
      })
    })
  },

  changePassword: ({ value, props, context, level, getComponentValue }) => {
    const [password, password2] = ['password', 'password2'].map(att =>
      getComponentValue(props[att], level),
    )
    let url = `${API_ROOT}/action`
    const body = {
      action: 'changePassword',
      password,
      password2,
    }
    return axios.post(url, body)
  },

  savePagePDF: () => {
    /** TODO Prints white pages
    var doc = new jsPDF('p', 'pt','a4',true)
    var elementHTML = document.querySelector("#root")
    doc.html(document.body, {
        callback: function(doc) {
            // Save the PDF
            doc.save('facture.pdf');
        },
    });
    */
    return window.print()
  },

  deactivateAccount: ({value, props, level, getComponentValue}) => {
    const reason = getComponentValue(props.reason, level)
    let url = `${API_ROOT}/action`
    const body = {
      action: 'deactivateAccount',
      value,
      reason: reason,
    }
    return axios.post(url, body)
  },

  addToContext: ({ value, context, contextAttribute, append }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'addToContext',
      value,
      context,
      contextAttribute,
      append,
    }
    return axios.post(url, body)
  },

  createRecommandation: ({ value, context, props, level, getComponentValue }) => {
    const components=lodash(props).pickBy((v, k) => /^component_/.test(k) && !!v).values()
    const body = Object.fromEntries(components.map(c =>
      [getComponent(c, level)?.getAttribute('attribute') || getComponent(c, level)?.getAttribute('data-attribute'),
        getComponentValue(c, level)||null]
    ))

    const jobId=document.getElementById(`${props.job}${level}`)?.getAttribute('_id')
    body.job=require('url').parse(window.location.href, true).query?.jobUser

    let url = `${API_ROOT}/recommandation`
    return axios.post(url, body).then(res => ({
      model: props.model,
      value: res.data,
    }))
  },

  alle_create_quotation: ({ value, context, props, level, getComponentValue }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_create_quotation',
      value,
      context,
    }
    return axios.post(url, body)
  },

  alle_refuse_mission: ({ value, context, props, level, getComponentValue }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_refuse_mission',
      value,
      context,
    }
    return axios.post(url, body)
  },

  alle_cancel_mission: ({ value, context, props, level, getComponentValue }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_cancel_mission',
      value,
      context,
    }
    return axios.post(url, body)
  },

  alle_send_quotation: ({value}) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_send_quotation',
      value,
    }
    return axios.post(url, body)
  },

  alle_accept_quotation: ({value}) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_accept_quotation',
      value,
    }
    return axios.post(url, body)
  },

  alle_refuse_quotation: ({value}) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_refuse_quotation',
      value,
    }
    return axios.post(url, body)
  },

  alle_show_quotation: ({ value, context, props, level, getComponentValue }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_show_quotation',
      value,
      context,
    }
    return axios.post(url, body)
  },

  alle_edit_quotation: ({ value, context, props, level, getComponentValue }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_edit_quotation',
      value,
      context,
    }
    return axios.post(url, body)
  },

  alle_finish_mission: ({ value, context, props, level, getComponentValue }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_finish_mission',
      value,
      context,
    }
    return axios.post(url, body)
  },

  alle_store_bill: ({ value, context, props, level, getComponentValue }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_store_bill',
      value,
      context,
    }
    return axios.post(url, body)
  },

  alle_show_bill: ({ value, context, props, level, getComponentValue }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_show_bill',
      value,
      context,
    }
    return axios.post(url, body)
  },

  alle_accept_bill: ({ value, context, props, level, getComponentValue }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_accept_bill',
      value,
      context,
    }
    return axios.post(url, body)
  },

  alle_refuse_bill: ({ value, context, props, level, getComponentValue }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_refuse_bill',
      value,
      context,
    }
    return axios.post(url, body)
  },

  alle_leave_comment: ({ value, context, props, level, getComponentValue }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_leave_comment',
      value,
      context,
    }
    return axios.post(url, body)
  },

  alle_send_bill: ({value}) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_send_bill',
      value,
    }
    return axios.post(url, body)
  },

  alle_ask_contact: ({ value, context, props, level, getComponentValue }) => {
    const components=lodash(props).pickBy((v, k) => /^component_/.test(k) && !!v).values()
    const body = Object.fromEntries(components.map(c =>
      [getComponent(c, level)?.getAttribute('attribute') || getComponent(c, level)?.getAttribute('data-attribute'),
        getComponentValue(c, level)||null]
    ))

    body.action='alle_ask_contact'
    let url = `${API_ROOT}/anonymous-action`
    return axios.post(url, body)
  },

}
