'use strict';

var $ = require('jquery');
var listModel = require('./list-model');
var controller = require('./controller');
var view = require('./view');
var template = require('./template.mustache');

var localStorage = window.localStorage;
function storeItems(items) {
  localStorage.setItem('items', JSON.stringify(items));
}

// Component
function createShoppingList() {
  var initialItems = [];
  var storedItems = localStorage.getItem('items');
  if (storedItems) {
    initialItems = JSON.parse(storedItems);
  }
  var model = listModel.create(initialItems);
  var ctrl = controller.create(model);
  var html = template.render();
  return {
    html: html,
    controller: ctrl,
    build: function ($target) {
      view.create($target, ctrl);
      ctrl.model.on('add', storeItems);
      ctrl.model.on('remove', storeItems);
      ctrl.model.on('removeAll', storeItems);
    }
  };
}

exports.create = createShoppingList;

