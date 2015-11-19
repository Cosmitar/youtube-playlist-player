(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

var _srcServicesConfig = require('./../src/services/Config');

var _srcServicesConfig2 = _interopRequireDefault(_srcServicesConfig);

var _srcEntitiesYouTubeVideo = require('./../src/entities/YouTubeVideo');

var _srcEntitiesYouTubeVideo2 = _interopRequireDefault(_srcEntitiesYouTubeVideo);

var _srcEntitiesYouTubePlaylist = require('./../src/entities/YouTubePlaylist');

var _srcEntitiesYouTubePlaylist2 = _interopRequireDefault(_srcEntitiesYouTubePlaylist);

var _srcEntitiesYouTubeChannel = require('./../src/entities/YouTubeChannel');

var _srcEntitiesYouTubeChannel2 = _interopRequireDefault(_srcEntitiesYouTubeChannel);

var _srcEntitiesYouTubeSearch = require('./../src/entities/YouTubeSearch');

var _srcEntitiesYouTubeSearch2 = _interopRequireDefault(_srcEntitiesYouTubeSearch);

var _srcServicesAuth = require('./../src/services/Auth');

var _srcServicesAuth2 = _interopRequireDefault(_srcServicesAuth);

var Demo = {
    index: 0,
    continuous: false,
    all: function all() {
        this.continuous = true;
        this.next();
    },
    next: function next() {
        console.groupEnd();
        console.log('------------------------');
        console.group();
        this.index++;
        if (this['demo' + this.index] && this.continuous) {
            this['demo' + this.index]();
        }
    },
    demo1: function demo1() {
        var _self = this;
        console.log('SEARCH VIDEOS AND GET THE TITLE OF THE FIRST RESULT VIDEO');
        console.log('Search for: Dream On, Aerosmith');
        _srcEntitiesYouTubeVideo2['default'].where('Dream On, Aerosmith').then(function (page) {
            console.log(page.firstElement().title);
            _self.next();
        });
    },
    demo2: function demo2() {
        var _self = this;
        console.log('PAGINATION EXAMPLE');
        var params = {
            maxResults: 2
        };
        console.log('Search for: Aerosmith LIVE');
        _srcEntitiesYouTubeVideo2['default'].where('Aerosmith LIVE', params).then(function (page) {
            console.log('page 1:');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = page.elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var video = _step.value;

                    console.log('---' + video.title);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            page.nextPage().then(function (page) {
                console.log('page 2:');
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = page.elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var video = _step2.value;

                        console.log('---' + video.title);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                            _iterator2['return']();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                _self.next();
            });
        });
    },
    demo3: function demo3() {
        var _self = this;
        console.log('SEARCH MULTIPLE ENTITIES');
        console.log('Search for: adele');
        _srcEntitiesYouTubeSearch2['default'].where('adele').then(function (page) {
            console.log('Search.where');
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = page.elements[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var entity = _step3.value;

                    console.log(entity.constructor.name + ': ' + entity.title + ' ' + entity.id);
                    console.log('' + entity.getThumbnail());
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                        _iterator3['return']();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            _self.next();
        });
    },
    demo4: function demo4() {
        var callback = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

        var _self = this;
        var _callback = callback;
        console.log('AUTHENTICATION');
        _srcServicesAuth2['default'].authorize().then(function (authResult) {
            console.log(authResult);
            loggedInHandler();
        }, function () {
            showLoginBtn();
        });

        var loggedInHandler = function loggedInHandler() {
            hideLoginBtn();
            console.log('MAKE API CALL!');
            _callback();
            _self.next();
        };

        var showLoginBtn = function showLoginBtn() {
            var btn = document.querySelector('#login_button');
            btn.style.visibility = 'visible';
            btn.onclick = function () {
                _srcServicesAuth2['default'].showAuth().then(function (authResult) {
                    console.log(authResult);
                    loggedInHandler();
                }, function (authResult) {
                    console.log('Cant authenticate.');
                    console.log(authResult.error);
                });
            };
        };

        var hideLoginBtn = function hideLoginBtn() {
            var btn = document.querySelector('#login_button');
            btn.style.visibility = 'hidden';
        };
    },
    demo5: function demo5() {
        var _self = this;
        Demo.demo4(function () {
            _srcEntitiesYouTubeVideo2['default'].several(['DfG6VKnjrVw', 'DDWKuo3gXMQ', 'hLQl3WQQoQ0']).then(function (page) {
                page.elementAt(0).rate('like');
                page.elementAt(1).rate('none');
                page.elementAt(2).rate('dislike');
            });
            _self.next();
        });
    },
    demoX: function demoX() {
        var _self = this;
        _self.next();
    }
};

window.OnGoogleAPILoadCallback = function () {
    _srcServicesConfig2['default'].set({
        apiKey: 'AIzaSyB8_0tIV6QuSA5Qb1zx3kXW8UAB-cATQXU',
        clientId: '884796023336-16d8mbf2k8qgpls5nkkupb2kf54sug38.apps.googleusercontent.com',
        scopes: ['https://www.googleapis.com/auth/youtube']
    }).boot().then(function () {
        //Demo.all();
        Demo.demo4();
    });
};

},{"./../src/entities/YouTubeChannel":68,"./../src/entities/YouTubePlaylist":69,"./../src/entities/YouTubeSearch":70,"./../src/entities/YouTubeVideo":71,"./../src/services/Auth":72,"./../src/services/Config":73}],2:[function(require,module,exports){
'use strict';

require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/$.core').Promise;

},{"../modules/$.core":9,"../modules/es6.object.to-string":57,"../modules/es6.promise":58,"../modules/es6.string.iterator":59,"../modules/web.dom.iterable":61}],3:[function(require,module,exports){
'use strict';

require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
module.exports = require('../../modules/$.core').Symbol;

},{"../../modules/$.core":9,"../../modules/es6.object.to-string":57,"../../modules/es6.symbol":60}],4:[function(require,module,exports){
'use strict';

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],5:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
'use strict';

var UNSCOPABLES = require('./$.wks')('unscopables'),
    ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./$.hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./$.hide":21,"./$.wks":54}],6:[function(require,module,exports){
'use strict';

var isObject = require('./$.is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./$.is-object":27}],7:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
'use strict';

var cof = require('./$.cof'),
    TAG = require('./$.wks')('toStringTag'),

// ES3 wrong here
ARG = cof((function () {
  return arguments;
})()) == 'Arguments';

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
  // @@toStringTag case
  : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
  // builtinTag case
  : ARG ? cof(O)
  // ES3 arguments fallback
  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./$.cof":8,"./$.wks":54}],8:[function(require,module,exports){
"use strict";

var toString = ({}).toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],9:[function(require,module,exports){
'use strict';

var core = module.exports = { version: '1.2.6' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],10:[function(require,module,exports){
// optional / simple context binding
'use strict';

var aFunction = require('./$.a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

},{"./$.a-function":4}],11:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
"use strict";

module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],12:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
'use strict';

module.exports = !require('./$.fails')(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

},{"./$.fails":16}],13:[function(require,module,exports){
'use strict';

var isObject = require('./$.is-object'),
    document = require('./$.global').document,

// in old IE typeof document.createElement is 'object'
is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./$.global":19,"./$.is-object":27}],14:[function(require,module,exports){
// all enumerable object keys, includes symbols
'use strict';

var $ = require('./$');
module.exports = function (it) {
  var keys = $.getKeys(it),
      getSymbols = $.getSymbols;
  if (getSymbols) {
    var symbols = getSymbols(it),
        isEnum = $.isEnum,
        i = 0,
        key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) keys.push(key);
  }
  return keys;
};

},{"./$":34}],15:[function(require,module,exports){
'use strict';

var global = require('./$.global'),
    core = require('./$.core'),
    hide = require('./$.hide'),
    redefine = require('./$.redefine'),
    ctx = require('./$.ctx'),
    PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F,
      IS_GLOBAL = type & $export.G,
      IS_STATIC = type & $export.S,
      IS_PROTO = type & $export.P,
      IS_BIND = type & $export.B,
      target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
      expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
      key,
      own,
      out,
      exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && key in target;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target && !own) redefine(target, key, out);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;

},{"./$.core":9,"./$.ctx":10,"./$.global":19,"./$.hide":21,"./$.redefine":40}],16:[function(require,module,exports){
"use strict";

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],17:[function(require,module,exports){
'use strict';

var ctx = require('./$.ctx'),
    call = require('./$.iter-call'),
    isArrayIter = require('./$.is-array-iter'),
    anObject = require('./$.an-object'),
    toLength = require('./$.to-length'),
    getIterFn = require('./core.get-iterator-method');
module.exports = function (iterable, entries, fn, that) {
  var iterFn = getIterFn(iterable),
      f = ctx(fn, that, entries ? 2 : 1),
      index = 0,
      length,
      step,
      iterator;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    call(iterator, f, step.value, entries);
  }
};

},{"./$.an-object":6,"./$.ctx":10,"./$.is-array-iter":25,"./$.iter-call":28,"./$.to-length":52,"./core.get-iterator-method":55}],18:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
'use strict';

