// https://github.com/benjamingr/RexExp.escape
var $export = require('./_export.js')
  , $re     = require('./_replacer.js')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});
