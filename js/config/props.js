
$.fn.extend({
  getProps: function (key) {
    key += 'Properties';
    return this.data(key) || this.data(key, {}).data(key);
  },
  setProps: function (key, data) {
    key += 'Properties';
    return this.data(key, $.extend({}, this.data(key) || {}, data));
  },
});
