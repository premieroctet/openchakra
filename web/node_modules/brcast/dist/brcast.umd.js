(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.brcast = factory());
}(this, (function () {

function createBroadcast (initialState) {
  var listeners = {};
  var id = 0;
  var _state = initialState;

  var getState = function () { return _state; };

  var setState = function (state) {
    _state = state;
    var keys = Object.keys(listeners);
    for (var i = 0; i < keys.length; i += 1) {
      // if a listener gets unsubscribed during setState we just skip it
      if (typeof listeners[keys[i]] !== 'undefined') {
        listeners[keys[i]](state);
      }
    }
  };

  var subscribe = function (listener) {
    if (typeof listener !== 'function') { throw new Error('listener must be a function.') }
    var currentId = id;
    var isSubscribed = true;
    listeners[currentId] = listener;
    id += 1;
    return function unsubscribe () {
      // in case unsubscribe gets called multiple times we simply return
      if (!isSubscribed) { return }
      isSubscribed = false;
      delete listeners[currentId];
    }
  };

  return { getState: getState, setState: setState, subscribe: subscribe }
}

return createBroadcast;

})));
