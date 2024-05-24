import { inArray } from "../utilitis/helper";

/**
 * Interface defining the contract for condition classes.
 */
export interface Condition {
    match(value: any, comparisonValue: any, dateFormat?: string): boolean;
}

/**
 * Condition class to check if two values are equal (using loose equality).
 */
export class Equals implements Condition {
    match(value: any, valueToCompare: any): boolean {
        return value == valueToCompare;
    }
}

/**
 * Condition class for checking if two values are equal (strict).
 */
export class EqualsStrict implements Condition {
    match(value: any, valueToCompare: any): boolean {
        return value === valueToCompare;
    }
}

/**
 * Condition class for checking if two values are not equal (non-strict).
 */
export class NotEquals implements Condition {
    match(value: any, valueToCompare: any): boolean {
        return value != valueToCompare;
    }
}

/**
 * Condition class for checking if two values are not equal (strict).
 */
export class NotEqualsStrict implements Condition {
    match(value: any, valueToCompare: any): boolean {
        return value !== valueToCompare;
    }
}

/**
 * Condition class for checking if one value is greater than another.
 */
export class GreaterThan implements Condition {
    match(value: any, valueToCompare: any): boolean {
        return value > valueToCompare;
    }
}

/**
 * Condition class for checking if one value is greater than or equal to another.
 */
export class GreaterThanEquals implements Condition {
    match(value: any, valueToCompare: any): boolean {
        return value >= valueToCompare;
    }
}

/**
 * Condition class for checking if one value is less than another.
 */
export class LessThan implements Condition {
    match(value: any, valueToCompare: any): boolean {
        return value < valueToCompare;
    }
}

/**
 * Condition class for checking if one value is less than or equal to another.
 */
export class LessThanEquals implements Condition {
    match(value: any, valueToCompare: any): boolean {
        return value <= valueToCompare;
    }
}

/**
 * Condition class for checking if a string contains another string.
 */
export class Contains implements Condition {
    match(value: string, valueToCompare: string | number): boolean {
        value = value.toLowerCase();
        valueToCompare = valueToCompare.toString();
        valueToCompare = valueToCompare.toLowerCase();

        return value.includes(valueToCompare);
    }
}

/**
 * Condition class for checking if a string starts with another string.
 */
export class StartsWith implements Condition {
    match(value: any, valueToCompare: string | number): boolean {
        value = value.toLowerCase();
        valueToCompare = valueToCompare.toString();
        valueToCompare = valueToCompare.toLowerCase();

        return value.startsWith(valueToCompare);
    }
}

/**
 * Condition class for checking if a string ends with another string.
 */
export class EndsWith implements Condition {
    match(value: any, valueToCompare: string | number): boolean {
        value = value.toLowerCase();
        valueToCompare = valueToCompare.toString();
        valueToCompare = valueToCompare.toLowerCase();

        return value.endsWith(valueToCompare);
    }
}

/**
 * Condition class for checking if a value exists in an array.
 */
export class InArray implements Condition {
    match(value: any, valueToCompare: any): boolean {
        return inArray(valueToCompare, value);
    }
}

/**
 * Condition class for checking if a value not exists in an array.
 */
export class NotInArray implements Condition {
    match(value: any, valueToCompare: any): boolean {
        return !inArray(valueToCompare, value);
    }
}

/**
 * Condition class for checking if two date strings are equal
 */
export class EqualsDate implements Condition {
    match(value: any, valueToCompare: any): boolean {
        let date1 = new Date(value);
        let date2 = new Date(valueToCompare);

        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
            return false;
        }

        return date1.getTime() === date2.getTime();
    }
}

/**
 * Condition class for checking if two date strings are not equal
 */
export class NotEqualsDate implements Condition {
    match(value: any, valueToCompare: any): boolean {
        let date1 = new Date(value);
        let date2 = new Date(valueToCompare);

        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
            return false;
        }

        return date1.getTime() !== date2.getTime();
    }
}

/**
 * Condition class for checking if date1 greater than date2
 */
export class GreaterThanDate implements Condition {
    match(value: any, valueToCompare: any): boolean {
        let date1 = new Date(value);
        let date2 = new Date(valueToCompare);

        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
            return false;
        }

        return date1.getTime() > date2.getTime();
    }
}

/**
 * Condition class for checking if date1 greater than or equal date2
 */
export class GreaterThanEqualsDate implements Condition {
    match(value: any, valueToCompare: any): boolean {
        let date1 = new Date(value);
        let date2 = new Date(valueToCompare);

        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
            return false;
        }

        return date1.getTime() >= date2.getTime();
    }
}

/**
 * Condition class for checking if date1 smaller than date2
 */
export class LessThanDate implements Condition {
    match(value: any, valueToCompare: any): boolean {
        let date1 = new Date(value);
        let date2 = new Date(valueToCompare);

        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
            return false;
        }

        return date1.getTime() < date2.getTime();
    }
}

/**
 * Condition class for checking if date1 smaller than or equal date2
 */
export class LessThanEqualsDate implements Condition {
    match(value: any, valueToCompare: any): boolean {
        let date1 = new Date(value);
        let date2 = new Date(valueToCompare);

        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
            return false;
        }

        return date1.getTime() <= date2.getTime();
    }
}
