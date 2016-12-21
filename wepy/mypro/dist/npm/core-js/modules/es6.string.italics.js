'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html.js')('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});