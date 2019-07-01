//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var DiffSequence = Package['diff-sequence'].DiffSequence;
var EJSON = Package.ejson.EJSON;
var GeoJSON = Package['geojson-utils'].GeoJSON;
var IdMap = Package['id-map'].IdMap;
var MongoID = Package['mongo-id'].MongoID;
var OrderedDict = Package['ordered-dict'].OrderedDict;
var Random = Package.random.Random;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var MinimongoTest, MinimongoError, LocalCollection, Minimongo;

var require = meteorInstall({"node_modules":{"meteor":{"minimongo":{"minimongo_client.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/minimongo/minimongo_client.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.link("./minimongo_common.js");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"common.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/minimongo/common.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

module.export({
  hasOwn: function () {
    return hasOwn;
  },
  ELEMENT_OPERATORS: function () {
    return ELEMENT_OPERATORS;
  },
  compileDocumentSelector: function () {
    return compileDocumentSelector;
  },
  equalityElementMatcher: function () {
    return equalityElementMatcher;
  },
  expandArraysInBranches: function () {
    return expandArraysInBranches;
  },
  isIndexable: function () {
    return isIndexable;
  },
  isNumericKey: function () {
    return isNumericKey;
  },
  isOperatorObject: function () {
    return isOperatorObject;
  },
  makeLookupFunction: function () {
    return makeLookupFunction;
  },
  nothingMatcher: function () {
    return nothingMatcher;
  },
  pathsToTree: function () {
    return pathsToTree;
  },
  populateDocumentWithQueryFields: function () {
    return populateDocumentWithQueryFields;
  },
  projectionDetails: function () {
    return projectionDetails;
  },
  regexpElementMatcher: function () {
    return regexpElementMatcher;
  }
});
var LocalCollection;
module.link("./local_collection.js", {
  "default": function (v) {
    LocalCollection = v;
  }
}, 0);
var hasOwn = Object.prototype.hasOwnProperty;
var ELEMENT_OPERATORS = {
  $lt: makeInequality(function (cmpValue) {
    return cmpValue < 0;
  }),
  $gt: makeInequality(function (cmpValue) {
    return cmpValue > 0;
  }),
  $lte: makeInequality(function (cmpValue) {
    return cmpValue <= 0;
  }),
  $gte: makeInequality(function (cmpValue) {
    return cmpValue >= 0;
  }),
  $mod: {
    compileElementSelector: function (operand) {
      if (!(Array.isArray(operand) && operand.length === 2 && typeof operand[0] === 'number' && typeof operand[1] === 'number')) {
        throw Error('argument to $mod must be an array of two numbers');
      } // XXX could require to be ints or round or something


      var divisor = operand[0];
      var remainder = operand[1];
      return function (value) {
        return typeof value === 'number' && value % divisor === remainder;
      };
    }
  },
  $in: {
    compileElementSelector: function (operand) {
      if (!Array.isArray(operand)) {
        throw Error('$in needs an array');
      }

      var elementMatchers = operand.map(function (option) {
        if (option instanceof RegExp) {
          return regexpElementMatcher(option);
        }

        if (isOperatorObject(option)) {
          throw Error('cannot nest $ under $in');
        }

        return equalityElementMatcher(option);
      });
      return function (value) {
        // Allow {a: {$in: [null]}} to match when 'a' does not exist.
        if (value === undefined) {
          value = null;
        }

        return elementMatchers.some(function (matcher) {
          return matcher(value);
        });
      };
    }
  },
  $size: {
    // {a: [[5, 5]]} must match {a: {$size: 1}} but not {a: {$size: 2}}, so we
    // don't want to consider the element [5,5] in the leaf array [[5,5]] as a
    // possible value.
    dontExpandLeafArrays: true,
    compileElementSelector: function (operand) {
      if (typeof operand === 'string') {
        // Don't ask me why, but by experimentation, this seems to be what Mongo
        // does.
        operand = 0;
      } else if (typeof operand !== 'number') {
        throw Error('$size needs a number');
      }

      return function (value) {
        return Array.isArray(value) && value.length === operand;
      };
    }
  },
  $type: {
    // {a: [5]} must not match {a: {$type: 4}} (4 means array), but it should
    // match {a: {$type: 1}} (1 means number), and {a: [[5]]} must match {$a:
    // {$type: 4}}. Thus, when we see a leaf array, we *should* expand it but
    // should *not* include it itself.
    dontIncludeLeafArrays: true,
    compileElementSelector: function (operand) {
      if (typeof operand === 'string') {
        var operandAliasMap = {
          'double': 1,
          'string': 2,
          'object': 3,
          'array': 4,
          'binData': 5,
          'undefined': 6,
          'objectId': 7,
          'bool': 8,
          'date': 9,
          'null': 10,
          'regex': 11,
          'dbPointer': 12,
          'javascript': 13,
          'symbol': 14,
          'javascriptWithScope': 15,
          'int': 16,
          'timestamp': 17,
          'long': 18,
          'decimal': 19,
          'minKey': -1,
          'maxKey': 127
        };

        if (!hasOwn.call(operandAliasMap, operand)) {
          throw Error("unknown string alias for $type: " + operand);
        }

        operand = operandAliasMap[operand];
      } else if (typeof operand === 'number') {
        if (operand === 0 || operand < -1 || operand > 19 && operand !== 127) {
          throw Error("Invalid numerical $type code: " + operand);
        }
      } else {
        throw Error('argument to $type is not a number or a string');
      }

      return function (value) {
        return value !== undefined && LocalCollection._f._type(value) === operand;
      };
    }
  },
  $bitsAllSet: {
    compileElementSelector: function (operand) {
      var mask = getOperandBitmask(operand, '$bitsAllSet');
      return function (value) {
        var bitmask = getValueBitmask(value, mask.length);
        return bitmask && mask.every(function (byte, i) {
          return (bitmask[i] & byte) === byte;
        });
      };
    }
  },
  $bitsAnySet: {
    compileElementSelector: function (operand) {
      var mask = getOperandBitmask(operand, '$bitsAnySet');
      return function (value) {
        var bitmask = getValueBitmask(value, mask.length);
        return bitmask && mask.some(function (byte, i) {
          return (~bitmask[i] & byte) !== byte;
        });
      };
    }
  },
  $bitsAllClear: {
    compileElementSelector: function (operand) {
      var mask = getOperandBitmask(operand, '$bitsAllClear');
      return function (value) {
        var bitmask = getValueBitmask(value, mask.length);
        return bitmask && mask.every(function (byte, i) {
          return !(bitmask[i] & byte);
        });
      };
    }
  },
  $bitsAnyClear: {
    compileElementSelector: function (operand) {
      var mask = getOperandBitmask(operand, '$bitsAnyClear');
      return function (value) {
        var bitmask = getValueBitmask(value, mask.length);
        return bitmask && mask.some(function (byte, i) {
          return (bitmask[i] & byte) !== byte;
        });
      };
    }
  },
  $regex: {
    compileElementSelector: function (operand, valueSelector) {
      if (!(typeof operand === 'string' || operand instanceof RegExp)) {
        throw Error('$regex has to be a string or RegExp');
      }

      var regexp;

      if (valueSelector.$options !== undefined) {
        // Options passed in $options (even the empty string) always overrides
        // options in the RegExp object itself.
        // Be clear that we only support the JS-supported options, not extended
        // ones (eg, Mongo supports x and s). Ideally we would implement x and s
        // by transforming the regexp, but not today...
        if (/[^gim]/.test(valueSelector.$options)) {
          throw new Error('Only the i, m, and g regexp options are supported');
        }

        var source = operand instanceof RegExp ? operand.source : operand;
        regexp = new RegExp(source, valueSelector.$options);
      } else if (operand instanceof RegExp) {
        regexp = operand;
      } else {
        regexp = new RegExp(operand);
      }

      return regexpElementMatcher(regexp);
    }
  },
  $elemMatch: {
    dontExpandLeafArrays: true,
    compileElementSelector: function (operand, valueSelector, matcher) {
      if (!LocalCollection._isPlainObject(operand)) {
        throw Error('$elemMatch need an object');
      }

      var isDocMatcher = !isOperatorObject(Object.keys(operand).filter(function (key) {
        return !hasOwn.call(LOGICAL_OPERATORS, key);
      }).reduce(function (a, b) {
        var _Object$assign;

        return Object.assign(a, (_Object$assign = {}, _Object$assign[b] = operand[b], _Object$assign));
      }, {}), true);
      var subMatcher;

      if (isDocMatcher) {
        // This is NOT the same as compileValueSelector(operand), and not just
        // because of the slightly different calling convention.
        // {$elemMatch: {x: 3}} means "an element has a field x:3", not
        // "consists only of a field x:3". Also, regexps and sub-$ are allowed.
        subMatcher = compileDocumentSelector(operand, matcher, {
          inElemMatch: true
        });
      } else {
        subMatcher = compileValueSelector(operand, matcher);
      }

      return function (value) {
        if (!Array.isArray(value)) {
          return false;
        }

        for (var i = 0; i < value.length; ++i) {
          var arrayElement = value[i];
          var arg = void 0;

          if (isDocMatcher) {
            // We can only match {$elemMatch: {b: 3}} against objects.
            // (We can also match against arrays, if there's numeric indices,
            // eg {$elemMatch: {'0.b': 3}} or {$elemMatch: {0: 3}}.)
            if (!isIndexable(arrayElement)) {
              return false;
            }

            arg = arrayElement;
          } else {
            // dontIterate ensures that {a: {$elemMatch: {$gt: 5}}} matches
            // {a: [8]} but not {a: [[8]]}
            arg = [{
              value: arrayElement,
              dontIterate: true
            }];
          } // XXX support $near in $elemMatch by propagating $distance?


          if (subMatcher(arg).result) {
            return i; // specially understood to mean "use as arrayIndices"
          }
        }

        return false;
      };
    }
  }
};
// Operators that appear at the top level of a document selector.
var LOGICAL_OPERATORS = {
  $and: function (subSelector, matcher, inElemMatch) {
    return andDocumentMatchers(compileArrayOfDocumentSelectors(subSelector, matcher, inElemMatch));
  },
  $or: function (subSelector, matcher, inElemMatch) {
    var matchers = compileArrayOfDocumentSelectors(subSelector, matcher, inElemMatch); // Special case: if there is only one matcher, use it directly, *preserving*
    // any arrayIndices it returns.

    if (matchers.length === 1) {
      return matchers[0];
    }

    return function (doc) {
      var result = matchers.some(function (fn) {
        return fn(doc).result;
      }); // $or does NOT set arrayIndices when it has multiple
      // sub-expressions. (Tested against MongoDB.)

      return {
        result: result
      };
    };
  },
  $nor: function (subSelector, matcher, inElemMatch) {
    var matchers = compileArrayOfDocumentSelectors(subSelector, matcher, inElemMatch);
    return function (doc) {
      var result = matchers.every(function (fn) {
        return !fn(doc).result;
      }); // Never set arrayIndices, because we only match if nothing in particular
      // 'matched' (and because this is consistent with MongoDB).

      return {
        result: result
      };
    };
  },
  $where: function (selectorValue, matcher) {
    // Record that *any* path may be used.
    matcher._recordPathUsed('');

    matcher._hasWhere = true;

    if (!(selectorValue instanceof Function)) {
      // XXX MongoDB seems to have more complex logic to decide where or or not
      // to add 'return'; not sure exactly what it is.
      selectorValue = Function('obj', "return " + selectorValue);
    } // We make the document available as both `this` and `obj`.
    // // XXX not sure what we should do if this throws


    return function (doc) {
      return {
        result: selectorValue.call(doc, doc)
      };
    };
  },
  // This is just used as a comment in the query (in MongoDB, it also ends up in
  // query logs); it has no effect on the actual selection.
  $comment: function () {
    return function () {
      return {
        result: true
      };
    };
  }
}; // Operators that (unlike LOGICAL_OPERATORS) pertain to individual paths in a
// document, but (unlike ELEMENT_OPERATORS) do not have a simple definition as
// "match each branched value independently and combine with
// convertElementMatcherToBranchedMatcher".

var VALUE_OPERATORS = {
  $eq: function (operand) {
    return convertElementMatcherToBranchedMatcher(equalityElementMatcher(operand));
  },
  $not: function (operand, valueSelector, matcher) {
    return invertBranchedMatcher(compileValueSelector(operand, matcher));
  },
  $ne: function (operand) {
    return invertBranchedMatcher(convertElementMatcherToBranchedMatcher(equalityElementMatcher(operand)));
  },
  $nin: function (operand) {
    return invertBranchedMatcher(convertElementMatcherToBranchedMatcher(ELEMENT_OPERATORS.$in.compileElementSelector(operand)));
  },
  $exists: function (operand) {
    var exists = convertElementMatcherToBranchedMatcher(function (value) {
      return value !== undefined;
    });
    return operand ? exists : invertBranchedMatcher(exists);
  },
  // $options just provides options for $regex; its logic is inside $regex
  $options: function (operand, valueSelector) {
    if (!hasOwn.call(valueSelector, '$regex')) {
      throw Error('$options needs a $regex');
    }

    return everythingMatcher;
  },
  // $maxDistance is basically an argument to $near
  $maxDistance: function (operand, valueSelector) {
    if (!valueSelector.$near) {
      throw Error('$maxDistance needs a $near');
    }

    return everythingMatcher;
  },
  $all: function (operand, valueSelector, matcher) {
    if (!Array.isArray(operand)) {
      throw Error('$all requires array');
    } // Not sure why, but this seems to be what MongoDB does.


    if (operand.length === 0) {
      return nothingMatcher;
    }

    var branchedMatchers = operand.map(function (criterion) {
      // XXX handle $all/$elemMatch combination
      if (isOperatorObject(criterion)) {
        throw Error('no $ expressions in $all');
      } // This is always a regexp or equality selector.


      return compileValueSelector(criterion, matcher);
    }); // andBranchedMatchers does NOT require all selectors to return true on the
    // SAME branch.

    return andBranchedMatchers(branchedMatchers);
  },
  $near: function (operand, valueSelector, matcher, isRoot) {
    if (!isRoot) {
      throw Error('$near can\'t be inside another $ operator');
    }

    matcher._hasGeoQuery = true; // There are two kinds of geodata in MongoDB: legacy coordinate pairs and
    // GeoJSON. They use different distance metrics, too. GeoJSON queries are
    // marked with a $geometry property, though legacy coordinates can be
    // matched using $geometry.

    var maxDistance, point, distance;

    if (LocalCollection._isPlainObject(operand) && hasOwn.call(operand, '$geometry')) {
      // GeoJSON "2dsphere" mode.
      maxDistance = operand.$maxDistance;
      point = operand.$geometry;

      distance = function (value) {
        // XXX: for now, we don't calculate the actual distance between, say,
        // polygon and circle. If people care about this use-case it will get
        // a priority.
        if (!value) {
          return null;
        }

        if (!value.type) {
          return GeoJSON.pointDistance(point, {
            type: 'Point',
            coordinates: pointToArray(value)
          });
        }

        if (value.type === 'Point') {
          return GeoJSON.pointDistance(point, value);
        }

        return GeoJSON.geometryWithinRadius(value, point, maxDistance) ? 0 : maxDistance + 1;
      };
    } else {
      maxDistance = valueSelector.$maxDistance;

      if (!isIndexable(operand)) {
        throw Error('$near argument must be coordinate pair or GeoJSON');
      }

      point = pointToArray(operand);

      distance = function (value) {
        if (!isIndexable(value)) {
          return null;
        }

        return distanceCoordinatePairs(point, value);
      };
    }

    return function (branchedValues) {
      // There might be multiple points in the document that match the given
      // field. Only one of them needs to be within $maxDistance, but we need to
      // evaluate all of them and use the nearest one for the implicit sort
      // specifier. (That's why we can't just use ELEMENT_OPERATORS here.)
      //
      // Note: This differs from MongoDB's implementation, where a document will
      // actually show up *multiple times* in the result set, with one entry for
      // each within-$maxDistance branching point.
      var result = {
        result: false
      };
      expandArraysInBranches(branchedValues).every(function (branch) {
        // if operation is an update, don't skip branches, just return the first
        // one (#3599)
        var curDistance;

        if (!matcher._isUpdate) {
          if (!((0, _typeof2.default)(branch.value) === 'object')) {
            return true;
          }

          curDistance = distance(branch.value); // Skip branches that aren't real points or are too far away.

          if (curDistance === null || curDistance > maxDistance) {
            return true;
          } // Skip anything that's a tie.


          if (result.distance !== undefined && result.distance <= curDistance) {
            return true;
          }
        }

        result.result = true;
        result.distance = curDistance;

        if (branch.arrayIndices) {
          result.arrayIndices = branch.arrayIndices;
        } else {
          delete result.arrayIndices;
        }

        return !matcher._isUpdate;
      });
      return result;
    };
  }
}; // NB: We are cheating and using this function to implement 'AND' for both
// 'document matchers' and 'branched matchers'. They both return result objects
// but the argument is different: for the former it's a whole doc, whereas for
// the latter it's an array of 'branched values'.

function andSomeMatchers(subMatchers) {
  if (subMatchers.length === 0) {
    return everythingMatcher;
  }

  if (subMatchers.length === 1) {
    return subMatchers[0];
  }

  return function (docOrBranches) {
    var match = {};
    match.result = subMatchers.every(function (fn) {
      var subResult = fn(docOrBranches); // Copy a 'distance' number out of the first sub-matcher that has
      // one. Yes, this means that if there are multiple $near fields in a
      // query, something arbitrary happens; this appears to be consistent with
      // Mongo.

      if (subResult.result && subResult.distance !== undefined && match.distance === undefined) {
        match.distance = subResult.distance;
      } // Similarly, propagate arrayIndices from sub-matchers... but to match
      // MongoDB behavior, this time the *last* sub-matcher with arrayIndices
      // wins.


      if (subResult.result && subResult.arrayIndices) {
        match.arrayIndices = subResult.arrayIndices;
      }

      return subResult.result;
    }); // If we didn't actually match, forget any extra metadata we came up with.

    if (!match.result) {
      delete match.distance;
      delete match.arrayIndices;
    }

    return match;
  };
}

var andDocumentMatchers = andSomeMatchers;
var andBranchedMatchers = andSomeMatchers;

function compileArrayOfDocumentSelectors(selectors, matcher, inElemMatch) {
  if (!Array.isArray(selectors) || selectors.length === 0) {
    throw Error('$and/$or/$nor must be nonempty array');
  }

  return selectors.map(function (subSelector) {
    if (!LocalCollection._isPlainObject(subSelector)) {
      throw Error('$or/$and/$nor entries need to be full objects');
    }

    return compileDocumentSelector(subSelector, matcher, {
      inElemMatch: inElemMatch
    });
  });
} // Takes in a selector that could match a full document (eg, the original
// selector). Returns a function mapping document->result object.
//
// matcher is the Matcher object we are compiling.
//
// If this is the root document selector (ie, not wrapped in $and or the like),
// then isRoot is true. (This is used by $near.)


function compileDocumentSelector(docSelector, matcher) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var docMatchers = Object.keys(docSelector).map(function (key) {
    var subSelector = docSelector[key];

    if (key.substr(0, 1) === '$') {
      // Outer operators are either logical operators (they recurse back into
      // this function), or $where.
      if (!hasOwn.call(LOGICAL_OPERATORS, key)) {
        throw new Error("Unrecognized logical operator: " + key);
      }

      matcher._isSimple = false;
      return LOGICAL_OPERATORS[key](subSelector, matcher, options.inElemMatch);
    } // Record this path, but only if we aren't in an elemMatcher, since in an
    // elemMatch this is a path inside an object in an array, not in the doc
    // root.


    if (!options.inElemMatch) {
      matcher._recordPathUsed(key);
    } // Don't add a matcher if subSelector is a function -- this is to match
    // the behavior of Meteor on the server (inherited from the node mongodb
    // driver), which is to ignore any part of a selector which is a function.


    if (typeof subSelector === 'function') {
      return undefined;
    }

    var lookUpByIndex = makeLookupFunction(key);
    var valueMatcher = compileValueSelector(subSelector, matcher, options.isRoot);
    return function (doc) {
      return valueMatcher(lookUpByIndex(doc));
    };
  }).filter(Boolean);
  return andDocumentMatchers(docMatchers);
}

// Takes in a selector that could match a key-indexed value in a document; eg,
// {$gt: 5, $lt: 9}, or a regular expression, or any non-expression object (to
// indicate equality).  Returns a branched matcher: a function mapping
// [branched value]->result object.
function compileValueSelector(valueSelector, matcher, isRoot) {
  if (valueSelector instanceof RegExp) {
    matcher._isSimple = false;
    return convertElementMatcherToBranchedMatcher(regexpElementMatcher(valueSelector));
  }

  if (isOperatorObject(valueSelector)) {
    return operatorBranchedMatcher(valueSelector, matcher, isRoot);
  }

  return convertElementMatcherToBranchedMatcher(equalityElementMatcher(valueSelector));
} // Given an element matcher (which evaluates a single value), returns a branched
// value (which evaluates the element matcher on all the branches and returns a
// more structured return value possibly including arrayIndices).


function convertElementMatcherToBranchedMatcher(elementMatcher) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (branches) {
    var expanded = options.dontExpandLeafArrays ? branches : expandArraysInBranches(branches, options.dontIncludeLeafArrays);
    var match = {};
    match.result = expanded.some(function (element) {
      var matched = elementMatcher(element.value); // Special case for $elemMatch: it means "true, and use this as an array
      // index if I didn't already have one".

      if (typeof matched === 'number') {
        // XXX This code dates from when we only stored a single array index
        // (for the outermost array). Should we be also including deeper array
        // indices from the $elemMatch match?
        if (!element.arrayIndices) {
          element.arrayIndices = [matched];
        }

        matched = true;
      } // If some element matched, and it's tagged with array indices, include
      // those indices in our result object.


      if (matched && element.arrayIndices) {
        match.arrayIndices = element.arrayIndices;
      }

      return matched;
    });
    return match;
  };
} // Helpers for $near.


function distanceCoordinatePairs(a, b) {
  var pointA = pointToArray(a);
  var pointB = pointToArray(b);
  return Math.hypot(pointA[0] - pointB[0], pointA[1] - pointB[1]);
} // Takes something that is not an operator object and returns an element matcher
// for equality with that thing.


function equalityElementMatcher(elementSelector) {
  if (isOperatorObject(elementSelector)) {
    throw Error('Can\'t create equalityValueSelector for operator object');
  } // Special-case: null and undefined are equal (if you got undefined in there
  // somewhere, or if you got it due to some branch being non-existent in the
  // weird special case), even though they aren't with EJSON.equals.
  // undefined or null


  if (elementSelector == null) {
    return function (value) {
      return value == null;
    };
  }

  return function (value) {
    return LocalCollection._f._equal(elementSelector, value);
  };
}

function everythingMatcher(docOrBranchedValues) {
  return {
    result: true
  };
}

function expandArraysInBranches(branches, skipTheArrays) {
  var branchesOut = [];
  branches.forEach(function (branch) {
    var thisIsArray = Array.isArray(branch.value); // We include the branch itself, *UNLESS* we it's an array that we're going
    // to iterate and we're told to skip arrays.  (That's right, we include some
    // arrays even skipTheArrays is true: these are arrays that were found via
    // explicit numerical indices.)

    if (!(skipTheArrays && thisIsArray && !branch.dontIterate)) {
      branchesOut.push({
        arrayIndices: branch.arrayIndices,
        value: branch.value
      });
    }

    if (thisIsArray && !branch.dontIterate) {
      branch.value.forEach(function (value, i) {
        branchesOut.push({
          arrayIndices: (branch.arrayIndices || []).concat(i),
          value: value
        });
      });
    }
  });
  return branchesOut;
}

// Helpers for $bitsAllSet/$bitsAnySet/$bitsAllClear/$bitsAnyClear.
function getOperandBitmask(operand, selector) {
  // numeric bitmask
  // You can provide a numeric bitmask to be matched against the operand field.
  // It must be representable as a non-negative 32-bit signed integer.
  // Otherwise, $bitsAllSet will return an error.
  if (Number.isInteger(operand) && operand >= 0) {
    return new Uint8Array(new Int32Array([operand]).buffer);
  } // bindata bitmask
  // You can also use an arbitrarily large BinData instance as a bitmask.


  if (EJSON.isBinary(operand)) {
    return new Uint8Array(operand.buffer);
  } // position list
  // If querying a list of bit positions, each <position> must be a non-negative
  // integer. Bit positions start at 0 from the least significant bit.


  if (Array.isArray(operand) && operand.every(function (x) {
    return Number.isInteger(x) && x >= 0;
  })) {
    var buffer = new ArrayBuffer((Math.max.apply(Math, (0, _toConsumableArray2.default)(operand)) >> 3) + 1);
    var view = new Uint8Array(buffer);
    operand.forEach(function (x) {
      view[x >> 3] |= 1 << (x & 0x7);
    });
    return view;
  } // bad operand


  throw Error("operand to " + selector + " must be a numeric bitmask (representable as a " + 'non-negative 32-bit signed integer), a bindata bitmask or an array with ' + 'bit positions (non-negative integers)');
}

function getValueBitmask(value, length) {
  // The field value must be either numerical or a BinData instance. Otherwise,
  // $bits... will not match the current document.
  // numerical
  if (Number.isSafeInteger(value)) {
    // $bits... will not match numerical values that cannot be represented as a
    // signed 64-bit integer. This can be the case if a value is either too
    // large or small to fit in a signed 64-bit integer, or if it has a
    // fractional component.
    var buffer = new ArrayBuffer(Math.max(length, 2 * Uint32Array.BYTES_PER_ELEMENT));
    var view = new Uint32Array(buffer, 0, 2);
    view[0] = value % ((1 << 16) * (1 << 16)) | 0;
    view[1] = value / ((1 << 16) * (1 << 16)) | 0; // sign extension

    if (value < 0) {
      view = new Uint8Array(buffer, 2);
      view.forEach(function (byte, i) {
        view[i] = 0xff;
      });
    }

    return new Uint8Array(buffer);
  } // bindata


  if (EJSON.isBinary(value)) {
    return new Uint8Array(value.buffer);
  } // no match


  return false;
} // Actually inserts a key value into the selector document
// However, this checks there is no ambiguity in setting
// the value for the given key, throws otherwise


function insertIntoDocument(document, key, value) {
  Object.keys(document).forEach(function (existingKey) {
    if (existingKey.length > key.length && existingKey.indexOf(key + ".") === 0 || key.length > existingKey.length && key.indexOf(existingKey + ".") === 0) {
      throw new Error("cannot infer query fields to set, both paths '" + existingKey + "' and " + ("'" + key + "' are matched"));
    } else if (existingKey === key) {
      throw new Error("cannot infer query fields to set, path '" + key + "' is matched twice");
    }
  });
  document[key] = value;
} // Returns a branched matcher that matches iff the given matcher does not.
// Note that this implicitly "deMorganizes" the wrapped function.  ie, it
// means that ALL branch values need to fail to match innerBranchedMatcher.


function invertBranchedMatcher(branchedMatcher) {
  return function (branchValues) {
    // We explicitly choose to strip arrayIndices here: it doesn't make sense to
    // say "update the array element that does not match something", at least
    // in mongo-land.
    return {
      result: !branchedMatcher(branchValues).result
    };
  };
}

function isIndexable(obj) {
  return Array.isArray(obj) || LocalCollection._isPlainObject(obj);
}

function isNumericKey(s) {
  return /^[0-9]+$/.test(s);
}

function isOperatorObject(valueSelector, inconsistentOK) {
  if (!LocalCollection._isPlainObject(valueSelector)) {
    return false;
  }

  var theseAreOperators = undefined;
  Object.keys(valueSelector).forEach(function (selKey) {
    var thisIsOperator = selKey.substr(0, 1) === '$';

    if (theseAreOperators === undefined) {
      theseAreOperators = thisIsOperator;
    } else if (theseAreOperators !== thisIsOperator) {
      if (!inconsistentOK) {
        throw new Error("Inconsistent operator: " + JSON.stringify(valueSelector));
      }

      theseAreOperators = false;
    }
  });
  return !!theseAreOperators; // {} has no operators
}

// Helper for $lt/$gt/$lte/$gte.
function makeInequality(cmpValueComparator) {
  return {
    compileElementSelector: function (operand) {
      // Arrays never compare false with non-arrays for any inequality.
      // XXX This was behavior we observed in pre-release MongoDB 2.5, but
      //     it seems to have been reverted.
      //     See https://jira.mongodb.org/browse/SERVER-11444
      if (Array.isArray(operand)) {
        return function () {
          return false;
        };
      } // Special case: consider undefined and null the same (so true with
      // $gte/$lte).


      if (operand === undefined) {
        operand = null;
      }

      var operandType = LocalCollection._f._type(operand);

      return function (value) {
        if (value === undefined) {
          value = null;
        } // Comparisons are never true among things of different type (except
        // null vs undefined).


        if (LocalCollection._f._type(value) !== operandType) {
          return false;
        }

        return cmpValueComparator(LocalCollection._f._cmp(value, operand));
      };
    }
  };
} // makeLookupFunction(key) returns a lookup function.
//
// A lookup function takes in a document and returns an array of matching
// branches.  If no arrays are found while looking up the key, this array will
// have exactly one branches (possibly 'undefined', if some segment of the key
// was not found).
//
// If arrays are found in the middle, this can have more than one element, since
// we 'branch'. When we 'branch', if there are more key segments to look up,
// then we only pursue branches that are plain objects (not arrays or scalars).
// This means we can actually end up with no branches!
//
// We do *NOT* branch on arrays that are found at the end (ie, at the last
// dotted member of the key). We just return that array; if you want to
// effectively 'branch' over the array's values, post-process the lookup
// function with expandArraysInBranches.
//
// Each branch is an object with keys:
//  - value: the value at the branch
//  - dontIterate: an optional bool; if true, it means that 'value' is an array
//    that expandArraysInBranches should NOT expand. This specifically happens
//    when there is a numeric index in the key, and ensures the
//    perhaps-surprising MongoDB behavior where {'a.0': 5} does NOT
//    match {a: [[5]]}.
//  - arrayIndices: if any array indexing was done during lookup (either due to
//    explicit numeric indices or implicit branching), this will be an array of
//    the array indices used, from outermost to innermost; it is falsey or
//    absent if no array index is used. If an explicit numeric index is used,
//    the index will be followed in arrayIndices by the string 'x'.
//
//    Note: arrayIndices is used for two purposes. First, it is used to
//    implement the '$' modifier feature, which only ever looks at its first
//    element.
//
//    Second, it is used for sort key generation, which needs to be able to tell
//    the difference between different paths. Moreover, it needs to
//    differentiate between explicit and implicit branching, which is why
//    there's the somewhat hacky 'x' entry: this means that explicit and
//    implicit array lookups will have different full arrayIndices paths. (That
//    code only requires that different paths have different arrayIndices; it
//    doesn't actually 'parse' arrayIndices. As an alternative, arrayIndices
//    could contain objects with flags like 'implicit', but I think that only
//    makes the code surrounding them more complex.)
//
//    (By the way, this field ends up getting passed around a lot without
//    cloning, so never mutate any arrayIndices field/var in this package!)
//
//
// At the top level, you may only pass in a plain object or array.
//
// See the test 'minimongo - lookup' for some examples of what lookup functions
// return.


function makeLookupFunction(key) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var parts = key.split('.');
  var firstPart = parts.length ? parts[0] : '';
  var lookupRest = parts.length > 1 && makeLookupFunction(parts.slice(1).join('.'), options);

  var omitUnnecessaryFields = function (result) {
    if (!result.dontIterate) {
      delete result.dontIterate;
    }

    if (result.arrayIndices && !result.arrayIndices.length) {
      delete result.arrayIndices;
    }

    return result;
  }; // Doc will always be a plain object or an array.
  // apply an explicit numeric index, an array.


  return function (doc) {
    var arrayIndices = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (Array.isArray(doc)) {
      // If we're being asked to do an invalid lookup into an array (non-integer
      // or out-of-bounds), return no results (which is different from returning
      // a single undefined result, in that `null` equality checks won't match).
      if (!(isNumericKey(firstPart) && firstPart < doc.length)) {
        return [];
      } // Remember that we used this array index. Include an 'x' to indicate that
      // the previous index came from being considered as an explicit array
      // index (not branching).


      arrayIndices = arrayIndices.concat(+firstPart, 'x');
    } // Do our first lookup.


    var firstLevel = doc[firstPart]; // If there is no deeper to dig, return what we found.
    //
    // If what we found is an array, most value selectors will choose to treat
    // the elements of the array as matchable values in their own right, but
    // that's done outside of the lookup function. (Exceptions to this are $size
    // and stuff relating to $elemMatch.  eg, {a: {$size: 2}} does not match {a:
    // [[1, 2]]}.)
    //
    // That said, if we just did an *explicit* array lookup (on doc) to find
    // firstLevel, and firstLevel is an array too, we do NOT want value
    // selectors to iterate over it.  eg, {'a.0': 5} does not match {a: [[5]]}.
    // So in that case, we mark the return value as 'don't iterate'.

    if (!lookupRest) {
      return [omitUnnecessaryFields({
        arrayIndices: arrayIndices,
        dontIterate: Array.isArray(doc) && Array.isArray(firstLevel),
        value: firstLevel
      })];
    } // We need to dig deeper.  But if we can't, because what we've found is not
    // an array or plain object, we're done. If we just did a numeric index into
    // an array, we return nothing here (this is a change in Mongo 2.5 from
    // Mongo 2.4, where {'a.0.b': null} stopped matching {a: [5]}). Otherwise,
    // return a single `undefined` (which can, for example, match via equality
    // with `null`).


    if (!isIndexable(firstLevel)) {
      if (Array.isArray(doc)) {
        return [];
      }

      return [omitUnnecessaryFields({
        arrayIndices: arrayIndices,
        value: undefined
      })];
    }

    var result = [];

    var appendToResult = function (more) {
      result.push.apply(result, (0, _toConsumableArray2.default)(more));
    }; // Dig deeper: look up the rest of the parts on whatever we've found.
    // (lookupRest is smart enough to not try to do invalid lookups into
    // firstLevel if it's an array.)


    appendToResult(lookupRest(firstLevel, arrayIndices)); // If we found an array, then in *addition* to potentially treating the next
    // part as a literal integer lookup, we should also 'branch': try to look up
    // the rest of the parts on each array element in parallel.
    //
    // In this case, we *only* dig deeper into array elements that are plain
    // objects. (Recall that we only got this far if we have further to dig.)
    // This makes sense: we certainly don't dig deeper into non-indexable
    // objects. And it would be weird to dig into an array: it's simpler to have
    // a rule that explicit integer indexes only apply to an outer array, not to
    // an array you find after a branching search.
    //
    // In the special case of a numeric part in a *sort selector* (not a query
    // selector), we skip the branching: we ONLY allow the numeric part to mean
    // 'look up this index' in that case, not 'also look up this index in all
    // the elements of the array'.

    if (Array.isArray(firstLevel) && !(isNumericKey(parts[1]) && options.forSort)) {
      firstLevel.forEach(function (branch, arrayIndex) {
        if (LocalCollection._isPlainObject(branch)) {
          appendToResult(lookupRest(branch, arrayIndices.concat(arrayIndex)));
        }
      });
    }

    return result;
  };
}

// Object exported only for unit testing.
// Use it to export private functions to test in Tinytest.
MinimongoTest = {
  makeLookupFunction: makeLookupFunction
};

MinimongoError = function (message) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof message === 'string' && options.field) {
    message += " for field '" + options.field + "'";
  }

  var error = new Error(message);
  error.name = 'MinimongoError';
  return error;
};

