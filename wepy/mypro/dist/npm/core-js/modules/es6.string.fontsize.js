'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html.js')('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});