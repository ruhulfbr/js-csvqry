"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SelectClosure {
    /**
     * Filters the data to include only the specified columns.
     * @param data - The array of data rows to filter.
     * @param columns - The columns to retain in each row. If "*" is included, all columns are retained.
     * @returns A new array of data rows with only the specified columns.
     */
    static apply(data, columns) {
        if (columns.includes("*")) {
            return data;
        }
        if (data.length > 0) {
            return data.map((item) => {
                return columns.reduce((filteredItem, column) => {
                    if (column in item) {
                        filteredItem[column] = item[column];
                    }
                    return filteredItem;
                }, {});
            });
        }
        return data;
    }
}
exports.default = SelectClosure;
