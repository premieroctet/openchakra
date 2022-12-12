import axios from "axios";
import { getComponentDataValue, clearComponentValue } from "./values";

const API_ROOT = "/myAlfred/api/studio";
export const ACTIONS = {
  login: ({ props }) => {
    const email = getComponentDataValue(props.email);
    const password = getComponentDataValue(props.password);
    let url = `${API_ROOT}/login`;
    return axios.post(url, { email, password }).catch(err => {
      throw new Error(err.response?.data || err);
    });
  },
  sendMessage: ({ props }) => {
    const destinee = getComponentDataValue(props.destinee);
    const contents = getComponentDataValue(props.contents);
    let url = `${API_ROOT}/action`;
    return axios
      .post(url, {
        action: "sendMessage",
        destinee: destinee,
        contents: contents
      })
      .then(res => {
        clearComponentValue(props.destinee);
        clearComponentValue(props.contents);
        return res;
      });
  },
  openPage: ({ value, model, query, props }) => {
    const queryParams = query;
    let url = `/${props.page}`;
    if (value && value._id) {
      queryParams.set(model, value._id);
    }
    url = `${url}?${queryParams.toString()}`;
    // new page
    if (props.open && !(props.open === "false")) {
      return Promise.resolve(window.open(url, "blank"));
    } else {
      return Promise.resolve((window.location = url));
    }
  },
  create: ({ value, props }) => {
    let url = `${API_ROOT}/${props.model}`;
    return axios.post(url).then(res => ({
      model: props.model,
      value: res.data
    }));
  },
  levelUp: ({ value, props, context }) => {
    let url = `${API_ROOT}/action`;
    return axios.post(url, {
      action: "levelUp",
      parent: context,
      child: value._id
    });
  },
  levelDown: ({ value, props, context }) => {
    let url = `${API_ROOT}/action`;
    return axios.post(url, {
      action: "levelDown",
      parent: context,
      child: value._id
    });
  },
  next: ({ value, props }) => {
    let url = `${API_ROOT}/action`;
    return axios
      .post(url, { action: "next", id: value._id })
      .then(res => res.data);
  },
  previous: ({ value, props }) => {
    let url = `${API_ROOT}/action`;
    return axios
      .post(url, { action: "previous", id: value._id })
      .then(res => res.data);
  },
  publish: ({ value, props }) => {
    let url = `${API_ROOT}/action`;
    return axios.post(url, { action: "publish", id: value._id });
  },
  delete: ({ value, props, context }) => {
    let url = `${API_ROOT}/action`;
    return axios.post(url, {
      action: "delete",
      parent: context,
      child: value._id
    });
  },
  gotoSession: ({ value, props }) => {
    let url = `${API_ROOT}/action`;
    return axios
      .post(url, { action: "session", id: value._id })
      .then(res => res.data);
  },
  addChild: ({ value, props, context }) => {
    const childId = getComponentDataValue(props.child);
    let url = `${API_ROOT}/action`;
    const body = { action: "addChild", parent: context, child: childId };
    return axios.post(url, body);
  },
  putValue: ({ value, props, context }) => {
    let url = `${API_ROOT}/action`;
    const body = {
      action: "put",
      model: props.dataModel,
      parent: context,
      attribute: props.attribute,
      value: value
    };
    return axios.post(url, body);
  }
};