function nothingMatcher(docOrBranchedValues) {
  return {
    result: false
  };
}

// Takes an operator object (an object with $ keys) and returns a branched
// matcher for it.
function operatorBranchedMatcher(valueSelector, matcher, isRoot) {
  // Each valueSelector works separately on the various branches.  So one
  // operator can match one branch and another can match another branch.  This
  // is OK.
  var operatorMatchers = Object.keys(valueSelector).map(function (operator) {
    var operand = valueSelector[operator];
    var simpleRange = ['$lt', '$lte', '$gt', '$gte'].includes(operator) && typeof operand === 'number';
    var simpleEquality = ['$ne', '$eq'].includes(operator) && operand !== Object(operand);
    var simpleInclusion = ['$in', '$nin'].includes(operator) && Array.isArray(operand) && !operand.some(function (x) {
      return x === Object(x);
    });

    if (!(simpleRange || simpleInclusion || simpleEquality)) {
      matcher._isSimple = false;
    }

    if (hasOwn.call(VALUE_OPERATORS, operator)) {
      return VALUE_OPERATORS[operator](operand, valueSelector, matcher, isRoot);
    }

    if (hasOwn.call(ELEMENT_OPERATORS, operator)) {
      var options = ELEMENT_OPERATORS[operator];
      return convertElementMatcherToBranchedMatcher(options.compileElementSelector(operand, valueSelector, matcher), options);
    }

    throw new Error("Unrecognized operator: " + operator);
  });
  return andBranchedMatchers(operatorMatchers);
} // paths - Array: list of mongo style paths
// newLeafFn - Function: of form function(path) should return a scalar value to
//                       put into list created for that path
// conflictFn - Function: of form function(node, path, fullPath) is called
//                        when building a tree path for 'fullPath' node on
//                        'path' was already a leaf with a value. Must return a
//                        conflict resolution.
// initial tree - Optional Object: starting tree.
// @returns - Object: tree represented as a set of nested objects


