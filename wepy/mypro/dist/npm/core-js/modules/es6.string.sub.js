'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html.js')('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});