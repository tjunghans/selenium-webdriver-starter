'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Controller(model) {
  EventEmitter.call(this);
  this.model = model;
}

util.inherits(Controller, EventEmitter);

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

Controller.prototype.addItem = function (itemName) {
  if (typeof itemName !== 'string') {
    return false;
  }
  itemName = itemName.trim();
  if (itemName.trim().length < 2) {
    return false;
  }
  if (this.model.items.indexOf(itemName) > -1) {
    return false;
  }
  this.model.addItem(escapeHtml(itemName));
};
Controller.prototype.removeItem = function (index) {
  if (index > -1) {
    this.model.removeItem(index);
  }
};
Controller.prototype.removeAll = function () {
  this.model.removeAll();
};

exports.create = function (model) {
  return new Controller(model);
};