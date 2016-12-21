'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim.js')('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');