'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html.js')('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});