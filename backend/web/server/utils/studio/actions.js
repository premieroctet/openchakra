const {
  inviteGuest,
  registerToEvent,
  removeOrderItem,
  setOrderItem
} = require("./fumoir/functions")
const url = require("url")
const UserSessionData = require("../../models/UserSessionData")
const { NotFoundError } = require("../errors")
const Program = require("../../models/Program")
const {
  addChild,
  moveChildInParent,
  removeChildFromParent,
  getNext,
  getPrevious,
  getSession,
  login,
  putAttribute,
  sendMessage
} = require("./aftral_studio/functions")

const ACTIONS = {
  login: ({ email, password }) => {
    return login(email, password);
  },

  put: ({ parent, attribute, value }, user) => {
    return putAttribute({ parent, attribute, value, user });
  },

  publish: ({ id }) => {
    return Program.findOneAndUpdate(
      { _id: id },
      { published: true },
      { new: true, runValidators: true }
    ).then(result => {
      console.log(`result publish ${JSON.stringify(result)}`);
      if (!result) {
        throw new NotFoundError(`Program ${id} not found`);
      }
      return result;
    });
  },

  levelUp: ({ parent, child }) => {
    return moveChildInParent(parent, child, true);
  },

  levelDown: ({ parent, child }) => {
    return moveChildInParent(parent, child, false);
  },

  addSpentTime: ({ id, duration }, user, referrer) => {
    const params = url.parse(referrer, true).query;
    return UserSessionData.findOneAndUpdate(
      { user: user._id },
      { user: user._id },
      { upsert: true, runValidators: true }
    ).then(data => {
      const spentData = data?.spent_times.find(d => d?.resource == id);
      if (spentData) {
        spentData.spent_time += duration;
      } else {
        data.spent_times.push({ resource: id, spent_time: duration });
      }
      return data.save();
    });
  },

  delete: ({ parent, child }) => {
    return removeChildFromParent(parent, child);
  },

  addChild: ({ parent, child }) => {
    return addChild(parent, child);
  },

  next: ({ id }, user, referrer) => {
    return getNext(id, user, referrer);
  },

  previous: ({ id }) => {
    return getPrevious(id);
  },

  session: ({ id }) => {
    return getSession(id);
  },

  sendMessage: ({ destinee, contents }, sender) => {
    console.log(`Destinee:${destinee},contents:${contents},sender:${sender}`);
    return sendMessage(sender, destinee, contents);
  },

  inviteGuest: ({ parent, email, phone }) => {
    return inviteGuest({ eventOrBooking: parent, email, phone });
  },

  addOrderItem: ({ context, parent, quantity }) => {
    return addOrderItem({ order: context, product: parent, quantity });
  },

  setOrderItem: ({ context, parent, quantity }) => {
    return setOrderItem({ order: context, product: parent, quantity });
  },

  removeOrderItem: ({ context, parent }) => {
    return removeOrderItem({ order: context, item: parent });
  },

  registerToEvent: ({ context }, user) => {
    return registerToEvent({ event: context, user });
  }
};

module.exports = { ACTIONS };