function pathsToTree(paths, newLeafFn, conflictFn) {
  var root = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  paths.forEach(function (path) {
    var pathArray = path.split('.');
    var tree = root; // use .every just for iteration with break

    var success = pathArray.slice(0, -1).every(function (key, i) {
      if (!hasOwn.call(tree, key)) {
        tree[key] = {};
      } else if (tree[key] !== Object(tree[key])) {
        tree[key] = conflictFn(tree[key], pathArray.slice(0, i + 1).join('.'), path); // break out of loop if we are failing for this path

        if (tree[key] !== Object(tree[key])) {
          return false;
        }
      }

      tree = tree[key];
      return true;
    });

    if (success) {
      var lastKey = pathArray[pathArray.length - 1];

      if (hasOwn.call(tree, lastKey)) {
        tree[lastKey] = conflictFn(tree[lastKey], path, path);
      } else {
        tree[lastKey] = newLeafFn(path);
      }
    }
  });
  return root;
}

// Makes sure we get 2 elements array and assume the first one to be x and
// the second one to y no matter what user passes.
// In case user passes { lon: x, lat: y } returns [x, y]
function pointToArray(point) {
  return Array.isArray(point) ? point.slice() : [point.x, point.y];
} // Creating a document from an upsert is quite tricky.
// E.g. this selector: {"$or": [{"b.foo": {"$all": ["bar"]}}]}, should result
// in: {"b.foo": "bar"}
// But this selector: {"$or": [{"b": {"foo": {"$all": ["bar"]}}}]} should throw
// an error
// Some rules (found mainly with trial & error, so there might be more):
// - handle all childs of $and (or implicit $and)
// - handle $or nodes with exactly 1 child
// - ignore $or nodes with more than 1 child
// - ignore $nor and $not nodes
// - throw when a value can not be set unambiguously
// - every value for $all should be dealt with as separate $eq-s
// - threat all children of $all as $eq setters (=> set if $all.length === 1,
//   otherwise throw error)
// - you can not mix '$'-prefixed keys and non-'$'-prefixed keys
// - you can only have dotted keys on a root-level
// - you can not have '$'-prefixed keys more than one-level deep in an object
// Handles one key/value pair to put in the selector document


function populateDocumentWithKeyValue(document, key, value) {
  if (value && Object.getPrototypeOf(value) === Object.prototype) {
    populateDocumentWithObject(document, key, value);
  } else if (!(value instanceof RegExp)) {
    insertIntoDocument(document, key, value);
  }
} // Handles a key, value pair to put in the selector document
// if the value is an object


function populateDocumentWithObject(document, key, value) {
  var keys = Object.keys(value);
  var unprefixedKeys = keys.filter(function (op) {
    return op[0] !== '$';
  });

  if (unprefixedKeys.length > 0 || !keys.length) {
    // Literal (possibly empty) object ( or empty object )
    // Don't allow mixing '$'-prefixed with non-'$'-prefixed fields
    if (keys.length !== unprefixedKeys.length) {
      throw new Error("unknown operator: " + unprefixedKeys[0]);
    }

    validateObject(value, key);
    insertIntoDocument(document, key, value);
  } else {
    Object.keys(value).forEach(function (op) {
      var object = value[op];

      if (op === '$eq') {
        populateDocumentWithKeyValue(document, key, object);
      } else if (op === '$all') {
        // every value for $all should be dealt with as separate $eq-s
        object.forEach(function (element) {
          return populateDocumentWithKeyValue(document, key, element);
        });
      }
    });
  }
} // Fills a document with certain fields from an upsert selector


function populateDocumentWithQueryFields(query) {
  var document = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (Object.getPrototypeOf(query) === Object.prototype) {
    // handle implicit $and
    Object.keys(query).forEach(function (key) {
      var value = query[key];

      if (key === '$and') {
        // handle explicit $and
        value.forEach(function (element) {
          return populateDocumentWithQueryFields(element, document);
        });
      } else if (key === '$or') {
        // handle $or nodes with exactly 1 child
        if (value.length === 1) {
          populateDocumentWithQueryFields(value[0], document);
        }
      } else if (key[0] !== '$') {
        // Ignore other '$'-prefixed logical selectors
        populateDocumentWithKeyValue(document, key, value);
      }
    });
  } else {
    // Handle meteor-specific shortcut for selecting _id
    if (LocalCollection._selectorIsId(query)) {
      insertIntoDocument(document, '_id', query);
    }
  }

  return document;
}

function projectionDetails(fields) {
  // Find the non-_id keys (_id is handled specially because it is included
  // unless explicitly excluded). Sort the keys, so that our code to detect
  // overlaps like 'foo' and 'foo.bar' can assume that 'foo' comes first.
  var fieldsKeys = Object.keys(fields).sort(); // If _id is the only field in the projection, do not remove it, since it is
  // required to determine if this is an exclusion or exclusion. Also keep an
  // inclusive _id, since inclusive _id follows the normal rules about mixing
  // inclusive and exclusive fields. If _id is not the only field in the
  // projection and is exclusive, remove it so it can be handled later by a
  // special case, since exclusive _id is always allowed.

  if (!(fieldsKeys.length === 1 && fieldsKeys[0] === '_id') && !(fieldsKeys.includes('_id') && fields._id)) {
    fieldsKeys = fieldsKeys.filter(function (key) {
      return key !== '_id';
    });
  }

  var including = null; // Unknown

  fieldsKeys.forEach(function (keyPath) {
    var rule = !!fields[keyPath];

    if (including === null) {
      including = rule;
    } // This error message is copied from MongoDB shell


    if (including !== rule) {
      throw MinimongoError('You cannot currently mix including and excluding fields.');
    }
  });
  var projectionRulesTree = pathsToTree(fieldsKeys, function (path) {
    return including;
  }, function (node, path, fullPath) {
    // Check passed projection fields' keys: If you have two rules such as
    // 'foo.bar' and 'foo.bar.baz', then the result becomes ambiguous. If
    // that happens, there is a probability you are doing something wrong,
    // framework should notify you about such mistake earlier on cursor
    // compilation step than later during runtime.  Note, that real mongo
    // doesn't do anything about it and the later rule appears in projection
    // project, more priority it takes.
    //
    // Example, assume following in mongo shell:
    // > db.coll.insert({ a: { b: 23, c: 44 } })
    // > db.coll.find({}, { 'a': 1, 'a.b': 1 })
    // {"_id": ObjectId("520bfe456024608e8ef24af3"), "a": {"b": 23}}
    // > db.coll.find({}, { 'a.b': 1, 'a': 1 })
    // {"_id": ObjectId("520bfe456024608e8ef24af3"), "a": {"b": 23, "c": 44}}
    //
    // Note, how second time the return set of keys is different.
    var currentPath = fullPath;
    var anotherPath = path;
    throw MinimongoError("both " + currentPath + " and " + anotherPath + " found in fields option, " + 'using both of them may trigger unexpected behavior. Did you mean to ' + 'use only one of them?');
  });
  return {
    including: including,
    tree: projectionRulesTree
  };
}

function regexpElementMatcher(regexp) {
  return function (value) {
    if (value instanceof RegExp) {
      return value.toString() === regexp.toString();
    } // Regexps only work against strings.


    if (typeof value !== 'string') {
      return false;
    } // Reset regexp's state to avoid inconsistent matching for objects with the
    // same value on consecutive calls of regexp.test. This happens only if the
    // regexp has the 'g' flag. Also note that ES6 introduces a new flag 'y' for
    // which we should *not* change the lastIndex but MongoDB doesn't support
    // either of these flags.


    regexp.lastIndex = 0;
    return regexp.test(value);
  };
}

// Validates the key in a path.
// Objects that are nested more then 1 level cannot have dotted fields
// or fields starting with '$'
function validateKeyInPath(key, path) {
  if (key.includes('.')) {
    throw new Error("The dotted field '" + key + "' in '" + path + "." + key + " is not valid for storage.");
  }

  if (key[0] === '$') {
    throw new Error("The dollar ($) prefixed field  '" + path + "." + key + " is not valid for storage.");
  }
} // Recursively validates an object that is nested more than one level deep


function validateObject(object, path) {
  if (object && Object.getPrototypeOf(object) === Object.prototype) {
    Object.keys(object).forEach(function (key) {
      validateKeyInPath(key, path);
      validateObject(object[key], path + '.' + key);
    });
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cursor.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/minimongo/cursor.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  "default": function () {
    return Cursor;
  }
});
var LocalCollection;
module.link("./local_collection.js", {
  "default": function (v) {
    LocalCollection = v;
  }
}, 0);
var hasOwn;
module.link("./common.js", {
  hasOwn: function (v) {
    hasOwn = v;
  }
}, 1);

