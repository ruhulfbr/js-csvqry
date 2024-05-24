import { RowData, WhereObject } from "../utilitis/Types";
import { isEmpty } from "../utilitis/helper";
import {
    Condition,
    Equals,
    EqualsStrict,
    NotEquals,
    NotEqualsStrict,
    GreaterThan,
    GreaterThanEquals,
    LessThan,
    LessThanEquals,
    Contains,
    StartsWith,
    EndsWith,
    InArray,
    NotInArray,
    EqualsDate,
    NotEqualsDate,
    GreaterThanDate,
    GreaterThanEqualsDate,
    LessThanDate,
    LessThanEqualsDate,
} from "./Conditions";

class WhereClosure {
    /**
     * Applies WHERE and OR WHERE conditions to filter rows in the data array.
     * @param data - The array of data rows to filter.
     * @param where - The array of WHERE conditions to apply.
     * @param orWhere - The array of OR WHERE conditions to apply (optional).
     * @returns The filtered array of data rows.
     */
    public static apply(
        data: RowData[],
        where: WhereObject[],
        orWhere: WhereObject[] = []
    ): RowData[] {
        if (isEmpty(where) && isEmpty(orWhere)) {
            return data;
        }

        const results: RowData[] = [];
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
    public static isValidOperator(operator: string): boolean {
        return this.getFilterClass(operator) !== null;
    }

    /** ================== Private Methods ================== */

    /**
     * Maps filter operators to their corresponding filter classes.
     */
    private static filterClassMap: { [key: string]: new () => Condition } = {
        "=": Equals,
        "===": EqualsStrict,
        "!=": NotEquals,
        "!==": NotEqualsStrict,
        ">": GreaterThan,
        ">=": GreaterThanEquals,
        "<": LessThan,
        "<=": LessThanEquals,
        like_both: Contains,
        like_start: StartsWith,
        like_end: EndsWith,
        IN_ARRAY: InArray,
        NOT_IN_ARRAY: NotInArray,
        "=_DATE": EqualsDate,
        "!=_DATE": NotEqualsDate,
        ">_DATE": GreaterThanDate,
        ">=_DATE": GreaterThanEqualsDate,
        "<_DATE": LessThanDate,
        "<=_DATE": LessThanEqualsDate,
    };

    /**
     * Checks if a row matches the given conditions.
     * @param row - The row to check.
     * @param conditions - The array of conditions to match against.
     * @returns True if the row matches all conditions, otherwise false.
     */
    private static matchesConditions(
        row: RowData,
        conditions: WhereObject[]
    ): boolean {
        for (const where of conditions) {
            if (
                row[where.column] !== undefined &&
                !this.checkCondition(where, row)
            ) {
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
    private static checkCondition(
        where: WhereObject,
        element: { [key: string]: any }
    ): boolean {
        const value = element[where.column] ?? "";
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
    private static getFilterClass(
        operator: string
    ): (new () => Condition) | null {
        return this.filterClassMap[operator] || null;
    }
}

export default WhereClosure;
