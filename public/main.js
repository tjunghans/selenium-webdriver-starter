'use strict';

var $ = require('jquery');
var list = require('../');

var shoppingList = list.create();

var $content = $('#content');
$content.html(shoppingList.html);
shoppingList.build($content);