var toIObject = require('./$.to-iobject'),
    getNames = require('./$').getNames,
    toString = ({}).toString;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function getWindowNames(it) {
  try {
    return getNames(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.get = function getOwnPropertyNames(it) {
  if (windowNames && toString.call(it) == '[object Window]') return getWindowNames(it);
  return getNames(toIObject(it));
};

},{"./$":34,"./$.to-iobject":51}],19:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
'use strict';

var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],20:[function(require,module,exports){
"use strict";

var hasOwnProperty = ({}).hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],21:[function(require,module,exports){
'use strict';

var $ = require('./$'),
    createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function (object, key, value) {
  return $.setDesc(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./$":34,"./$.descriptors":12,"./$.property-desc":38}],22:[function(require,module,exports){
'use strict';

module.exports = require('./$.global').document && document.documentElement;

},{"./$.global":19}],23:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
"use strict";

module.exports = function (fn, args, that) {
                  var un = that === undefined;
                  switch (args.length) {
                                    case 0:
                                                      return un ? fn() : fn.call(that);
                                    case 1:
                                                      return un ? fn(args[0]) : fn.call(that, args[0]);
                                    case 2:
                                                      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
                                    case 3:
                                                      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
                                    case 4:
                                                      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
                  }return fn.apply(that, args);
};

},{}],24:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
'use strict';

var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./$.cof":8}],25:[function(require,module,exports){
// check on default Array iterator
'use strict';

var Iterators = require('./$.iterators'),
    ITERATOR = require('./$.wks')('iterator'),
    ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./$.iterators":33,"./$.wks":54}],26:[function(require,module,exports){
// 7.2.2 IsArray(argument)
'use strict';

var cof = require('./$.cof');
module.exports = Array.isArray || function (arg) {
  return cof(arg) == 'Array';
};

},{"./$.cof":8}],27:[function(require,module,exports){
'use strict';

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],28:[function(require,module,exports){
// call something on iterator step with safe closing on error
'use strict';

var anObject = require('./$.an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./$.an-object":6}],29:[function(require,module,exports){
'use strict';
var $ = require('./$'),
    descriptor = require('./$.property-desc'),
    setToStringTag = require('./$.set-to-string-tag'),
    IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function () {
  return this;
});

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = $.create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./$":34,"./$.hide":21,"./$.property-desc":38,"./$.set-to-string-tag":44,"./$.wks":54}],30:[function(require,module,exports){
'use strict';
var LIBRARY = require('./$.library'),
    $export = require('./$.export'),
    redefine = require('./$.redefine'),
    hide = require('./$.hide'),
    has = require('./$.has'),
    Iterators = require('./$.iterators'),
    $iterCreate = require('./$.iter-create'),
    setToStringTag = require('./$.set-to-string-tag'),
    getProto = require('./$').getProto,
    ITERATOR = require('./$.wks')('iterator'),
    BUGGY = !([].keys && 'next' in [].keys()),
    // Safari has buggy iterators w/o `next`
FF_ITERATOR = '@@iterator',
    KEYS = 'keys',
    VALUES = 'values';

var returnThis = function returnThis() {
  return this;
};

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function getMethod(kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };
      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }return function entries() {
      return new Constructor(this, kind);
    };
  };
  var TAG = NAME + ' Iterator',
      DEF_VALUES = DEFAULT == VALUES,
      VALUES_BUG = false,
      proto = Base.prototype,
      $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
      $default = $native || getMethod(DEFAULT),
      methods,
      key;
  // Fix native
  if ($native) {
    var IteratorPrototype = getProto($default.call(new Base()));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if (!LIBRARY && has(proto, FF_ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native.name !== VALUES) {
      VALUES_BUG = true;
      $default = function values() {
        return $native.call(this);
      };
    }
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./$":34,"./$.export":15,"./$.has":20,"./$.hide":21,"./$.iter-create":29,"./$.iterators":33,"./$.library":36,"./$.redefine":40,"./$.set-to-string-tag":44,"./$.wks":54}],31:[function(require,module,exports){
'use strict';

var ITERATOR = require('./$.wks')('iterator'),
    SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () {
    SAFE_CLOSING = true;
  };
  Array.from(riter, function () {
    throw 2;
  });
} catch (e) {/* empty */}

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7],
        iter = arr[ITERATOR]();
    iter.next = function () {
      safe = true;
    };
    arr[ITERATOR] = function () {
      return iter;
    };
    exec(arr);
  } catch (e) {/* empty */}
  return safe;
};

},{"./$.wks":54}],32:[function(require,module,exports){
"use strict";

module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],33:[function(require,module,exports){
"use strict";

module.exports = {};

},{}],34:[function(require,module,exports){
"use strict";

var $Object = Object;
module.exports = {
  create: $Object.create,
  getProto: $Object.getPrototypeOf,
  isEnum: ({}).propertyIsEnumerable,
  getDesc: $Object.getOwnPropertyDescriptor,
  setDesc: $Object.defineProperty,
  setDescs: $Object.defineProperties,
  getKeys: $Object.keys,
  getNames: $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each: [].forEach
};

},{}],35:[function(require,module,exports){
'use strict';

var $ = require('./$'),
    toIObject = require('./$.to-iobject');
module.exports = function (object, el) {
  var O = toIObject(object),
      keys = $.getKeys(O),
      length = keys.length,
      index = 0,
      key;
  while (length > index) if (O[key = keys[index++]] === el) return key;
};

},{"./$":34,"./$.to-iobject":51}],36:[function(require,module,exports){
"use strict";

module.exports = false;

},{}],37:[function(require,module,exports){
'use strict';

var global = require('./$.global'),
    macrotask = require('./$.task').set,
    Observer = global.MutationObserver || global.WebKitMutationObserver,
    process = global.process,
    Promise = global.Promise,
    isNode = require('./$.cof')(process) == 'process',
    head,
    last,
    notify;

var flush = function flush() {
  var parent, domain, fn;
  if (isNode && (parent = process.domain)) {
    process.domain = null;
    parent.exit();
  }
  while (head) {
    domain = head.domain;
    fn = head.fn;
    if (domain) domain.enter();
    fn(); // <- currently we use it only for Promise - try / catch not required
    if (domain) domain.exit();
    head = head.next;
  }last = undefined;
  if (parent) parent.enter();
};

// Node.js
if (isNode) {
  notify = function () {
    process.nextTick(flush);
  };
  // browsers with MutationObserver
} else if (Observer) {
    var toggle = 1,
        node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = -toggle;
    };
    // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
      notify = function () {
        Promise.resolve().then(flush);
      };
      // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout
    } else {
        notify = function () {
          // strange IE + webpack dev server bug - use .call(global)
          macrotask.call(global, flush);
        };
      }

module.exports = function asap(fn) {
  var task = { fn: fn, next: undefined, domain: isNode && process.domain };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  }last = task;
};

},{"./$.cof":8,"./$.global":19,"./$.task":49}],38:[function(require,module,exports){
"use strict";

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],39:[function(require,module,exports){
'use strict';

var redefine = require('./$.redefine');
module.exports = function (target, src) {
  for (var key in src) redefine(target, key, src[key]);
  return target;
};

},{"./$.redefine":40}],40:[function(require,module,exports){
// add fake Function#toString
// for correct work wrapped methods / constructors with methods like LoDash isNative
'use strict';

var global = require('./$.global'),
    hide = require('./$.hide'),
    SRC = require('./$.uid')('src'),
    TO_STRING = 'toString',
    $toString = Function[TO_STRING],
    TPL = ('' + $toString).split(TO_STRING);

require('./$.core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  if (typeof val == 'function') {
    val.hasOwnProperty(SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    val.hasOwnProperty('name') || hide(val, 'name', key);
  }
  if (O === global) {
    O[key] = val;
  } else {
    if (!safe) delete O[key];
    hide(O, key, val);
  }
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./$.core":9,"./$.global":19,"./$.hide":21,"./$.uid":53}],41:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
"use strict";

module.exports = Object.is || function is(x, y) {
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],42:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
'use strict';

var getDesc = require('./$').getDesc,
    isObject = require('./$.is-object'),
    anObject = require('./$.an-object');
var check = function check(O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
  (function (test, buggy, set) {
    try {
      set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
      set(test, []);
      buggy = !(test instanceof Array);
    } catch (e) {
      buggy = true;
    }
    return function setPrototypeOf(O, proto) {
      check(O, proto);
      if (buggy) O.__proto__ = proto;else set(O, proto);
      return O;
    };
  })({}, false) : undefined),
  check: check
};

},{"./$":34,"./$.an-object":6,"./$.ctx":10,"./$.is-object":27}],43:[function(require,module,exports){
'use strict';
var global = require('./$.global'),
    $ = require('./$'),
    DESCRIPTORS = require('./$.descriptors'),
    SPECIES = require('./$.wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) $.setDesc(C, SPECIES, {
    configurable: true,
    get: function get() {
      return this;
    }
  });
};

},{"./$":34,"./$.descriptors":12,"./$.global":19,"./$.wks":54}],44:[function(require,module,exports){
'use strict';

var def = require('./$').setDesc,
    has = require('./$.has'),
    TAG = require('./$.wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./$":34,"./$.has":20,"./$.wks":54}],45:[function(require,module,exports){
'use strict';

var global = require('./$.global'),
    SHARED = '__core-js_shared__',
    store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./$.global":19}],46:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
'use strict';

var anObject = require('./$.an-object'),
    aFunction = require('./$.a-function'),
    SPECIES = require('./$.wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor,
      S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./$.a-function":4,"./$.an-object":6,"./$.wks":54}],47:[function(require,module,exports){
"use strict";

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) throw TypeError(name + ": use the 'new' operator!");
  return it;
};

},{}],48:[function(require,module,exports){
'use strict';

var toInteger = require('./$.to-integer'),
    defined = require('./$.defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that)),
        i = toInteger(pos),
        l = s.length,
        a,
        b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./$.defined":11,"./$.to-integer":50}],49:[function(require,module,exports){
'use strict';

var ctx = require('./$.ctx'),
    invoke = require('./$.invoke'),
    html = require('./$.html'),
    cel = require('./$.dom-create'),
    global = require('./$.global'),
    process = global.process,
    setTask = global.setImmediate,
    clearTask = global.clearImmediate,
    MessageChannel = global.MessageChannel,
    counter = 0,
    queue = {},
    ONREADYSTATECHANGE = 'onreadystatechange',
    defer,
    channel,
    port;
var run = function run() {
  var id = +this;
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listner = function listner(event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [],
        i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./$.cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
    // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listner;
      defer = ctx(port.postMessage, port, 1);
      // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
        defer = function (id) {
          global.postMessage(id + '', '*');
        };
        global.addEventListener('message', listner, false);
        // IE8-
      } else if (ONREADYSTATECHANGE in cel('script')) {
          defer = function (id) {
            html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
              html.removeChild(this);
              run.call(id);
            };
          };
          // Rest old browsers
        } else {
            defer = function (id) {
              setTimeout(ctx(run, id, 1), 0);
            };
          }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./$.cof":8,"./$.ctx":10,"./$.dom-create":13,"./$.global":19,"./$.html":22,"./$.invoke":23}],50:[function(require,module,exports){
// 7.1.4 ToInteger
"use strict";

var ceil = Math.ceil,
    floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],51:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
'use strict';

var IObject = require('./$.iobject'),
    defined = require('./$.defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./$.defined":11,"./$.iobject":24}],52:[function(require,module,exports){
// 7.1.15 ToLength
'use strict';

var toInteger = require('./$.to-integer'),
    min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./$.to-integer":50}],53:[function(require,module,exports){
'use strict';

var id = 0,
    px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],54:[function(require,module,exports){
'use strict';

var store = require('./$.shared')('wks'),
    uid = require('./$.uid'),
    Symbol = require('./$.global').Symbol;
module.exports = function (name) {
  return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};

},{"./$.global":19,"./$.shared":45,"./$.uid":53}],55:[function(require,module,exports){
'use strict';

var classof = require('./$.classof'),
    ITERATOR = require('./$.wks')('iterator'),
    Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

},{"./$.classof":7,"./$.core":9,"./$.iterators":33,"./$.wks":54}],56:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./$.add-to-unscopables'),
    step = require('./$.iter-step'),
    Iterators = require('./$.iterators'),
    toIObject = require('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./$.iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0; // next index
  this._k = kind; // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t,
      kind = this._k,
      index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./$.add-to-unscopables":5,"./$.iter-define":30,"./$.iter-step":32,"./$.iterators":33,"./$.to-iobject":51}],57:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./$.classof'),
    test = {};
test[require('./$.wks')('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  require('./$.redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

},{"./$.classof":7,"./$.redefine":40,"./$.wks":54}],58:[function(require,module,exports){
'use strict';
var $ = require('./$'),
    LIBRARY = require('./$.library'),
    global = require('./$.global'),
    ctx = require('./$.ctx'),
    classof = require('./$.classof'),
    $export = require('./$.export'),
    isObject = require('./$.is-object'),
    anObject = require('./$.an-object'),
    aFunction = require('./$.a-function'),
    strictNew = require('./$.strict-new'),
    forOf = require('./$.for-of'),
    setProto = require('./$.set-proto').set,
    same = require('./$.same-value'),
    SPECIES = require('./$.wks')('species'),
    speciesConstructor = require('./$.species-constructor'),
    asap = require('./$.microtask'),
    PROMISE = 'Promise',
    process = global.process,
    isNode = classof(process) == 'process',
    P = global[PROMISE],
    Wrapper;

var testResolve = function testResolve(sub) {
  var test = new P(function () {});
  if (sub) test.constructor = Object;
  return P.resolve(test) === test;
};

var USE_NATIVE = (function () {
  var works = false;
  function P2(x) {
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = P && P.resolve && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, { constructor: { value: P2 } });
    // actual Firefox has broken subclass support, test that
    if (!(P2.resolve(5).then(function () {}) instanceof P2)) {
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if (works && require('./$.descriptors')) {
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function get() {
          thenableThenGotten = true;
        }
      }));
      works = thenableThenGotten;
    }
  } catch (e) {
    works = false;
  }
  return works;
})();

// helpers
var sameConstructor = function sameConstructor(a, b) {
  // library wrapper special case
  if (LIBRARY && a === P && b === Wrapper) return true;
  return same(a, b);
};
var getConstructor = function getConstructor(C) {
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
};
var isThenable = function isThenable(it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var PromiseCapability = function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve), this.reject = aFunction(reject);
};
var perform = function perform(exec) {
  try {
    exec();
  } catch (e) {
    return { error: e };
  }
};
var notify = function notify(record, isReject) {
  if (record.n) return;
  record.n = true;
  var chain = record.c;
  asap(function () {
    var value = record.v,
        ok = record.s == 1,
        i = 0;
    var run = function run(reaction) {
      var handler = ok ? reaction.ok : reaction.fail,
          resolve = reaction.resolve,
          reject = reaction.reject,
          result,
          then;
      try {
        if (handler) {
          if (!ok) record.h = true;
          result = handler === true ? value : handler(value);
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
    record.n = false;
    if (isReject) setTimeout(function () {
      var promise = record.p,
          handler,
          console;
      if (isUnhandled(promise)) {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      }record.a = undefined;
    }, 1);
  });
};
var isUnhandled = function isUnhandled(promise) {
  var record = promise._d,
      chain = record.a || record.c,
      i = 0,
      reaction;
  if (record.h) return false;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  }return true;
};
var $reject = function $reject(value) {
  var record = this;
  if (record.d) return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
};
var $resolve = function $resolve(value) {
  var record = this,
      then;
  if (record.d) return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if (record.p === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      asap(function () {
        var wrapper = { r: record, d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record, false);
    }
  } catch (e) {
    $reject.call({ r: record, d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor) {
    aFunction(executor);
    var record = this._d = {
      p: strictNew(this, P, PROMISE), // <- promise
      c: [], // <- awaiting reactions
      a: undefined, // <- checked in isUnhandled reactions
      s: 0, // <- state
      d: false, // <- done
      v: undefined, // <- value
      h: false, // <- handled rejection
      n: false // <- notify
    };
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch (err) {
      $reject.call(record, err);
    }
  };
  require('./$.redefine-all')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = new PromiseCapability(speciesConstructor(this, P)),
          promise = reaction.promise,
          record = this._d;
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      record.c.push(reaction);
      if (record.a) record.a.push(reaction);
      if (record.s) notify(record, false);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function _catch(onRejected) {
      return this.then(undefined, onRejected);
    }
  });
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: P });
require('./$.set-to-string-tag')(P, PROMISE);
require('./$.set-species')(PROMISE);
Wrapper = require('./$.core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = new PromiseCapability(this),
        $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if (x instanceof P && sameConstructor(x.constructor, this)) return x;
    var capability = new PromiseCapability(this),
        $$resolve = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./$.iter-detect')(function (iter) {
  P.all(iter)['catch'](function () {});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = getConstructor(this),
        capability = new PromiseCapability(C),
        resolve = capability.resolve,
        reject = capability.reject,
        values = [];
    var abrupt = perform(function () {
      forOf(iterable, false, values.push, values);
      var remaining = values.length,
          results = Array(remaining);
      if (remaining) $.each.call(values, function (promise, index) {
        var alreadyCalled = false;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          results[index] = value;
          --remaining || resolve(results);
        }, reject);
      });else resolve(results);
    });
    if (abrupt) reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = getConstructor(this),
        capability = new PromiseCapability(C),
        reject = capability.reject;
    var abrupt = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (abrupt) reject(abrupt.error);
    return capability.promise;
  }
});

},{"./$":34,"./$.a-function":4,"./$.an-object":6,"./$.classof":7,"./$.core":9,"./$.ctx":10,"./$.descriptors":12,"./$.export":15,"./$.for-of":17,"./$.global":19,"./$.is-object":27,"./$.iter-detect":31,"./$.library":36,"./$.microtask":37,"./$.redefine-all":39,"./$.same-value":41,"./$.set-proto":42,"./$.set-species":43,"./$.set-to-string-tag":44,"./$.species-constructor":46,"./$.strict-new":47,"./$.wks":54}],59:[function(require,module,exports){
'use strict';
var $at = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t,
      index = this._i,
      point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./$.iter-define":30,"./$.string-at":48}],60:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $ = require('./$'),
    global = require('./$.global'),
    has = require('./$.has'),
    DESCRIPTORS = require('./$.descriptors'),
    $export = require('./$.export'),
    redefine = require('./$.redefine'),
    $fails = require('./$.fails'),
    shared = require('./$.shared'),
    setToStringTag = require('./$.set-to-string-tag'),
    uid = require('./$.uid'),
    wks = require('./$.wks'),
    keyOf = require('./$.keyof'),
    $names = require('./$.get-names'),
    enumKeys = require('./$.enum-keys'),
    isArray = require('./$.is-array'),
    anObject = require('./$.an-object'),
    toIObject = require('./$.to-iobject'),
    createDesc = require('./$.property-desc'),
    getDesc = $.getDesc,
    setDesc = $.setDesc,
    _create = $.create,
    getNames = $names.get,
    $Symbol = global.Symbol,
    $JSON = global.JSON,
    _stringify = $JSON && $JSON.stringify,
    setter = false,
    HIDDEN = wks('_hidden'),
    isEnum = $.isEnum,
    SymbolRegistry = shared('symbol-registry'),
    AllSymbols = shared('symbols'),
    useNative = typeof $Symbol == 'function',
    ObjectProto = Object.prototype;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(setDesc({}, 'a', {
    get: function get() {
      return setDesc(this, 'a', { value: 7 }).a;
    }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = getDesc(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  setDesc(it, key, D);
  if (protoDesc && it !== ObjectProto) setDesc(ObjectProto, key, protoDesc);
} : setDesc;

var wrap = function wrap(tag) {
  var sym = AllSymbols[tag] = _create($Symbol.prototype);
  sym._k = tag;
  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function set(value) {
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
};

var isSymbol = function isSymbol(it) {
  return typeof it == 'symbol';
};

var $defineProperty = function defineProperty(it, key, D) {
  if (D && has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) setDesc(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    }return setSymbolDesc(it, key, D);
  }return setDesc(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P)),
      i = 0,
      l = keys.length,
      key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  var D = getDesc(it = toIObject(it), key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = getNames(toIObject(it)),
      result = [],
      i = 0,
      key;
  while (names.length > i) if (!has(AllSymbols, key = names[i++]) && key != HIDDEN) result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var names = getNames(toIObject(it)),
      result = [],
      i = 0,
      key;
  while (names.length > i) if (has(AllSymbols, key = names[i++])) result.push(AllSymbols[key]);
  return result;
};
var $stringify = function stringify(it) {
  if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
  var args = [it],
      i = 1,
      $$ = arguments,
      replacer,
      $replacer;
  while ($$.length > i) args.push($$[i++]);
  replacer = args[1];
  if (typeof replacer == 'function') $replacer = replacer;
  if ($replacer || !isArray(replacer)) replacer = function (key, value) {
    if ($replacer) value = $replacer.call(this, key, value);
    if (!isSymbol(value)) return value;
  };
  args[1] = replacer;
  return _stringify.apply($JSON, args);
};
var buggyJSON = $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
});

// 19.4.1.1 Symbol([description])
if (!useNative) {
  $Symbol = function Symbol() {
    if (isSymbol(this)) throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
  };
  redefine($Symbol.prototype, 'toString', function toString() {
    return this._k;
  });

  isSymbol = function (it) {
    return it instanceof $Symbol;
  };

  $.create = $create;
  $.isEnum = $propertyIsEnumerable;
  $.getDesc = $getOwnPropertyDescriptor;
  $.setDesc = $defineProperty;
  $.setDescs = $defineProperties;
  $.getNames = $names.get = $getOwnPropertyNames;
  $.getSymbols = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./$.library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function _for(key) {
    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key) {
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function useSetter() {
    setter = true;
  },
  useSimple: function useSimple() {
    setter = false;
  }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call(('hasInstance,isConcatSpreadable,iterator,match,replace,search,' + 'species,split,toPrimitive,toStringTag,unscopables').split(','), function (it) {
  var sym = wks(it);
  symbolStatics[it] = useNative ? sym : wrap(sym);
});

setter = true;

$export($export.G + $export.W, { Symbol: $Symbol });

$export($export.S, 'Symbol', symbolStatics);

$export($export.S + $export.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', { stringify: $stringify });

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./$":34,"./$.an-object":6,"./$.descriptors":12,"./$.enum-keys":14,"./$.export":15,"./$.fails":16,"./$.get-names":18,"./$.global":19,"./$.has":20,"./$.is-array":26,"./$.keyof":35,"./$.library":36,"./$.property-desc":38,"./$.redefine":40,"./$.set-to-string-tag":44,"./$.shared":45,"./$.to-iobject":51,"./$.uid":53,"./$.wks":54}],61:[function(require,module,exports){
'use strict';

require('./es6.array.iterator');
var global = require('./$.global'),
    hide = require('./$.hide'),
    Iterators = require('./$.iterators'),
    ITERATOR = require('./$.wks')('iterator'),
    NL = global.NodeList,
    HTC = global.HTMLCollection,
    NLProto = NL && NL.prototype,
    HTCProto = HTC && HTC.prototype,
    ArrayValues = Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
if (NLProto && !NLProto[ITERATOR]) hide(NLProto, ITERATOR, ArrayValues);
if (HTCProto && !HTCProto[ITERATOR]) hide(HTCProto, ITERATOR, ArrayValues);

},{"./$.global":19,"./$.hide":21,"./$.iterators":33,"./$.wks":54,"./es6.array.iterator":56}],62:[function(require,module,exports){
'use strict';

(function () {
  'use strict';

  if (self.fetch) {
    return;
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = name.toString();
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = value.toString();
    }
    return value;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var list = this.map[name];
    if (!list) {
      list = [];
      this.map[name] = list;
    }
    list.push(value);
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    var values = this.map[normalizeName(name)];
    return values ? values[0] : null;
  };

  Headers.prototype.getAll = function (name) {
    return this.map[normalizeName(name)] || [];
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)];
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function (name) {
      this.map[name].forEach(function (value) {
        callback.call(thisArg, value, name, this);
      }, this);
    }, this);
  };

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    return fileReaderReady(reader);
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    reader.readAsText(blob);
    return fileReaderReady(reader);
  }

  var support = {
    blob: 'FileReader' in self && 'Blob' in self && (function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    })(),
    formData: 'FormData' in self
  };

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;
      if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (!body) {
        this._bodyText = '';
      } else {
        throw new Error('unsupported BodyInit type');
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        return this.blob().then(readBlobAsArrayBuffer);
      };

      this.text = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text');
        } else {
          return Promise.resolve(this._bodyText);
        }
      };
    } else {
      this.text = function () {
        var rejected = consumed(this);
        return rejected ? rejected : Promise.resolve(this._bodyText);
      };
    }

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(url, options) {
    options = options || {};
    this.url = url;

    this.credentials = options.credentials || 'omit';
    this.headers = new Headers(options.headers);
    this.method = normalizeMethod(options.method || 'GET');
    this.mode = options.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && options.body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(options.body);
  }

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function headers(xhr) {
    var head = new Headers();
    var pairs = xhr.getAllResponseHeaders().trim().split('\n');
    pairs.forEach(function (header) {
      var split = header.trim().split(':');
      var key = split.shift().trim();
      var value = split.join(':').trim();
      head.append(key, value);
    });
    return head;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this._initBody(bodyInit);
    this.type = 'default';
    this.url = null;
    this.status = options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText;
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
    this.url = options.url || '';
  }

  Body.call(Response.prototype);

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function (input, init) {
    // TODO: Request constructor should accept input, init
    var request;
    if (Request.prototype.isPrototypeOf(input) && !init) {
      request = input;
    } else {
      request = new Request(input, init);
    }

    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL;
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL');
        }

        return;
      }

      xhr.onload = function () {
        var status = xhr.status === 1223 ? 204 : xhr.status;
        if (status < 100 || status > 599) {
          reject(new TypeError('Network request failed'));
          return;
        }
        var options = {
          status: status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        };
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  self.fetch.polyfill = true;
})();

},{}],63:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _servicesYouTubeAPIClient = require('./../services/YouTubeAPIClient');

var _servicesYouTubeAPIClient2 = _interopRequireDefault(_servicesYouTubeAPIClient);

var _Paginator = require('./Paginator');

var _Paginator2 = _interopRequireDefault(_Paginator);

var _SearchParams = require('./SearchParams');

var _SearchParams2 = _interopRequireDefault(_SearchParams);

var _Manufacturer = require('./Manufacturer');

var _Manufacturer2 = _interopRequireDefault(_Manufacturer);

var Browser = (function () {
    function Browser() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Browser);

        this._config = new _SearchParams2['default']();
        this._paginator = new _Paginator2['default']();
        this._paginator.browser = this;
    }

    _createClass(Browser, [{
        key: '_getSearchPath',
        value: function _getSearchPath() {
            var path = 'search.list';
            return path;
        }
    }, {
        key: '_getSearchPayload',
        value: function _getSearchPayload() {
            var data = this._config;
            Object.assign(data, this._paginator.getPaginationParams());
            return data;
        }
    }, {
        key: '_processQuery',
        value: function _processQuery(promise) {
            var _this = this;

            return promise.then(function (response) {
                var collection = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = response.result.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        collection.push(_Manufacturer2['default'].make(item));
                    }

                    //update paginator
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                _this._paginator.update(response.result);
                _this._paginator.setPage(collection);
                return _this._paginator;
            }, function (reject) {
                console.log(reject);
                return reject;
            });
        }
    }, {
        key: 'all',
        value: function all() {
            var path = 'search.list';
            var payload = this._getSearchPayload();
            var promise = _servicesYouTubeAPIClient2['default'].request(path, payload);
            return this._processQuery(promise);
        }
    }, {
        key: 'find',
        value: function find() {
            var path = this._config.type + '.list';
            var payload = this._getSearchPayload();
            var promise = _servicesYouTubeAPIClient2['default'].request(path, payload);
            return this._processQuery(promise);
        }
    }, {
        key: 'rate',
        value: function rate() {
            var path = this._config.type + '.rate';
            var payload = this._getSearchPayload();
            return _servicesYouTubeAPIClient2['default'].request(path, payload);
        }
    }, {
        key: 'config',
        set: function set() {
            var searchParams = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            Object.assign(this._config, searchParams);
            this._paginator.update(searchParams);
        }
    }]);

    return Browser;
})();

