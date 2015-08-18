'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;

function ListModel(items) {
  EventEmitter.call(this);
  this.items = Array.isArray(items) ? items : [];
}

util.inherits(ListModel, EventEmitter);

ListModel.prototype.addItem = function (item) {
  this.items.push(item);
  this.emit('add', this.items, item);
  return this.items;
};

ListModel.prototype.removeItem = function (index) {
  var removed = this.items.splice(index, 1)[0];
  this.emit('remove', this.items, removed);
  return this.items;
};

ListModel.prototype.removeAll = function () {
  var removed = this.items.splice(0, this.items.length);
  this.emit('remove', this.items, removed);
  return this.items;
};

exports.create = function (items) {
  return new ListModel(items);
};