var Cursor =
/*#__PURE__*/
function () {
  // don't call this ctor directly.  use LocalCollection.find().
  function Cursor(collection, selector) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    this.collection = collection;
    this.sorter = null;
    this.matcher = new Minimongo.Matcher(selector);

    if (LocalCollection._selectorIsIdPerhapsAsObject(selector)) {
      // stash for fast _id and { _id }
      this._selectorId = hasOwn.call(selector, '_id') ? selector._id : selector;
    } else {
      this._selectorId = undefined;

      if (this.matcher.hasGeoQuery() || options.sort) {
        this.sorter = new Minimongo.Sorter(options.sort || []);
      }
    }

    this.skip = options.skip || 0;
    this.limit = options.limit;
    this.fields = options.fields;
    this._projectionFn = LocalCollection._compileProjection(this.fields || {});
    this._transform = LocalCollection.wrapTransform(options.transform); // by default, queries register w/ Tracker when it is available.

    if (typeof Tracker !== 'undefined') {
      this.reactive = options.reactive === undefined ? true : options.reactive;
    }
  }
  /**
   * @summary Returns the number of documents that match a query.
   * @memberOf Mongo.Cursor
   * @method  count
   * @param {boolean} [applySkipLimit=true] If set to `false`, the value
   *                                         returned will reflect the total
   *                                         number of matching documents,
   *                                         ignoring any value supplied for
   *                                         limit
   * @instance
   * @locus Anywhere
   * @returns {Number}
   */


  var _proto = Cursor.prototype;

  _proto.count = function () {
    function count() {
      var applySkipLimit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this.reactive) {
        // allow the observe to be unordered
        this._depend({
          added: true,
          removed: true
        }, true);
      }

      return this._getRawObjects({
        ordered: true,
        applySkipLimit: applySkipLimit
      }).length;
    }

    return count;
  }();
  /**
   * @summary Return all matching documents as an Array.
   * @memberOf Mongo.Cursor
   * @method  fetch
   * @instance
   * @locus Anywhere
   * @returns {Object[]}
   */


  _proto.fetch = function () {
    function fetch() {
      var result = [];
      this.forEach(function (doc) {
        result.push(doc);
      });
      return result;
    }

    return fetch;
  }();

  _proto[Symbol.iterator] = function () {
    var _this = this;

    if (this.reactive) {
      this._depend({
        addedBefore: true,
        removed: true,
        changed: true,
        movedBefore: true
      });
    }

    var index = 0;

    var objects = this._getRawObjects({
      ordered: true
    });

    return {
      next: function () {
        if (index < objects.length) {
          // This doubles as a clone operation.
          var element = _this._projectionFn(objects[index++]);

          if (_this._transform) element = _this._transform(element);
          return {
            value: element
          };
        }

        return {
          done: true
        };
      }
    };
  };
  /**
   * @callback IterationCallback
   * @param {Object} doc
   * @param {Number} index
   */

  /**
   * @summary Call `callback` once for each matching document, sequentially and
   *          synchronously.
   * @locus Anywhere
   * @method  forEach
   * @instance
   * @memberOf Mongo.Cursor
   * @param {IterationCallback} callback Function to call. It will be called
   *                                     with three arguments: the document, a
   *                                     0-based index, and <em>cursor</em>
   *                                     itself.
   * @param {Any} [thisArg] An object which will be the value of `this` inside
   *                        `callback`.
   */


  _proto.forEach = function () {
    function forEach(callback, thisArg) {
      var _this2 = this;

      if (this.reactive) {
        this._depend({
          addedBefore: true,
          removed: true,
          changed: true,
          movedBefore: true
        });
      }

      this._getRawObjects({
        ordered: true
      }).forEach(function (element, i) {
        // This doubles as a clone operation.
        element = _this2._projectionFn(element);

        if (_this2._transform) {
          element = _this2._transform(element);
        }

        callback.call(thisArg, element, i, _this2);
      });
    }

    return forEach;
  }();

  _proto.getTransform = function () {
    function getTransform() {
      return this._transform;
    }

    return getTransform;
  }();
  /**
   * @summary Map callback over all matching documents.  Returns an Array.
   * @locus Anywhere
   * @method map
   * @instance
   * @memberOf Mongo.Cursor
   * @param {IterationCallback} callback Function to call. It will be called
   *                                     with three arguments: the document, a
   *                                     0-based index, and <em>cursor</em>
   *                                     itself.
   * @param {Any} [thisArg] An object which will be the value of `this` inside
   *                        `callback`.
   */


  _proto.map = function () {
    function map(callback, thisArg) {
      var _this3 = this;

      var result = [];
      this.forEach(function (doc, i) {
        result.push(callback.call(thisArg, doc, i, _this3));
      });
      return result;
    }

    return map;
  }(); // options to contain:
  //  * callbacks for observe():
  //    - addedAt (document, atIndex)
  //    - added (document)
  //    - changedAt (newDocument, oldDocument, atIndex)
  //    - changed (newDocument, oldDocument)
  //    - removedAt (document, atIndex)
  //    - removed (document)
  //    - movedTo (document, oldIndex, newIndex)
  //
  // attributes available on returned query handle:
  //  * stop(): end updates
  //  * collection: the collection this query is querying
  //
  // iff x is a returned query handle, (x instanceof
  // LocalCollection.ObserveHandle) is true
  //
  // initial results delivered through added callback
  // XXX maybe callbacks should take a list of objects, to expose transactions?
  // XXX maybe support field limiting (to limit what you're notified on)

  /**
   * @summary Watch a query.  Receive callbacks as the result set changes.
   * @locus Anywhere
   * @memberOf Mongo.Cursor
   * @instance
   * @param {Object} callbacks Functions to call to deliver the result set as it
   *                           changes
   */


  _proto.observe = function () {
    function observe(options) {
      return LocalCollection._observeFromObserveChanges(this, options);
    }

    return observe;
  }();
  /**
   * @summary Watch a query. Receive callbacks as the result set changes. Only
   *          the differences between the old and new documents are passed to
   *          the callbacks.
   * @locus Anywhere
   * @memberOf Mongo.Cursor
   * @instance
   * @param {Object} callbacks Functions to call to deliver the result set as it
   *                           changes
   */


  _proto.observeChanges = function () {
    function observeChanges(options) {
      var _this4 = this;

      var ordered = LocalCollection._observeChangesCallbacksAreOrdered(options); // there are several places that assume you aren't combining skip/limit with
      // unordered observe.  eg, update's EJSON.clone, and the "there are several"
      // comment in _modifyAndNotify
      // XXX allow skip/limit with unordered observe


      if (!options._allow_unordered && !ordered && (this.skip || this.limit)) {
        throw new Error("Must use an ordered observe with skip or limit (i.e. 'addedBefore' " + "for observeChanges or 'addedAt' for observe, instead of 'added').");
      }

      if (this.fields && (this.fields._id === 0 || this.fields._id === false)) {
        throw Error('You may not observe a cursor with {fields: {_id: 0}}');
      }

      var distances = this.matcher.hasGeoQuery() && ordered && new LocalCollection._IdMap();
      var query = {
        cursor: this,
        dirty: false,
        distances: distances,
        matcher: this.matcher,
        // not fast pathed
        ordered: ordered,
        projectionFn: this._projectionFn,
        resultsSnapshot: null,
        sorter: ordered && this.sorter
      };
      var qid; // Non-reactive queries call added[Before] and then never call anything
      // else.

      if (this.reactive) {
        qid = this.collection.next_qid++;
        this.collection.queries[qid] = query;
      }

      query.results = this._getRawObjects({
        ordered: ordered,
        distances: query.distances
      });

      if (this.collection.paused) {
        query.resultsSnapshot = ordered ? [] : new LocalCollection._IdMap();
      } // wrap callbacks we were passed. callbacks only fire when not paused and
      // are never undefined
      // Filters out blacklisted fields according to cursor's projection.
      // XXX wrong place for this?
      // furthermore, callbacks enqueue until the operation we're working on is
      // done.


      var wrapCallback = function (fn) {
        if (!fn) {
          return function () {};
        }

        var self = _this4;
        return function ()
        /* args*/
        {
          var _this5 = this;

          if (self.collection.paused) {
            return;
          }

          var args = arguments;

          self.collection._observeQueue.queueTask(function () {
            fn.apply(_this5, args);
          });
        };
      };

      query.added = wrapCallback(options.added);
      query.changed = wrapCallback(options.changed);
      query.removed = wrapCallback(options.removed);

      if (ordered) {
        query.addedBefore = wrapCallback(options.addedBefore);
        query.movedBefore = wrapCallback(options.movedBefore);
      }

      if (!options._suppress_initial && !this.collection.paused) {
        query.results.forEach(function (doc) {
          var fields = EJSON.clone(doc);
          delete fields._id;

          if (ordered) {
            query.addedBefore(doc._id, _this4._projectionFn(fields), null);
          }

          query.added(doc._id, _this4._projectionFn(fields));
        });
      }

      var handle = Object.assign(new LocalCollection.ObserveHandle(), {
        collection: this.collection,
        stop: function () {
          if (_this4.reactive) {
            delete _this4.collection.queries[qid];
          }
        }
      });

      if (this.reactive && Tracker.active) {
        // XXX in many cases, the same observe will be recreated when
        // the current autorun is rerun.  we could save work by
        // letting it linger across rerun and potentially get
        // repurposed if the same observe is performed, using logic
        // similar to that of Meteor.subscribe.
        Tracker.onInvalidate(function () {
          handle.stop();
        });
      } // run the observe callbacks resulting from the initial contents
      // before we leave the observe.


      this.collection._observeQueue.drain();

      return handle;
    }

    return observeChanges;
  }(); // Since we don't actually have a "nextObject" interface, there's really no
  // reason to have a "rewind" interface.  All it did was make multiple calls
  // to fetch/map/forEach return nothing the second time.
  // XXX COMPAT WITH 0.8.1


  _proto.rewind = function () {
    function rewind() {}

    return rewind;
  }(); // XXX Maybe we need a version of observe that just calls a callback if
  // anything changed.


  _proto._depend = function () {
    function _depend(changers, _allow_unordered) {
      if (Tracker.active) {
        var dependency = new Tracker.Dependency();
        var notify = dependency.changed.bind(dependency);
        dependency.depend();
        var options = {
          _allow_unordered: _allow_unordered,
          _suppress_initial: true
        };
        ['added', 'addedBefore', 'changed', 'movedBefore', 'removed'].forEach(function (fn) {
          if (changers[fn]) {
            options[fn] = notify;
          }
        }); // observeChanges will stop() when this computation is invalidated

        this.observeChanges(options);
      }
    }

    return _depend;
  }();

  _proto._getCollectionName = function () {
    function _getCollectionName() {
      return this.collection.name;
    }

    return _getCollectionName;
  }(); // Returns a collection of matching objects, but doesn't deep copy them.
  //
  // If ordered is set, returns a sorted array, respecting sorter, skip, and
  // limit properties of the query provided that options.applySkipLimit is
  // not set to false (#1201). If sorter is falsey, no sort -- you get the
  // natural order.
  //
  // If ordered is not set, returns an object mapping from ID to doc (sorter,
  // skip and limit should not be set).
  //
  // If ordered is set and this cursor is a $near geoquery, then this function
  // will use an _IdMap to track each distance from the $near argument point in
  // order to use it as a sort key. If an _IdMap is passed in the 'distances'
  // argument, this function will clear it and use it for this purpose
  // (otherwise it will just create its own _IdMap). The observeChanges
  // implementation uses this to remember the distances after this function
  // returns.


  _proto._getRawObjects = function () {
    function _getRawObjects() {
      var _this6 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // By default this method will respect skip and limit because .fetch(),
      // .forEach() etc... expect this behaviour. It can be forced to ignore
      // skip and limit by setting applySkipLimit to false (.count() does this,
      // for example)
      var applySkipLimit = options.applySkipLimit !== false; // XXX use OrderedDict instead of array, and make IdMap and OrderedDict
      // compatible

      var results = options.ordered ? [] : new LocalCollection._IdMap(); // fast path for single ID value

      if (this._selectorId !== undefined) {
        // If you have non-zero skip and ask for a single id, you get nothing.
        // This is so it matches the behavior of the '{_id: foo}' path.
        if (applySkipLimit && this.skip) {
          return results;
        }

        var selectedDoc = this.collection._docs.get(this._selectorId);

        if (selectedDoc) {
          if (options.ordered) {
            results.push(selectedDoc);
          } else {
            results.set(this._selectorId, selectedDoc);
          }
        }

        return results;
      } // slow path for arbitrary selector, sort, skip, limit
      // in the observeChanges case, distances is actually part of the "query"
      // (ie, live results set) object.  in other cases, distances is only used
      // inside this function.


      var distances;

      if (this.matcher.hasGeoQuery() && options.ordered) {
        if (options.distances) {
          distances = options.distances;
          distances.clear();
        } else {
          distances = new LocalCollection._IdMap();
        }
      }

      this.collection._docs.forEach(function (doc, id) {
        var matchResult = _this6.matcher.documentMatches(doc);

        if (matchResult.result) {
          if (options.ordered) {
            results.push(doc);

            if (distances && matchResult.distance !== undefined) {
              distances.set(id, matchResult.distance);
            }
          } else {
            results.set(id, doc);
          }
        } // Override to ensure all docs are matched if ignoring skip & limit


        if (!applySkipLimit) {
          return true;
        } // Fast path for limited unsorted queries.
        // XXX 'length' check here seems wrong for ordered


        return !_this6.limit || _this6.skip || _this6.sorter || results.length !== _this6.limit;
      });

      if (!options.ordered) {
        return results;
      }

      if (this.sorter) {
        results.sort(this.sorter.getComparator({
          distances: distances
        }));
      } // Return the full set of results if there is no skip or limit or if we're
      // ignoring them


      if (!applySkipLimit || !this.limit && !this.skip) {
        return results;
      }

      return results.slice(this.skip, this.limit ? this.limit + this.skip : results.length);
    }

    return _getRawObjects;
  }();

  _proto._publishCursor = function () {
    function _publishCursor(subscription) {
      // XXX minimongo should not depend on mongo-livedata!
      if (!Package.mongo) {
        throw new Error('Can\'t publish from Minimongo without the `mongo` package.');
      }

      if (!this.collection.name) {
        throw new Error('Can\'t publish a cursor from a collection without a name.');
      }

      return Package.mongo.Mongo.Collection._publishCursor(this, subscription, this.collection.name);
    }

    return _publishCursor;
  }();

  return Cursor;
}();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"local_collection.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/minimongo/local_collection.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  "default": function () {
    return LocalCollection;
  }
});
var Cursor;
module.link("./cursor.js", {
  "default": function (v) {
    Cursor = v;
  }
}, 0);
var ObserveHandle;
module.link("./observe_handle.js", {
  "default": function (v) {
    ObserveHandle = v;
  }
}, 1);
var hasOwn, isIndexable, isNumericKey, isOperatorObject, populateDocumentWithQueryFields, projectionDetails;
module.link("./common.js", {
  hasOwn: function (v) {
    hasOwn = v;
  },
  isIndexable: function (v) {
    isIndexable = v;
  },
  isNumericKey: function (v) {
    isNumericKey = v;
  },
  isOperatorObject: function (v) {
    isOperatorObject = v;
  },
  populateDocumentWithQueryFields: function (v) {
    populateDocumentWithQueryFields = v;
  },
  projectionDetails: function (v) {
    projectionDetails = v;
  }
}, 2);

