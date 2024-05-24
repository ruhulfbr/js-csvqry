import { expect, test } from "vitest";
import {
    isEmpty,
    isNumeric,
    isDateString,
    inArray,
} from "../src/utilitis/helper";

test("Check array is empty", () => {
    expect(isEmpty([])).toBe(true);
});

test("Check array is not empty", () => {
    expect(isEmpty([2])).toBe(false);
});

test("Check object is empty", () => {
    expect(isEmpty({})).toBe(true);
});

test("Check object is not empty", () => {
    expect(isEmpty({ name: "ruhul" })).toBe(false);
});

test("Check string is empty", () => {
    expect(isEmpty("")).toBe(true);
});

test("Check string is not empty", () => {
    expect(isEmpty("5")).toBe(false);
});

test("Check Number is empty", () => {
    expect(isEmpty(0)).toBe(true);
});

test("Check Number is not empty", () => {
    expect(isEmpty(5)).toBe(false);
});

/********** Test Case for isNumeric function **********/

test("Check positive integer", () => {
    expect(isNumeric("123")).toBe(true);
});

test("Check negative integer", () => {
    expect(isNumeric("-456")).toBe(true);
});

test("Check zero", () => {
    expect(isNumeric("0")).toBe(true);
});

test("Check positive float", () => {
    expect(isNumeric("3.14")).toBe(false);
});

test("Check negative float", () => {
    expect(isNumeric("-2.718")).toBe(false);
});

test("Check non-numeric string", () => {
    expect(isNumeric("abc")).toBe(false);
});

test("Check empty string", () => {
    expect(isNumeric("")).toBe(false);
});

test("Check string with leading zeros", () => {
    expect(isNumeric("00123")).toBe(true);
});

test("Check string with leading plus sign", () => {
    expect(isNumeric("+123")).toBe(false);
});

test("Check string with trailing spaces", () => {
    expect(isNumeric(" 123 ")).toBe(false);
});

test("Check null input", () => {
    expect(isNumeric(null)).toBe(false);
});

test("Check undefined input", () => {
    expect(isNumeric(undefined)).toBe(false);
});

test("Check boolean true input", () => {
    expect(isNumeric(true)).toBe(false);
});

test("Check boolean false input", () => {
    expect(isNumeric(false)).toBe(false);
});

test("Check array input", () => {
    expect(isNumeric([1, 2, 3])).toBe(false);
});

test("Check object input", () => {
    expect(isNumeric({ key: "value" })).toBe(false);
});

test("Check function input", () => {
    expect(isNumeric(() => {})).toBe(false);
});

/********** Test Case for isDateString function **********/

test("Check valid date string (ISO 8601 format)", () => {
    expect(isDateString("2022-01-31")).toBe(true);
});

test("Check valid date string (long date format)", () => {
    expect(isDateString("January 31, 2022")).toBe(true);
});

test("Check valid date string (short date format)", () => {
    expect(isDateString("01/31/2022")).toBe(true);
});

test("Check invalid date string", () => {
    expect(isDateString("not a date")).toBe(false);
});

test("Check empty string", () => {
    expect(isDateString("")).toBe(false);
});

test("Check null input", () => {
    expect(isDateString(null)).toBe(false);
});

test("Check undefined input", () => {
    expect(isDateString(undefined)).toBe(false);
});

test("Check boolean true input", () => {
    expect(isDateString(true)).toBe(false);
});

test("Check boolean false input", () => {
    expect(isDateString(false)).toBe(false);
});

test("Check object input", () => {
    expect(isDateString({ date: "2022-01-31" })).toBe(false);
});

test("Check function input", () => {
    expect(isDateString(() => {})).toBe(false);
});

/********** Test Case for inArray function **********/

test("Check value is present in array", () => {
    const arr = ["1", "2", "3", "4", "5", "6"];
    const value = "2";
    expect(inArray(arr, value)).toBe(true);
});

test("Check numeric value is present in array", () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const value = 2;
    expect(inArray(arr, value)).toBe(true);
});

test("Check value is not present in array", () => {
    const arr = ["1", "2", "3", "4", "5", "6"];
    const value = "7";
    expect(inArray(arr, value)).toBe(false);
});

test("Check numeric value is not present in array", () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const value = 7;
    expect(inArray(arr, value)).toBe(false);
});

test("Check empty array", () => {
    const arr = [];
    const value = "2";
    expect(inArray(arr, value)).toBe(false);
});

test("Check value is present multiple times in array", () => {
    const arr = ["1", "2", "2", "3", "4", "5", "6"];
    const value = "2";
    expect(inArray(arr, value)).toBe(true);
});

test("Check value is present in array with mixed types", () => {
    const arr = ["1", 2, "3", 4, "5", 6];
    const value = 2;
    expect(inArray(arr, value)).toBe(true);
});

test("Check value is not present in array with mixed types", () => {
    const arr = ["1", "2", "3", 4, "5", 6];
    const value = "7";
    expect(inArray(arr, value)).toBe(false);
});
