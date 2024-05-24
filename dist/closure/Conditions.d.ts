/**
 * Interface defining the contract for condition classes.
 */
export interface Condition {
    match(value: any, comparisonValue: any, dateFormat?: string): boolean;
}
/**
 * Condition class to check if two values are equal (using loose equality).
 */
export declare class Equals implements Condition {
    match(value: any, valueToCompare: any): boolean;
}
/**
 * Condition class for checking if two values are equal (strict).
 */
export declare class EqualsStrict implements Condition {
    match(value: any, valueToCompare: any): boolean;
}
/**
 * Condition class for checking if two values are not equal (non-strict).
 */
export declare class NotEquals implements Condition {
    match(value: any, valueToCompare: any): boolean;
}
/**
 * Condition class for checking if two values are not equal (strict).
 */
export declare class NotEqualsStrict implements Condition {
    match(value: any, valueToCompare: any): boolean;
}
/**
 * Condition class for checking if one value is greater than another.
 */
export declare class GreaterThan implements Condition {
    match(value: any, valueToCompare: any): boolean;
}
/**
 * Condition class for checking if one value is greater than or equal to another.
 */
export declare class GreaterThanEquals implements Condition {
    match(value: any, valueToCompare: any): boolean;
}
/**
 * Condition class for checking if one value is less than another.
 */
export declare class LessThan implements Condition {
    match(value: any, valueToCompare: any): boolean;
}
/**
 * Condition class for checking if one value is less than or equal to another.
 */
export declare class LessThanEquals implements Condition {
    match(value: any, valueToCompare: any): boolean;
}
/**
 * Condition class for checking if a string contains another string.
 */
export declare class Contains implements Condition {
    match(value: string, valueToCompare: string | number): boolean;
}
/**
 * Condition class for checking if a string starts with another string.
 */
export declare class StartsWith implements Condition {
    match(value: any, valueToCompare: string | number): boolean;
}
/**
 * Condition class for checking if a string ends with another string.
 */
export declare class EndsWith implements Condition {
    match(value: any, valueToCompare: string | number): boolean;
}
/**
 * Condition class for checking if a value exists in an array.
 */
export declare class InArray implements Condition {
    match(value: any, valueToCompare: any): boolean;
}
/**
 * Condition class for checking if a value not exists in an array.
 */
export declare class NotInArray implements Condition {
    match(value: any, valueToCompare: any): boolean;
}
/**
 * Condition class for checking if two date strings are equal
 */
export declare class EqualsDate implements Condition {
    match(value: any, valueToCompare: any): boolean;
}
/**
 * Condition class for checking if two date strings are not equal
 */
export declare class NotEqualsDate implements Condition {
    match(value: any, valueToCompare: any): boolean;
}
/**
 * Condition class for checking if date1 greater than date2
 */
export declare class GreaterThanDate implements Condition {
    match(value: any, valueToCompare: any): boolean;
}
/**
 * Condition class for checking if date1 greater than or equal date2
 */
export declare class GreaterThanEqualsDate implements Condition {
    match(value: any, valueToCompare: any): boolean;
}
/**
 * Condition class for checking if date1 smaller than date2
 */
export declare class LessThanDate implements Condition {
    match(value: any, valueToCompare: any): boolean;
}
/**
 * Condition class for checking if date1 smaller than or equal date2
 */
export declare class LessThanEqualsDate implements Condition {
    match(value: any, valueToCompare: any): boolean;
}