var LocalCollection =
/*#__PURE__*/
function () {
  function LocalCollection(name) {
    this.name = name; // _id -> document (also containing id)

    this._docs = new LocalCollection._IdMap();
    this._observeQueue = new Meteor._SynchronousQueue();
    this.next_qid = 1; // live query id generator
    // qid -> live query object. keys:
    //  ordered: bool. ordered queries have addedBefore/movedBefore callbacks.
    //  results: array (ordered) or object (unordered) of current results
    //    (aliased with this._docs!)
    //  resultsSnapshot: snapshot of results. null if not paused.
    //  cursor: Cursor object for the query.
    //  selector, sorter, (callbacks): functions

    this.queries = Object.create(null); // null if not saving originals; an IdMap from id to original document value
    // if saving originals. See comments before saveOriginals().

    this._savedOriginals = null; // True when observers are paused and we should not send callbacks.

    this.paused = false;
  } // options may include sort, skip, limit, reactive
  // sort may be any of these forms:
  //     {a: 1, b: -1}
  //     [["a", "asc"], ["b", "desc"]]
  //     ["a", ["b", "desc"]]
  //   (in the first form you're beholden to key enumeration order in
  //   your javascript VM)
  //
  // reactive: if given, and false, don't register with Tracker (default
  // is true)
  //
  // XXX possibly should support retrieving a subset of fields? and
  // have it be a hint (ignored on the client, when not copying the
  // doc?)
  //
  // XXX sort does not yet support subkeys ('a.b') .. fix that!
  // XXX add one more sort form: "key"
  // XXX tests


  var _proto = LocalCollection.prototype;

  _proto.find = function () {
    function find(selector, options) {
      // default syntax for everything is to omit the selector argument.
      // but if selector is explicitly passed in as false or undefined, we
      // want a selector that matches nothing.
      if (arguments.length === 0) {
        selector = {};
      }

      return new LocalCollection.Cursor(this, selector, options);
    }

    return find;
  }();

  _proto.findOne = function () {
    function findOne(selector) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (arguments.length === 0) {
        selector = {};
      } // NOTE: by setting limit 1 here, we end up using very inefficient
      // code that recomputes the whole query on each update. The upside is
      // that when you reactively depend on a findOne you only get
      // invalidated when the found object changes, not any object in the
      // collection. Most findOne will be by id, which has a fast path, so
      // this might not be a big deal. In most cases, invalidation causes
      // the called to re-query anyway, so this should be a net performance
      // improvement.


      options.limit = 1;
      return this.find(selector, options).fetch()[0];
    }

    return findOne;
  }(); // XXX possibly enforce that 'undefined' does not appear (we assume
  // this in our handling of null and $exists)


  _proto.insert = function () {
    function insert(doc, callback) {
      var _this = this;

      doc = EJSON.clone(doc);
      assertHasValidFieldNames(doc); // if you really want to use ObjectIDs, set this global.
      // Mongo.Collection specifies its own ids and does not use this code.

      if (!hasOwn.call(doc, '_id')) {
        doc._id = LocalCollection._useOID ? new MongoID.ObjectID() : Random.id();
      }

      var id = doc._id;

      if (this._docs.has(id)) {
        throw MinimongoError("Duplicate _id '" + id + "'");
      }

      this._saveOriginal(id, undefined);

      this._docs.set(id, doc);

      var queriesToRecompute = []; // trigger live queries that match

      Object.keys(this.queries).forEach(function (qid) {
        var query = _this.queries[qid];

        if (query.dirty) {
          return;
        }

        var matchResult = query.matcher.documentMatches(doc);

        if (matchResult.result) {
          if (query.distances && matchResult.distance !== undefined) {
            query.distances.set(id, matchResult.distance);
          }

          if (query.cursor.skip || query.cursor.limit) {
            queriesToRecompute.push(qid);
          } else {
            LocalCollection._insertInResults(query, doc);
          }
        }
      });
      queriesToRecompute.forEach(function (qid) {
        if (_this.queries[qid]) {
          _this._recomputeResults(_this.queries[qid]);
        }
      });

      this._observeQueue.drain(); // Defer because the caller likely doesn't expect the callback to be run
      // immediately.


      if (callback) {
        Meteor.defer(function () {
          callback(null, id);
        });
      }

      return id;
    }

    return insert;
  }(); // Pause the observers. No callbacks from observers will fire until
  // 'resumeObservers' is called.


  _proto.pauseObservers = function () {
    function pauseObservers() {
      var _this2 = this;

      // No-op if already paused.
      if (this.paused) {
        return;
      } // Set the 'paused' flag such that new observer messages don't fire.


      this.paused = true; // Take a snapshot of the query results for each query.

      Object.keys(this.queries).forEach(function (qid) {
        var query = _this2.queries[qid];
        query.resultsSnapshot = EJSON.clone(query.results);
      });
    }

    return pauseObservers;
  }();

  _proto.remove = function () {
    function remove(selector, callback) {
      var _this3 = this;

      // Easy special case: if we're not calling observeChanges callbacks and
      // we're not saving originals and we got asked to remove everything, then
      // just empty everything directly.
      if (this.paused && !this._savedOriginals && EJSON.equals(selector, {})) {
        var _result = this._docs.size();

        this._docs.clear();

        Object.keys(this.queries).forEach(function (qid) {
          var query = _this3.queries[qid];

          if (query.ordered) {
            query.results = [];
          } else {
            query.results.clear();
          }
        });

        if (callback) {
          Meteor.defer(function () {
            callback(null, _result);
          });
        }

        return _result;
      }

      var matcher = new Minimongo.Matcher(selector);
      var remove = [];

      this._eachPossiblyMatchingDoc(selector, function (doc, id) {
        if (matcher.documentMatches(doc).result) {
          remove.push(id);
        }
      });

      var queriesToRecompute = [];
      var queryRemove = [];

      var _loop = function (i) {
        var removeId = remove[i];

        var removeDoc = _this3._docs.get(removeId);

        Object.keys(_this3.queries).forEach(function (qid) {
          var query = _this3.queries[qid];

          if (query.dirty) {
            return;
          }

          if (query.matcher.documentMatches(removeDoc).result) {
            if (query.cursor.skip || query.cursor.limit) {
              queriesToRecompute.push(qid);
            } else {
              queryRemove.push({
                qid: qid,
                doc: removeDoc
              });
            }
          }
        });

        _this3._saveOriginal(removeId, removeDoc);

        _this3._docs.remove(removeId);
      };

      for (var i = 0; i < remove.length; i++) {
        _loop(i);
      } // run live query callbacks _after_ we've removed the documents.


      queryRemove.forEach(function (remove) {
        var query = _this3.queries[remove.qid];

        if (query) {
          query.distances && query.distances.remove(remove.doc._id);

          LocalCollection._removeFromResults(query, remove.doc);
        }
      });
      queriesToRecompute.forEach(function (qid) {
        var query = _this3.queries[qid];

        if (query) {
          _this3._recomputeResults(query);
        }
      });

      this._observeQueue.drain();

      var result = remove.length;

      if (callback) {
        Meteor.defer(function () {
          callback(null, result);
        });
      }

      return result;
    }

    return remove;
  }(); // Resume the observers. Observers immediately receive change
  // notifications to bring them to the current state of the
  // database. Note that this is not just replaying all the changes that
  // happened during the pause, it is a smarter 'coalesced' diff.


  _proto.resumeObservers = function () {
    function resumeObservers() {
      var _this4 = this;

      // No-op if not paused.
      if (!this.paused) {
        return;
      } // Unset the 'paused' flag. Make sure to do this first, otherwise
      // observer methods won't actually fire when we trigger them.


      this.paused = false;
      Object.keys(this.queries).forEach(function (qid) {
        var query = _this4.queries[qid];

        if (query.dirty) {
          query.dirty = false; // re-compute results will perform `LocalCollection._diffQueryChanges`
          // automatically.

          _this4._recomputeResults(query, query.resultsSnapshot);
        } else {
          // Diff the current results against the snapshot and send to observers.
          // pass the query object for its observer callbacks.
          LocalCollection._diffQueryChanges(query.ordered, query.resultsSnapshot, query.results, query, {
            projectionFn: query.projectionFn
          });
        }

        query.resultsSnapshot = null;
      });

      this._observeQueue.drain();
    }

    return resumeObservers;
  }();

  _proto.retrieveOriginals = function () {
    function retrieveOriginals() {
      if (!this._savedOriginals) {
        throw new Error('Called retrieveOriginals without saveOriginals');
      }

      var originals = this._savedOriginals;
      this._savedOriginals = null;
      return originals;
    }

    return retrieveOriginals;
  }(); // To track what documents are affected by a piece of code, call
  // saveOriginals() before it and retrieveOriginals() after it.
  // retrieveOriginals returns an object whose keys are the ids of the documents
  // that were affected since the call to saveOriginals(), and the values are
  // equal to the document's contents at the time of saveOriginals. (In the case
  // of an inserted document, undefined is the value.) You must alternate
  // between calls to saveOriginals() and retrieveOriginals().


  _proto.saveOriginals = function () {
    function saveOriginals() {
      if (this._savedOriginals) {
        throw new Error('Called saveOriginals twice without retrieveOriginals');
      }

      this._savedOriginals = new LocalCollection._IdMap();
    }

    return saveOriginals;
  }(); // XXX atomicity: if multi is true, and one modification fails, do
  // we rollback the whole operation, or what?


  _proto.update = function () {
    function update(selector, mod, options, callback) {
      var _this5 = this;

      if (!callback && options instanceof Function) {
        callback = options;
        options = null;
      }

      if (!options) {
        options = {};
      }

      var matcher = new Minimongo.Matcher(selector, true); // Save the original results of any query that we might need to
      // _recomputeResults on, because _modifyAndNotify will mutate the objects in
      // it. (We don't need to save the original results of paused queries because
      // they already have a resultsSnapshot and we won't be diffing in
      // _recomputeResults.)

      var qidToOriginalResults = {}; // We should only clone each document once, even if it appears in multiple
      // queries

      var docMap = new LocalCollection._IdMap();

      var idsMatched = LocalCollection._idsMatchedBySelector(selector);

      Object.keys(this.queries).forEach(function (qid) {
        var query = _this5.queries[qid];

        if ((query.cursor.skip || query.cursor.limit) && !_this5.paused) {
          // Catch the case of a reactive `count()` on a cursor with skip
          // or limit, which registers an unordered observe. This is a
          // pretty rare case, so we just clone the entire result set with
          // no optimizations for documents that appear in these result
          // sets and other queries.
          if (query.results instanceof LocalCollection._IdMap) {
            qidToOriginalResults[qid] = query.results.clone();
            return;
          }

          if (!(query.results instanceof Array)) {
            throw new Error('Assertion failed: query.results not an array');
          } // Clones a document to be stored in `qidToOriginalResults`
          // because it may be modified before the new and old result sets
          // are diffed. But if we know exactly which document IDs we're
          // going to modify, then we only need to clone those.


          var memoizedCloneIfNeeded = function (doc) {
            if (docMap.has(doc._id)) {
              return docMap.get(doc._id);
            }

            var docToMemoize = idsMatched && !idsMatched.some(function (id) {
              return EJSON.equals(id, doc._id);
            }) ? doc : EJSON.clone(doc);
            docMap.set(doc._id, docToMemoize);
            return docToMemoize;
          };

          qidToOriginalResults[qid] = query.results.map(memoizedCloneIfNeeded);
        }
      });
      var recomputeQids = {};
      var updateCount = 0;

      this._eachPossiblyMatchingDoc(selector, function (doc, id) {
        var queryResult = matcher.documentMatches(doc);

        if (queryResult.result) {
          // XXX Should we save the original even if mod ends up being a no-op?
          _this5._saveOriginal(id, doc);

          _this5._modifyAndNotify(doc, mod, recomputeQids, queryResult.arrayIndices);

          ++updateCount;

          if (!options.multi) {
            return false; // break
          }
        }

        return true;
      });

      Object.keys(recomputeQids).forEach(function (qid) {
        var query = _this5.queries[qid];

        if (query) {
          _this5._recomputeResults(query, qidToOriginalResults[qid]);
        }
      });

      this._observeQueue.drain(); // If we are doing an upsert, and we didn't modify any documents yet, then
      // it's time to do an insert. Figure out what document we are inserting, and
      // generate an id for it.


      var insertedId;

      if (updateCount === 0 && options.upsert) {
        var doc = LocalCollection._createUpsertDocument(selector, mod);

        if (!doc._id && options.insertedId) {
          doc._id = options.insertedId;
        }

        insertedId = this.insert(doc);
        updateCount = 1;
      } // Return the number of affected documents, or in the upsert case, an object
      // containing the number of affected docs and the id of the doc that was
      // inserted, if any.


      var result;

      if (options._returnObject) {
        result = {
          numberAffected: updateCount
        };

        if (insertedId !== undefined) {
          result.insertedId = insertedId;
        }
      } else {
        result = updateCount;
      }

      if (callback) {
        Meteor.defer(function () {
          callback(null, result);
        });
      }

      return result;
    }

    return update;
  }(); // A convenience wrapper on update. LocalCollection.upsert(sel, mod) is
  // equivalent to LocalCollection.update(sel, mod, {upsert: true,
  // _returnObject: true}).


  _proto.upsert = function () {
    function upsert(selector, mod, options, callback) {
      if (!callback && typeof options === 'function') {
        callback = options;
        options = {};
      }

      return this.update(selector, mod, Object.assign({}, options, {
        upsert: true,
        _returnObject: true
      }), callback);
    }

    return upsert;
  }(); // Iterates over a subset of documents that could match selector; calls
  // fn(doc, id) on each of them.  Specifically, if selector specifies
  // specific _id's, it only looks at those.  doc is *not* cloned: it is the
  // same object that is in _docs.


  _proto._eachPossiblyMatchingDoc = function () {
    function _eachPossiblyMatchingDoc(selector, fn) {
      var _this6 = this;

      var specificIds = LocalCollection._idsMatchedBySelector(selector);

      if (specificIds) {
        specificIds.some(function (id) {
          var doc = _this6._docs.get(id);

          if (doc) {
            return fn(doc, id) === false;
          }
        });
      } else {
        this._docs.forEach(fn);
      }
    }

    return _eachPossiblyMatchingDoc;
  }();

  _proto._modifyAndNotify = function () {
    function _modifyAndNotify(doc, mod, recomputeQids, arrayIndices) {
      var _this7 = this;

      var matched_before = {};
      Object.keys(this.queries).forEach(function (qid) {
        var query = _this7.queries[qid];

        if (query.dirty) {
          return;
        }

        if (query.ordered) {
          matched_before[qid] = query.matcher.documentMatches(doc).result;
        } else {
          // Because we don't support skip or limit (yet) in unordered queries, we
          // can just do a direct lookup.
          matched_before[qid] = query.results.has(doc._id);
        }
      });
      var old_doc = EJSON.clone(doc);

      LocalCollection._modify(doc, mod, {
        arrayIndices: arrayIndices
      });

      Object.keys(this.queries).forEach(function (qid) {
        var query = _this7.queries[qid];

        if (query.dirty) {
          return;
        }

        var afterMatch = query.matcher.documentMatches(doc);
        var after = afterMatch.result;
        var before = matched_before[qid];

        if (after && query.distances && afterMatch.distance !== undefined) {
          query.distances.set(doc._id, afterMatch.distance);
        }

        if (query.cursor.skip || query.cursor.limit) {
          // We need to recompute any query where the doc may have been in the
          // cursor's window either before or after the update. (Note that if skip
          // or limit is set, "before" and "after" being true do not necessarily
          // mean that the document is in the cursor's output after skip/limit is
          // applied... but if they are false, then the document definitely is NOT
          // in the output. So it's safe to skip recompute if neither before or
          // after are true.)
          if (before || after) {
            recomputeQids[qid] = true;
          }
        } else if (before && !after) {
          LocalCollection._removeFromResults(query, doc);
        } else if (!before && after) {
          LocalCollection._insertInResults(query, doc);
        } else if (before && after) {
          LocalCollection._updateInResults(query, doc, old_doc);
        }
      });
    }

    return _modifyAndNotify;
  }(); // Recomputes the results of a query and runs observe callbacks for the
  // difference between the previous results and the current results (unless
  // paused). Used for skip/limit queries.
  //
  // When this is used by insert or remove, it can just use query.results for
  // the old results (and there's no need to pass in oldResults), because these
  // operations don't mutate the documents in the collection. Update needs to
  // pass in an oldResults which was deep-copied before the modifier was
  // applied.
  //
  // oldResults is guaranteed to be ignored if the query is not paused.


  _proto._recomputeResults = function () {
    function _recomputeResults(query, oldResults) {
      if (this.paused) {
        // There's no reason to recompute the results now as we're still paused.
        // By flagging the query as "dirty", the recompute will be performed
        // when resumeObservers is called.
        query.dirty = true;
        return;
      }

      if (!this.paused && !oldResults) {
        oldResults = query.results;
      }

      if (query.distances) {
        query.distances.clear();
      }

      query.results = query.cursor._getRawObjects({
        distances: query.distances,
        ordered: query.ordered
      });

      if (!this.paused) {
        LocalCollection._diffQueryChanges(query.ordered, oldResults, query.results, query, {
          projectionFn: query.projectionFn
        });
      }
    }

    return _recomputeResults;
  }();

  _proto._saveOriginal = function () {
    function _saveOriginal(id, doc) {
      // Are we even trying to save originals?
      if (!this._savedOriginals) {
        return;
      } // Have we previously mutated the original (and so 'doc' is not actually
      // original)?  (Note the 'has' check rather than truth: we store undefined
      // here for inserted docs!)


      if (this._savedOriginals.has(id)) {
        return;
      }

      this._savedOriginals.set(id, EJSON.clone(doc));
    }

    return _saveOriginal;
  }();

  return LocalCollection;
}();

LocalCollection.Cursor = Cursor;
LocalCollection.ObserveHandle = ObserveHandle; // XXX maybe move these into another ObserveHelpers package or something
// _CachingChangeObserver is an object which receives observeChanges callbacks
// and keeps a cache of the current cursor state up to date in this.docs. Users
// of this class should read the docs field but not modify it. You should pass
// the "applyChange" field as the callbacks to the underlying observeChanges
// call. Optionally, you can specify your own observeChanges callbacks which are
// invoked immediately before the docs field is updated; this object is made
// available as `this` to those callbacks.

LocalCollection._CachingChangeObserver = function () {
  function _CachingChangeObserver() {
    var _this8 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var orderedFromCallbacks = options.callbacks && LocalCollection._observeChangesCallbacksAreOrdered(options.callbacks);

    if (hasOwn.call(options, 'ordered')) {
      this.ordered = options.ordered;

      if (options.callbacks && options.ordered !== orderedFromCallbacks) {
        throw Error('ordered option doesn\'t match callbacks');
      }
    } else if (options.callbacks) {
      this.ordered = orderedFromCallbacks;
    } else {
      throw Error('must provide ordered or callbacks');
    }

    var callbacks = options.callbacks || {};

    if (this.ordered) {
      this.docs = new OrderedDict(MongoID.idStringify);
      this.applyChange = {
        addedBefore: function (id, fields, before) {
          var doc = EJSON.clone(fields);
          doc._id = id;

          if (callbacks.addedBefore) {
            callbacks.addedBefore.call(_this8, id, fields, before);
          } // This line triggers if we provide added with movedBefore.


          if (callbacks.added) {
            callbacks.added.call(_this8, id, fields);
          } // XXX could `before` be a falsy ID?  Technically
          // idStringify seems to allow for them -- though
          // OrderedDict won't call stringify on a falsy arg.


          _this8.docs.putBefore(id, doc, before || null);
        },
        movedBefore: function (id, before) {
          var doc = _this8.docs.get(id);

          if (callbacks.movedBefore) {
            callbacks.movedBefore.call(_this8, id, before);
          }

          _this8.docs.moveBefore(id, before || null);
        }
      };
    } else {
      this.docs = new LocalCollection._IdMap();
      this.applyChange = {
        added: function (id, fields) {
          var doc = EJSON.clone(fields);

          if (callbacks.added) {
            callbacks.added.call(_this8, id, fields);
          }

          doc._id = id;

          _this8.docs.set(id, doc);
        }
      };
    } // The methods in _IdMap and OrderedDict used by these callbacks are
    // identical.


    this.applyChange.changed = function (id, fields) {
      var doc = _this8.docs.get(id);

      if (!doc) {
        throw new Error("Unknown id for changed: " + id);
      }

      if (callbacks.changed) {
        callbacks.changed.call(_this8, id, EJSON.clone(fields));
      }

      DiffSequence.applyChanges(doc, fields);
    };

    this.applyChange.removed = function (id) {
      if (callbacks.removed) {
        callbacks.removed.call(_this8, id);
      }

      _this8.docs.remove(id);
    };
  }

  return _CachingChangeObserver;
}();

LocalCollection._IdMap =
/*#__PURE__*/
function (_IdMap2) {
  (0, _inheritsLoose2.default)(_IdMap, _IdMap2);

  function _IdMap() {
    return _IdMap2.call(this, MongoID.idStringify, MongoID.idParse) || this;
  }

  return _IdMap;
}(IdMap); // Wrap a transform function to return objects that have the _id field
// of the untransformed document. This ensures that subsystems such as
// the observe-sequence package that call `observe` can keep track of
// the documents identities.
//
// - Require that it returns objects
// - If the return value has an _id field, verify that it matches the
//   original _id field
// - If the return value doesn't have an _id field, add it back.


LocalCollection.wrapTransform = function (transform) {
  if (!transform) {
    return null;
  } // No need to doubly-wrap transforms.


  if (transform.__wrappedTransform__) {
    return transform;
  }

  var wrapped = function (doc) {
    if (!hasOwn.call(doc, '_id')) {
      // XXX do we ever have a transform on the oplog's collection? because that
      // collection has no _id.
      throw new Error('can only transform documents with _id');
    }

    var id = doc._id; // XXX consider making tracker a weak dependency and checking
    // Package.tracker here

    var transformed = Tracker.nonreactive(function () {
      return transform(doc);
    });

    if (!LocalCollection._isPlainObject(transformed)) {
      throw new Error('transform must return object');
    }

    if (hasOwn.call(transformed, '_id')) {
      if (!EJSON.equals(transformed._id, id)) {
        throw new Error('transformed document can\'t have different _id');
      }
    } else {
      transformed._id = id;
    }

    return transformed;
  };

  wrapped.__wrappedTransform__ = true;
  return wrapped;
}; // XXX the sorted-query logic below is laughably inefficient. we'll
// need to come up with a better datastructure for this.
//
// XXX the logic for observing with a skip or a limit is even more
// laughably inefficient. we recompute the whole results every time!
// This binary search puts a value between any equal values, and the first
// lesser value.


LocalCollection._binarySearch = function (cmp, array, value) {
  var first = 0;
  var range = array.length;

  while (range > 0) {
    var halfRange = Math.floor(range / 2);

    if (cmp(value, array[first + halfRange]) >= 0) {
      first += halfRange + 1;
      range -= halfRange + 1;
    } else {
      range = halfRange;
    }
  }

  return first;
};

