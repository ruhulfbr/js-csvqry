import { isNumeric } from "../utilitis/helper";
import { RowData, SortObject, SortOrder } from "../utilitis/Types";

class SortingClosure {
    /**
     * Enumerates valid sort orders for sorting operations.
     */
    public static operatorsMap: SortOrder[] = ["ASC", "DESC", "asc", "desc"];

    /**
     * Applies sorting to the results based on the provided sort criteria.
     * @param results - The array of data to sort.
     * @param sortCriteria - The criteria for sorting (key and order).
     * @returns The sorted array of data.
     */
    public static apply(
        results: any[],
        sortCriteria: SortObject | null
    ): any[] {
        if (sortCriteria) {
            return this.sort(results, sortCriteria.key, sortCriteria.order);
        }

        return results;
    }

    /**
     * Sorts the array of data based on the specified key and order.
     * @param array - The array of data to sort.
     * @param key - The key to sort by.
     * @param order - The sort order, default is "asc".
     * @returns The sorted array of data.
     */
    private static sort(array: RowData[], key: string, order: string = "asc") {
        order = order.toLowerCase();

        return array.sort((a, b) => {
            const valueA: any = isNumeric(a[key]) ? Number(a[key]) : a[key];
            const valueB: any = isNumeric(b[key]) ? Number(b[key]) : b[key];

            if (valueA < valueB) {
                return order === "asc" ? -1 : 1;
            }
            if (valueA > valueB) {
                return order === "asc" ? 1 : -1;
            }
            return 0;
        });
    }

    /**
     * Checks if the provided operator is a valid sort order.
     * @param operator - The operator to validate.
     * @returns True if the operator is a valid sort order, otherwise false.
     */
    public static isValidOperator(operator: string): boolean {
        return this.operatorsMap.includes(operator as SortOrder);
    }
}

export default SortingClosure;
