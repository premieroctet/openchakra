const OrderItem = require("../../../models/OrderItem");
const Product = require("../../../models/Product");
const Order = require("../../../models/Order");
const Event = require("../../../models/Event");
const { NotFoundError } = require("../../errors");

const inviteGuest = ({ event, email, phone }) => {
  return Event.findByIdAndUpdate(event, {
    $push: { guests: { email, phone } }
  });
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