LocalCollection._checkSupportedProjection = function (fields) {
  if (fields !== Object(fields) || Array.isArray(fields)) {
    throw MinimongoError('fields option must be an object');
  }

  Object.keys(fields).forEach(function (keyPath) {
    if (keyPath.split('.').includes('$')) {
      throw MinimongoError('Minimongo doesn\'t support $ operator in projections yet.');
    }

    var value = fields[keyPath];

    if ((0, _typeof2.default)(value) === 'object' && ['$elemMatch', '$meta', '$slice'].some(function (key) {
      return hasOwn.call(value, key);
    })) {
      throw MinimongoError('Minimongo doesn\'t support operators in projections yet.');
    }

    if (![1, 0, true, false].includes(value)) {
      throw MinimongoError('Projection values should be one of 1, 0, true, or false');
    }
  });
}; // Knows how to compile a fields projection to a predicate function.
// @returns - Function: a closure that filters out an object according to the
//            fields projection rules:
//            @param obj - Object: MongoDB-styled document
//            @returns - Object: a document with the fields filtered out
//                       according to projection rules. Doesn't retain subfields
//                       of passed argument.


LocalCollection._compileProjection = function (fields) {
  LocalCollection._checkSupportedProjection(fields);

  var _idProjection = fields._id === undefined ? true : fields._id;

  var details = projectionDetails(fields); // returns transformed doc according to ruleTree

  var transform = function (doc, ruleTree) {
    // Special case for "sets"
    if (Array.isArray(doc)) {
      return doc.map(function (subdoc) {
        return transform(subdoc, ruleTree);
      });
    }

    var result = details.including ? {} : EJSON.clone(doc);
    Object.keys(ruleTree).forEach(function (key) {
      if (!hasOwn.call(doc, key)) {
        return;
      }

      var rule = ruleTree[key];

      if (rule === Object(rule)) {
        // For sub-objects/subsets we branch
        if (doc[key] === Object(doc[key])) {
          result[key] = transform(doc[key], rule);
        }
      } else if (details.including) {
        // Otherwise we don't even touch this subfield
        result[key] = EJSON.clone(doc[key]);
      } else {
        delete result[key];
      }
    });
    return result;
  };

  return function (doc) {
    var result = transform(doc, details.tree);

    if (_idProjection && hasOwn.call(doc, '_id')) {
      result._id = doc._id;
    }

    if (!_idProjection && hasOwn.call(result, '_id')) {
      delete result._id;
    }

    return result;
  };
}; // Calculates the document to insert in case we're doing an upsert and the
// selector does not match any elements


LocalCollection._createUpsertDocument = function (selector, modifier) {
  var selectorDocument = populateDocumentWithQueryFields(selector);

  var isModify = LocalCollection._isModificationMod(modifier);

  var newDoc = {};

  if (selectorDocument._id) {
    newDoc._id = selectorDocument._id;
    delete selectorDocument._id;
  } // This double _modify call is made to help with nested properties (see issue
  // #8631). We do this even if it's a replacement for validation purposes (e.g.
  // ambiguous id's)


  LocalCollection._modify(newDoc, {
    $set: selectorDocument
  });

  LocalCollection._modify(newDoc, modifier, {
    isInsert: true
  });

  if (isModify) {
    return newDoc;
  } // Replacement can take _id from query document


  var replacement = Object.assign({}, modifier);

  if (newDoc._id) {
    replacement._id = newDoc._id;
  }

  return replacement;
};

LocalCollection._diffObjects = function (left, right, callbacks) {
  return DiffSequence.diffObjects(left, right, callbacks);
}; // ordered: bool.
// old_results and new_results: collections of documents.
//    if ordered, they are arrays.
//    if unordered, they are IdMaps


LocalCollection._diffQueryChanges = function (ordered, oldResults, newResults, observer, options) {
  return DiffSequence.diffQueryChanges(ordered, oldResults, newResults, observer, options);
};

LocalCollection._diffQueryOrderedChanges = function (oldResults, newResults, observer, options) {
  return DiffSequence.diffQueryOrderedChanges(oldResults, newResults, observer, options);
};

LocalCollection._diffQueryUnorderedChanges = function (oldResults, newResults, observer, options) {
  return DiffSequence.diffQueryUnorderedChanges(oldResults, newResults, observer, options);
};

LocalCollection._findInOrderedResults = function (query, doc) {
  if (!query.ordered) {
    throw new Error('Can\'t call _findInOrderedResults on unordered query');
  }

  for (var i = 0; i < query.results.length; i++) {
    if (query.results[i] === doc) {
      return i;
    }
  }

  throw Error('object missing from query');
}; // If this is a selector which explicitly constrains the match by ID to a finite
// number of documents, returns a list of their IDs.  Otherwise returns
// null. Note that the selector may have other restrictions so it may not even
// match those document!  We care about $in and $and since those are generated
// access-controlled update and remove.


LocalCollection._idsMatchedBySelector = function (selector) {
  // Is the selector just an ID?
  if (LocalCollection._selectorIsId(selector)) {
    return [selector];
  }

  if (!selector) {
    return null;
  } // Do we have an _id clause?


  if (hasOwn.call(selector, '_id')) {
    // Is the _id clause just an ID?
    if (LocalCollection._selectorIsId(selector._id)) {
      return [selector._id];
    } // Is the _id clause {_id: {$in: ["x", "y", "z"]}}?


    if (selector._id && Array.isArray(selector._id.$in) && selector._id.$in.length && selector._id.$in.every(LocalCollection._selectorIsId)) {
      return selector._id.$in;
    }

    return null;
  } // If this is a top-level $and, and any of the clauses constrain their
  // documents, then the whole selector is constrained by any one clause's
  // constraint. (Well, by their intersection, but that seems unlikely.)


  if (Array.isArray(selector.$and)) {
    for (var i = 0; i < selector.$and.length; ++i) {
      var subIds = LocalCollection._idsMatchedBySelector(selector.$and[i]);

      if (subIds) {
        return subIds;
      }
    }
  }

  return null;
};

LocalCollection._insertInResults = function (query, doc) {
  var fields = EJSON.clone(doc);
  delete fields._id;

  if (query.ordered) {
    if (!query.sorter) {
      query.addedBefore(doc._id, query.projectionFn(fields), null);
      query.results.push(doc);
    } else {
      var i = LocalCollection._insertInSortedList(query.sorter.getComparator({
        distances: query.distances
      }), query.results, doc);

      var next = query.results[i + 1];

      if (next) {
        next = next._id;
      } else {
        next = null;
      }

      query.addedBefore(doc._id, query.projectionFn(fields), next);
    }

    query.added(doc._id, query.projectionFn(fields));
  } else {
    query.added(doc._id, query.projectionFn(fields));
    query.results.set(doc._id, doc);
  }
};

LocalCollection._insertInSortedList = function (cmp, array, value) {
  if (array.length === 0) {
    array.push(value);
    return 0;
  }

  var i = LocalCollection._binarySearch(cmp, array, value);

  array.splice(i, 0, value);
  return i;
};

LocalCollection._isModificationMod = function (mod) {
  var isModify = false;
  var isReplace = false;
  Object.keys(mod).forEach(function (key) {
    if (key.substr(0, 1) === '$') {
      isModify = true;
    } else {
      isReplace = true;
    }
  });

  if (isModify && isReplace) {
    throw new Error('Update parameter cannot have both modifier and non-modifier fields.');
  }

  return isModify;
}; // XXX maybe this should be EJSON.isObject, though EJSON doesn't know about
// RegExp
// XXX note that _type(undefined) === 3!!!!


LocalCollection._isPlainObject = function (x) {
  return x && LocalCollection._f._type(x) === 3;
}; // XXX need a strategy for passing the binding of $ into this
// function, from the compiled selector
//
// maybe just {key.up.to.just.before.dollarsign: array_index}
//
// XXX atomicity: if one modification fails, do we roll back the whole
// change?
//
// options:
//   - isInsert is set when _modify is being called to compute the document to
//     insert as part of an upsert operation. We use this primarily to figure
//     out when to set the fields in $setOnInsert, if present.


LocalCollection._modify = function (doc, modifier) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!LocalCollection._isPlainObject(modifier)) {
    throw MinimongoError('Modifier must be an object');
  } // Make sure the caller can't mutate our data structures.


  modifier = EJSON.clone(modifier);
  var isModifier = isOperatorObject(modifier);
  var newDoc = isModifier ? EJSON.clone(doc) : modifier;

  if (isModifier) {
    // apply modifiers to the doc.
    Object.keys(modifier).forEach(function (operator) {
      // Treat $setOnInsert as $set if this is an insert.
      var setOnInsert = options.isInsert && operator === '$setOnInsert';
      var modFunc = MODIFIERS[setOnInsert ? '$set' : operator];
      var operand = modifier[operator];

      if (!modFunc) {
        throw MinimongoError("Invalid modifier specified " + operator);
      }

      Object.keys(operand).forEach(function (keypath) {
        var arg = operand[keypath];

        if (keypath === '') {
          throw MinimongoError('An empty update path is not valid.');
        }

        var keyparts = keypath.split('.');

        if (!keyparts.every(Boolean)) {
          throw MinimongoError("The update path '" + keypath + "' contains an empty field name, " + 'which is not allowed.');
        }

        var target = findModTarget(newDoc, keyparts, {
          arrayIndices: options.arrayIndices,
          forbidArray: operator === '$rename',
          noCreate: NO_CREATE_MODIFIERS[operator]
        });
        modFunc(target, keyparts.pop(), arg, keypath, newDoc);
      });
    });

    if (doc._id && !EJSON.equals(doc._id, newDoc._id)) {
      throw MinimongoError("After applying the update to the document {_id: \"" + doc._id + "\", ...}," + ' the (immutable) field \'_id\' was found to have been altered to ' + ("_id: \"" + newDoc._id + "\""));
    }
  } else {
    if (doc._id && modifier._id && !EJSON.equals(doc._id, modifier._id)) {
      throw MinimongoError("The _id field cannot be changed from {_id: \"" + doc._id + "\"} to " + ("{_id: \"" + modifier._id + "\"}"));
    } // replace the whole document


    assertHasValidFieldNames(modifier);
  } // move new document into place.


  Object.keys(doc).forEach(function (key) {
    // Note: this used to be for (var key in doc) however, this does not
    // work right in Opera. Deleting from a doc while iterating over it
    // would sometimes cause opera to skip some keys.
    if (key !== '_id') {
      delete doc[key];
    }
  });
  Object.keys(newDoc).forEach(function (key) {
    doc[key] = newDoc[key];
  });
};

LocalCollection._observeFromObserveChanges = function (cursor, observeCallbacks) {
  var transform = cursor.getTransform() || function (doc) {
    return doc;
  };

  var suppressed = !!observeCallbacks._suppress_initial;
  var observeChangesCallbacks;

  if (LocalCollection._observeCallbacksAreOrdered(observeCallbacks)) {
    // The "_no_indices" option sets all index arguments to -1 and skips the
    // linear scans required to generate them.  This lets observers that don't
    // need absolute indices benefit from the other features of this API --
    // relative order, transforms, and applyChanges -- without the speed hit.
    var indices = !observeCallbacks._no_indices;
    observeChangesCallbacks = {
      addedBefore: function (id, fields, before) {
        if (suppressed || !(observeCallbacks.addedAt || observeCallbacks.added)) {
          return;
        }

        var doc = transform(Object.assign(fields, {
          _id: id
        }));

        if (observeCallbacks.addedAt) {
          observeCallbacks.addedAt(doc, indices ? before ? this.docs.indexOf(before) : this.docs.size() : -1, before);
        } else {
          observeCallbacks.added(doc);
        }
      },
      changed: function (id, fields) {
        if (!(observeCallbacks.changedAt || observeCallbacks.changed)) {
          return;
        }

        var doc = EJSON.clone(this.docs.get(id));

        if (!doc) {
          throw new Error("Unknown id for changed: " + id);
        }

        var oldDoc = transform(EJSON.clone(doc));
        DiffSequence.applyChanges(doc, fields);

        if (observeCallbacks.changedAt) {
          observeCallbacks.changedAt(transform(doc), oldDoc, indices ? this.docs.indexOf(id) : -1);
        } else {
          observeCallbacks.changed(transform(doc), oldDoc);
        }
      },
      movedBefore: function (id, before) {
        if (!observeCallbacks.movedTo) {
          return;
        }

        var from = indices ? this.docs.indexOf(id) : -1;
        var to = indices ? before ? this.docs.indexOf(before) : this.docs.size() : -1; // When not moving backwards, adjust for the fact that removing the
        // document slides everything back one slot.

        if (to > from) {
          --to;
        }

        observeCallbacks.movedTo(transform(EJSON.clone(this.docs.get(id))), from, to, before || null);
      },
      removed: function (id) {
        if (!(observeCallbacks.removedAt || observeCallbacks.removed)) {
          return;
        } // technically maybe there should be an EJSON.clone here, but it's about
        // to be removed from this.docs!


        var doc = transform(this.docs.get(id));

        if (observeCallbacks.removedAt) {
          observeCallbacks.removedAt(doc, indices ? this.docs.indexOf(id) : -1);
        } else {
          observeCallbacks.removed(doc);
        }
      }
    };
  } else {
    observeChangesCallbacks = {
      added: function (id, fields) {
        if (!suppressed && observeCallbacks.added) {
          observeCallbacks.added(transform(Object.assign(fields, {
            _id: id
          })));
        }
      },
      changed: function (id, fields) {
        if (observeCallbacks.changed) {
          var oldDoc = this.docs.get(id);
          var doc = EJSON.clone(oldDoc);
          DiffSequence.applyChanges(doc, fields);
          observeCallbacks.changed(transform(doc), transform(EJSON.clone(oldDoc)));
        }
      },
      removed: function (id) {
        if (observeCallbacks.removed) {
          observeCallbacks.removed(transform(this.docs.get(id)));
        }
      }
    };
  }

  var changeObserver = new LocalCollection._CachingChangeObserver({
    callbacks: observeChangesCallbacks
  });
  var handle = cursor.observeChanges(changeObserver.applyChange);
  suppressed = false;
  return handle;
};

LocalCollection._observeCallbacksAreOrdered = function (callbacks) {
  if (callbacks.added && callbacks.addedAt) {
    throw new Error('Please specify only one of added() and addedAt()');
  }

  if (callbacks.changed && callbacks.changedAt) {
    throw new Error('Please specify only one of changed() and changedAt()');
  }

  if (callbacks.removed && callbacks.removedAt) {
    throw new Error('Please specify only one of removed() and removedAt()');
  }

  return !!(callbacks.addedAt || callbacks.changedAt || callbacks.movedTo || callbacks.removedAt);
};

LocalCollection._observeChangesCallbacksAreOrdered = function (callbacks) {
  if (callbacks.added && callbacks.addedBefore) {
    throw new Error('Please specify only one of added() and addedBefore()');
  }

  return !!(callbacks.addedBefore || callbacks.movedBefore);
};

LocalCollection._removeFromResults = function (query, doc) {
  if (query.ordered) {
    var i = LocalCollection._findInOrderedResults(query, doc);

    query.removed(doc._id);
    query.results.splice(i, 1);
  } else {
    var id = doc._id; // in case callback mutates doc

    query.removed(doc._id);
    query.results.remove(id);
  }
}; // Is this selector just shorthand for lookup by _id?


LocalCollection._selectorIsId = function (selector) {
  return typeof selector === 'number' || typeof selector === 'string' || selector instanceof MongoID.ObjectID;
}; // Is the selector just lookup by _id (shorthand or not)?


LocalCollection._selectorIsIdPerhapsAsObject = function (selector) {
  return LocalCollection._selectorIsId(selector) || LocalCollection._selectorIsId(selector && selector._id) && Object.keys(selector).length === 1;
};

LocalCollection._updateInResults = function (query, doc, old_doc) {
  if (!EJSON.equals(doc._id, old_doc._id)) {
    throw new Error('Can\'t change a doc\'s _id while updating');
  }

  var projectionFn = query.projectionFn;
  var changedFields = DiffSequence.makeChangedFields(projectionFn(doc), projectionFn(old_doc));

  if (!query.ordered) {
    if (Object.keys(changedFields).length) {
      query.changed(doc._id, changedFields);
      query.results.set(doc._id, doc);
    }

    return;
  }

  var old_idx = LocalCollection._findInOrderedResults(query, doc);

  if (Object.keys(changedFields).length) {
    query.changed(doc._id, changedFields);
  }

  if (!query.sorter) {
    return;
  } // just take it out and put it back in again, and see if the index changes


  query.results.splice(old_idx, 1);

  var new_idx = LocalCollection._insertInSortedList(query.sorter.getComparator({
    distances: query.distances
  }), query.results, doc);

  if (old_idx !== new_idx) {
    var next = query.results[new_idx + 1];

    if (next) {
      next = next._id;
    } else {
      next = null;
    }

    query.movedBefore && query.movedBefore(doc._id, next);
  }
};

