export function isNumeric(value: string): boolean {
    return /^-?\d+$/.test(value);
}

export function isDateString(value: string): boolean {
    return !isNaN(Date.parse(value));
}

export function isEmpty(value: any): boolean {
    if (
        value == null ||
        value === false ||
        value === 0 ||
        value === "" ||
        (typeof value === "number" && isNaN(value))
    ) {
        return true;
    }

    if (Array.isArray(value) && value.length === 0) {
        return true;
    }

    if (typeof value === "object") {
        if (
            Object.prototype.toString.call(value) === "[object Object]" &&
            Object.keys(value).length === 0
        ) {
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

export function inArray(
    arr: (string | number)[],
    value: string | number
): boolean {
    let strValue = value.toString();
    return arr.map(String).includes(strValue);
}
