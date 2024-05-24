"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessThanEqualsDate = exports.LessThanDate = exports.GreaterThanEqualsDate = exports.GreaterThanDate = exports.NotEqualsDate = exports.EqualsDate = exports.NotInArray = exports.InArray = exports.EndsWith = exports.StartsWith = exports.Contains = exports.LessThanEquals = exports.LessThan = exports.GreaterThanEquals = exports.GreaterThan = exports.NotEqualsStrict = exports.NotEquals = exports.EqualsStrict = exports.Equals = void 0;
const helper_1 = require("../utilitis/helper");
/**
 * Condition class to check if two values are equal (using loose equality).
 */
class Equals {
    match(value, valueToCompare) {
        return value == valueToCompare;
    }
}
exports.Equals = Equals;
/**
 * Condition class for checking if two values are equal (strict).
 */
class EqualsStrict {
    match(value, valueToCompare) {
        return value === valueToCompare;
    }
}
exports.EqualsStrict = EqualsStrict;
/**
 * Condition class for checking if two values are not equal (non-strict).
 */
class NotEquals {
    match(value, valueToCompare) {
        return value != valueToCompare;
    }
}
exports.NotEquals = NotEquals;
/**
 * Condition class for checking if two values are not equal (strict).
 */
class NotEqualsStrict {
    match(value, valueToCompare) {
        return value !== valueToCompare;
    }
}
exports.NotEqualsStrict = NotEqualsStrict;
/**
 * Condition class for checking if one value is greater than another.
 */
class GreaterThan {
    match(value, valueToCompare) {
        return value > valueToCompare;
    }
}
exports.GreaterThan = GreaterThan;
/**
 * Condition class for checking if one value is greater than or equal to another.
 */
class GreaterThanEquals {
    match(value, valueToCompare) {
        return value >= valueToCompare;
    }
}
exports.GreaterThanEquals = GreaterThanEquals;
/**
 * Condition class for checking if one value is less than another.
 */
class LessThan {
    match(value, valueToCompare) {
        return value < valueToCompare;
    }
}
exports.LessThan = LessThan;
/**
 * Condition class for checking if one value is less than or equal to another.
 */
class LessThanEquals {
    match(value, valueToCompare) {
        return value <= valueToCompare;
    }
}
exports.LessThanEquals = LessThanEquals;
/**
 * Condition class for checking if a string contains another string.
 */
class Contains {
    match(value, valueToCompare) {
        value = value.toLowerCase();
        valueToCompare = valueToCompare.toString();
        valueToCompare = valueToCompare.toLowerCase();
        return value.includes(valueToCompare);
    }
}
exports.Contains = Contains;
/**
 * Condition class for checking if a string starts with another string.
 */
class StartsWith {
    match(value, valueToCompare) {
        value = value.toLowerCase();
        valueToCompare = valueToCompare.toString();
        valueToCompare = valueToCompare.toLowerCase();
        return value.startsWith(valueToCompare);
    }
}
exports.StartsWith = StartsWith;
/**
 * Condition class for checking if a string ends with another string.
 */
class EndsWith {
    match(value, valueToCompare) {
        value = value.toLowerCase();
        valueToCompare = valueToCompare.toString();
        valueToCompare = valueToCompare.toLowerCase();
        return value.endsWith(valueToCompare);
    }
}
exports.EndsWith = EndsWith;
/**
 * Condition class for checking if a value exists in an array.
 */
class InArray {
    match(value, valueToCompare) {
        return (0, helper_1.inArray)(valueToCompare, value);
    }
}
exports.InArray = InArray;
/**
 * Condition class for checking if a value not exists in an array.
 */
class NotInArray {
    match(value, valueToCompare) {
        return !(0, helper_1.inArray)(valueToCompare, value);
    }
}
exports.NotInArray = NotInArray;
/**
 * Condition class for checking if two date strings are equal
 */
class EqualsDate {
    match(value, valueToCompare) {
        let date1 = new Date(value);
        let date2 = new Date(valueToCompare);
        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
            return false;
        }
        return date1.getTime() === date2.getTime();
    }
}
exports.EqualsDate = EqualsDate;
/**
 * Condition class for checking if two date strings are not equal
 */
class NotEqualsDate {
    match(value, valueToCompare) {
        let date1 = new Date(value);
        let date2 = new Date(valueToCompare);
        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
            return false;
        }
        return date1.getTime() !== date2.getTime();
    }
}
exports.NotEqualsDate = NotEqualsDate;
/**
 * Condition class for checking if date1 greater than date2
 */
class GreaterThanDate {
    match(value, valueToCompare) {
        let date1 = new Date(value);
        let date2 = new Date(valueToCompare);
        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
            return false;
        }
        return date1.getTime() > date2.getTime();
    }
}
exports.GreaterThanDate = GreaterThanDate;
/**
 * Condition class for checking if date1 greater than or equal date2
 */
class GreaterThanEqualsDate {
    match(value, valueToCompare) {
        let date1 = new Date(value);
        let date2 = new Date(valueToCompare);
        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
            return false;
        }
        return date1.getTime() >= date2.getTime();
    }
}
exports.GreaterThanEqualsDate = GreaterThanEqualsDate;
/**
 * Condition class for checking if date1 smaller than date2
 */
class LessThanDate {
    match(value, valueToCompare) {
        let date1 = new Date(value);
        let date2 = new Date(valueToCompare);
        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
            return false;
        }
        return date1.getTime() < date2.getTime();
    }
}
exports.LessThanDate = LessThanDate;
/**
 * Condition class for checking if date1 smaller than or equal date2
 */
class LessThanEqualsDate {
    match(value, valueToCompare) {
        let date1 = new Date(value);
        let date2 = new Date(valueToCompare);
        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
            return false;
        }
        return date1.getTime() <= date2.getTime();
    }
}
exports.LessThanEqualsDate = LessThanEqualsDate;