var MODIFIERS = {
  $currentDate: function (target, field, arg) {
    if ((0, _typeof2.default)(arg) === 'object' && hasOwn.call(arg, '$type')) {
      if (arg.$type !== 'date') {
        throw MinimongoError('Minimongo does currently only support the date type in ' + '$currentDate modifiers', {
          field: field
        });
      }
    } else if (arg !== true) {
      throw MinimongoError('Invalid $currentDate modifier', {
        field: field
      });
    }

    target[field] = new Date();
  },
  $min: function (target, field, arg) {
    if (typeof arg !== 'number') {
      throw MinimongoError('Modifier $min allowed for numbers only', {
        field: field
      });
    }

    if (field in target) {
      if (typeof target[field] !== 'number') {
        throw MinimongoError('Cannot apply $min modifier to non-number', {
          field: field
        });
      }

      if (target[field] > arg) {
        target[field] = arg;
      }
    } else {
      target[field] = arg;
    }
  },
  $max: function (target, field, arg) {
    if (typeof arg !== 'number') {
      throw MinimongoError('Modifier $max allowed for numbers only', {
        field: field
      });
    }

    if (field in target) {
      if (typeof target[field] !== 'number') {
        throw MinimongoError('Cannot apply $max modifier to non-number', {
          field: field
        });
      }

      if (target[field] < arg) {
        target[field] = arg;
      }
    } else {
      target[field] = arg;
    }
  },
  $inc: function (target, field, arg) {
    if (typeof arg !== 'number') {
      throw MinimongoError('Modifier $inc allowed for numbers only', {
        field: field
      });
    }

    if (field in target) {
      if (typeof target[field] !== 'number') {
        throw MinimongoError('Cannot apply $inc modifier to non-number', {
          field: field
        });
      }

      target[field] += arg;
    } else {
      target[field] = arg;
    }
  },
  $set: function (target, field, arg) {
    if (target !== Object(target)) {
      // not an array or an object
      var error = MinimongoError('Cannot set property on non-object field', {
        field: field
      });
      error.setPropertyError = true;
      throw error;
    }

    if (target === null) {
      var _error = MinimongoError('Cannot set property on null', {
        field: field
      });

      _error.setPropertyError = true;
      throw _error;
    }

    assertHasValidFieldNames(arg);
    target[field] = arg;
  },
  $setOnInsert: function (target, field, arg) {// converted to `$set` in `_modify`
  },
  $unset: function (target, field, arg) {
    if (target !== undefined) {
      if (target instanceof Array) {
        if (field in target) {
          target[field] = null;
        }
      } else {
        delete target[field];
      }
    }
  },
  $push: function (target, field, arg) {
    if (target[field] === undefined) {
      target[field] = [];
    }

    if (!(target[field] instanceof Array)) {
      throw MinimongoError('Cannot apply $push modifier to non-array', {
        field: field
      });
    }

    if (!(arg && arg.$each)) {
      // Simple mode: not $each
      assertHasValidFieldNames(arg);
      target[field].push(arg);
      return;
    } // Fancy mode: $each (and maybe $slice and $sort and $position)


    var toPush = arg.$each;

    if (!(toPush instanceof Array)) {
      throw MinimongoError('$each must be an array', {
        field: field
      });
    }

    assertHasValidFieldNames(toPush); // Parse $position

    var position = undefined;

    if ('$position' in arg) {
      if (typeof arg.$position !== 'number') {
        throw MinimongoError('$position must be a numeric value', {
          field: field
        });
      } // XXX should check to make sure integer


      if (arg.$position < 0) {
        throw MinimongoError('$position in $push must be zero or positive', {
          field: field
        });
      }

      position = arg.$position;
    } // Parse $slice.


    var slice = undefined;

    if ('$slice' in arg) {
      if (typeof arg.$slice !== 'number') {
        throw MinimongoError('$slice must be a numeric value', {
          field: field
        });
      } // XXX should check to make sure integer


      slice = arg.$slice;
    } // Parse $sort.


    var sortFunction = undefined;

    if (arg.$sort) {
      if (slice === undefined) {
        throw MinimongoError('$sort requires $slice to be present', {
          field: field
        });
      } // XXX this allows us to use a $sort whose value is an array, but that's
      // actually an extension of the Node driver, so it won't work
      // server-side. Could be confusing!
      // XXX is it correct that we don't do geo-stuff here?


      sortFunction = new Minimongo.Sorter(arg.$sort).getComparator();
      toPush.forEach(function (element) {
        if (LocalCollection._f._type(element) !== 3) {
          throw MinimongoError('$push like modifiers using $sort require all elements to be ' + 'objects', {
            field: field
          });
        }
      });
    } // Actually push.


    if (position === undefined) {
      toPush.forEach(function (element) {
        target[field].push(element);
      });
    } else {
      var _target$field;

      var spliceArguments = [position, 0];
      toPush.forEach(function (element) {
        spliceArguments.push(element);
      });

      (_target$field = target[field]).splice.apply(_target$field, spliceArguments);
    } // Actually sort.


    if (sortFunction) {
      target[field].sort(sortFunction);
    } // Actually slice.


    if (slice !== undefined) {
      if (slice === 0) {
        target[field] = []; // differs from Array.slice!
      } else if (slice < 0) {
        target[field] = target[field].slice(slice);
      } else {
        target[field] = target[field].slice(0, slice);
      }
    }
  },
  $pushAll: function (target, field, arg) {
    if (!((0, _typeof2.default)(arg) === 'object' && arg instanceof Array)) {
      throw MinimongoError('Modifier $pushAll/pullAll allowed for arrays only');
    }

    assertHasValidFieldNames(arg);
    var toPush = target[field];

    if (toPush === undefined) {
      target[field] = arg;
    } else if (!(toPush instanceof Array)) {
      throw MinimongoError('Cannot apply $pushAll modifier to non-array', {
        field: field
      });
    } else {
      toPush.push.apply(toPush, (0, _toConsumableArray2.default)(arg));
    }
  },
  $addToSet: function (target, field, arg) {
    var isEach = false;

    if ((0, _typeof2.default)(arg) === 'object') {
      // check if first key is '$each'
      var keys = Object.keys(arg);

      if (keys[0] === '$each') {
        isEach = true;
      }
    }

    var values = isEach ? arg.$each : [arg];
    assertHasValidFieldNames(values);
    var toAdd = target[field];

    if (toAdd === undefined) {
      target[field] = values;
    } else if (!(toAdd instanceof Array)) {
      throw MinimongoError('Cannot apply $addToSet modifier to non-array', {
        field: field
      });
    } else {
      values.forEach(function (value) {
        if (toAdd.some(function (element) {
          return LocalCollection._f._equal(value, element);
        })) {
          return;
        }

        toAdd.push(value);
      });
    }
  },
  $pop: function (target, field, arg) {
    if (target === undefined) {
      return;
    }

    var toPop = target[field];

    if (toPop === undefined) {
      return;
    }

    if (!(toPop instanceof Array)) {
      throw MinimongoError('Cannot apply $pop modifier to non-array', {
        field: field
      });
    }

    if (typeof arg === 'number' && arg < 0) {
      toPop.splice(0, 1);
    } else {
      toPop.pop();
    }
  },
  $pull: function (target, field, arg) {
    if (target === undefined) {
      return;
    }

    var toPull = target[field];

    if (toPull === undefined) {
      return;
    }

    if (!(toPull instanceof Array)) {
      throw MinimongoError('Cannot apply $pull/pullAll modifier to non-array', {
        field: field
      });
    }

    var out;

    if (arg != null && (0, _typeof2.default)(arg) === 'object' && !(arg instanceof Array)) {
      // XXX would be much nicer to compile this once, rather than
      // for each document we modify.. but usually we're not
      // modifying that many documents, so we'll let it slide for
      // now
      // XXX Minimongo.Matcher isn't up for the job, because we need
      // to permit stuff like {$pull: {a: {$gt: 4}}}.. something
      // like {$gt: 4} is not normally a complete selector.
      // same issue as $elemMatch possibly?
      var matcher = new Minimongo.Matcher(arg);
      out = toPull.filter(function (element) {
        return !matcher.documentMatches(element).result;
      });
    } else {
      out = toPull.filter(function (element) {
        return !LocalCollection._f._equal(element, arg);
      });
    }

    target[field] = out;
  },
  $pullAll: function (target, field, arg) {
    if (!((0, _typeof2.default)(arg) === 'object' && arg instanceof Array)) {
      throw MinimongoError('Modifier $pushAll/pullAll allowed for arrays only', {
        field: field
      });
    }

    if (target === undefined) {
      return;
    }

    var toPull = target[field];

    if (toPull === undefined) {
      return;
    }

    if (!(toPull instanceof Array)) {
      throw MinimongoError('Cannot apply $pull/pullAll modifier to non-array', {
        field: field
      });
    }

    target[field] = toPull.filter(function (object) {
      return !arg.some(function (element) {
        return LocalCollection._f._equal(object, element);
      });
    });
  },
  $rename: function (target, field, arg, keypath, doc) {
    // no idea why mongo has this restriction..
    if (keypath === arg) {
      throw MinimongoError('$rename source must differ from target', {
        field: field
      });
    }

    if (target === null) {
      throw MinimongoError('$rename source field invalid', {
        field: field
      });
    }

    if (typeof arg !== 'string') {
      throw MinimongoError('$rename target must be a string', {
        field: field
      });
    }

    if (arg.includes('\0')) {
      // Null bytes are not allowed in Mongo field names
      // https://docs.mongodb.com/manual/reference/limits/#Restrictions-on-Field-Names
      throw MinimongoError('The \'to\' field for $rename cannot contain an embedded null byte', {
        field: field
      });
    }

    if (target === undefined) {
      return;
    }

    var object = target[field];
    delete target[field];
    var keyparts = arg.split('.');
    var target2 = findModTarget(doc, keyparts, {
      forbidArray: true
    });

    if (target2 === null) {
      throw MinimongoError('$rename target field invalid', {
        field: field
      });
    }

    target2[keyparts.pop()] = object;
  },
  $bit: function (target, field, arg) {
    // XXX mongo only supports $bit on integers, and we only support
    // native javascript numbers (doubles) so far, so we can't support $bit
    throw MinimongoError('$bit is not supported', {
      field: field
    });
  },
  $v: function () {// As discussed in https://github.com/meteor/meteor/issues/9623,
    // the `$v` operator is not needed by Meteor, but problems can occur if
    // it's not at least callable (as of Mongo >= 3.6). It's defined here as
    // a no-op to work around these problems.
  }
};
var NO_CREATE_MODIFIERS = {
  $pop: true,
  $pull: true,
  $pullAll: true,
  $rename: true,
  $unset: true
}; // Make sure field names do not contain Mongo restricted
// characters ('.', '$', '\0').
// https://docs.mongodb.com/manual/reference/limits/#Restrictions-on-Field-Names

var invalidCharMsg = {
  $: 'start with \'$\'',
  '.': 'contain \'.\'',
  '\0': 'contain null bytes'
}; // checks if all field names in an object are valid

function assertHasValidFieldNames(doc) {
  if (doc && (0, _typeof2.default)(doc) === 'object') {
    JSON.stringify(doc, function (key, value) {
      assertIsValidFieldName(key);
      return value;
    });
  }
}

function assertIsValidFieldName(key) {
  var match;

  if (typeof key === 'string' && (match = key.match(/^\$|\.|\0/))) {
    throw MinimongoError("Key " + key + " must not " + invalidCharMsg[match[0]]);
  }
} // for a.b.c.2.d.e, keyparts should be ['a', 'b', 'c', '2', 'd', 'e'],
// and then you would operate on the 'e' property of the returned
// object.
//
// if options.noCreate is falsey, creates intermediate levels of
// structure as necessary, like mkdir -p (and raises an exception if
// that would mean giving a non-numeric property to an array.) if
// options.noCreate is true, return undefined instead.
//
// may modify the last element of keyparts to signal to the caller that it needs
// to use a different value to index into the returned object (for example,
// ['a', '01'] -> ['a', 1]).
//
// if forbidArray is true, return null if the keypath goes through an array.
//
// if options.arrayIndices is set, use its first element for the (first) '$' in
// the path.


function findModTarget(doc, keyparts) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var usedArrayIndex = false;

  for (var i = 0; i < keyparts.length; i++) {
    var last = i === keyparts.length - 1;
    var keypart = keyparts[i];

    if (!isIndexable(doc)) {
      if (options.noCreate) {
        return undefined;
      }

      var error = MinimongoError("cannot use the part '" + keypart + "' to traverse " + doc);
      error.setPropertyError = true;
      throw error;
    }

    if (doc instanceof Array) {
      if (options.forbidArray) {
        return null;
      }

      if (keypart === '$') {
        if (usedArrayIndex) {
          throw MinimongoError('Too many positional (i.e. \'$\') elements');
        }

        if (!options.arrayIndices || !options.arrayIndices.length) {
          throw MinimongoError('The positional operator did not find the match needed from the ' + 'query');
        }

        keypart = options.arrayIndices[0];
        usedArrayIndex = true;
      } else if (isNumericKey(keypart)) {
        keypart = parseInt(keypart);
      } else {
        if (options.noCreate) {
          return undefined;
        }

        throw MinimongoError("can't append to array using string field name [" + keypart + "]");
      }

      if (last) {
        keyparts[i] = keypart; // handle 'a.01'
      }

      if (options.noCreate && keypart >= doc.length) {
        return undefined;
      }

      while (doc.length < keypart) {
        doc.push(null);
      }

      if (!last) {
        if (doc.length === keypart) {
          doc.push({});
        } else if ((0, _typeof2.default)(doc[keypart]) !== 'object') {
          throw MinimongoError("can't modify field '" + keyparts[i + 1] + "' of list value " + JSON.stringify(doc[keypart]));
        }
      }
    } else {
      assertIsValidFieldName(keypart);

      if (!(keypart in doc)) {
        if (options.noCreate) {
          return undefined;
        }

        if (!last) {
          doc[keypart] = {};
        }
      }
    }

    if (last) {
      return doc;
    }

    doc = doc[keypart];
  } // notreached

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"matcher.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/minimongo/matcher.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  "default": function () {
    return Matcher;
  }
});
var LocalCollection;
module.link("./local_collection.js", {
  "default": function (v) {
    LocalCollection = v;
  }
}, 0);
var compileDocumentSelector, hasOwn, nothingMatcher;
module.link("./common.js", {
  compileDocumentSelector: function (v) {
    compileDocumentSelector = v;
  },
  hasOwn: function (v) {
    hasOwn = v;
  },
  nothingMatcher: function (v) {
    nothingMatcher = v;
  }
}, 1);

var Matcher =
/*#__PURE__*/
function () {
  function Matcher(selector, isUpdate) {
    // A set (object mapping string -> *) of all of the document paths looked
    // at by the selector. Also includes the empty string if it may look at any
    // path (eg, $where).
    this._paths = {}; // Set to true if compilation finds a $near.

    this._hasGeoQuery = false; // Set to true if compilation finds a $where.

    this._hasWhere = false; // Set to false if compilation finds anything other than a simple equality
    // or one or more of '$gt', '$gte', '$lt', '$lte', '$ne', '$in', '$nin' used
    // with scalars as operands.

    this._isSimple = true; // Set to a dummy document which always matches this Matcher. Or set to null
    // if such document is too hard to find.

    this._matchingDocument = undefined; // A clone of the original selector. It may just be a function if the user
    // passed in a function; otherwise is definitely an object (eg, IDs are
    // translated into {_id: ID} first. Used by canBecomeTrueByModifier and
    // Sorter._useWithMatcher.

    this._selector = null;
    this._docMatcher = this._compileSelector(selector); // Set to true if selection is done for an update operation
    // Default is false
    // Used for $near array update (issue #3599)

    this._isUpdate = isUpdate;
  }

  var _proto = Matcher.prototype;

  _proto.documentMatches = function () {
    function documentMatches(doc) {
      if (doc !== Object(doc)) {
        throw Error('documentMatches needs a document');
      }

      return this._docMatcher(doc);
    }

    return documentMatches;
  }();

  _proto.hasGeoQuery = function () {
    function hasGeoQuery() {
      return this._hasGeoQuery;
    }

    return hasGeoQuery;
  }();

  _proto.hasWhere = function () {
    function hasWhere() {
      return this._hasWhere;
    }

    return hasWhere;
  }();

  _proto.isSimple = function () {
    function isSimple() {
      return this._isSimple;
    }

    return isSimple;
  }(); // Given a selector, return a function that takes one argument, a
  // document. It returns a result object.


  _proto._compileSelector = function () {
    function _compileSelector(selector) {
      // you can pass a literal function instead of a selector
      if (selector instanceof Function) {
        this._isSimple = false;
        this._selector = selector;

        this._recordPathUsed('');

        return function (doc) {
          return {
            result: !!selector.call(doc)
          };
        };
      } // shorthand -- scalar _id


      if (LocalCollection._selectorIsId(selector)) {
        this._selector = {
          _id: selector
        };

        this._recordPathUsed('_id');

        return function (doc) {
          return {
            result: EJSON.equals(doc._id, selector)
          };
        };
      } // protect against dangerous selectors.  falsey and {_id: falsey} are both
      // likely programmer error, and not what you want, particularly for
      // destructive operations.


      if (!selector || hasOwn.call(selector, '_id') && !selector._id) {
        this._isSimple = false;
        return nothingMatcher;
      } // Top level can't be an array or true or binary.


      if (Array.isArray(selector) || EJSON.isBinary(selector) || typeof selector === 'boolean') {
        throw new Error("Invalid selector: " + selector);
      }

      this._selector = EJSON.clone(selector);
      return compileDocumentSelector(selector, this, {
        isRoot: true
      });
    }

    return _compileSelector;
  }(); // Returns a list of key paths the given selector is looking for. It includes
  // the empty string if there is a $where.


  _proto._getPaths = function () {
    function _getPaths() {
      return Object.keys(this._paths);
    }

    return _getPaths;
  }();

  _proto._recordPathUsed = function () {
    function _recordPathUsed(path) {
      this._paths[path] = true;
    }

    return _recordPathUsed;
  }();

  return Matcher;
}();

