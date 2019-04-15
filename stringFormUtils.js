var _FULL_WIDTH_DIFF_CODE = 65248;
var _FULL_WIDTH_SPACE_CODE = 12288;
var _HALF_WIDTH_SPACE_CODE = 32;
var _RANGE_CODES = {
  MIN: 33,
  MAX: 126,
};

/**
 * @private
 * @param {String} strs
 * @type function
 */
var _forEachByString = function(strs, func) {
  var len = strs.length,
    result = [];

  for (var i = 0; i < len; i++) {
    result.push(func(strs[i], strs[i].charCodeAt(0)));
  }
  return result.join("");
};

/**
 * @namespace
 */
var stringFormUtils = {
  /**
   * @param {String} val
   * @type String
   */
  transformToFullwidth: function(val) {
    return _forEachByString(val, function(str, code) {
      var result = str;

      if (_HALF_WIDTH_SPACE_CODE == code)
        result = String.fromCharCode(_FULL_WIDTH_SPACE_CODE);
      else if (_RANGE_CODES.MIN <= code && code <= _RANGE_CODES.MAX)
        result = String.fromCharCode(code + _FULL_WIDTH_DIFF_CODE);

      return result;
    });
  },

  /**
   * @param {String} val
   * @type String
   */
  transformToHalfwidth: function(val) {
    return _forEachByString(val, function(str, code) {
      var result = str;

      if (_FULL_WIDTH_SPACE_CODE == code)
        result = String.fromCharCode(_HALF_WIDTH_SPACE_CODE);
      else if (
        _RANGE_CODES.MIN + _FULL_WIDTH_DIFF_CODE <= code &&
        code <= _RANGE_CODES.MAX + _FULL_WIDTH_DIFF_CODE
      )
        result = String.fromCharCode(code - _FULL_WIDTH_DIFF_CODE);

      return result;
    });
  },
};

module.exports = stringFormUtils;
