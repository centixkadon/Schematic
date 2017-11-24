
$.fn.extend({
  getProps: function (key) {
    key += 'Properties';
    return this.data(key) || this.data(key, {}).data(key);
  },
});