// helpers used by compiled selector code
LocalCollection._f = {
  // XXX for _all and _in, consider building 'inquery' at compile time..
  _type: function (v) {
    if (typeof v === 'number') {
      return 1;
    }

    if (typeof v === 'string') {
      return 2;
    }

    if (typeof v === 'boolean') {
      return 8;
    }

    if (Array.isArray(v)) {
      return 4;
    }

    if (v === null) {
      return 10;
    } // note that typeof(/x/) === "object"


    if (v instanceof RegExp) {
      return 11;
    }

    if (typeof v === 'function') {
      return 13;
    }

    if (v instanceof Date) {
      return 9;
    }

    if (EJSON.isBinary(v)) {
      return 5;
    }

    if (v instanceof MongoID.ObjectID) {
      return 7;
    } // object


    return 3; // XXX support some/all of these:
    // 14, symbol
    // 15, javascript code with scope
    // 16, 18: 32-bit/64-bit integer
    // 17, timestamp
    // 255, minkey
    // 127, maxkey
  },
  // deep equality test: use for literal document and array matches
  _equal: function (a, b) {
    return EJSON.equals(a, b, {
      keyOrderSensitive: true
    });
  },
  // maps a type code to a value that can be used to sort values of different
  // types
  _typeorder: function (t) {
    // http://www.mongodb.org/display/DOCS/What+is+the+Compare+Order+for+BSON+Types
    // XXX what is the correct sort position for Javascript code?
    // ('100' in the matrix below)
    // XXX minkey/maxkey
    return [-1, // (not a type)
    1, // number
    2, // string
    3, // object
    4, // array
    5, // binary
    -1, // deprecated
    6, // ObjectID
    7, // bool
    8, // Date
    0, // null
    9, // RegExp
    -1, // deprecated
    100, // JS code
    2, // deprecated (symbol)
    100, // JS code
    1, // 32-bit int
    8, // Mongo timestamp
    1 // 64-bit int
    ][t];
  },
  // compare two values of unknown type according to BSON ordering
  // semantics. (as an extension, consider 'undefined' to be less than
  // any other value.) return negative if a is less, positive if b is
  // less, or 0 if equal
  _cmp: function (a, b) {
    if (a === undefined) {
      return b === undefined ? 0 : -1;
    }

    if (b === undefined) {
      return 1;
    }

    var ta = LocalCollection._f._type(a);

    var tb = LocalCollection._f._type(b);

    var oa = LocalCollection._f._typeorder(ta);

    var ob = LocalCollection._f._typeorder(tb);

    if (oa !== ob) {
      return oa < ob ? -1 : 1;
    } // XXX need to implement this if we implement Symbol or integers, or
    // Timestamp


    if (ta !== tb) {
      throw Error('Missing type coercion logic in _cmp');
    }

    if (ta === 7) {
      // ObjectID
      // Convert to string.
      ta = tb = 2;
      a = a.toHexString();
      b = b.toHexString();
    }

    if (ta === 9) {
      // Date
      // Convert to millis.
      ta = tb = 1;
      a = a.getTime();
      b = b.getTime();
    }

    if (ta === 1) // double
      return a - b;
    if (tb === 2) // string
      return a < b ? -1 : a === b ? 0 : 1;

    if (ta === 3) {
      // Object
      // this could be much more efficient in the expected case ...
      var toArray = function (object) {
        var result = [];
        Object.keys(object).forEach(function (key) {
          result.push(key, object[key]);
        });
        return result;
      };

      return LocalCollection._f._cmp(toArray(a), toArray(b));
    }

    if (ta === 4) {
      // Array
      for (var i = 0;; i++) {
        if (i === a.length) {
          return i === b.length ? 0 : -1;
        }

        if (i === b.length) {
          return 1;
        }

        var s = LocalCollection._f._cmp(a[i], b[i]);

        if (s !== 0) {
          return s;
        }
      }
    }

    if (ta === 5) {
      // binary
      // Surprisingly, a small binary blob is always less than a large one in
      // Mongo.
      if (a.length !== b.length) {
        return a.length - b.length;
      }

      for (var _i = 0; _i < a.length; _i++) {
        if (a[_i] < b[_i]) {
          return -1;
        }

        if (a[_i] > b[_i]) {
          return 1;
        }
      }

      return 0;
    }

    if (ta === 8) {
      // boolean
      if (a) {
        return b ? 0 : 1;
      }

      return b ? -1 : 0;
    }

    if (ta === 10) // null
      return 0;
    if (ta === 11) // regexp
      throw Error('Sorting not supported on regular expression'); // XXX
    // 13: javascript code
    // 14: symbol
    // 15: javascript code with scope
    // 16: 32-bit integer
    // 17: timestamp
    // 18: 64-bit integer
    // 255: minkey
    // 127: maxkey

    if (ta === 13) // javascript code
      throw Error('Sorting not supported on Javascript code'); // XXX

    throw Error('Unknown type to sort');
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"minimongo_common.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/minimongo/minimongo_common.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var LocalCollection_;
module.link("./local_collection.js", {
  "default": function (v) {
    LocalCollection_ = v;
  }
}, 0);
var Matcher;
module.link("./matcher.js", {
  "default": function (v) {
    Matcher = v;
  }
}, 1);
var Sorter;
module.link("./sorter.js", {
  "default": function (v) {
    Sorter = v;
  }
}, 2);
LocalCollection = LocalCollection_;
Minimongo = {
  LocalCollection: LocalCollection_,
  Matcher: Matcher,
  Sorter: Sorter
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"observe_handle.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/minimongo/observe_handle.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  "default": function () {
    return ObserveHandle;
  }
});

var ObserveHandle = function () {
  function ObserveHandle() {}

  return ObserveHandle;
}();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sorter.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/minimongo/sorter.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

module.export({
  "default": function () {
    return Sorter;
  }
});
var ELEMENT_OPERATORS, equalityElementMatcher, expandArraysInBranches, hasOwn, isOperatorObject, makeLookupFunction, regexpElementMatcher;
module.link("./common.js", {
  ELEMENT_OPERATORS: function (v) {
    ELEMENT_OPERATORS = v;
  },
  equalityElementMatcher: function (v) {
    equalityElementMatcher = v;
  },
  expandArraysInBranches: function (v) {
    expandArraysInBranches = v;
  },
  hasOwn: function (v) {
    hasOwn = v;
  },
  isOperatorObject: function (v) {
    isOperatorObject = v;
  },
  makeLookupFunction: function (v) {
    makeLookupFunction = v;
  },
  regexpElementMatcher: function (v) {
    regexpElementMatcher = v;
  }
}, 0);

var Sorter =
/*#__PURE__*/
function () {
  function Sorter(spec) {
    var _this = this;

    this._sortSpecParts = [];
    this._sortFunction = null;

    var addSpecPart = function (path, ascending) {
      if (!path) {
        throw Error('sort keys must be non-empty');
      }

      if (path.charAt(0) === '$') {
        throw Error("unsupported sort key: " + path);
      }

      _this._sortSpecParts.push({
        ascending: ascending,
        lookup: makeLookupFunction(path, {
          forSort: true
        }),
        path: path
      });
    };

    if (spec instanceof Array) {
      spec.forEach(function (element) {
        if (typeof element === 'string') {
          addSpecPart(element, true);
        } else {
          addSpecPart(element[0], element[1] !== 'desc');
        }
      });
    } else if ((0, _typeof2.default)(spec) === 'object') {
      Object.keys(spec).forEach(function (key) {
        addSpecPart(key, spec[key] >= 0);
      });
    } else if (typeof spec === 'function') {
      this._sortFunction = spec;
    } else {
      throw Error("Bad sort specification: " + JSON.stringify(spec));
    } // If a function is specified for sorting, we skip the rest.


    if (this._sortFunction) {
      return;
    } // To implement affectedByModifier, we piggy-back on top of Matcher's
    // affectedByModifier code; we create a selector that is affected by the
    // same modifiers as this sort order. This is only implemented on the
    // server.


    if (this.affectedByModifier) {
      var selector = {};

      this._sortSpecParts.forEach(function (spec) {
        selector[spec.path] = 1;
      });

      this._selectorForAffectedByModifier = new Minimongo.Matcher(selector);
    }

    this._keyComparator = composeComparators(this._sortSpecParts.map(function (spec, i) {
      return _this._keyFieldComparator(i);
    }));
  }

  var _proto = Sorter.prototype;

  _proto.getComparator = function () {
    function getComparator(options) {
      // If sort is specified or have no distances, just use the comparator from
      // the source specification (which defaults to "everything is equal".
      // issue #3599
      // https://docs.mongodb.com/manual/reference/operator/query/near/#sort-operation
      // sort effectively overrides $near
      if (this._sortSpecParts.length || !options || !options.distances) {
        return this._getBaseComparator();
      }

      var distances = options.distances; // Return a comparator which compares using $near distances.

      return function (a, b) {
        if (!distances.has(a._id)) {
          throw Error("Missing distance for " + a._id);
        }

        if (!distances.has(b._id)) {
          throw Error("Missing distance for " + b._id);
        }

        return distances.get(a._id) - distances.get(b._id);
      };
    }

    return getComparator;
  }(); // Takes in two keys: arrays whose lengths match the number of spec
  // parts. Returns negative, 0, or positive based on using the sort spec to
  // compare fields.


  _proto._compareKeys = function () {
    function _compareKeys(key1, key2) {
      if (key1.length !== this._sortSpecParts.length || key2.length !== this._sortSpecParts.length) {
        throw Error('Key has wrong length');
      }

      return this._keyComparator(key1, key2);
    }

    return _compareKeys;
  }(); // Iterates over each possible "key" from doc (ie, over each branch), calling
  // 'cb' with the key.


  _proto._generateKeysFromDoc = function () {
    function _generateKeysFromDoc(doc, cb) {
      if (this._sortSpecParts.length === 0) {
        throw new Error('can\'t generate keys without a spec');
      }

      var pathFromIndices = function (indices) {
        return indices.join(',') + ",";
      };

      var knownPaths = null; // maps index -> ({'' -> value} or {path -> value})

      var valuesByIndexAndPath = this._sortSpecParts.map(function (spec) {
        // Expand any leaf arrays that we find, and ignore those arrays
        // themselves.  (We never sort based on an array itself.)
        var branches = expandArraysInBranches(spec.lookup(doc), true); // If there are no values for a key (eg, key goes to an empty array),
        // pretend we found one undefined value.

        if (!branches.length) {
          branches = [{
            value: void 0
          }];
        }

        var element = Object.create(null);
        var usedPaths = false;
        branches.forEach(function (branch) {
          if (!branch.arrayIndices) {
            // If there are no array indices for a branch, then it must be the
            // only branch, because the only thing that produces multiple branches
            // is the use of arrays.
            if (branches.length > 1) {
              throw Error('multiple branches but no array used?');
            }

            element[''] = branch.value;
            return;
          }

          usedPaths = true;
          var path = pathFromIndices(branch.arrayIndices);

          if (hasOwn.call(element, path)) {
            throw Error("duplicate path: " + path);
          }

          element[path] = branch.value; // If two sort fields both go into arrays, they have to go into the
          // exact same arrays and we have to find the same paths.  This is
          // roughly the same condition that makes MongoDB throw this strange
          // error message.  eg, the main thing is that if sort spec is {a: 1,
          // b:1} then a and b cannot both be arrays.
          //
          // (In MongoDB it seems to be OK to have {a: 1, 'a.x.y': 1} where 'a'
          // and 'a.x.y' are both arrays, but we don't allow this for now.
          // #NestedArraySort
          // XXX achieve full compatibility here

          if (knownPaths && !hasOwn.call(knownPaths, path)) {
            throw Error('cannot index parallel arrays');
          }
        });

        if (knownPaths) {
          // Similarly to above, paths must match everywhere, unless this is a
          // non-array field.
          if (!hasOwn.call(element, '') && Object.keys(knownPaths).length !== Object.keys(element).length) {
            throw Error('cannot index parallel arrays!');
          }
        } else if (usedPaths) {
          knownPaths = {};
          Object.keys(element).forEach(function (path) {
            knownPaths[path] = true;
          });
        }

        return element;
      });

      if (!knownPaths) {
        // Easy case: no use of arrays.
        var soleKey = valuesByIndexAndPath.map(function (values) {
          if (!hasOwn.call(values, '')) {
            throw Error('no value in sole key case?');
          }

          return values[''];
        });
        cb(soleKey);
        return;
      }

      Object.keys(knownPaths).forEach(function (path) {
        var key = valuesByIndexAndPath.map(function (values) {
          if (hasOwn.call(values, '')) {
            return values[''];
          }

          if (!hasOwn.call(values, path)) {
            throw Error('missing path?');
          }

          return values[path];
        });
        cb(key);
      });
    }

    return _generateKeysFromDoc;
  }(); // Returns a comparator that represents the sort specification (but not
  // including a possible geoquery distance tie-breaker).


  _proto._getBaseComparator = function () {
    function _getBaseComparator() {
      var _this2 = this;

      if (this._sortFunction) {
        return this._sortFunction;
      } // If we're only sorting on geoquery distance and no specs, just say
      // everything is equal.


      if (!this._sortSpecParts.length) {
        return function (doc1, doc2) {
          return 0;
        };
      }

      return function (doc1, doc2) {
        var key1 = _this2._getMinKeyFromDoc(doc1);

        var key2 = _this2._getMinKeyFromDoc(doc2);

        return _this2._compareKeys(key1, key2);
      };
    }

    return _getBaseComparator;
  }(); // Finds the minimum key from the doc, according to the sort specs.  (We say
  // "minimum" here but this is with respect to the sort spec, so "descending"
  // sort fields mean we're finding the max for that field.)
  //
  // Note that this is NOT "find the minimum value of the first field, the
  // minimum value of the second field, etc"... it's "choose the
  // lexicographically minimum value of the key vector, allowing only keys which
  // you can find along the same paths".  ie, for a doc {a: [{x: 0, y: 5}, {x:
  // 1, y: 3}]} with sort spec {'a.x': 1, 'a.y': 1}, the only keys are [0,5] and
  // [1,3], and the minimum key is [0,5]; notably, [0,3] is NOT a key.


  _proto._getMinKeyFromDoc = function () {
    function _getMinKeyFromDoc(doc) {
      var _this3 = this;

      var minKey = null;

      this._generateKeysFromDoc(doc, function (key) {
        if (minKey === null) {
          minKey = key;
          return;
        }

        if (_this3._compareKeys(key, minKey) < 0) {
          minKey = key;
        }
      });

      return minKey;
    }

    return _getMinKeyFromDoc;
  }();

  _proto._getPaths = function () {
    function _getPaths() {
      return this._sortSpecParts.map(function (part) {
        return part.path;
      });
    }

    return _getPaths;
  }(); // Given an index 'i', returns a comparator that compares two key arrays based
  // on field 'i'.


  _proto._keyFieldComparator = function () {
    function _keyFieldComparator(i) {
      var invert = !this._sortSpecParts[i].ascending;
      return function (key1, key2) {
        var compare = LocalCollection._f._cmp(key1[i], key2[i]);

        return invert ? -compare : compare;
      };
    }

    return _keyFieldComparator;
  }();

  return Sorter;
}();

// Given an array of comparators
// (functions (a,b)->(negative or positive or zero)), returns a single
// comparator which uses each comparator in order and returns the first
// non-zero value.
function composeComparators(comparatorArray) {
  return function (a, b) {
    for (var i = 0; i < comparatorArray.length; ++i) {
      var compare = comparatorArray[i](a, b);

      if (compare !== 0) {
        return compare;
      }
    }

    return 0;
  };
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/minimongo/minimongo_client.js");

/* Exports */
Package._define("minimongo", exports, {
  LocalCollection: LocalCollection,
  Minimongo: Minimongo,
  MinimongoTest: MinimongoTest,
  MinimongoError: MinimongoError
});

})();
