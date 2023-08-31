import axios from 'axios'
import lodash from 'lodash'
import html2canvas from 'html2canvas'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

import {
  clearComponentValue,
  getComponent,
  getComponentDataValue
} from './values';
import { clearToken } from './token';

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
    const attachment = getComponentValue(props.attachment, level)
    let url = `${API_ROOT}/action`
    return axios
      .post(url, {
        action: 'sendMessage',
        destinee,
        contents,
        attachment,
      })
      .then(res => {
        clearComponentValue(props.destinee, level)
        clearComponentValue(props.contents, level)
        clearComponentValue(props.attachment, level)
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
  openPage: ({ value, level, model, props, getComponentValue }) => {
    const queryParams = new URLSearchParams()
    let url = `/${props.page}`
    if ('sourceId' in props) {
      const compValue=getComponentValue(props.sourceId, level)
      if (compValue?._id || compValue) {
        queryParams.set('id', compValue?._id || compValue)
      }
    }
    else if (value && value._id) {
      queryParams.set('id', value._id)
    }
    url = `${url}?${queryParams.toString()}`
    // new page
    if (props.open && !(props.open === 'false')) {
      window.open(url, 'blank')
    } else {
      window.location = url
    }
    return Promise.resolve()
  },

  create: ({ value, context, props, level, getComponentValue }) => {
    const components=lodash(props).pickBy((v, k) => /^component_/.test(k) && !!v).values()
    const body = Object.fromEntries(components.map(c =>
      [getComponent(c, level)?.getAttribute('attribute') || getComponent(c, level)?.getAttribute('data-attribute'),
        getComponentValue(c, level)||null]
    ))
    'job,mission,quotation,group,parent,content,recipe,menu,pip,collectiveChallenge,quizzQuestion,userQuizzQuestion'.split(',').forEach(property => {
      if (props[property]) {
        //const dataId=document.getElementById(`${props[property]}${level}`)?.getAttribute('_id')
        const dataId=getComponent(props[property], level)?.getAttribute('_id')||null
        body[property]=dataId
      }
    })
    const bodyJson=lodash.mapValues(body, v => JSON.stringify(v))
    let url = `${API_ROOT}/${props.model}?context=${context}`
    return axios.post(url, bodyJson)
      .then(res => ({
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
    const bodyJson=lodash.mapValues(body, v => JSON.stringify(v))
    const httpAction=dataSource?._id ? axios.put : axios.post
    return httpAction(url, bodyJson)
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
          return window.location=redirect
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
          return window.location=url
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
    //return window.print()

const images = document.getElementsByTagName('img');
const imagePromises = [];

for (let i = 0; i < images.length; i++) {
  const image = images[i];
  const imagePromise = new Promise((resolve, reject) => {
       if (image.complete) {
          resolve();
        } else {
          image.onload = resolve;
          image.onerror = reject;
        }

  });
  imagePromises.push(imagePromise);
}

return Promise.allSettled(imagePromises)
  .then(res => {
    return PDFDocument.create().then(pdfDoc => {

    const page = pdfDoc.addPage();
    const element = document.getElementById('root');
    html2canvas(element, {ignoreElements: element => element.tagName.toLowerCase()=='button'}).then(canvas => {

    const imgData = canvas.toDataURL('image/jpeg');
    pdfDoc.embedJpg(imgData).then(jpgImage => {

    const x_ratio=page.getWidth()/jpgImage.width
    const { width, height } = jpgImage.scale(x_ratio);
    page.drawImage(jpgImage, {
      x: (page.getWidth() - width)/2,
      y: page.getHeight() - height,
      width,
      height,
    });

    pdfDoc.save().then(pdfBytes => {
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'document2.pdf';
      link.click();
      return null
    })
  })
  })
  })
  })

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

  createRecommandation: ({ value, props, level, getComponentValue }) => {
    const components=lodash(props).pickBy((v, k) => /^component_/.test(k) && !!v).values()
    const body = Object.fromEntries(components.map(c =>
      [getComponent(c, level)?.getAttribute('attribute') || getComponent(c, level)?.getAttribute('data-attribute'),
        getComponentValue(c, level)||null]
    ))
    body.job=value._id

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

  alle_accept_quotation: ({value, props}) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_accept_quotation',
      paymentSuccess: props.paymentSuccess,
      paymentFailure: props.paymentFailure,
      value: value._id,
    }
    return axios.post(url, body)
      .then(res => {
        if (res.data.redirect) {
          let redirect=res.data.redirect
          redirect = /^http/.test(redirect) ? redirect : `/${redirect}`
          return window.location=redirect
        }
      })
  },

  alle_can_accept_quotation: ({value, props}) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'alle_can_accept_quotation',
      value: value._id,
    }
    return axios.post(url, body)
      .then(() => value)
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
      .then(res => ({
        model: props.model,
        value: res.data,
      }))
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

  smartdiet_join_group: ({ value }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_join_group',
      value: value._id,
      join: true,
    }
    return axios.post(url, body)
      .then(res => {
        return {_id: res.data}
      })
  },

  smartdiet_leave_group: ({ value }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_join_group',
      value: value._id,
      join: false,
    }
    return axios.post(url, body)
      .then(res => {
        return {_id: res.data}
      })
  },

  smartdiet_skip_event: ({ value }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_skip_event',
      value: value._id,
    }
    return axios.post(url, body)
      .then(res => {
        return {_id: res.data?._id}
      })
  },

  smartdiet_join_event: ({ value }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_join_event',
      value: value._id,
    }
    return axios.post(url, body)
      .then(res => {
        return {_id: res.data?._id}
      })
  },

  smartdiet_pass_event: ({ value }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_pass_event',
      value: value._id,
    }
    return axios.post(url, body)
      .then(res => res.data)
  },

  smartdiet_fail_event: ({ value }) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_fail_event',
      value: value._id,
    }
    return axios.post(url, body)
      .then(res => {
        return {_id: res.data?._id}
      })
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

  smartdiet_set_company_code: ({value, props, level, getComponentValue}) => {
    const code = getComponentValue(props.code, level)
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_set_company_code',
      code,
    }
    return axios.post(url, body)
  },

  openUrl: ({value, props}) => {
    try { props=JSON.parse(props) } catch(e) {}
    const {url, open}=props
    const urlValue=lodash.get(value, url)
    // new page
    if (open && !(props.open === 'false')) {
      return Promise.resolve(window.open(urlValue, 'blank'))
    } else {
      return Promise.resolve((window.location = urlValue))
    }
  },

  payMission: ({ context, props }) => {
    let url = `${API_ROOT}/action`
    const body = {action: 'payMission', context,...props}
    return axios.post(url, body)
      .then(res => {
        if (res.data.redirect) {
          let url=res.data.redirect
          url=/^http/.test(url) ? url : `/${url}`
          return window.location=url
        }
      })
  },

  hasChildren: ({ value, actionProps}) => {
    const body={
      action: 'hasChildren',
      value: value._id,
      actionProps,
    }
    let url = `${API_ROOT}/action`
    return axios.post(url, body)
  },

  askRecommandation: ({ value, context, props, level, getComponentValue }) => {
    const body={
      action: 'askRecommandation',
      value: value._id,
      email: getComponentValue(props.email, level)||null,
      message: getComponentValue(props.message, level)||null,
      page: props.page,
    }
    let url = `${API_ROOT}/action`
    return axios.post(url, body)
  },

  smartdiet_start_survey: () => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_start_survey',
    }
    return axios.post(url, body).then(res => ({
      model: 'userQuestion',
      value: res.data,
    }))
  },

  smartdiet_next_question: ({value}) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_next_question',
      value: value._id,
    }
    return axios.post(url, body)
      .then(res => {
        var searchParams = new URLSearchParams(window.location.search);
        searchParams.set('id', res.data._id)
        window.location.search=searchParams.toString()
      })
  },

  smartdiet_finish_survey: ({value}) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_finish_survey',
      value: value._id,
    }
    return axios.post(url, body)
      .then(res => res.data)
  },

  smartdiet_join_team: ({value}) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_join_team',
      value: value._id,
    }
    return axios.post(url, body)
  },

  smartdiet_leave_team: ({value}) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_leave_team',
      value: value._id,
    }
    return axios.post(url, body)
  },

  smartdiet_find_team_member: ({value}) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_find_team_member',
      value: value._id,
    }
    return axios.post(url, body).then(res => ({
      model: 'teamMember',
      value: res.data,
    }))
  },

  smartdiet_open_team_page: ({value, props}) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_open_team_page',
      value: value._id,
      page: props.page,
    }

    return axios.post(url, body)
    .then(res => {
      if (res.data.redirect) {
        let redirect=res.data.redirect
        redirect = /^http/.test(redirect) ? redirect : `/${redirect}`
        return window.location=redirect
      }
      return {
        model: 'teamMember',
        value: res.data,
      }
    })
  },

  smartdiet_routine_challenge: ({value}) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_routine_challenge',
      value: value._id,
    }
    return axios.post(url, body)
  },

  smartdiet_shift_challenge: ({value}) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_shift_challenge',
      value: value._id,
    }
    return axios.post(url, body)
  },

  smartdiet_read_content: ({value}) => {
    let url = `${API_ROOT}/action`
    const body = {
      action: 'smartdiet_read_content',
      value: value._id,
    }
    return axios.post(url, body)
      .then(res => ({model: 'content',value: res.data}))
  },

  smartdiet_compute_shopping_list: ({props, level, getComponentValue}) => {
    const people_count = getComponentValue(props.people, level)
    const thisUrl=new URL(window.location)
    if (people_count) {
      thisUrl.searchParams.set('people_count', people_count)
    } else {
      thisUrl.searchParams.delete('people_count', null)
    }
    window.location=thisUrl.toString()
  },

  import_model_data: props => {
    const prevResults=document.getElementById('import_results')
    if (prevResults) {
      prevResults.parentNode.removeChild(prevResults)
    }
    const prevInput=document.getElementById('import_data')
    if (prevInput) {
      prevInput.parentNode.removeChild(prevInput)
    }

    const container=document.getElementById(props.id).parentNode

    const form=document.createElement('form');
    container.appendChild(form)

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.name = 'file';
    fileInput.style='display:none'
    fileInput.id='import_data'
    form.appendChild(fileInput)

    fileInput.addEventListener('change', event => {
      const formData = new FormData(form);
      axios.post(`${API_ROOT}/import-data/${props.props.model}`, formData)
         .then(response => {
           alert(response.data.join('\n'))
         })
         .catch(error => alert('Error:', error))

    })
    fileInput.click()
    return Promise.resolve(true)
  }

}
