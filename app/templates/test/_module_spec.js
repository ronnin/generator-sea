/*global define, describe, beforeEach, it, seajs*/
describe('this module should', function() {
  it('provide a method "hello" for jquery selected elements ', function(){
    seajs.use(['../src/<%= name %>', '$', 'expect'], function(m, $, expect){
      expect($).to.be.an('function');
      expect($.fn).to.be.an('object');
      expect($.fn.hello).to.be.an('function');
    });
  });

  it('exports an object', function() {
    seajs.use(['../src/<%= name %>', 'expect'], function(m, expect){
      expect(m).to.be.an('object');
    });
  });
});