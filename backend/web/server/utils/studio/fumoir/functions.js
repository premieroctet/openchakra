const { BadRequestError, NotFoundError } = require('../../errors');
const mongoose = require('mongoose');
const { getModel } = require('../../database');
const OrderItem = require("../../../models/OrderItem");
const Product = require("../../../models/Product");
const Order = require("../../../models/Order");
const Event = require("../../../models/Event");

const inviteGuest = ({ eventOrBooking, email, phone }) => {
  return getModel(eventOrBooking)
    .then(modelName => {
      if (!['booking', 'event'].includes(modelName)) {
        throw new BadRequestError(`Found model ${modelName} for ${eventOrBooking}, should be event or booking`)
      }
      mongooseModel = mongoose.connection.models[modelName];
      return mongooseModel.findByIdAndUpdate(eventOrBooking, {
        $push: { guests: { email, phone } }
      });
    })
};

const setOrderItem = ({ order, product, quantity }) => {
  return Order.findById(order)
    .populate("items")
    .then(order => {
      if (!order) {
        throw new NotFoundError(`Commande ${order} introuvable`);
      }
      const item = order.items.find(i => i.product.toString() == product);
      if (item) {
        item.quantity = parseInt(quantity);
        return item.save();
      }
      return Product.findById(product)
        .then(product =>
          OrderItem.create({
            product: product,
            price: product.price,
            vat_rate: product.vat_rate,
            quantity
          })
        )
        .then(item =>
          Order.findByIdAndUpdate(
            order,
            { $push: { items: item } },
            { new: true }
          )
        );
    });
};

const removeOrderItem = ({ order, item }) => {
  return Order.findByIdAndUpdate(order, { $pull: { items: item } })
    .then(() => {
      return OrderItem.findByIdAndRemove(item);
    })
    .then(res => {
      console.log(res);
      return res;
    });
};

const registerToEvent = ({ event, user }) => {
  console.log(`Adding ${user} to event ${event}`);
  return Event.findByIdAndUpdate(event, { $addToSet: { members: user } });
};

module.exports = {
  inviteGuest,
  setOrderItem,
  removeOrderItem,
  registerToEvent
};
