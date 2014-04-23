/*global define*/
define(function(require, exports, module){
  var $ = require('jquery');
  $.fn.hello = function(){
    return this.each(function(){
      $(this).test('hello!');
    });
  };

  var <%= name %> = {
    faith: '道',
    expectancy: 'progress'
  };

  module.exports = <%= name %>;
});