exports['default'] = Browser;
module.exports = exports['default'];

},{"./../services/YouTubeAPIClient":74,"./Manufacturer":64,"./Paginator":65,"./SearchParams":66}],64:[function(require,module,exports){
'use strict';
/*
* There is an issue trying to import entities from here because loops
* YouTubeVideo import -YouTubeSearch- import Manfacturer import YouTubePlaylist import -YouTubeSearch- (here fails)
* To solve the problem make Manufacturer create object from classes not explicit imported.
* Classes are suscribed via Manufacturer.add()
*/

/*import Video from   './../entities/YouTubeVideo';
import Channel from './../entities/YouTubeChannel';
import Playist from './../entities/YouTubePlaylist';

class Manufacturer {
    static make( YouTubeResultItem ){
        console.log('Manufacturer::make');
        let item;
        switch( YouTubeResultItem.id.kind ){
            default:
            case 'youtube#video':
                item = new Video( YouTubeResultItem );
                break;
            case 'youtube#channel':
                item = new Channel( YouTubeResultItem );
                break;
            case 'youtube#playlist':
                item = new Playist( YouTubeResultItem );
                break;
        }
        return item;
    }
}*/

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _entitiesEntityModel = require('./../entities/EntityModel');

var _entitiesEntityModel2 = _interopRequireDefault(_entitiesEntityModel);

/**
* Flag for avoid multiple instances of Config class
* @type {boolean}
*/
var singleton = false;

var Manufacturer = (function () {
    function Manufacturer() {
        _classCallCheck(this, Manufacturer);

        this.factories = [];
    }

    _createClass(Manufacturer, [{
        key: 'add',
        value: function add(key, factory) {
            this.factories.push({ key: key, source: factory });
        }
    }, {
        key: 'make',
        value: function make(YouTubeResultItem) {
            var item = undefined;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.factories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var factory = _step.value;

                    if (factory.key == YouTubeResultItem.id.kind //for Search.List
                     || factory.key == YouTubeResultItem.kind //for Videos.List
                    ) {
                            item = new factory.source(YouTubeResultItem);
                        }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return item || new _entitiesEntityModel2['default'](YouTubeResultItem);
        }
    }]);

    return Manufacturer;
})();

if (!singleton) {
    singleton = new Manufacturer();
}

exports['default'] = singleton;
module.exports = exports['default'];

},{"./../entities/EntityModel":67}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Paginator = (function () {
    function Paginator() {
        var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Paginator);

        this._limit = data.maxResults || Paginator.LIMIT_DEFAULT;
        this._offset = data.offset || Paginator.OFFSET_DEFAULT;
        this._total_pages = 0;
        this._total_results = 0;
        this._currentIndex = 1;
        this._currentPage = [];
        this._pagesCache = [];
        this._nextPageToken = '';
        this._prevPageToken = '';
        this._tokenPagination = '';
        this._pageToken = null;
    }

    _createClass(Paginator, [{
        key: 'getPaginationParams',
        value: function getPaginationParams() {
            var params = {};
            params.maxResults = this._limit;
            params.pageToken = this._pageToken;
            return params;
        }
    }, {
        key: 'update',
        value: function update() {
            var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            this._nextPageToken = data.nextPageToken;
            this._prevPageToken = data.prevPageToken;
            this._tokenPagination = data.tokenPagination;
            //YouTube doesn't have offset value
            this._offset = data.offset || this._offset;
            //pageInfo.resultsPerPage came from search response
            //maxResults came from query parameter
            this._limit = data.pageInfo && data.pageInfo.resultsPerPage || data.maxResults || this._limit;
            this._total_results = data.pageInfo && data.pageInfo.totalResults || this._total_results;
            this._currentIndex = data.current_page || this._offset + 1; //offset can be 0 but index starts in 1
            this._total_pages = data.total_pages || Math.ceil(this._total_results / this._limit);
        }
    }, {
        key: 'setPage',
        value: function setPage(items) {
            this._currentPage = items;
        }
    }, {
        key: 'firstElement',
        value: function firstElement() {
            return this._currentPage[0];
        }
    }, {
        key: 'lastElement',
        value: function lastElement() {
            return this._currentPage[this._currentPage.length - 1];
        }
    }, {
        key: 'elementAt',
        value: function elementAt(index) {
            return this._currentPage[index];
        }
    }, {
        key: 'hasNextPage',
        value: function hasNextPage() {
            return this._currentIndex < this._total_pages;
        }
    }, {
        key: 'hasPrevPage',
        value: function hasPrevPage() {
            return this._currentIndex > 1;
        }
    }, {
        key: 'nextPage',
        value: function nextPage() {
            var _this = this;

            var retVal = new Promise(function (resolve, reject) {
                if (_this.hasNextPage()) {
                    _this._offset++;
                    _this._pageToken = _this._nextPageToken;
                    _this._browser.all().then(function (result) {
                        _this._pageToken = null; //clear for next queries not related with pagination
                        resolve(result);
                    });
                } else {
                    reject(null);
                }
            });
            return retVal;
        }
    }, {
        key: 'prevPage',
        value: function prevPage() {
            var _this2 = this;

            var retVal = new Promise(function (resolve, reject) {
                if (_this2.hasPrevPage()) {
                    _this2._offset--;
                    _this2._pageToken = _this2._prevPageToken;
                    _this2._browser.all().then(function () {
                        _this2._pageToken = null; //clear for next queries not related with pagination
                    }).then(function (result) {
                        resolve(result);
                    });
                } else {
                    reject(null);
                }
            });
            return retVal;
        }
    }, {
        key: 'firstPage',
        value: function firstPage() {
            var _this3 = this;

            var retVal = new Promise(function (resolve, reject) {
                _this3._offset = 0;
                resolve(_this3._browser.all());
            });
            return retVal;
        }
    }, {
        key: 'lastPage',
        value: function lastPage() {
            var _this4 = this;

            var retVal = new Promise(function (resolve, reject) {
                _this4._offset = _this4._total_pages;
                resolve(_this4._browser.all());
            });
            return retVal;
        }
    }, {
        key: 'goToPage',
        value: function goToPage(index) {
            var _this5 = this;

            var retVal = new Promise(function (resolve, reject) {
                _this5._offset = index;
                resolve(_this5._browser.all());
            });
            return retVal;
        }
    }, {
        key: 'searchParams',
        get: function get() {
            return this._searchParams;
        }
    }, {
        key: 'elements',
        get: function get() {
            return this._currentPage;
        }
    }, {
        key: 'limit',
        get: function get() {
            return this._limit;
        }
    }, {
        key: 'offset',
        get: function get() {
            return this._offset;
        }
    }, {
        key: 'total_pages',
        get: function get() {
            return this._total_pages;
        }
    }, {
        key: 'currentIndex',
        get: function get() {
            return this._currentIndex;
        }
    }, {
        key: 'page_size',
        get: function get() {
            return this._limit;
        }
    }, {
        key: 'browser',
        set: function set(value) {
            this._browser = value;
        }
    }]);

    return Paginator;
})();

Paginator.LIMIT_DEFAULT = 10;
Paginator.OFFSET_DEFAULT = 0;

exports['default'] = Paginator;
module.exports = exports['default'];

},{}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SearchParams = function SearchParams() {
    _classCallCheck(this, SearchParams);

    this.part = 'snippet';
    this.channelId;
    this.channelType;
    this.eventType;
    this.forContentOwner;
    this.forDeveloper;
    this.forMine;
    this.location;
    this.locationRadius;
    this.onBehalfOfContentOwner;
    this.order = 'relevance';
    this.publishedAfter;
    this.q = '';
    this.regionCode;
    this.relatedToVideoId;
    this.relevanceLanguage;
    this.safeSearch;
    this.topicId;
    this.type = 'video';
    this.videoCaption;
    this.videoCategoryId;
    this.videoDefinition;
    this.videoDimension;
    this.videoDuration;
    this.videoEmbeddable;
    this.videoLicense;
    this.videoSyndicated;
    this.videoType;
    this.fields;
};

exports['default'] = SearchParams;
module.exports = exports['default'];

},{}],67:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _YouTubeSearch2 = require('./YouTubeSearch');

var _YouTubeSearch3 = _interopRequireDefault(_YouTubeSearch2);

var _classesBrowser = require('./../classes/Browser');

var _classesBrowser2 = _interopRequireDefault(_classesBrowser);

var EntityModel = (function (_YouTubeSearch) {
    _inherits(EntityModel, _YouTubeSearch);

    function EntityModel(YouTubeSearchItemData) {
        _classCallCheck(this, EntityModel);

        _get(Object.getPrototypeOf(EntityModel.prototype), 'constructor', this).call(this, YouTubeSearchItemData);
        this.kind = YouTubeSearchItemData.id.kind;
        this.id = YouTubeSearchItemData.id[this.constructor.SINGLE_TYPE + 'Id'] || YouTubeSearchItemData.id;
        Object.assign(this, YouTubeSearchItemData.snippet);

        this.rawData = YouTubeSearchItemData;
        this._massAssign(YouTubeSearchItemData);
    }

    /**
    * Mass assign attributes. Excludes attributes marked as NOT FILLABLE
    * @param {object} data The object endpoint response.
    */

    _createClass(EntityModel, [{
        key: '_massAssign',
        value: function _massAssign(data) {
            var notFillable = this.constructor._getNotFillable() || [];
            for (var el in data) {
                if (notFillable.indexOf(el) === -1 && typeof this[el] != 'function') {
                    this[el] = data[el];
                }
            }
        }

        /**
        * Returns a string of the object type, usually used to build the query path.
        * @return {string}
        */
    }, {
        key: 'getThumbnail',

        /**
        * Returns the URI thumbnail based on optional size parameter
        * @param {string=} size One of three: default, medium or high
        * @return {string}
        */
        value: function getThumbnail(size) {
            var uri = '';
            switch (size) {
                default:
                case 'default':
                    uri = this.thumbnails['default'].url;
                    break;
                case 'medium':
                    uri = this.thumbnails.medium.url;
                    break;
                case 'high':
                    uri = this.thumbnails.high.url;
                    break;
            }
            return uri;
        }
    }], [{
        key: '_getNotFillable',

        /**
        * Protect attributes from mass assigment. Ready to be overwritten by generalization
        * @return {Array<string>} The names of the attributes to keep safe from mass assign.
        */
        value: function _getNotFillable() {
            return ['id'];
        }
    }, {
        key: 'several',
        value: function several() {
            var entitiesIds = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            params.id = entitiesIds.join(',');
            params.type = this.FAMILY_TYPE;
            var searcher = new _classesBrowser2['default']();
            searcher.config = params;
            return searcher.find();
        }
    }, {
        key: 'SINGLE_TYPE',
        get: function get() {
            return '';
        }
    }]);

    return EntityModel;
})(_YouTubeSearch3['default']);

exports['default'] = EntityModel;
module.exports = exports['default'];

},{"./../classes/Browser":63,"./YouTubeSearch":70}],68:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _EntityModel2 = require('./EntityModel');

var _EntityModel3 = _interopRequireDefault(_EntityModel2);

var _classesManufacturer = require('./../classes/Manufacturer');

var _classesManufacturer2 = _interopRequireDefault(_classesManufacturer);

var YouTubeVideoChannel = (function (_EntityModel) {
    _inherits(YouTubeVideoChannel, _EntityModel);

    function YouTubeVideoChannel() {
        _classCallCheck(this, YouTubeVideoChannel);

        _get(Object.getPrototypeOf(YouTubeVideoChannel.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(YouTubeVideoChannel, null, [{
        key: 'SINGLE_TYPE',

        /**
        * Returns a string of the object type, usually used to build the query path.
        * @return {string}
        */
        get: function get() {
            return 'channel';
        }
    }]);

    return YouTubeVideoChannel;
})(_EntityModel3['default']);

_classesManufacturer2['default'].add('youtube#channel', YouTubeVideoChannel);

exports['default'] = YouTubeVideoChannel;
module.exports = exports['default'];

},{"./../classes/Manufacturer":64,"./EntityModel":67}],69:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _EntityModel2 = require('./EntityModel');

var _EntityModel3 = _interopRequireDefault(_EntityModel2);

var _classesManufacturer = require('./../classes/Manufacturer');

var _classesManufacturer2 = _interopRequireDefault(_classesManufacturer);

var YouTubePlaylist = (function (_EntityModel) {
    _inherits(YouTubePlaylist, _EntityModel);

    function YouTubePlaylist() {
        _classCallCheck(this, YouTubePlaylist);

        _get(Object.getPrototypeOf(YouTubePlaylist.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(YouTubePlaylist, null, [{
        key: 'SINGLE_TYPE',

        /**
        * Returns a string of the object type, usually used to build the query path.
        * @return {string}
        */
        get: function get() {
            return 'playlist';
        }
    }]);

    return YouTubePlaylist;
})(_EntityModel3['default']);

_classesManufacturer2['default'].add('youtube#playlist', YouTubePlaylist);

exports['default'] = YouTubePlaylist;
module.exports = exports['default'];

},{"./../classes/Manufacturer":64,"./EntityModel":67}],70:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _classesBrowser = require('./../classes/Browser');

var _classesBrowser2 = _interopRequireDefault(_classesBrowser);

var YouTubeSearch = (function () {
    function YouTubeSearch() {
        _classCallCheck(this, YouTubeSearch);
    }

    _createClass(YouTubeSearch, null, [{
        key: 'where',

        /**
        * Performs a search based on given query string an optiona search parameters.
        * @param {string} queryString The string to search.
        * @param {object=} params The aditiona configuration options
        * @return {Promise}
        */
        value: function where(queryString) {
            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            params.q = queryString;
            //YouTubeSearch.where method should trigger a search, independant for the searched entity.
            //for example on Videos searches, the path should be .search.list and the type:video
            params.type = this.SINGLE_TYPE;
            var searcher = new _classesBrowser2['default']();
            searcher.config = params;
            return searcher.all();
        }
    }]);

    return YouTubeSearch;
})();

exports['default'] = YouTubeSearch;
module.exports = exports['default'];

},{"./../classes/Browser":63}],71:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _EntityModel2 = require('./EntityModel');

var _EntityModel3 = _interopRequireDefault(_EntityModel2);

var _classesManufacturer = require('./../classes/Manufacturer');

var _classesManufacturer2 = _interopRequireDefault(_classesManufacturer);

var _classesBrowser = require('./../classes/Browser');

var _classesBrowser2 = _interopRequireDefault(_classesBrowser);

