"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../utilitis/helper");
class SortingClosure {
    /**
     * Applies sorting to the results based on the provided sort criteria.
     * @param results - The array of data to sort.
     * @param sortCriteria - The criteria for sorting (key and order).
     * @returns The sorted array of data.
     */
    static apply(results, sortCriteria) {
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
    static sort(array, key, order = "asc") {
        order = order.toLowerCase();
        return array.sort((a, b) => {
            const valueA = (0, helper_1.isNumeric)(a[key]) ? Number(a[key]) : a[key];
            const valueB = (0, helper_1.isNumeric)(b[key]) ? Number(b[key]) : b[key];
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
    static isValidOperator(operator) {
        return this.operatorsMap.includes(operator);
    }
}
/**
 * Enumerates valid sort orders for sorting operations.
 */
SortingClosure.operatorsMap = ["ASC", "DESC", "asc", "desc"];
exports.default = SortingClosure;
