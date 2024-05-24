import { RowData, WhereObject } from "../utilitis/Types";
declare class WhereClosure {
    /**
     * Applies WHERE and OR WHERE conditions to filter rows in the data array.
     * @param data - The array of data rows to filter.
     * @param where - The array of WHERE conditions to apply.
     * @param orWhere - The array of OR WHERE conditions to apply (optional).
     * @returns The filtered array of data rows.
     */
    static apply(data: RowData[], where: WhereObject[], orWhere?: WhereObject[]): RowData[];
    /**
     * Checks if the provided operator is a valid filter operator.
     * @param operator - The operator to validate.
     * @returns True if the operator is valid, otherwise false.
     */
    static isValidOperator(operator: string): boolean;
    /** ================== Private Methods ================== */
    /**
     * Maps filter operators to their corresponding filter classes.
     */
    private static filterClassMap;
    /**
     * Checks if a row matches the given conditions.
     * @param row - The row to check.
     * @param conditions - The array of conditions to match against.
     * @returns True if the row matches all conditions, otherwise false.
     */
    private static matchesConditions;
    /**
     * Checks if a specific condition is met for a given row element.
     * @param where - The condition to check.
     * @param element - The element of the row to apply the condition.
     * @returns True if the condition is met, otherwise false.
     */
    private static checkCondition;
    /**
     * Retrieves the filter class corresponding to the given operator.
     * @param operator - The operator for which to retrieve the filter class.
     * @returns The filter class corresponding to the operator, or null if not found.
     */
    private static getFilterClass;
}
export default WhereClosure;