var YouTubeVideo = (function (_EntityModel) {
    _inherits(YouTubeVideo, _EntityModel);

    function YouTubeVideo() {
        _classCallCheck(this, YouTubeVideo);

        _get(Object.getPrototypeOf(YouTubeVideo.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(YouTubeVideo, [{
        key: 'rate',
        value: function rate(rating) {
            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            params.id = this.id;
            params.type = YouTubeVideo.FAMILY_TYPE;
            params.rating = rating;
            var searcher = new _classesBrowser2['default']();
            searcher.config = params;
            return searcher.rate();
        }
    }], [{
        key: 'SINGLE_TYPE',

        /**
        * Returns a string of the object type, usually used to build the query path.
        * @return {string}
        */
        get: function get() {
            return 'video';
        }
    }, {
        key: 'FAMILY_TYPE',
        get: function get() {
            return 'videos';
        }
    }]);

    return YouTubeVideo;
})(_EntityModel3['default']);

_classesManufacturer2['default'].add('youtube#video', YouTubeVideo);

exports['default'] = YouTubeVideo;
module.exports = exports['default'];

},{"./../classes/Browser":63,"./../classes/Manufacturer":64,"./EntityModel":67}],72:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _servicesConfig = require('./../services/Config');

var _servicesConfig2 = _interopRequireDefault(_servicesConfig);

var promiseResolve = undefined,
    promiseReject = undefined;

var Auth = (function () {
    function Auth() {
        _classCallCheck(this, Auth);
    }

    _createClass(Auth, [{
        key: 'authorize',
        value: function authorize() {
            this.handleAuth(true);
            return new Promise(function (resolve, reject) {
                promiseResolve = resolve;
                promiseReject = reject;
            });
        }
    }, {
        key: 'showAuth',
        value: function showAuth() {
            this.handleAuth(false);
            return new Promise(function (resolve, reject) {
                promiseResolve = resolve;
                promiseReject = reject;
            });
        }
    }, {
        key: 'handleAuth',
        value: function handleAuth(immediate) {
            gapi.auth.authorize({ client_id: _servicesConfig2['default'].clientId, scope: _servicesConfig2['default'].scopes.join(','), immediate: immediate }, this.handleAuthResult.bind(this));
        }
    }, {
        key: 'handleAuthResult',
        value: function handleAuthResult(authResult) {
            if (authResult && !authResult.error) {
                promiseResolve(authResult);
            } else {
                promiseReject(authResult);
            }
        }
    }]);

    return Auth;
})();

exports['default'] = new Auth();
module.exports = exports['default'];

},{"./../services/Config":73}],73:[function(require,module,exports){
'use strict';

/**
* Flag for avoid multiple instances of Config class
* @type {boolean}
*/
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var singletonConfig = false,
    apiKey = undefined,
    clientId = undefined,
    scopes = undefined;

var Config = (function () {
    function Config() {
        _classCallCheck(this, Config);
    }

    _createClass(Config, [{
        key: 'set',

        /**
        * Sets variables by given data.
        * @param {object} data
        */
        value: function set(data) {
            apiKey = data.apiKey;
            clientId = data.clientId;
            scopes = data.scopes;
            return this;
        }
    }, {
        key: 'boot',
        value: function boot() {
            return new Promise(function (resolve, reject) {
                //load API client
                gapi.client.setApiKey(apiKey);
                gapi.client.load('youtube', 'v3').then(function () {
                    resolve();
                }, function (reason) {
                    console.log('Error: ' + reason.result.error.message);
                    reject(reason);
                });
            });
        }
    }, {
        key: 'apiKey',
        get: function get() {
            return apiKey;
        }
    }, {
        key: 'clientId',
        get: function get() {
            return clientId;
        }
    }, {
        key: 'scopes',
        get: function get() {
            return scopes;
        }
    }]);

    return Config;
})();

if (!singletonConfig) {
    singletonConfig = new Config();
}

exports['default'] = singletonConfig;
module.exports = exports['default'];

},{}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var YouTubeAPIClient = (function () {
    function YouTubeAPIClient() {
        _classCallCheck(this, YouTubeAPIClient);
    }

    _createClass(YouTubeAPIClient, null, [{
        key: 'request',
        value: function request(path, payload) {
            var fn = undefined;
            eval('fn = gapi.client.youtube.' + path);
            return fn(payload).then(function (resp) {
                return resp;
            }, function (reason) {
                console.log('Error: ' + reason.result.error.message);
            });
        }
    }]);

    return YouTubeAPIClient;
})();

exports['default'] = YouTubeAPIClient;
module.exports = exports['default'];

},{}]},{},[62,3,2,1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvZGVtby9kZW1vLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL3Byb21pc2UuanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvbm9kZV9tb2R1bGVzL2NvcmUtanMvZm4vc3ltYm9sL2luZGV4LmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5hLWZ1bmN0aW9uLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5hZGQtdG8tdW5zY29wYWJsZXMuanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmFuLW9iamVjdC5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuY2xhc3NvZi5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuY29mLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5jb3JlLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5jdHguanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmRlZmluZWQuanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmRlc2NyaXB0b3JzLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5kb20tY3JlYXRlLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5lbnVtLWtleXMuanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmV4cG9ydC5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZmFpbHMuanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmZvci1vZi5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZ2V0LW5hbWVzLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5nbG9iYWwuanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmhhcy5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaGlkZS5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaHRtbC5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaW52b2tlLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5pb2JqZWN0LmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5pcy1hcnJheS1pdGVyLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5pcy1hcnJheS5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaXMtb2JqZWN0LmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWNhbGwuanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLml0ZXItY3JlYXRlLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWRlZmluZS5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaXRlci1kZXRlY3QuanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLml0ZXItc3RlcC5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaXRlcmF0b3JzLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQua2V5b2YuanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmxpYnJhcnkuanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLm1pY3JvdGFzay5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQucHJvcGVydHktZGVzYy5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQucmVkZWZpbmUtYWxsLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5yZWRlZmluZS5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc2FtZS12YWx1ZS5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc2V0LXByb3RvLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5zZXQtc3BlY2llcy5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc2V0LXRvLXN0cmluZy10YWcuanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnNoYXJlZC5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc3RyaWN0LW5ldy5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc3RyaW5nLWF0LmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC50YXNrLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC50by1pbnRlZ2VyLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC50by1pb2JqZWN0LmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC50by1sZW5ndGguanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnVpZC5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQud2tzLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcuanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucHJvbWlzZS5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3ltYm9sLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9ub2RlX21vZHVsZXMvd2hhdHdnLWZldGNoL2ZldGNoLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL3NyYy9jbGFzc2VzL0Jyb3dzZXIuanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvc3JjL2NsYXNzZXMvTWFudWZhY3R1cmVyLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL3NyYy9jbGFzc2VzL1BhZ2luYXRvci5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9zcmMvY2xhc3Nlcy9TZWFyY2hQYXJhbXMuanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvc3JjL2VudGl0aWVzL0VudGl0eU1vZGVsLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL3NyYy9lbnRpdGllcy9Zb3VUdWJlQ2hhbm5lbC5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9zcmMvZW50aXRpZXMvWW91VHViZVBsYXlsaXN0LmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL3NyYy9lbnRpdGllcy9Zb3VUdWJlU2VhcmNoLmpzIiwiL29wdC9sYW1wcC9odGRvY3MveW91dHViZS13cmFwcGVyL3NyYy9lbnRpdGllcy9Zb3VUdWJlVmlkZW8uanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvc3JjL3NlcnZpY2VzL0F1dGguanMiLCIvb3B0L2xhbXBwL2h0ZG9jcy95b3V0dWJlLXdyYXBwZXIvc3JjL3NlcnZpY2VzL0NvbmZpZy5qcyIsIi9vcHQvbGFtcHAvaHRkb2NzL3lvdXR1YmUtd3JhcHBlci9zcmMvc2VydmljZXMvWW91VHViZUFQSUNsaWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQTs7QUFFWixTQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRTtBQUFFLFdBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDO0NBQUU7O0FBRWpHLElBQUksa0JBQWtCLEdBQUcsT0FBTyxDQUhiLDBCQUEwQixDQUFBLENBQUE7O0FBSzdDLElBQUksbUJBQW1CLEdBQUcsc0JBQXNCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7QUFFckUsSUFBSSx3QkFBd0IsR0FBRyxPQUFPLENBTnBCLGdDQUFnQyxDQUFBLENBQUE7O0FBUWxELElBQUkseUJBQXlCLEdBQUcsc0JBQXNCLENBQUMsd0JBQXdCLENBQUMsQ0FBQzs7QUFFakYsSUFBSSwyQkFBMkIsR0FBRyxPQUFPLENBVHBCLG1DQUFtQyxDQUFBLENBQUE7O0FBV3hELElBQUksNEJBQTRCLEdBQUcsc0JBQXNCLENBQUMsMkJBQTJCLENBQUMsQ0FBQzs7QUFFdkYsSUFBSSwwQkFBMEIsR0FBRyxPQUFPLENBWnBCLGtDQUFrQyxDQUFBLENBQUE7O0FBY3RELElBQUks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Ozs7Ozs7OztJQUVOLGdCQUFnQjthQUFoQixnQkFBZ0I7OEJBQWhCLGdCQUFnQjs7O2lCQUFoQixnQkFBZ0I7O2VBQ0osaUJBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRztBQUM1QixnQkFBSSxFQUFFLFlBQUEsQ0FBQztBQUNQLGdCQUFJLCtCQUE2QixJQUFJLENBQUcsQ0FBQztBQUN6QyxtQkFBTyxFQUFFLENBQUUsT0FBTyxDQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQzlCLHVCQUFPLElBQUksQ0FBQzthQUNmLEVBQUMsVUFBQSxNQUFNLEVBQUk7QUFDUix1QkFBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDeEQsQ0FBQyxDQUFDO1NBQ047OztXQVRDLGdCQUFnQjs7O3FCQVlQLGdCQUFnQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcbmltcG9ydCBDb25maWcgZnJvbSAnLi8uLi9zcmMvc2VydmljZXMvQ29uZmlnJztcbmltcG9ydCBWaWRlbyBmcm9tICcuLy4uL3NyYy9lbnRpdGllcy9Zb3VUdWJlVmlkZW8nO1xuaW1wb3J0IFBsYXlsaXN0IGZyb20gJy4vLi4vc3JjL2VudGl0aWVzL1lvdVR1YmVQbGF5bGlzdCc7XG5pbXBvcnQgQ2hhbm5lbCBmcm9tICcuLy4uL3NyYy9lbnRpdGllcy9Zb3VUdWJlQ2hhbm5lbCc7XG5pbXBvcnQgU2VhcmNoIGZyb20gJy4vLi4vc3JjL2VudGl0aWVzL1lvdVR1YmVTZWFyY2gnO1xuaW1wb3J0IEF1dGggZnJvbSAnLi8uLi9zcmMvc2VydmljZXMvQXV0aCc7XG5cbmxldCBEZW1vID0ge1xuICAgIGluZGV4OiAwLFxuICAgIGNvbnRpbnVvdXM6IGZhbHNlLFxuICAgIGFsbDogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5jb250aW51b3VzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgfSxcbiAgICBuZXh0OiBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcbiAgICAgICAgY29uc29sZS5ncm91cCgpO1xuICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICAgIGlmKCB0aGlzW2BkZW1vJHt0aGlzLmluZGV4fWBdICYmIHRoaXMuY29udGludW91cyApe1xuICAgICAgICAgICAgdGhpc1tgZGVtbyR7dGhpcy5pbmRleH1gXSgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBkZW1vMTogZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IF9zZWxmID0gdGhpcztcbiAgICAgICAgY29uc29sZS5sb2coJ1NFQVJDSCBWSURFT1MgQU5EIEdFVCBUSEUgVElUTEUgT0YgVEhFIEZJUlNUIFJFU1VMVCBWSURFTycpO1xuICAgICAgICBjb25zb2xlLmxvZyhgU2VhcmNoIGZvcjogRHJlYW0gT24sIEFlcm9zbWl0aGApO1xuICAgICAgICBWaWRlby53aGVyZSgnRHJlYW0gT24sIEFlcm9zbWl0aCcpXG4gICAgICAgICAgICAudGhlbigocGFnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhZ2UuZmlyc3RFbGVtZW50KCkudGl0bGUpO1xuICAgICAgICAgICAgICAgIF9zZWxmLm5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgZGVtbzI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGxldCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIGNvbnNvbGUubG9nKCdQQUdJTkFUSU9OIEVYQU1QTEUnKTtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgIG1heFJlc3VsdHM6IDJcbiAgICAgICAgfTtcbiAgICAgICAgY29uc29sZS5sb2coYFNlYXJjaCBmb3I6IEFlcm9zbWl0aCBMSVZFYCk7XG4gICAgICAgIFZpZGVvLndoZXJlKCdBZXJvc21pdGggTElWRScsIHBhcmFtcylcbiAgICAgICAgICAgIC50aGVuKHBhZ2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYWdlIDE6Jyk7XG4gICAgICAgICAgICAgICAgZm9yKCBsZXQgdmlkZW8gb2YgcGFnZS5lbGVtZW50cyApe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJyt2aWRlby50aXRsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhZ2UubmV4dFBhZ2UoKS50aGVuKHBhZ2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGFnZSAyOicpO1xuICAgICAgICAgICAgICAgICAgICBmb3IoIGxldCB2aWRlbyBvZiBwYWdlLmVsZW1lbnRzICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJyt2aWRlby50aXRsZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3NlbGYubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICBkZW1vMzogZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IF9zZWxmID0gdGhpcztcbiAgICAgICAgY29uc29sZS5sb2coJ1NFQVJDSCBNVUxUSVBMRSBFTlRJVElFUycpO1xuICAgICAgICBjb25zb2xlLmxvZyhgU2VhcmNoIGZvcjogYWRlbGVgKTtcbiAgICAgICAgU2VhcmNoLndoZXJlKCdhZGVsZScpXG4gICAgICAgICAgICAudGhlbihwYWdlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU2VhcmNoLndoZXJlJyk7XG4gICAgICAgICAgICAgICAgZm9yKCBsZXQgZW50aXR5IG9mIHBhZ2UuZWxlbWVudHMgKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7ZW50aXR5LmNvbnN0cnVjdG9yLm5hbWV9OiAke2VudGl0eS50aXRsZX0gJHtlbnRpdHkuaWR9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2VudGl0eS5nZXRUaHVtYm5haWwoKX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3NlbGYubmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICBkZW1vNDogZnVuY3Rpb24oIGNhbGxiYWNrID0gKCkgPT4ge30gKXtcbiAgICAgICAgbGV0IF9zZWxmID0gdGhpcztcbiAgICAgICAgbGV0IF9jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICBjb25zb2xlLmxvZygnQVVUSEVOVElDQVRJT04nKTtcbiAgICAgICAgQXV0aC5hdXRob3JpemUoKVxuICAgICAgICAgICAgLnRoZW4oIGF1dGhSZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGF1dGhSZXN1bHQpO1xuICAgICAgICAgICAgICAgIGxvZ2dlZEluSGFuZGxlcigpO1xuICAgICAgICAgICAgfSwoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2hvd0xvZ2luQnRuKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBsZXQgbG9nZ2VkSW5IYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgaGlkZUxvZ2luQnRuKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTUFLRSBBUEkgQ0FMTCEnKTtcbiAgICAgICAgICAgIF9jYWxsYmFjaygpO1xuICAgICAgICAgICAgX3NlbGYubmV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNob3dMb2dpbkJ0biA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW5fYnV0dG9uJyk7XG4gICAgICAgICAgICBidG4uc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgIGJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIEF1dGguc2hvd0F1dGgoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihhdXRoUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGF1dGhSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VkSW5IYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGF1dGhSZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NhbnQgYXV0aGVudGljYXRlLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXV0aFJlc3VsdC5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBoaWRlTG9naW5CdG4gPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ2luX2J1dHRvbicpO1xuICAgICAgICAgICAgYnRuLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGRlbW81OiBmdW5jdGlvbigpe1xuICAgICAgICBsZXQgX3NlbGYgPSB0aGlzO1xuICAgICAgICBEZW1vLmRlbW80KCAoKSA9PiB7XG4gICAgICAgICAgICBWaWRlby5zZXZlcmFsKFsnRGZHNlZLbmpyVncnLCdERFdLdW8zZ1hNUScsJ2hMUWwzV1FRb1EwJ10pXG4gICAgICAgICAgICAudGhlbihwYWdlID0+IHtcbiAgICAgICAgICAgICAgICBwYWdlLmVsZW1lbnRBdCgwKS5yYXRlKCdsaWtlJyk7XG4gICAgICAgICAgICAgICAgcGFnZS5lbGVtZW50QXQoMSkucmF0ZSgnbm9uZScpO1xuICAgICAgICAgICAgICAgIHBhZ2UuZWxlbWVudEF0KDIpLnJhdGUoJ2Rpc2xpa2UnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3NlbGYubmV4dCgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGRlbW9YOiBmdW5jdGlvbigpe1xuICAgICAgICBsZXQgX3NlbGYgPSB0aGlzO1xuICAgICAgICBfc2VsZi5uZXh0KCk7XG4gICAgfVxufTtcblxud2luZG93Lk9uR29vZ2xlQVBJTG9hZENhbGxiYWNrID0gKCkgPT4geyBcbiAgICBDb25maWcuc2V0KHtcbiAgICAgICAgICAgIGFwaUtleTogJ0FJemFTeUI4XzB0SVY2UXVTQTVRYjF6eDNrWFc4VUFCLWNBVFFYVScsXG4gICAgICAgICAgICBjbGllbnRJZDogJzg4NDc5NjAyMzMzNi0xNmQ4bWJmMms4cWdwbHM1bmtrdXBiMmtmNTRzdWczOC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbScsXG4gICAgICAgICAgICBzY29wZXM6IFsnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC95b3V0dWJlJ11cbiAgICAgICAgfSlcbiAgICAgICAgLmJvb3QoKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvL0RlbW8uYWxsKCk7XG4gICAgICAgICAgICBEZW1vLmRlbW80KCk7XG4gICAgICAgIH0pO1xufSIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvJC5jb3JlJykuUHJvbWlzZTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKS5TeW1ib2w7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gMjIuMS4zLjMxIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxudmFyIFVOU0NPUEFCTEVTID0gcmVxdWlyZSgnLi8kLndrcycpKCd1bnNjb3BhYmxlcycpXG4gICwgQXJyYXlQcm90byAgPSBBcnJheS5wcm90b3R5cGU7XG5pZihBcnJheVByb3RvW1VOU0NPUEFCTEVTXSA9PSB1bmRlZmluZWQpcmVxdWlyZSgnLi8kLmhpZGUnKShBcnJheVByb3RvLCBVTlNDT1BBQkxFUywge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICBBcnJheVByb3RvW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgVEFHID0gcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpXG4gIC8vIEVTMyB3cm9uZyBoZXJlXG4gICwgQVJHID0gY29mKGZ1bmN0aW9uKCl7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSAoTyA9IE9iamVjdChpdCkpW1RBR10pID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzEuMi42J307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLyQuYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTsiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59OyIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBrZXlzICAgICAgID0gJC5nZXRLZXlzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9ICQuZ2V0U3ltYm9scztcbiAgaWYoZ2V0U3ltYm9scyl7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KVxuICAgICAgLCBpc0VudW0gID0gJC5pc0VudW1cbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKHN5bWJvbHMubGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSlrZXlzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4ga2V5cztcbn07IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vJC5jb3JlJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuLyQuaGlkZScpXG4gICwgcmVkZWZpbmUgID0gcmVxdWlyZSgnLi8kLnJlZGVmaW5lJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSlcbiAgICAsIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiBrZXkgaW4gdGFyZ2V0O1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGV4cCA9IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZih0YXJnZXQgJiYgIW93bilyZWRlZmluZSh0YXJnZXQsIGtleSwgb3V0KTtcbiAgICAvLyBleHBvcnRcbiAgICBpZihleHBvcnRzW2tleV0gIT0gb3V0KWhpZGUoZXhwb3J0cywga2V5LCBleHApO1xuICAgIGlmKElTX1BST1RPICYmIGV4cFByb3RvW2tleV0gIT0gb3V0KWV4cFByb3RvW2tleV0gPSBvdXQ7XG4gIH1cbn07XG5nbG9iYWwuY29yZSA9IGNvcmU7XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7IC8vIHdyYXBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTsiLCJ2YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBjYWxsICAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi8kLmlzLWFycmF5LWl0ZXInKVxuICAsIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuLyQudG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCl7XG4gIHZhciBpdGVyRm4gPSBnZXRJdGVyRm4oaXRlcmFibGUpXG4gICAgLCBmICAgICAgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSlcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3I7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmKGlzQXJyYXlJdGVyKGl0ZXJGbikpZm9yKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gIH0gZWxzZSBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgKXtcbiAgICBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgfVxufTsiLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLWlvYmplY3QnKVxuICAsIGdldE5hbWVzICA9IHJlcXVpcmUoJy4vJCcpLmdldE5hbWVzXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uKGl0KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ2V0TmFtZXMoaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5nZXQgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgaWYod2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScpcmV0dXJuIGdldFdpbmRvd05hbWVzKGl0KTtcbiAgcmV0dXJuIGdldE5hbWVzKHRvSU9iamVjdChpdCkpO1xufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07IiwidmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiAkLnNldERlc2Mob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7IiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCBhcmdzLCB0aGF0KXtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2goYXJncy5sZW5ndGgpe1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgYXJncyk7XG59OyIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi8kLmNvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTsiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIElURVJBVE9SICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07IiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24oYXJnKXtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTsiLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBkZXNjcmlwdG9yICAgICA9IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vJC5zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gJC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuLyQubGlicmFyeScpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vJC5yZWRlZmluZScpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGlkZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBJdGVyYXRvcnMgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsICRpdGVyQ3JlYXRlICAgID0gcmVxdWlyZSgnLi8kLml0ZXItY3JlYXRlJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vJC5zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZ2V0UHJvdG8gICAgICAgPSByZXF1aXJlKCcuLyQnKS5nZXRQcm90b1xuICAsIElURVJBVE9SICAgICAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgbWV0aG9kcywga2V5O1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRuYXRpdmUpe1xuICAgIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvKCRkZWZhdWx0LmNhbGwobmV3IEJhc2UpKTtcbiAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgLy8gRkYgZml4XG4gICAgaWYoIUxJQlJBUlkgJiYgaGFzKHByb3RvLCBGRl9JVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgICBpZihERUZfVkFMVUVTICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgICB9XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKXtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZfVkFMVUVTICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpXG4gICAgfTtcbiAgICBpZihGT1JDRUQpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSlyZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59OyIsInZhciBJVEVSQVRPUiAgICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjLCBza2lwQ2xvc2luZyl7XG4gIGlmKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKXJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyICA9IFs3XVxuICAgICAgLCBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHNhZmUgPSB0cnVlOyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7fTsiLCJ2YXIgJE9iamVjdCA9IE9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGU6ICAgICAkT2JqZWN0LmNyZWF0ZSxcbiAgZ2V0UHJvdG86ICAgJE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgaXNFbnVtOiAgICAge30ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gIGdldERlc2M6ICAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICBzZXREZXNjOiAgICAkT2JqZWN0LmRlZmluZVByb3BlcnR5LFxuICBzZXREZXNjczogICAkT2JqZWN0LmRlZmluZVByb3BlcnRpZXMsXG4gIGdldEtleXM6ICAgICRPYmplY3Qua2V5cyxcbiAgZ2V0TmFtZXM6ICAgJE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICBnZXRTeW1ib2xzOiAkT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgZWFjaDogICAgICAgW10uZm9yRWFjaFxufTsiLCJ2YXIgJCAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCB0b0lPYmplY3QgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBrZXlzICAgPSAkLmdldEtleXMoTylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKGxlbmd0aCA+IGluZGV4KWlmKE9ba2V5ID0ga2V5c1tpbmRleCsrXV0gPT09IGVsKXJldHVybiBrZXk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZmFsc2U7IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vJC50YXNrJykuc2V0XG4gICwgT2JzZXJ2ZXIgID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXJcbiAgLCBwcm9jZXNzICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIFByb21pc2UgICA9IGdsb2JhbC5Qcm9taXNlXG4gICwgaXNOb2RlICAgID0gcmVxdWlyZSgnLi8kLmNvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xuICAsIGhlYWQsIGxhc3QsIG5vdGlmeTtcblxudmFyIGZsdXNoID0gZnVuY3Rpb24oKXtcbiAgdmFyIHBhcmVudCwgZG9tYWluLCBmbjtcbiAgaWYoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpe1xuICAgIHByb2Nlc3MuZG9tYWluID0gbnVsbDtcbiAgICBwYXJlbnQuZXhpdCgpO1xuICB9XG4gIHdoaWxlKGhlYWQpe1xuICAgIGRvbWFpbiA9IGhlYWQuZG9tYWluO1xuICAgIGZuICAgICA9IGhlYWQuZm47XG4gICAgaWYoZG9tYWluKWRvbWFpbi5lbnRlcigpO1xuICAgIGZuKCk7IC8vIDwtIGN1cnJlbnRseSB3ZSB1c2UgaXQgb25seSBmb3IgUHJvbWlzZSAtIHRyeSAvIGNhdGNoIG5vdCByZXF1aXJlZFxuICAgIGlmKGRvbWFpbilkb21haW4uZXhpdCgpO1xuICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgaWYocGFyZW50KXBhcmVudC5lbnRlcigpO1xufTtcblxuLy8gTm9kZS5qc1xuaWYoaXNOb2RlKXtcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgfTtcbi8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlclxufSBlbHNlIGlmKE9ic2VydmVyKXtcbiAgdmFyIHRvZ2dsZSA9IDFcbiAgICAsIG5vZGUgICA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHtjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gLXRvZ2dsZTtcbiAgfTtcbi8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG59IGVsc2UgaWYoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpe1xuICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZmx1c2gpO1xuICB9O1xuLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbi8vIC0gc2V0SW1tZWRpYXRlXG4vLyAtIE1lc3NhZ2VDaGFubmVsXG4vLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4vLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuLy8gLSBzZXRUaW1lb3V0XG59IGVsc2Uge1xuICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhc2FwKGZuKXtcbiAgdmFyIHRhc2sgPSB7Zm46IGZuLCBuZXh0OiB1bmRlZmluZWQsIGRvbWFpbjogaXNOb2RlICYmIHByb2Nlc3MuZG9tYWlufTtcbiAgaWYobGFzdClsYXN0Lm5leHQgPSB0YXNrO1xuICBpZighaGVhZCl7XG4gICAgaGVhZCA9IHRhc2s7XG4gICAgbm90aWZ5KCk7XG4gIH0gbGFzdCA9IHRhc2s7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTsiLCJ2YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLyQucmVkZWZpbmUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0LCBzcmMpe1xuICBmb3IodmFyIGtleSBpbiBzcmMpcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgcmV0dXJuIHRhcmdldDtcbn07IiwiLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmdcbi8vIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxudmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCBTUkMgICAgICAgPSByZXF1aXJlKCcuLyQudWlkJykoJ3NyYycpXG4gICwgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJ1xuICAsICR0b1N0cmluZyA9IEZ1bmN0aW9uW1RPX1NUUklOR11cbiAgLCBUUEwgICAgICAgPSAoJycgKyAkdG9TdHJpbmcpLnNwbGl0KFRPX1NUUklORyk7XG5cbnJlcXVpcmUoJy4vJC5jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIGtleSwgdmFsLCBzYWZlKXtcbiAgaWYodHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nKXtcbiAgICB2YWwuaGFzT3duUHJvcGVydHkoU1JDKSB8fCBoaWRlKHZhbCwgU1JDLCBPW2tleV0gPyAnJyArIE9ba2V5XSA6IFRQTC5qb2luKFN0cmluZyhrZXkpKSk7XG4gICAgdmFsLmhhc093blByb3BlcnR5KCduYW1lJykgfHwgaGlkZSh2YWwsICduYW1lJywga2V5KTtcbiAgfVxuICBpZihPID09PSBnbG9iYWwpe1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIHtcbiAgICBpZighc2FmZSlkZWxldGUgT1trZXldO1xuICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICB9XG59KShGdW5jdGlvbi5wcm90b3R5cGUsIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgdGhpc1tTUkNdIHx8ICR0b1N0cmluZy5jYWxsKHRoaXMpO1xufSk7IiwiLy8gNy4yLjkgU2FtZVZhbHVlKHgsIHkpXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5pcyB8fCBmdW5jdGlvbiBpcyh4LCB5KXtcbiAgcmV0dXJuIHggPT09IHkgPyB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geSA6IHggIT0geCAmJiB5ICE9IHk7XG59OyIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBnZXREZXNjICA9IHJlcXVpcmUoJy4vJCcpLmdldERlc2NcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbih0ZXN0LCBidWdneSwgc2V0KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vJC5jdHgnKShGdW5jdGlvbi5jYWxsLCBnZXREZXNjKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKXtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCAgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgJCAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJylcbiAgLCBTUEVDSUVTICAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSl7XG4gIHZhciBDID0gZ2xvYmFsW0tFWV07XG4gIGlmKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pJC5zZXREZXNjKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07IiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vJCcpLnNldERlc2NcbiAgLCBoYXMgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07IiwiLy8gNy4zLjIwIFNwZWNpZXNDb25zdHJ1Y3RvcihPLCBkZWZhdWx0Q29uc3RydWN0b3IpXG52YXIgYW5PYmplY3QgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi8kLmEtZnVuY3Rpb24nKVxuICAsIFNQRUNJRVMgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihPLCBEKXtcbiAgdmFyIEMgPSBhbk9iamVjdChPKS5jb25zdHJ1Y3RvciwgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBEIDogYUZ1bmN0aW9uKFMpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSl7XG4gIGlmKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpdGhyb3cgVHlwZUVycm9yKG5hbWUgKyBcIjogdXNlIHRoZSAnbmV3JyBvcGVyYXRvciFcIik7XG4gIHJldHVybiBpdDtcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vJC50by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTsiLCJ2YXIgY3R4ICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgaW52b2tlICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmludm9rZScpXG4gICwgaHRtbCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmh0bWwnKVxuICAsIGNlbCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5kb20tY3JlYXRlJylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIHNldFRhc2sgICAgICAgICAgICA9IGdsb2JhbC5zZXRJbW1lZGlhdGVcbiAgLCBjbGVhclRhc2sgICAgICAgICAgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGVcbiAgLCBNZXNzYWdlQ2hhbm5lbCAgICAgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWxcbiAgLCBjb3VudGVyICAgICAgICAgICAgPSAwXG4gICwgcXVldWUgICAgICAgICAgICAgID0ge31cbiAgLCBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJ1xuICAsIGRlZmVyLCBjaGFubmVsLCBwb3J0O1xudmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG4gIHZhciBpZCA9ICt0aGlzO1xuICBpZihxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpe1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn07XG52YXIgbGlzdG5lciA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYoIXNldFRhc2sgfHwgIWNsZWFyVGFzayl7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pe1xuICAgIHZhciBhcmdzID0gW10sIGkgPSAxO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpe1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZihyZXF1aXJlKCcuLyQuY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIH0gZWxzZSBpZihNZXNzYWdlQ2hhbm5lbCl7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbDtcbiAgICBwb3J0ICAgID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0bmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bi5jYWxsKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiAgIHNldFRhc2ssXG4gIGNsZWFyOiBjbGVhclRhc2tcbn07IiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59OyIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuLyQuaW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLyQudG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07IiwidmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07IiwidmFyIHN0b3JlICA9IHJlcXVpcmUoJy4vJC5zaGFyZWQnKSgnd2tzJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuLyQudWlkJylcbiAgLCBTeW1ib2wgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJykuU3ltYm9sO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgU3ltYm9sICYmIFN5bWJvbFtuYW1lXSB8fCAoU3ltYm9sIHx8IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTsiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmNvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLyQuYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpOyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLyQuY2xhc3NvZicpXG4gICwgdGVzdCAgICA9IHt9O1xudGVzdFtyZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJyldID0gJ3onO1xuaWYodGVzdCArICcnICE9ICdbb2JqZWN0IHpdJyl7XG4gIHJlcXVpcmUoJy4vJC5yZWRlZmluZScpKE9iamVjdC5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgcmV0dXJuICdbb2JqZWN0ICcgKyBjbGFzc29mKHRoaXMpICsgJ10nO1xuICB9LCB0cnVlKTtcbn0iLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgTElCUkFSWSAgICA9IHJlcXVpcmUoJy4vJC5saWJyYXJ5JylcbiAgLCBnbG9iYWwgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgY3R4ICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGNsYXNzb2YgICAgPSByZXF1aXJlKCcuLyQuY2xhc3NvZicpXG4gICwgJGV4cG9ydCAgICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIGlzT2JqZWN0ICAgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uICA9IHJlcXVpcmUoJy4vJC5hLWZ1bmN0aW9uJylcbiAgLCBzdHJpY3ROZXcgID0gcmVxdWlyZSgnLi8kLnN0cmljdC1uZXcnKVxuICAsIGZvck9mICAgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBzZXRQcm90byAgID0gcmVxdWlyZSgnLi8kLnNldC1wcm90bycpLnNldFxuICAsIHNhbWUgICAgICAgPSByZXF1aXJlKCcuLyQuc2FtZS12YWx1ZScpXG4gICwgU1BFQ0lFUyAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpXG4gICwgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi8kLnNwZWNpZXMtY29uc3RydWN0b3InKVxuICAsIGFzYXAgICAgICAgPSByZXF1aXJlKCcuLyQubWljcm90YXNrJylcbiAgLCBQUk9NSVNFICAgID0gJ1Byb21pc2UnXG4gICwgcHJvY2VzcyAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgaXNOb2RlICAgICA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnXG4gICwgUCAgICAgICAgICA9IGdsb2JhbFtQUk9NSVNFXVxuICAsIFdyYXBwZXI7XG5cbnZhciB0ZXN0UmVzb2x2ZSA9IGZ1bmN0aW9uKHN1Yil7XG4gIHZhciB0ZXN0ID0gbmV3IFAoZnVuY3Rpb24oKXt9KTtcbiAgaWYoc3ViKXRlc3QuY29uc3RydWN0b3IgPSBPYmplY3Q7XG4gIHJldHVybiBQLnJlc29sdmUodGVzdCkgPT09IHRlc3Q7XG59O1xuXG52YXIgVVNFX05BVElWRSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB3b3JrcyA9IGZhbHNlO1xuICBmdW5jdGlvbiBQMih4KXtcbiAgICB2YXIgc2VsZiA9IG5ldyBQKHgpO1xuICAgIHNldFByb3RvKHNlbGYsIFAyLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cbiAgdHJ5IHtcbiAgICB3b3JrcyA9IFAgJiYgUC5yZXNvbHZlICYmIHRlc3RSZXNvbHZlKCk7XG4gICAgc2V0UHJvdG8oUDIsIFApO1xuICAgIFAyLnByb3RvdHlwZSA9ICQuY3JlYXRlKFAucHJvdG90eXBlLCB7Y29uc3RydWN0b3I6IHt2YWx1ZTogUDJ9fSk7XG4gICAgLy8gYWN0dWFsIEZpcmVmb3ggaGFzIGJyb2tlbiBzdWJjbGFzcyBzdXBwb3J0LCB0ZXN0IHRoYXRcbiAgICBpZighKFAyLnJlc29sdmUoNSkudGhlbihmdW5jdGlvbigpe30pIGluc3RhbmNlb2YgUDIpKXtcbiAgICAgIHdvcmtzID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIGFjdHVhbCBWOCBidWcsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTYyXG4gICAgaWYod29ya3MgJiYgcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJykpe1xuICAgICAgdmFyIHRoZW5hYmxlVGhlbkdvdHRlbiA9IGZhbHNlO1xuICAgICAgUC5yZXNvbHZlKCQuc2V0RGVzYyh7fSwgJ3RoZW4nLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKXsgdGhlbmFibGVUaGVuR290dGVuID0gdHJ1ZTsgfVxuICAgICAgfSkpO1xuICAgICAgd29ya3MgPSB0aGVuYWJsZVRoZW5Hb3R0ZW47XG4gICAgfVxuICB9IGNhdGNoKGUpeyB3b3JrcyA9IGZhbHNlOyB9XG4gIHJldHVybiB3b3Jrcztcbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIHNhbWVDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKGEsIGIpe1xuICAvLyBsaWJyYXJ5IHdyYXBwZXIgc3BlY2lhbCBjYXNlXG4gIGlmKExJQlJBUlkgJiYgYSA9PT0gUCAmJiBiID09PSBXcmFwcGVyKXJldHVybiB0cnVlO1xuICByZXR1cm4gc2FtZShhLCBiKTtcbn07XG52YXIgZ2V0Q29uc3RydWN0b3IgPSBmdW5jdGlvbihDKXtcbiAgdmFyIFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXTtcbiAgcmV0dXJuIFMgIT0gdW5kZWZpbmVkID8gUyA6IEM7XG59O1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbihpdCl7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIFByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oQyl7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uKCQkcmVzb2x2ZSwgJCRyZWplY3Qpe1xuICAgIGlmKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSksXG4gIHRoaXMucmVqZWN0ICA9IGFGdW5jdGlvbihyZWplY3QpXG59O1xudmFyIHBlcmZvcm0gPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICBleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHtlcnJvcjogZX07XG4gIH1cbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24ocmVjb3JkLCBpc1JlamVjdCl7XG4gIGlmKHJlY29yZC5uKXJldHVybjtcbiAgcmVjb3JkLm4gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSByZWNvcmQuYztcbiAgYXNhcChmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHJlY29yZC52XG4gICAgICAsIG9rICAgID0gcmVjb3JkLnMgPT0gMVxuICAgICAgLCBpICAgICA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlYWN0aW9uKXtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWxcbiAgICAgICAgLCByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZVxuICAgICAgICAsIHJlamVjdCAgPSByZWFjdGlvbi5yZWplY3RcbiAgICAgICAgLCByZXN1bHQsIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICBpZihoYW5kbGVyKXtcbiAgICAgICAgICBpZighb2spcmVjb3JkLmggPSB0cnVlO1xuICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIgPT09IHRydWUgPyB2YWx1ZSA6IGhhbmRsZXIodmFsdWUpO1xuICAgICAgICAgIGlmKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSl7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZih0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKXtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoKGUpe1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBjaGFpbi5sZW5ndGggPSAwO1xuICAgIHJlY29yZC5uID0gZmFsc2U7XG4gICAgaWYoaXNSZWplY3Qpc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgdmFyIHByb21pc2UgPSByZWNvcmQucFxuICAgICAgICAsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgICBpZihpc1VuaGFuZGxlZChwcm9taXNlKSl7XG4gICAgICAgIGlmKGlzTm9kZSl7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZihoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKXtcbiAgICAgICAgICBoYW5kbGVyKHtwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlfSk7XG4gICAgICAgIH0gZWxzZSBpZigoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKXtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gcmVjb3JkLmEgPSB1bmRlZmluZWQ7XG4gICAgfSwgMSk7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB2YXIgcmVjb3JkID0gcHJvbWlzZS5fZFxuICAgICwgY2hhaW4gID0gcmVjb3JkLmEgfHwgcmVjb3JkLmNcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlYWN0aW9uO1xuICBpZihyZWNvcmQuaClyZXR1cm4gZmFsc2U7XG4gIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpe1xuICAgIHJlYWN0aW9uID0gY2hhaW5baSsrXTtcbiAgICBpZihyZWFjdGlvbi5mYWlsIHx8ICFpc1VuaGFuZGxlZChyZWFjdGlvbi5wcm9taXNlKSlyZXR1cm4gZmFsc2U7XG4gIH0gcmV0dXJuIHRydWU7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciByZWNvcmQgPSB0aGlzO1xuICBpZihyZWNvcmQuZClyZXR1cm47XG4gIHJlY29yZC5kID0gdHJ1ZTtcbiAgcmVjb3JkID0gcmVjb3JkLnIgfHwgcmVjb3JkOyAvLyB1bndyYXBcbiAgcmVjb3JkLnYgPSB2YWx1ZTtcbiAgcmVjb3JkLnMgPSAyO1xuICByZWNvcmQuYSA9IHJlY29yZC5jLnNsaWNlKCk7XG4gIG5vdGlmeShyZWNvcmQsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHJlY29yZCA9IHRoaXNcbiAgICAsIHRoZW47XG4gIGlmKHJlY29yZC5kKXJldHVybjtcbiAgcmVjb3JkLmQgPSB0cnVlO1xuICByZWNvcmQgPSByZWNvcmQuciB8fCByZWNvcmQ7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmKHJlY29yZC5wID09PSB2YWx1ZSl0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZih0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpe1xuICAgICAgYXNhcChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd3JhcHBlciA9IHtyOiByZWNvcmQsIGQ6IGZhbHNlfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWNvcmQudiA9IHZhbHVlO1xuICAgICAgcmVjb3JkLnMgPSAxO1xuICAgICAgbm90aWZ5KHJlY29yZCwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaChlKXtcbiAgICAkcmVqZWN0LmNhbGwoe3I6IHJlY29yZCwgZDogZmFsc2V9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYoIVVTRV9OQVRJVkUpe1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICBQID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICB2YXIgcmVjb3JkID0gdGhpcy5fZCA9IHtcbiAgICAgIHA6IHN0cmljdE5ldyh0aGlzLCBQLCBQUk9NSVNFKSwgICAgICAgICAvLyA8LSBwcm9taXNlXG4gICAgICBjOiBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgICBhOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICAgIHM6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgICAgZDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICAgIHY6IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgaDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGhhbmRsZWQgcmVqZWN0aW9uXG4gICAgICBuOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCByZWNvcmQsIDEpLCBjdHgoJHJlamVjdCwgcmVjb3JkLCAxKSk7XG4gICAgfSBjYXRjaChlcnIpe1xuICAgICAgJHJlamVjdC5jYWxsKHJlY29yZCwgZXJyKTtcbiAgICB9XG4gIH07XG4gIHJlcXVpcmUoJy4vJC5yZWRlZmluZS1hbGwnKShQLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCl7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsIFApKVxuICAgICAgICAsIHByb21pc2UgID0gcmVhY3Rpb24ucHJvbWlzZVxuICAgICAgICAsIHJlY29yZCAgID0gdGhpcy5fZDtcbiAgICAgIHJlYWN0aW9uLm9rICAgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWNvcmQuYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmKHJlY29yZC5hKXJlY29yZC5hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYocmVjb3JkLnMpbm90aWZ5KHJlY29yZCwgZmFsc2UpO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpe1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtQcm9taXNlOiBQfSk7XG5yZXF1aXJlKCcuLyQuc2V0LXRvLXN0cmluZy10YWcnKShQLCBQUk9NSVNFKTtcbnJlcXVpcmUoJy4vJC5zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vJC5jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocil7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXcgUHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZWplY3QgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgICQkcmVqZWN0KHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgdGVzdFJlc29sdmUodHJ1ZSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpe1xuICAgIC8vIGluc3RhbmNlb2YgaW5zdGVhZCBvZiBpbnRlcm5hbCBzbG90IGNoZWNrIGJlY2F1c2Ugd2Ugc2hvdWxkIGZpeCBpdCB3aXRob3V0IHJlcGxhY2VtZW50IG5hdGl2ZSBQcm9taXNlIGNvcmVcbiAgICBpZih4IGluc3RhbmNlb2YgUCAmJiBzYW1lQ29uc3RydWN0b3IoeC5jb25zdHJ1Y3RvciwgdGhpcykpcmV0dXJuIHg7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXcgUHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZXNvbHZlICA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICAkJHJlc29sdmUoeCk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXtcbiAgUC5hbGwoaXRlcilbJ2NhdGNoJ10oZnVuY3Rpb24oKXt9KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgICAgID0gZ2V0Q29uc3RydWN0b3IodGhpcylcbiAgICAgICwgY2FwYWJpbGl0eSA9IG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgLCByZXNvbHZlICAgID0gY2FwYWJpbGl0eS5yZXNvbHZlXG4gICAgICAsIHJlamVjdCAgICAgPSBjYXBhYmlsaXR5LnJlamVjdFxuICAgICAgLCB2YWx1ZXMgICAgID0gW107XG4gICAgdmFyIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgdmFsdWVzLnB1c2gsIHZhbHVlcyk7XG4gICAgICB2YXIgcmVtYWluaW5nID0gdmFsdWVzLmxlbmd0aFxuICAgICAgICAsIHJlc3VsdHMgICA9IEFycmF5KHJlbWFpbmluZyk7XG4gICAgICBpZihyZW1haW5pbmcpJC5lYWNoLmNhbGwodmFsdWVzLCBmdW5jdGlvbihwcm9taXNlLCBpbmRleCl7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICBpZihhbHJlYWR5Q2FsbGVkKXJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIGVsc2UgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgICAgICA9IGdldENvbnN0cnVjdG9yKHRoaXMpXG4gICAgICAsIGNhcGFiaWxpdHkgPSBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgICwgcmVqZWN0ICAgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciAkICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi8kLnJlZGVmaW5lJylcbiAgLCAkZmFpbHMgICAgICAgICA9IHJlcXVpcmUoJy4vJC5mYWlscycpXG4gICwgc2hhcmVkICAgICAgICAgPSByZXF1aXJlKCcuLyQuc2hhcmVkJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vJC5zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgdWlkICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQudWlkJylcbiAgLCB3a3MgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC53a3MnKVxuICAsIGtleU9mICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmtleW9mJylcbiAgLCAkbmFtZXMgICAgICAgICA9IHJlcXVpcmUoJy4vJC5nZXQtbmFtZXMnKVxuICAsIGVudW1LZXlzICAgICAgID0gcmVxdWlyZSgnLi8kLmVudW0ta2V5cycpXG4gICwgaXNBcnJheSAgICAgICAgPSByZXF1aXJlKCcuLyQuaXMtYXJyYXknKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpXG4gICwgZ2V0RGVzYyAgICAgICAgPSAkLmdldERlc2NcbiAgLCBzZXREZXNjICAgICAgICA9ICQuc2V0RGVzY1xuICAsIF9jcmVhdGUgICAgICAgID0gJC5jcmVhdGVcbiAgLCBnZXROYW1lcyAgICAgICA9ICRuYW1lcy5nZXRcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBzZXR0ZXIgICAgICAgICA9IGZhbHNlXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIGlzRW51bSAgICAgICAgID0gJC5pc0VudW1cbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzICAgICA9IHNoYXJlZCgnc3ltYm9scycpXG4gICwgdXNlTmF0aXZlICAgICAgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3QucHJvdG90eXBlO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBfY3JlYXRlKHNldERlc2Moe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHNldERlc2ModGhpcywgJ2EnLCB7dmFsdWU6IDd9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICB2YXIgcHJvdG9EZXNjID0gZ2V0RGVzYyhPYmplY3RQcm90bywga2V5KTtcbiAgaWYocHJvdG9EZXNjKWRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBzZXREZXNjKGl0LCBrZXksIEQpO1xuICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKXNldERlc2MoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBzZXREZXNjO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uKHRhZyl7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2wucHJvdG90eXBlKTtcbiAgc3ltLl9rID0gdGFnO1xuICBERVNDUklQVE9SUyAmJiBzZXR0ZXIgJiYgc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpe1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpKXtcbiAgICBpZighRC5lbnVtZXJhYmxlKXtcbiAgICAgIGlmKCFoYXMoaXQsIEhJRERFTikpc2V0RGVzYyhpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKWl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwge2VudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gc2V0RGVzYyhpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5KTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XVxuICAgID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gIHZhciBEID0gZ2V0RGVzYyhpdCA9IHRvSU9iamVjdChpdCksIGtleSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdldE5hbWVzKHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTilyZXN1bHQucHVzaChrZXkpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdldE5hbWVzKHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSlyZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KGl0KXtcbiAgaWYoaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gIHZhciBhcmdzID0gW2l0XVxuICAgICwgaSAgICA9IDFcbiAgICAsICQkICAgPSBhcmd1bWVudHNcbiAgICAsIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gIHdoaWxlKCQkLmxlbmd0aCA+IGkpYXJncy5wdXNoKCQkW2krK10pO1xuICByZXBsYWNlciA9IGFyZ3NbMV07XG4gIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICBpZigkcmVwbGFjZXIgfHwgIWlzQXJyYXkocmVwbGFjZXIpKXJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgaWYoJHJlcGxhY2VyKXZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gIH07XG4gIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xufTtcbnZhciBidWdneUpTT04gPSAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoe2E6IFN9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSk7XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYoIXVzZU5hdGl2ZSl7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKXtcbiAgICBpZihpc1N5bWJvbCh0aGlzKSl0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xuICAgIHJldHVybiB3cmFwKHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCkpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgaXNTeW1ib2wgPSBmdW5jdGlvbihpdCl7XG4gICAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbiAgfTtcblxuICAkLmNyZWF0ZSAgICAgPSAkY3JlYXRlO1xuICAkLmlzRW51bSAgICAgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gICQuZ2V0RGVzYyAgICA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICQuc2V0RGVzYyAgICA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgJC5zZXREZXNjcyAgID0gJGRlZmluZVByb3BlcnRpZXM7XG4gICQuZ2V0TmFtZXMgICA9ICRuYW1lcy5nZXQgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgJC5nZXRTeW1ib2xzID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZihERVNDUklQVE9SUyAmJiAhcmVxdWlyZSgnLi8kLmxpYnJhcnknKSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cbn1cblxudmFyIHN5bWJvbFN0YXRpY3MgPSB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgcmV0dXJuIGtleU9mKFN5bWJvbFJlZ2lzdHJ5LCBrZXkpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn07XG4vLyAxOS40LjIuMiBTeW1ib2wuaGFzSW5zdGFuY2Vcbi8vIDE5LjQuMi4zIFN5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGVcbi8vIDE5LjQuMi40IFN5bWJvbC5pdGVyYXRvclxuLy8gMTkuNC4yLjYgU3ltYm9sLm1hdGNoXG4vLyAxOS40LjIuOCBTeW1ib2wucmVwbGFjZVxuLy8gMTkuNC4yLjkgU3ltYm9sLnNlYXJjaFxuLy8gMTkuNC4yLjEwIFN5bWJvbC5zcGVjaWVzXG4vLyAxOS40LjIuMTEgU3ltYm9sLnNwbGl0XG4vLyAxOS40LjIuMTIgU3ltYm9sLnRvUHJpbWl0aXZlXG4vLyAxOS40LjIuMTMgU3ltYm9sLnRvU3RyaW5nVGFnXG4vLyAxOS40LjIuMTQgU3ltYm9sLnVuc2NvcGFibGVzXG4kLmVhY2guY2FsbCgoXG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsJyArXG4gICdzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBmdW5jdGlvbihpdCl7XG4gIHZhciBzeW0gPSB3a3MoaXQpO1xuICBzeW1ib2xTdGF0aWNzW2l0XSA9IHVzZU5hdGl2ZSA/IHN5bSA6IHdyYXAoc3ltKTtcbn0pO1xuXG5zZXR0ZXIgPSB0cnVlO1xuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVywge1N5bWJvbDogJFN5bWJvbH0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1N5bWJvbCcsIHN5bWJvbFN0YXRpY3MpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICF1c2VOYXRpdmUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCF1c2VOYXRpdmUgfHwgYnVnZ3lKU09OKSwgJ0pTT04nLCB7c3RyaW5naWZ5OiAkc3RyaW5naWZ5fSk7XG5cbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7IiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGhpZGUgICAgICAgID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIEl0ZXJhdG9ycyAgID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBOTCAgICAgICAgICA9IGdsb2JhbC5Ob2RlTGlzdFxuICAsIEhUQyAgICAgICAgID0gZ2xvYmFsLkhUTUxDb2xsZWN0aW9uXG4gICwgTkxQcm90byAgICAgPSBOTCAmJiBOTC5wcm90b3R5cGVcbiAgLCBIVENQcm90byAgICA9IEhUQyAmJiBIVEMucHJvdG90eXBlXG4gICwgQXJyYXlWYWx1ZXMgPSBJdGVyYXRvcnMuTm9kZUxpc3QgPSBJdGVyYXRvcnMuSFRNTENvbGxlY3Rpb24gPSBJdGVyYXRvcnMuQXJyYXk7XG5pZihOTFByb3RvICYmICFOTFByb3RvW0lURVJBVE9SXSloaWRlKE5MUHJvdG8sIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG5pZihIVENQcm90byAmJiAhSFRDUHJvdG9bSVRFUkFUT1JdKWhpZGUoSFRDUHJvdG8sIElURVJBVE9SLCBBcnJheVZhbHVlcyk7IiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKHNlbGYuZmV0Y2gpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICgvW15hLXowLTlcXC0jJCUmJyorLlxcXl9gfH5dL2kudGVzdChuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICAgIH1cbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgZnVuY3Rpb24gSGVhZGVycyhoZWFkZXJzKSB7XG4gICAgdGhpcy5tYXAgPSB7fVxuXG4gICAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpXG4gICAgICB9LCB0aGlzKVxuXG4gICAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSlcbiAgICAgIH0sIHRoaXMpXG4gICAgfVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG4gICAgdmFyIGxpc3QgPSB0aGlzLm1hcFtuYW1lXVxuICAgIGlmICghbGlzdCkge1xuICAgICAgbGlzdCA9IFtdXG4gICAgICB0aGlzLm1hcFtuYW1lXSA9IGxpc3RcbiAgICB9XG4gICAgbGlzdC5wdXNoKHZhbHVlKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciB2YWx1ZXMgPSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxuICAgIHJldHVybiB2YWx1ZXMgPyB2YWx1ZXNbMF0gOiBudWxsXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldIHx8IFtdXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gW25vcm1hbGl6ZVZhbHVlKHZhbHVlKV1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMubWFwKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHRoaXMubWFwW25hbWVdLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWx1ZSwgbmFtZSwgdGhpcylcbiAgICAgIH0sIHRoaXMpXG4gICAgfSwgdGhpcylcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICAgIHJldHVybiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYilcbiAgICByZXR1cm4gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgfVxuXG4gIHZhciBzdXBwb3J0ID0ge1xuICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKCk7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSkoKSxcbiAgICBmb3JtRGF0YTogJ0Zvcm1EYXRhJyBpbiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBCb2R5KCkge1xuICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG5cbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keVxuICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIEJvZHlJbml0IHR5cGUnKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgIHRoaXMuYmxvYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUJsb2IpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlUZXh0XSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICB9XG5cbiAgICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiByZWFkQmxvYkFzVGV4dCh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgdGV4dCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkID8gcmVqZWN0ZWQgOiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuanNvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oSlNPTi5wYXJzZSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXG4gIHZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcbiAgICByZXR1cm4gKG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xKSA/IHVwY2FzZWQgOiBtZXRob2RcbiAgfVxuXG4gIGZ1bmN0aW9uIFJlcXVlc3QodXJsLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICB0aGlzLnVybCA9IHVybFxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgJ29taXQnXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnKVxuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCBudWxsXG4gICAgdGhpcy5yZWZlcnJlciA9IG51bGxcblxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIG9wdGlvbnMuYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShvcHRpb25zLmJvZHkpXG4gIH1cblxuICBmdW5jdGlvbiBkZWNvZGUoYm9keSkge1xuICAgIHZhciBmb3JtID0gbmV3IEZvcm1EYXRhKClcbiAgICBib2R5LnRyaW0oKS5zcGxpdCgnJicpLmZvckVhY2goZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGlmIChieXRlcykge1xuICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpXG4gICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGZvcm1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhlYWRlcnMoeGhyKSB7XG4gICAgdmFyIGhlYWQgPSBuZXcgSGVhZGVycygpXG4gICAgdmFyIHBhaXJzID0geGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpLnRyaW0oKS5zcGxpdCgnXFxuJylcbiAgICBwYWlycy5mb3JFYWNoKGZ1bmN0aW9uKGhlYWRlcikge1xuICAgICAgdmFyIHNwbGl0ID0gaGVhZGVyLnRyaW0oKS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gc3BsaXQuc2hpZnQoKS50cmltKClcbiAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJzonKS50cmltKClcbiAgICAgIGhlYWQuYXBwZW5kKGtleSwgdmFsdWUpXG4gICAgfSlcbiAgICByZXR1cm4gaGVhZFxuICB9XG5cbiAgQm9keS5jYWxsKFJlcXVlc3QucHJvdG90eXBlKVxuXG4gIGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHlJbml0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge31cbiAgICB9XG5cbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCdcbiAgICB0aGlzLnVybCA9IG51bGxcbiAgICB0aGlzLnN0YXR1cyA9IG9wdGlvbnMuc3RhdHVzXG4gICAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMFxuICAgIHRoaXMuc3RhdHVzVGV4dCA9IG9wdGlvbnMuc3RhdHVzVGV4dFxuICAgIHRoaXMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMgPyBvcHRpb25zLmhlYWRlcnMgOiBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJ1xuICB9XG5cbiAgQm9keS5jYWxsKFJlc3BvbnNlLnByb3RvdHlwZSlcblxuICBzZWxmLkhlYWRlcnMgPSBIZWFkZXJzO1xuICBzZWxmLlJlcXVlc3QgPSBSZXF1ZXN0O1xuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2U7XG5cbiAgc2VsZi5mZXRjaCA9IGZ1bmN0aW9uKGlucHV0LCBpbml0KSB7XG4gICAgLy8gVE9ETzogUmVxdWVzdCBjb25zdHJ1Y3RvciBzaG91bGQgYWNjZXB0IGlucHV0LCBpbml0XG4gICAgdmFyIHJlcXVlc3RcbiAgICBpZiAoUmVxdWVzdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihpbnB1dCkgJiYgIWluaXQpIHtcbiAgICAgIHJlcXVlc3QgPSBpbnB1dFxuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgIGZ1bmN0aW9uIHJlc3BvbnNlVVJMKCkge1xuICAgICAgICBpZiAoJ3Jlc3BvbnNlVVJMJyBpbiB4aHIpIHtcbiAgICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlVVJMXG4gICAgICAgIH1cblxuICAgICAgICAvLyBBdm9pZCBzZWN1cml0eSB3YXJuaW5ncyBvbiBnZXRSZXNwb25zZUhlYWRlciB3aGVuIG5vdCBhbGxvd2VkIGJ5IENPUlNcbiAgICAgICAgaWYgKC9eWC1SZXF1ZXN0LVVSTDovbS50ZXN0KHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkpIHtcbiAgICAgICAgICByZXR1cm4geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdYLVJlcXVlc3QtVVJMJylcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3RhdHVzID0gKHhoci5zdGF0dXMgPT09IDEyMjMpID8gMjA0IDogeGhyLnN0YXR1c1xuICAgICAgICBpZiAoc3RhdHVzIDwgMTAwIHx8IHN0YXR1cyA+IDU5OSkge1xuICAgICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiBzdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVycyh4aHIpLFxuICAgICAgICAgIHVybDogcmVzcG9uc2VVUkwoKVxuICAgICAgICB9XG4gICAgICAgIHZhciBib2R5ID0gJ3Jlc3BvbnNlJyBpbiB4aHIgPyB4aHIucmVzcG9uc2UgOiB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsLCB0cnVlKVxuXG4gICAgICBpZiAocmVxdWVzdC5jcmVkZW50aWFscyA9PT0gJ2luY2x1ZGUnKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmICgncmVzcG9uc2VUeXBlJyBpbiB4aHIgJiYgc3VwcG9ydC5ibG9iKSB7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYidcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdC5oZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpXG4gICAgICB9KVxuXG4gICAgICB4aHIuc2VuZCh0eXBlb2YgcmVxdWVzdC5fYm9keUluaXQgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHJlcXVlc3QuX2JvZHlJbml0KVxuICAgIH0pXG4gIH1cbiAgc2VsZi5mZXRjaC5wb2x5ZmlsbCA9IHRydWVcbn0pKCk7XG4iLCIndXNlIHN0cmljdCdcbmltcG9ydCBDbGllbnQgZnJvbSAnLi8uLi9zZXJ2aWNlcy9Zb3VUdWJlQVBJQ2xpZW50JztcbmltcG9ydCBQYWdpbmF0b3IgZnJvbSAnLi9QYWdpbmF0b3InO1xuaW1wb3J0IFNlYXJjaFBhcmFtcyBmcm9tICcuL1NlYXJjaFBhcmFtcyc7XG5pbXBvcnQgTWFudWZhY3R1cmVyIGZyb20gJy4vTWFudWZhY3R1cmVyJztcblxuY2xhc3MgQnJvd3NlciB7XG4gICAgY29uc3RydWN0b3IoIHBhcmFtcyA9IHt9ICkge1xuICAgICAgICB0aGlzLl9jb25maWcgPSBuZXcgU2VhcmNoUGFyYW1zO1xuICAgICAgICB0aGlzLl9wYWdpbmF0b3IgPSBuZXcgUGFnaW5hdG9yO1xuICAgICAgICB0aGlzLl9wYWdpbmF0b3IuYnJvd3NlciA9IHRoaXM7XG4gICAgfVxuXG4gICAgc2V0IGNvbmZpZyggc2VhcmNoUGFyYW1zID0ge30gKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oIHRoaXMuX2NvbmZpZywgc2VhcmNoUGFyYW1zICk7XG4gICAgICAgIHRoaXMuX3BhZ2luYXRvci51cGRhdGUoIHNlYXJjaFBhcmFtcyApO1xuICAgIH1cblxuICAgIF9nZXRTZWFyY2hQYXRoKCkge1xuICAgICAgICBsZXQgcGF0aCA9IGBzZWFyY2gubGlzdGA7XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cblxuICAgIF9nZXRTZWFyY2hQYXlsb2FkKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuX2NvbmZpZztcbiAgICAgICAgT2JqZWN0LmFzc2lnbiggZGF0YSwgdGhpcy5fcGFnaW5hdG9yLmdldFBhZ2luYXRpb25QYXJhbXMoKSApO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBfcHJvY2Vzc1F1ZXJ5KCBwcm9taXNlICkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBsZXQgY29sbGVjdGlvbiA9IFtdO1xuICAgICAgICAgICAgZm9yKCBsZXQgaXRlbSBvZiByZXNwb25zZS5yZXN1bHQuaXRlbXMgKXtcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uLnB1c2goIE1hbnVmYWN0dXJlci5tYWtlKCBpdGVtICkgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy91cGRhdGUgcGFnaW5hdG9yXG4gICAgICAgICAgICB0aGlzLl9wYWdpbmF0b3IudXBkYXRlKCByZXNwb25zZS5yZXN1bHQgKTtcbiAgICAgICAgICAgIHRoaXMuX3BhZ2luYXRvci5zZXRQYWdlKCBjb2xsZWN0aW9uICk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFnaW5hdG9yO1xuICAgICAgICB9LCByZWplY3QgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVqZWN0KTtcbiAgICAgICAgICAgIHJldHVybiByZWplY3Q7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFsbCgpIHtcbiAgICAgICAgbGV0IHBhdGggPSBgc2VhcmNoLmxpc3RgO1xuICAgICAgICBsZXQgcGF5bG9hZCA9IHRoaXMuX2dldFNlYXJjaFBheWxvYWQoKTtcbiAgICAgICAgbGV0IHByb21pc2UgPSBDbGllbnQucmVxdWVzdCggcGF0aCwgcGF5bG9hZCApO1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc1F1ZXJ5KCBwcm9taXNlICk7XG4gICAgfVxuXG4gICAgZmluZCgpIHtcbiAgICAgICAgbGV0IHBhdGggPSBgJHt0aGlzLl9jb25maWcudHlwZX0ubGlzdGA7XG4gICAgICAgIGxldCBwYXlsb2FkID0gdGhpcy5fZ2V0U2VhcmNoUGF5bG9hZCgpO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IENsaWVudC5yZXF1ZXN0KCBwYXRoLCBwYXlsb2FkICk7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzUXVlcnkoIHByb21pc2UgKTtcbiAgICB9XG5cbiAgICByYXRlKCkge1xuICAgICAgICBsZXQgcGF0aCA9IGAke3RoaXMuX2NvbmZpZy50eXBlfS5yYXRlYDtcbiAgICAgICAgbGV0IHBheWxvYWQgPSB0aGlzLl9nZXRTZWFyY2hQYXlsb2FkKCk7XG4gICAgICAgIHJldHVybiBDbGllbnQucmVxdWVzdCggcGF0aCwgcGF5bG9hZCApO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBCcm93c2VyO1xuIiwiJ3VzZSBzdHJpY3QnXG4vKlxuKiBUaGVyZSBpcyBhbiBpc3N1ZSB0cnlpbmcgdG8gaW1wb3J0IGVudGl0aWVzIGZyb20gaGVyZSBiZWNhdXNlIGxvb3BzXG4qIFlvdVR1YmVWaWRlbyBpbXBvcnQgLVlvdVR1YmVTZWFyY2gtIGltcG9ydCBNYW5mYWN0dXJlciBpbXBvcnQgWW91VHViZVBsYXlsaXN0IGltcG9ydCAtWW91VHViZVNlYXJjaC0gKGhlcmUgZmFpbHMpXG4qIFRvIHNvbHZlIHRoZSBwcm9ibGVtIG1ha2UgTWFudWZhY3R1cmVyIGNyZWF0ZSBvYmplY3QgZnJvbSBjbGFzc2VzIG5vdCBleHBsaWNpdCBpbXBvcnRlZC5cbiogQ2xhc3NlcyBhcmUgc3VzY3JpYmVkIHZpYSBNYW51ZmFjdHVyZXIuYWRkKClcbiovXG5cblxuLyppbXBvcnQgVmlkZW8gZnJvbSAgICcuLy4uL2VudGl0aWVzL1lvdVR1YmVWaWRlbyc7XG5pbXBvcnQgQ2hhbm5lbCBmcm9tICcuLy4uL2VudGl0aWVzL1lvdVR1YmVDaGFubmVsJztcbmltcG9ydCBQbGF5aXN0IGZyb20gJy4vLi4vZW50aXRpZXMvWW91VHViZVBsYXlsaXN0JztcblxuY2xhc3MgTWFudWZhY3R1cmVyIHtcbiAgICBzdGF0aWMgbWFrZSggWW91VHViZVJlc3VsdEl0ZW0gKXtcbiAgICAgICAgY29uc29sZS5sb2coJ01hbnVmYWN0dXJlcjo6bWFrZScpO1xuICAgICAgICBsZXQgaXRlbTtcbiAgICAgICAgc3dpdGNoKCBZb3VUdWJlUmVzdWx0SXRlbS5pZC5raW5kICl7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FzZSAneW91dHViZSN2aWRlbyc6XG4gICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBWaWRlbyggWW91VHViZVJlc3VsdEl0ZW0gKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3lvdXR1YmUjY2hhbm5lbCc6XG4gICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBDaGFubmVsKCBZb3VUdWJlUmVzdWx0SXRlbSApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneW91dHViZSNwbGF5bGlzdCc6XG4gICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBQbGF5aXN0KCBZb3VUdWJlUmVzdWx0SXRlbSApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cbn0qL1xuXG5pbXBvcnQgRW50aXR5TW9kZWwgZnJvbSAgICcuLy4uL2VudGl0aWVzL0VudGl0eU1vZGVsJztcblxuLyoqXG4qIEZsYWcgZm9yIGF2b2lkIG11bHRpcGxlIGluc3RhbmNlcyBvZiBDb25maWcgY2xhc3NcbiogQHR5cGUge2Jvb2xlYW59XG4qL1xudmFyICBzaW5nbGV0b24gPSBmYWxzZTtcblxuY2xhc3MgTWFudWZhY3R1cmVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmZhY3RvcmllcyA9IFtdO1xuICAgIH1cblxuICAgIGFkZCgga2V5LCBmYWN0b3J5ICkge1xuICAgICAgICB0aGlzLmZhY3Rvcmllcy5wdXNoKCB7a2V5OiBrZXksIHNvdXJjZTogZmFjdG9yeX0gKTtcbiAgICB9XG5cbiAgICBtYWtlKCBZb3VUdWJlUmVzdWx0SXRlbSApIHtcbiAgICAgICAgbGV0IGl0ZW07XG4gICAgICAgIGZvciggbGV0IGZhY3Rvcnkgb2YgdGhpcy5mYWN0b3JpZXMgKXtcbiAgICAgICAgICAgIGlmKCBmYWN0b3J5LmtleSA9PSBZb3VUdWJlUmVzdWx0SXRlbS5pZC5raW5kIC8vZm9yIFNlYXJjaC5MaXN0XG4gICAgICAgICAgICAgfHwgZmFjdG9yeS5rZXkgPT0gWW91VHViZVJlc3VsdEl0ZW0ua2luZCAvL2ZvciBWaWRlb3MuTGlzdFxuICAgICAgICAgICAgKXtcbiAgICAgICAgICAgICAgICBpdGVtID0gbmV3IGZhY3Rvcnkuc291cmNlKCBZb3VUdWJlUmVzdWx0SXRlbSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtIHx8IG5ldyBFbnRpdHlNb2RlbChZb3VUdWJlUmVzdWx0SXRlbSk7XG4gICAgfVxufVxuXG5pZiggIXNpbmdsZXRvbiApIHtcbiAgICBzaW5nbGV0b24gPSBuZXcgTWFudWZhY3R1cmVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaW5nbGV0b24gOyIsIid1c2Ugc3RyaWN0J1xuXG5jbGFzcyBQYWdpbmF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCBkYXRhID0ge30gKSB7XG4gICAgICAgIHRoaXMuX2xpbWl0ID0gZGF0YS5tYXhSZXN1bHRzIHx8IFBhZ2luYXRvci5MSU1JVF9ERUZBVUxUO1xuICAgICAgICB0aGlzLl9vZmZzZXQgPSBkYXRhLm9mZnNldCB8fCBQYWdpbmF0b3IuT0ZGU0VUX0RFRkFVTFQ7XG4gICAgICAgIHRoaXMuX3RvdGFsX3BhZ2VzID0gMDtcbiAgICAgICAgdGhpcy5fdG90YWxfcmVzdWx0cyA9IDA7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IDE7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gW107XG4gICAgICAgIHRoaXMuX3BhZ2VzQ2FjaGUgPSBbXTtcbiAgICAgICAgdGhpcy5fbmV4dFBhZ2VUb2tlbiA9ICcnO1xuICAgICAgICB0aGlzLl9wcmV2UGFnZVRva2VuID0gJyc7XG4gICAgICAgIHRoaXMuX3Rva2VuUGFnaW5hdGlvbiA9ICcnO1xuICAgICAgICB0aGlzLl9wYWdlVG9rZW4gPSBudWxsO1xuICAgIH1cblxuICAgIGdldCBzZWFyY2hQYXJhbXMoKSB7IHJldHVybiB0aGlzLl9zZWFyY2hQYXJhbXM7IH1cblxuICAgIGdldCBlbGVtZW50cygpIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYWdlOyB9XG5cbiAgICBnZXQgbGltaXQoKSB7IHJldHVybiB0aGlzLl9saW1pdDsgfVxuXG4gICAgZ2V0IG9mZnNldCgpIHsgcmV0dXJuIHRoaXMuX29mZnNldDsgfVxuXG4gICAgZ2V0IHRvdGFsX3BhZ2VzKCkgeyByZXR1cm4gdGhpcy5fdG90YWxfcGFnZXM7IH1cblxuICAgIGdldCBjdXJyZW50SW5kZXgoKSB7IHJldHVybiB0aGlzLl9jdXJyZW50SW5kZXg7IH1cblxuICAgIGdldCBwYWdlX3NpemUoKSB7IHJldHVybiB0aGlzLl9saW1pdDsgfVxuXG4gICAgc2V0IGJyb3dzZXIoIHZhbHVlICkge1xuICAgICAgICB0aGlzLl9icm93c2VyID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0UGFnaW5hdGlvblBhcmFtcygpIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHt9O1xuICAgICAgICBwYXJhbXMubWF4UmVzdWx0cyA9IHRoaXMuX2xpbWl0O1xuICAgICAgICBwYXJhbXMucGFnZVRva2VuID0gdGhpcy5fcGFnZVRva2VuO1xuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cblxuICAgIHVwZGF0ZSggZGF0YSA9IHt9ICkge1xuICAgICAgICB0aGlzLl9uZXh0UGFnZVRva2VuID0gZGF0YS5uZXh0UGFnZVRva2VuO1xuICAgICAgICB0aGlzLl9wcmV2UGFnZVRva2VuID0gZGF0YS5wcmV2UGFnZVRva2VuO1xuICAgICAgICB0aGlzLl90b2tlblBhZ2luYXRpb24gPSBkYXRhLnRva2VuUGFnaW5hdGlvbjtcbiAgICAgICAgLy9Zb3VUdWJlIGRvZXNuJ3QgaGF2ZSBvZmZzZXQgdmFsdWVcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gZGF0YS5vZmZzZXQgfHwgdGhpcy5fb2Zmc2V0O1xuICAgICAgICAvL3BhZ2VJbmZvLnJlc3VsdHNQZXJQYWdlIGNhbWUgZnJvbSBzZWFyY2ggcmVzcG9uc2VcbiAgICAgICAgLy9tYXhSZXN1bHRzIGNhbWUgZnJvbSBxdWVyeSBwYXJhbWV0ZXJcbiAgICAgICAgdGhpcy5fbGltaXQgPSAoZGF0YS5wYWdlSW5mbyAmJiBkYXRhLnBhZ2VJbmZvLnJlc3VsdHNQZXJQYWdlKSB8fCBkYXRhLm1heFJlc3VsdHMgfHwgdGhpcy5fbGltaXQ7XG4gICAgICAgIHRoaXMuX3RvdGFsX3Jlc3VsdHMgPSAoZGF0YS5wYWdlSW5mbyAmJiBkYXRhLnBhZ2VJbmZvLnRvdGFsUmVzdWx0cykgfHwgdGhpcy5fdG90YWxfcmVzdWx0cztcbiAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID0gZGF0YS5jdXJyZW50X3BhZ2UgfHwgdGhpcy5fb2Zmc2V0ICsgMTsvL29mZnNldCBjYW4gYmUgMCBidXQgaW5kZXggc3RhcnRzIGluIDFcbiAgICAgICAgdGhpcy5fdG90YWxfcGFnZXMgPSBkYXRhLnRvdGFsX3BhZ2VzIHx8IE1hdGguY2VpbCh0aGlzLl90b3RhbF9yZXN1bHRzIC8gdGhpcy5fbGltaXQpO1xuICAgIH1cblxuICAgIHNldFBhZ2UoIGl0ZW1zICkge1xuICAgICAgICB0aGlzLl9jdXJyZW50UGFnZSA9IGl0ZW1zO1xuICAgIH1cblxuICAgIGZpcnN0RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYWdlWzBdO1xuICAgIH1cbiAgICBsYXN0RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYWdlW3RoaXMuX2N1cnJlbnRQYWdlLmxlbmd0aC0xXTtcbiAgICB9XG4gICAgZWxlbWVudEF0KCBpbmRleCApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYWdlW2luZGV4XTtcbiAgICB9XG5cblxuICAgIGhhc05leHRQYWdlKCkgeyByZXR1cm4gdGhpcy5fY3VycmVudEluZGV4IDwgdGhpcy5fdG90YWxfcGFnZXMgfTtcbiAgICBoYXNQcmV2UGFnZSgpIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnRJbmRleCA+IDE7IH1cbiAgICBuZXh0UGFnZSgpIHtcbiAgICAgICAgbGV0IHJldFZhbCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYoIHRoaXMuaGFzTmV4dFBhZ2UoKSApe1xuICAgICAgICAgICAgICAgIHRoaXMuX29mZnNldCsrO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhZ2VUb2tlbiA9IHRoaXMuX25leHRQYWdlVG9rZW47XG4gICAgICAgICAgICAgICAgdGhpcy5fYnJvd3Nlci5hbGwoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFnZVRva2VuID0gbnVsbDsvL2NsZWFyIGZvciBuZXh0IHF1ZXJpZXMgbm90IHJlbGF0ZWQgd2l0aCBwYWdpbmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCByZXN1bHQgKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZWplY3QobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgIH1cbiAgICBwcmV2UGFnZSgpIHtcbiAgICAgICAgbGV0IHJldFZhbCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYoIHRoaXMuaGFzUHJldlBhZ2UoKSApe1xuICAgICAgICAgICAgICAgIHRoaXMuX29mZnNldC0tO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhZ2VUb2tlbiA9IHRoaXMuX3ByZXZQYWdlVG9rZW47XG4gICAgICAgICAgICAgICAgdGhpcy5fYnJvd3Nlci5hbGwoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYWdlVG9rZW4gPSBudWxsOy8vY2xlYXIgZm9yIG5leHQgcXVlcmllcyBub3QgcmVsYXRlZCB3aXRoIHBhZ2luYXRpb25cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSggcmVzdWx0ICk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICB9XG4gICAgZmlyc3RQYWdlKCkge1xuICAgICAgICBsZXQgcmV0VmFsID0gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSAwO1xuICAgICAgICAgICAgcmVzb2x2ZSggdGhpcy5fYnJvd3Nlci5hbGwoKSApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICB9XG4gICAgbGFzdFBhZ2UoKSB7XG4gICAgICAgIGxldCByZXRWYWwgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IHRoaXMuX3RvdGFsX3BhZ2VzO1xuICAgICAgICAgICAgcmVzb2x2ZSggdGhpcy5fYnJvd3Nlci5hbGwoKSApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICB9XG4gICAgZ29Ub1BhZ2UoIGluZGV4ICkge1xuICAgICAgICBsZXQgcmV0VmFsID0gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSBpbmRleDtcbiAgICAgICAgICAgIHJlc29sdmUoIHRoaXMuX2Jyb3dzZXIuYWxsKCkgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXRWYWw7XG4gICAgfVxufVxuXG5QYWdpbmF0b3IuTElNSVRfREVGQVVMVCA9IDEwO1xuUGFnaW5hdG9yLk9GRlNFVF9ERUZBVUxUID0gMDtcblxuZXhwb3J0IGRlZmF1bHQgUGFnaW5hdG9yOyIsIid1c2Ugc3RyaWN0J1xuXG5jbGFzcyBTZWFyY2hQYXJhbXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnBhcnQgPSAnc25pcHBldCc7XG4gICAgICAgIHRoaXMuY2hhbm5lbElkO1xuICAgICAgICB0aGlzLmNoYW5uZWxUeXBlO1xuICAgICAgICB0aGlzLmV2ZW50VHlwZTtcbiAgICAgICAgdGhpcy5mb3JDb250ZW50T3duZXI7XG4gICAgICAgIHRoaXMuZm9yRGV2ZWxvcGVyO1xuICAgICAgICB0aGlzLmZvck1pbmU7XG4gICAgICAgIHRoaXMubG9jYXRpb247XG4gICAgICAgIHRoaXMubG9jYXRpb25SYWRpdXM7XG4gICAgICAgIHRoaXMub25CZWhhbGZPZkNvbnRlbnRPd25lcjtcbiAgICAgICAgdGhpcy5vcmRlciA9ICdyZWxldmFuY2UnO1xuICAgICAgICB0aGlzLnB1Ymxpc2hlZEFmdGVyO1xuICAgICAgICB0aGlzLnEgPSAnJztcbiAgICAgICAgdGhpcy5yZWdpb25Db2RlO1xuICAgICAgICB0aGlzLnJlbGF0ZWRUb1ZpZGVvSWQ7XG4gICAgICAgIHRoaXMucmVsZXZhbmNlTGFuZ3VhZ2U7XG4gICAgICAgIHRoaXMuc2FmZVNlYXJjaDtcbiAgICAgICAgdGhpcy50b3BpY0lkO1xuICAgICAgICB0aGlzLnR5cGUgPSAndmlkZW8nO1xuICAgICAgICB0aGlzLnZpZGVvQ2FwdGlvbjtcbiAgICAgICAgdGhpcy52aWRlb0NhdGVnb3J5SWQ7XG4gICAgICAgIHRoaXMudmlkZW9EZWZpbml0aW9uO1xuICAgICAgICB0aGlzLnZpZGVvRGltZW5zaW9uO1xuICAgICAgICB0aGlzLnZpZGVvRHVyYXRpb247XG4gICAgICAgIHRoaXMudmlkZW9FbWJlZGRhYmxlO1xuICAgICAgICB0aGlzLnZpZGVvTGljZW5zZTtcbiAgICAgICAgdGhpcy52aWRlb1N5bmRpY2F0ZWQ7XG4gICAgICAgIHRoaXMudmlkZW9UeXBlO1xuICAgICAgICB0aGlzLmZpZWxkcztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaFBhcmFtczsiLCIndXNlIHN0cmljdCdcbmltcG9ydCBZb3VUdWJlU2VhcmNoIGZyb20gJy4vWW91VHViZVNlYXJjaCc7XG5pbXBvcnQgQnJvd3NlciBmcm9tICcuLy4uL2NsYXNzZXMvQnJvd3Nlcic7XG5cbmNsYXNzIEVudGl0eU1vZGVsIGV4dGVuZHMgWW91VHViZVNlYXJjaHtcbiAgICBjb25zdHJ1Y3RvciggWW91VHViZVNlYXJjaEl0ZW1EYXRhICkge1xuICAgICAgICBzdXBlcihZb3VUdWJlU2VhcmNoSXRlbURhdGEpO1xuICAgICAgICB0aGlzLmtpbmQgPSBZb3VUdWJlU2VhcmNoSXRlbURhdGEuaWQua2luZDtcbiAgICAgICAgdGhpcy5pZCA9IFlvdVR1YmVTZWFyY2hJdGVtRGF0YS5pZFtgJHt0aGlzLmNvbnN0cnVjdG9yLlNJTkdMRV9UWVBFfUlkYF0gfHwgWW91VHViZVNlYXJjaEl0ZW1EYXRhLmlkO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsWW91VHViZVNlYXJjaEl0ZW1EYXRhLnNuaXBwZXQpO1xuXG4gICAgICAgIHRoaXMucmF3RGF0YSA9IFlvdVR1YmVTZWFyY2hJdGVtRGF0YTtcbiAgICAgICAgdGhpcy5fbWFzc0Fzc2lnbiggWW91VHViZVNlYXJjaEl0ZW1EYXRhICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBNYXNzIGFzc2lnbiBhdHRyaWJ1dGVzLiBFeGNsdWRlcyBhdHRyaWJ1dGVzIG1hcmtlZCBhcyBOT1QgRklMTEFCTEVcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFRoZSBvYmplY3QgZW5kcG9pbnQgcmVzcG9uc2UuXG4gICAgKi9cbiAgICBfbWFzc0Fzc2lnbiggZGF0YSApe1xuICAgICAgICBsZXQgbm90RmlsbGFibGUgPSB0aGlzLmNvbnN0cnVjdG9yLl9nZXROb3RGaWxsYWJsZSgpIHx8IFtdO1xuICAgICAgICBmb3IoIGxldCBlbCBpbiBkYXRhICl7XG4gICAgICAgICAgICBpZiggbm90RmlsbGFibGUuaW5kZXhPZiggZWwgKSA9PT0gLTEgJiYgdHlwZW9mIHRoaXNbIGVsIF0gIT0gJ2Z1bmN0aW9uJyApe1xuICAgICAgICAgICAgICAgIHRoaXNbIGVsIF0gPSBkYXRhWyBlbCBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIGEgc3RyaW5nIG9mIHRoZSBvYmplY3QgdHlwZSwgdXN1YWxseSB1c2VkIHRvIGJ1aWxkIHRoZSBxdWVyeSBwYXRoLlxuICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICovXG4gICAgc3RhdGljIGdldCBTSU5HTEVfVFlQRSgpe1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBQcm90ZWN0IGF0dHJpYnV0ZXMgZnJvbSBtYXNzIGFzc2lnbWVudC4gUmVhZHkgdG8gYmUgb3ZlcndyaXR0ZW4gYnkgZ2VuZXJhbGl6YXRpb25cbiAgICAqIEByZXR1cm4ge0FycmF5PHN0cmluZz59IFRoZSBuYW1lcyBvZiB0aGUgYXR0cmlidXRlcyB0byBrZWVwIHNhZmUgZnJvbSBtYXNzIGFzc2lnbi5cbiAgICAqL1xuICAgIHN0YXRpYyBfZ2V0Tm90RmlsbGFibGUoKXsgcmV0dXJuIFsnaWQnXTsgfVxuXG4gICAgc3RhdGljIHNldmVyYWwoIGVudGl0aWVzSWRzID0gW10sIHBhcmFtcyA9IHt9ICkge1xuICAgICAgICBwYXJhbXMuaWQgPSBlbnRpdGllc0lkcy5qb2luKCcsJyk7XG4gICAgICAgIHBhcmFtcy50eXBlID0gdGhpcy5GQU1JTFlfVFlQRTtcbiAgICAgICAgbGV0IHNlYXJjaGVyID0gbmV3IEJyb3dzZXIoKTtcbiAgICAgICAgc2VhcmNoZXIuY29uZmlnID0gcGFyYW1zO1xuICAgICAgICByZXR1cm4gc2VhcmNoZXIuZmluZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogUmV0dXJucyB0aGUgVVJJIHRodW1ibmFpbCBiYXNlZCBvbiBvcHRpb25hbCBzaXplIHBhcmFtZXRlclxuICAgICogQHBhcmFtIHtzdHJpbmc9fSBzaXplIE9uZSBvZiB0aHJlZTogZGVmYXVsdCwgbWVkaXVtIG9yIGhpZ2hcbiAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAqL1xuICAgIGdldFRodW1ibmFpbCggc2l6ZSApIHtcbiAgICAgICAgbGV0IHVyaSA9ICcnO1xuICAgICAgICBzd2l0Y2goIHNpemUgKSB7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FzZSAnZGVmYXVsdCc6XG4gICAgICAgICAgICAgICAgdXJpID0gdGhpcy50aHVtYm5haWxzLmRlZmF1bHQudXJsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbWVkaXVtJzpcbiAgICAgICAgICAgICAgICB1cmkgPSB0aGlzLnRodW1ibmFpbHMubWVkaXVtLnVybDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2hpZ2gnOlxuICAgICAgICAgICAgICAgIHVyaSA9IHRoaXMudGh1bWJuYWlscy5oaWdoLnVybDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBFbnRpdHlNb2RlbDsiLCIndXNlIHN0cmljdCdcbmltcG9ydCBFbnRpdHlNb2RlbCBmcm9tICcuL0VudGl0eU1vZGVsJztcbmltcG9ydCBNYW51ZmFjdHVyZXIgZnJvbSAnLi8uLi9jbGFzc2VzL01hbnVmYWN0dXJlcic7XG5cbmNsYXNzIFlvdVR1YmVWaWRlb0NoYW5uZWwgZXh0ZW5kcyBFbnRpdHlNb2RlbCB7XG5cbiAgICAvKipcbiAgICAqIFJldHVybnMgYSBzdHJpbmcgb2YgdGhlIG9iamVjdCB0eXBlLCB1c3VhbGx5IHVzZWQgdG8gYnVpbGQgdGhlIHF1ZXJ5IHBhdGguXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgKi9cbiAgICBzdGF0aWMgZ2V0IFNJTkdMRV9UWVBFKCl7XG4gICAgICAgIHJldHVybiAnY2hhbm5lbCc7XG4gICAgfVxuXG59XG5NYW51ZmFjdHVyZXIuYWRkKCd5b3V0dWJlI2NoYW5uZWwnLCBZb3VUdWJlVmlkZW9DaGFubmVsICk7XG5cbmV4cG9ydCBkZWZhdWx0IFlvdVR1YmVWaWRlb0NoYW5uZWw7IiwiJ3VzZSBzdHJpY3QnXG5pbXBvcnQgRW50aXR5TW9kZWwgZnJvbSAnLi9FbnRpdHlNb2RlbCc7XG5pbXBvcnQgTWFudWZhY3R1cmVyIGZyb20gJy4vLi4vY2xhc3Nlcy9NYW51ZmFjdHVyZXInO1xuXG5jbGFzcyBZb3VUdWJlUGxheWxpc3QgZXh0ZW5kcyBFbnRpdHlNb2RlbCB7XG5cbiAgICAvKipcbiAgICAqIFJldHVybnMgYSBzdHJpbmcgb2YgdGhlIG9iamVjdCB0eXBlLCB1c3VhbGx5IHVzZWQgdG8gYnVpbGQgdGhlIHF1ZXJ5IHBhdGguXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgKi9cbiAgICBzdGF0aWMgZ2V0IFNJTkdMRV9UWVBFKCl7XG4gICAgICAgIHJldHVybiAncGxheWxpc3QnO1xuICAgIH1cbiAgICBcbn1cbk1hbnVmYWN0dXJlci5hZGQoJ3lvdXR1YmUjcGxheWxpc3QnLCBZb3VUdWJlUGxheWxpc3QgKTtcblxuZXhwb3J0IGRlZmF1bHQgWW91VHViZVBsYXlsaXN0OyIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IEJyb3dzZXIgZnJvbSAnLi8uLi9jbGFzc2VzL0Jyb3dzZXInO1xuXG5jbGFzcyBZb3VUdWJlU2VhcmNoIHtcblxuICAgIC8qKlxuICAgICogUGVyZm9ybXMgYSBzZWFyY2ggYmFzZWQgb24gZ2l2ZW4gcXVlcnkgc3RyaW5nIGFuIG9wdGlvbmEgc2VhcmNoIHBhcmFtZXRlcnMuXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlTdHJpbmcgVGhlIHN0cmluZyB0byBzZWFyY2guXG4gICAgKiBAcGFyYW0ge29iamVjdD19IHBhcmFtcyBUaGUgYWRpdGlvbmEgY29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICovXG4gICAgc3RhdGljIHdoZXJlKCBxdWVyeVN0cmluZywgcGFyYW1zID0ge30gKXtcbiAgICAgICAgcGFyYW1zLnEgPSBxdWVyeVN0cmluZztcbiAgICAgICAgLy9Zb3VUdWJlU2VhcmNoLndoZXJlIG1ldGhvZCBzaG91bGQgdHJpZ2dlciBhIHNlYXJjaCwgaW5kZXBlbmRhbnQgZm9yIHRoZSBzZWFyY2hlZCBlbnRpdHkuXG4gICAgICAgIC8vZm9yIGV4YW1wbGUgb24gVmlkZW9zIHNlYXJjaGVzLCB0aGUgcGF0aCBzaG91bGQgYmUgLnNlYXJjaC5saXN0IGFuZCB0aGUgdHlwZTp2aWRlb1xuICAgICAgICBwYXJhbXMudHlwZSA9IHRoaXMuU0lOR0xFX1RZUEU7XG4gICAgICAgIGxldCBzZWFyY2hlciA9IG5ldyBCcm93c2VyKCk7XG4gICAgICAgIHNlYXJjaGVyLmNvbmZpZyA9IHBhcmFtcztcbiAgICAgICAgcmV0dXJuIHNlYXJjaGVyLmFsbCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgWW91VHViZVNlYXJjaDsiLCIndXNlIHN0cmljdCdcbmltcG9ydCBFbnRpdHlNb2RlbCBmcm9tICcuL0VudGl0eU1vZGVsJztcbmltcG9ydCBNYW51ZmFjdHVyZXIgZnJvbSAnLi8uLi9jbGFzc2VzL01hbnVmYWN0dXJlcic7XG5pbXBvcnQgQnJvd3NlciBmcm9tICcuLy4uL2NsYXNzZXMvQnJvd3Nlcic7XG5cbmNsYXNzIFlvdVR1YmVWaWRlbyBleHRlbmRzIEVudGl0eU1vZGVsIHtcbiAgICAvKipcbiAgICAqIFJldHVybnMgYSBzdHJpbmcgb2YgdGhlIG9iamVjdCB0eXBlLCB1c3VhbGx5IHVzZWQgdG8gYnVpbGQgdGhlIHF1ZXJ5IHBhdGguXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgKi9cbiAgICBzdGF0aWMgZ2V0IFNJTkdMRV9UWVBFKCl7IHJldHVybiAndmlkZW8nOyB9XG4gICAgc3RhdGljIGdldCBGQU1JTFlfVFlQRSgpeyByZXR1cm4gJ3ZpZGVvcyc7IH1cblxuICAgIHJhdGUoIHJhdGluZywgcGFyYW1zID0ge30gKSB7XG4gICAgICAgIHBhcmFtcy5pZCA9IHRoaXMuaWQ7XG4gICAgICAgIHBhcmFtcy50eXBlID0gWW91VHViZVZpZGVvLkZBTUlMWV9UWVBFO1xuICAgICAgICBwYXJhbXMucmF0aW5nID0gcmF0aW5nO1xuICAgICAgICBsZXQgc2VhcmNoZXIgPSBuZXcgQnJvd3NlcigpO1xuICAgICAgICBzZWFyY2hlci5jb25maWcgPSBwYXJhbXM7XG4gICAgICAgIHJldHVybiBzZWFyY2hlci5yYXRlKCk7XG4gICAgfVxuXG59XG5NYW51ZmFjdHVyZXIuYWRkKCd5b3V0dWJlI3ZpZGVvJywgWW91VHViZVZpZGVvICk7XG5cbmV4cG9ydCBkZWZhdWx0IFlvdVR1YmVWaWRlbzsiLCIndXNlIHN0cmljdCdcbmltcG9ydCBDb25maWcgZnJvbSAnLi8uLi9zZXJ2aWNlcy9Db25maWcnO1xuXG5sZXQgcHJvbWlzZVJlc29sdmUsIHByb21pc2VSZWplY3Q7XG5cbmNsYXNzIEF1dGgge1xuICAgIGF1dGhvcml6ZSgpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVBdXRoKCB0cnVlICk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgICAgICBwcm9taXNlUmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaG93QXV0aCgpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVBdXRoKCBmYWxzZSApO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcHJvbWlzZVJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgcHJvbWlzZVJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQXV0aCggaW1tZWRpYXRlICkge1xuICAgICAgICBnYXBpLmF1dGguYXV0aG9yaXplKHtjbGllbnRfaWQ6IENvbmZpZy5jbGllbnRJZCwgc2NvcGU6IENvbmZpZy5zY29wZXMuam9pbignLCcpLCBpbW1lZGlhdGU6IGltbWVkaWF0ZX0sIHRoaXMuaGFuZGxlQXV0aFJlc3VsdC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBoYW5kbGVBdXRoUmVzdWx0KGF1dGhSZXN1bHQpIHtcbiAgICAgICAgaWYgKGF1dGhSZXN1bHQgJiYgIWF1dGhSZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2VSZXNvbHZlKCBhdXRoUmVzdWx0ICk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcHJvbWlzZVJlamVjdCggYXV0aFJlc3VsdCApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQXV0aDsiLCIndXNlIHN0cmljdCdcblxuLyoqXG4qIEZsYWcgZm9yIGF2b2lkIG11bHRpcGxlIGluc3RhbmNlcyBvZiBDb25maWcgY2xhc3NcbiogQHR5cGUge2Jvb2xlYW59XG4qL1xubGV0IHNpbmdsZXRvbkNvbmZpZyA9IGZhbHNlLFxuICAgIGFwaUtleSwgY2xpZW50SWQsIHNjb3BlcztcblxuY2xhc3MgQ29uZmlnIHtcbiAgICAvKipcbiAgICAqIFNldHMgdmFyaWFibGVzIGJ5IGdpdmVuIGRhdGEuXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YVxuICAgICovXG4gICAgc2V0KCBkYXRhICkge1xuICAgICAgICBhcGlLZXkgPSBkYXRhLmFwaUtleTtcbiAgICAgICAgY2xpZW50SWQgPSBkYXRhLmNsaWVudElkO1xuICAgICAgICBzY29wZXMgPSBkYXRhLnNjb3BlcztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0IGFwaUtleSgpICAgIHsgcmV0dXJuIGFwaUtleTsgfVxuICAgIGdldCBjbGllbnRJZCgpICB7IHJldHVybiBjbGllbnRJZDsgfVxuICAgIGdldCBzY29wZXMoKSAgICB7IHJldHVybiBzY29wZXM7IH1cblxuICAgIGJvb3QoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgLy9sb2FkIEFQSSBjbGllbnRcbiAgICAgICAgICAgIGdhcGkuY2xpZW50LnNldEFwaUtleShhcGlLZXkpO1xuICAgICAgICAgICAgZ2FwaS5jbGllbnQubG9hZCgneW91dHViZScsICd2MycpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSwocmVhc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJyArIHJlYXNvbi5yZXN1bHQuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChyZWFzb24pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmlmKCAhc2luZ2xldG9uQ29uZmlnICkge1xuICAgIHNpbmdsZXRvbkNvbmZpZyA9IG5ldyBDb25maWc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNpbmdsZXRvbkNvbmZpZztcbiIsIid1c2Ugc3RyaWN0J1xuXG5jbGFzcyBZb3VUdWJlQVBJQ2xpZW50IHtcbiAgICBzdGF0aWMgcmVxdWVzdCggcGF0aCwgcGF5bG9hZCApIHtcbiAgICAgICAgbGV0IGZuO1xuICAgICAgICBldmFsKGBmbiA9IGdhcGkuY2xpZW50LnlvdXR1YmUuJHtwYXRofWApO1xuICAgICAgICByZXR1cm4gZm4oIHBheWxvYWQgKS50aGVuKHJlc3AgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3A7XG4gICAgICAgIH0scmVhc29uID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJyArIHJlYXNvbi5yZXN1bHQuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgWW91VHViZUFQSUNsaWVudDsiXX0=
