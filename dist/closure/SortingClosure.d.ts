import { SortObject, SortOrder } from "../utilitis/Types";
declare class SortingClosure {
    /**
     * Enumerates valid sort orders for sorting operations.
     */
    static operatorsMap: SortOrder[];
    /**
     * Applies sorting to the results based on the provided sort criteria.
     * @param results - The array of data to sort.
     * @param sortCriteria - The criteria for sorting (key and order).
     * @returns The sorted array of data.
     */
    static apply(results: any[], sortCriteria: SortObject | null): any[];
    /**
     * Sorts the array of data based on the specified key and order.
     * @param array - The array of data to sort.
     * @param key - The key to sort by.
     * @param order - The sort order, default is "asc".
     * @returns The sorted array of data.
     */
    private static sort;
    /**
     * Checks if the provided operator is a valid sort order.
     * @param operator - The operator to validate.
     * @returns True if the operator is a valid sort order, otherwise false.
     */
    static isValidOperator(operator: string): boolean;
}
export default SortingClosure;
