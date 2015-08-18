'use strict';

var $ = require('jquery');

var MIN_ITEM_LENGTH = 2;

// FixMe: Use a template engine
function itemTemplate(value) {
  return '<li><span class="item-name">' + value
    + '</span><a class="remove">x</a></li>';
}

function itemsTemplate(items) {
  return items.map(function (item) {
    return itemTemplate(item);
  });
}

exports.create = function ($target, ctrl) {

  function renderItems() {
    $('.items-container ul', $target).remove();
    $('.items-container', $target).html('<ul class="items" />');
    $('ul.items', $target).html(itemsTemplate(ctrl.model.items));
  }

  function showClearButton(show) {
    $('button.clear', $target).toggleClass('hidden', show);
  }

  function toggleAddButtonDisabled(disabled) {
    $('button.add-item', $target)[0].disabled = disabled;
  }

  ctrl.model.on('add', function () {
    renderItems();
    $('input', $target).val('').focus();
    showClearButton(!ctrl.model.items.length);
  });

  ctrl.model.on('remove', function () {
    renderItems();
    $('input', $target).focus();
    showClearButton(!ctrl.model.items.length);
  });

  $target.on('click', 'button.add-item', function () {
    ctrl.addItem($('input', $target).val());

  }).on('keyup', 'input', function (event) {
    if (event.keyCode === 13) { ctrl.addItem($('input', $target).val()); }

  }).on('click', 'a.remove', function () {
    ctrl.removeItem($(this).closest('li').index());

  }).on('click', 'button.clear', function () {
    ctrl.removeAll();

  }).on('keyup change', 'input', function () {
    toggleAddButtonDisabled($('input', $target)
      .val().trim().length < MIN_ITEM_LENGTH);

  });

  showClearButton(!ctrl.model.items.length);
  toggleAddButtonDisabled($('input', $target)
    .val().trim().length < MIN_ITEM_LENGTH);
  renderItems();

};
