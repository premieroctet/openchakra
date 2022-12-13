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

const addOrderItem = ({ order, product, quantity }) => {
  return Product.findById(product)
    .then(product => {
      if (!product) {
        throw new NotFoundError(`Produit ${product} introuvable`);
      }
      return OrderItem.create({
        product: product,
        price: product.price,
        vat_rate: product.vat_rate,
        quantity
      });
    })
    .then(orderItem =>
      Order.findByIdAndUpdate(
        order,
        { $push: { items: orderItem } },
        { new: true }
      )
    )
    .then(res => {
      console.log(res);
      return res;
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

module.exports = { inviteGuest, addOrderItem, removeOrderItem };
