'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html.js')('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});