'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim.js')('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');