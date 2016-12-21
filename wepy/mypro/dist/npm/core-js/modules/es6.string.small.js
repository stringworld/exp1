'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html.js')('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});