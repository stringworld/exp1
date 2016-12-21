'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html.js')('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});