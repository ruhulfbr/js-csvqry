"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../utilitis/helper");
const Conditions_1 = require("./Conditions");
class WhereClosure {
    /**
     * Applies WHERE and OR WHERE conditions to filter rows in the data array.
     * @param data - The array of data rows to filter.
     * @param where - The array of WHERE conditions to apply.
     * @param orWhere - The array of OR WHERE conditions to apply (optional).
     * @returns The filtered array of data rows.
     */
    static apply(data, where, orWhere = []) {
        if ((0, helper_1.isEmpty)(where) && (0, helper_1.isEmpty)(orWhere)) {
            return data;
        }
        const results = [];
        for (const row of data) {
            let matches = this.matchesConditions(row, where);
            if (!matches && orWhere.length > 0) {
                matches = this.matchesConditions(row, orWhere);
            }
            if (matches) {
                results.push(row);
            }
        }
        return results;
    }
    /**
     * Checks if the provided operator is a valid filter operator.
     * @param operator - The operator to validate.
     * @returns True if the operator is valid, otherwise false.
     */
    static isValidOperator(operator) {
        return this.getFilterClass(operator) !== null;
    }
    /**
     * Checks if a row matches the given conditions.
     * @param row - The row to check.
     * @param conditions - The array of conditions to match against.
     * @returns True if the row matches all conditions, otherwise false.
     */
    static matchesConditions(row, conditions) {
        for (const where of conditions) {
            if (row[where.column] !== undefined &&
                !this.checkCondition(where, row)) {
                return false;
            }
        }
        return true;
    }
    /**
     * Checks if a specific condition is met for a given row element.
     * @param where - The condition to check.
     * @param element - The element of the row to apply the condition.
     * @returns True if the condition is met, otherwise false.
     */
    static checkCondition(where, element) {
        var _a;
        const value = (_a = element[where.column]) !== null && _a !== void 0 ? _a : "";
        const FilterClass = this.getFilterClass(where.operator);
        if (!FilterClass) {
            throw new Error(`Unsupported operator: ${where.operator}`);
        }
        const filter = new FilterClass();
        return filter.match(value, where.value, where.date_format);
    }
    /**
     * Retrieves the filter class corresponding to the given operator.
     * @param operator - The operator for which to retrieve the filter class.
     * @returns The filter class corresponding to the operator, or null if not found.
     */
    static getFilterClass(operator) {
        return this.filterClassMap[operator] || null;
    }
}
/** ================== Private Methods ================== */
/**
 * Maps filter operators to their corresponding filter classes.
 */
WhereClosure.filterClassMap = {
    "=": Conditions_1.Equals,
    "===": Conditions_1.EqualsStrict,
    "!=": Conditions_1.NotEquals,
    "!==": Conditions_1.NotEqualsStrict,
    ">": Conditions_1.GreaterThan,
    ">=": Conditions_1.GreaterThanEquals,
    "<": Conditions_1.LessThan,
    "<=": Conditions_1.LessThanEquals,
    like_both: Conditions_1.Contains,
    like_start: Conditions_1.StartsWith,
    like_end: Conditions_1.EndsWith,
    IN_ARRAY: Conditions_1.InArray,
    NOT_IN_ARRAY: Conditions_1.NotInArray,
    "=_DATE": Conditions_1.EqualsDate,
    "!=_DATE": Conditions_1.NotEqualsDate,
    ">_DATE": Conditions_1.GreaterThanDate,
    ">=_DATE": Conditions_1.GreaterThanEqualsDate,
    "<_DATE": Conditions_1.LessThanDate,
    "<=_DATE": Conditions_1.LessThanEqualsDate,
};
exports.default = WhereClosure;
