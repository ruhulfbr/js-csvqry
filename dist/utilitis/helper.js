"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inArray = exports.isEmpty = exports.isDateString = exports.isNumeric = void 0;
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}
exports.isNumeric = isNumeric;
function isDateString(value) {
    return !isNaN(Date.parse(value));
}
exports.isDateString = isDateString;
function isEmpty(value) {
    if (value == null ||
        value === false ||
        value === 0 ||
        value === "" ||
        (typeof value === "number" && isNaN(value))) {
        return true;
    }
    if (Array.isArray(value) && value.length === 0) {
        return true;
    }
    if (typeof value === "object") {
        if (Object.prototype.toString.call(value) === "[object Object]" &&
            Object.keys(value).length === 0) {
            return true;
        }
        if (value instanceof Set && value.size === 0) {
            return true;
        }
        if (value instanceof Map && value.size === 0) {
            return true;
        }
    }
    if (typeof value === "bigint" && value === BigInt(0)) {
        return true;
    }
    return false;
}
exports.isEmpty = isEmpty;
function inArray(arr, value) {
    let strValue = value.toString();
    return arr.map(String).includes(strValue);
}
exports.inArray = inArray;
