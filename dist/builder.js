"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SortingClosure_1 = __importDefault(require("./closure/SortingClosure"));
const WhereClosure_1 = __importDefault(require("./closure/WhereClosure"));
const LimitClosure_1 = __importDefault(require("./closure/LimitClosure"));
const helper_1 = require("./utilitis/helper");
const SelectClosure_1 = __importDefault(require("./closure/SelectClosure"));
class builder {
    constructor() {
        this._columns = ["*"];
        this._where = [];
        this._or_where = [];
        this._order = null;
        this._limit = null;
        this._data = [];
        this._fields = [];
    }
    /**
     * Initializes the data and fields for the query.
     * @param data - Array of data rows.
     * @param fields - Array of field names.
     */
    init(data, fields) {
        this._data = data;
        this._fields = fields;
    }
    /**
     * Returns all data rows, optionally sorted.
     * @returns An array of all data rows.
     */
    all() {
        return SortingClosure_1.default.apply(this._data, this._order);
    }
    /**
     * Applies query filters and returns the filtered data rows.
     * @returns An array of filtered data rows.
     */
    get() {
        if ((0, helper_1.isEmpty)(this._data)) {
            return [];
        }
        let results = WhereClosure_1.default.apply(this._data, this._where, this._or_where);
        results = SortingClosure_1.default.apply(results, this._order);
        results = LimitClosure_1.default.apply(results, this._limit);
        results = SelectClosure_1.default.apply(results, this._columns);
        return results;
    }
    /**
     * Returns the first row of the filtered data.
     * @returns The first row of the filtered data.
     */
    row() {
        return this.first();
    }
    /**
     * Returns the first row of the filtered data.
     * @returns The first row of the filtered data.
     */
    first() {
        return this.get()[0];
    }
    /**
     * Returns the last row of the filtered data.
     * @returns The last row of the filtered data.
     */
    last() {
        let results = this.get();
        return results[results.length - 1];
    }
    /**
     * Returns the nth row of the filtered data.
     * @param index - The index of the row to retrieve.
     * @returns The nth row of the filtered data or false if index is out of range.
     */
    nth(index) {
        var _a;
        let results = this.get();
        return (_a = results[index]) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * Checks if the query result has any data.
     * @returns True if data exists, false otherwise.
     */
    hasData() {
        return this.get().length > 0;
    }
    /**
     * Alias for hasData method.
     * @returns True if data exists, false otherwise.
     */
    exist() {
        return this.get().length > 0;
    }
    /**
     * Returns the count of rows in the filtered data.
     * @returns The number of rows in the filtered data.
     */
    count() {
        return this.get().length;
    }
    /**
     * Calculates the sum of the values in the specified column.
     * @param column - The column to sum.
     * @returns The sum of the values in the column.
     * @throws Will throw an error if the column is invalid.
     */
    sum(column) {
        if (!this.isValidColumn(column) || !this.isValidAggColumn(column)) {
            throw new Error(`Unsupported Aggregate Columns: \`${column}\`.`);
        }
        const results = this.get();
        let sum = 0;
        if (results.length > 0) {
            for (const row of results) {
                if (row[column] !== undefined &&
                    row[column] !== null &&
                    (0, helper_1.isNumeric)(row[column])) {
                    sum += Number(row[column]);
                }
            }
        }
        return sum;
    }
    /**
     * Calculates the average of the values in the specified column.
     * @param column - The column to average.
     * @returns The average of the values in the column.
     * @throws Will throw an error if the column is invalid.
     */
    avg(column) {
        if (!this.isValidColumn(column) || !this.isValidAggColumn(column)) {
            throw new Error(`Unsupported Aggregate Columns: \`${column}\`.`);
        }
        const results = this.get();
        let avg = 0;
        if (results.length > 0) {
            let sum = 0;
            for (const row of results) {
                if (row[column] !== undefined &&
                    row[column] !== null &&
                    (0, helper_1.isNumeric)(row[column])) {
                    sum += Number(row[column]);
                }
            }
            avg = sum > 0 ? sum / results.length : 0;
        }
        return avg;
    }
    /**
     * Finds the row with the minimum value in the specified column.
     * @param column - The column to find the minimum value.
     * @returns The row with the minimum value in the column.
     * @throws Will throw an error if the column is invalid.
     */
    min(column) {
        if (!this.isValidColumn(column) || !this.isValidAggColumn(column)) {
            throw new Error(`Unsupported Aggregate Columns: \`${column}\`.`);
        }
        const results = this.get();
        if (results.length === 0) {
            return {};
        }
        const values = results
            .map((row) => ((0, helper_1.isNumeric)(row[column]) ? row[column] : null))
            .filter((value) => value !== undefined && value !== null);
        if (values.length > 0) {
            const minValue = Math.min(...values.map((value) => Number(value)));
            const minIndex = values.findIndex((value) => Number(value) === minValue);
            return results[minIndex];
        }
        return {};
    }
    /**
     * Finds the row with the maximum value in the specified column.
     * @param column - The column to find the maximum value.
     * @returns The row with the maximum value in the column.
     * @throws Will throw an error if the column is invalid.
     */
    max(column) {
        if (!this.isValidColumn(column) || !this.isValidAggColumn(column)) {
            throw new Error(`Unsupported Aggregate Columns: \`${column}\`.`);
        }
        const results = this.get();
        if (results.length === 0) {
            return {};
        }
        const values = results
            .map((row) => ((0, helper_1.isNumeric)(row[column]) ? row[column] : null))
            .filter((value) => value !== undefined && value !== null);
        if (values.length > 0) {
            const maxValue = Math.max(...values.map((value) => Number(value)));
            const maxIndex = values.findIndex((value) => Number(value) === maxValue);
            return results[maxIndex];
        }
        return {};
    }
    /** ================ Apply Closures ===================== */
    /**
     * Selects specific columns for the query.
     * @param columns - The columns to select. Can be passed as individual arguments or as an array.
     * @returns The current instance for method chaining.
     * @throws Will throw an error if an invalid column is provided.
     */
    select(...columns) {
        this._columns = [];
        if (Array.isArray(columns[0])) {
            columns = columns[0];
        }
        for (const column of columns) {
            if (column === "*") {
                this._columns = ["*"];
                break;
            }
            else if (!this.isValidColumn(column)) {
                throw new Error(`Unsupported column for SELECT: \`${column}\`.`);
            }
            else {
                this._columns.push(column);
            }
        }
        this._columns = [...new Set(this._columns)];
        return this;
    }
    /**
     * Adds a WHERE clause to the query.
     * @param column - The column to filter.
     * @param operator - The operator to use for comparison.
     * @param value - The value to compare against.
     * @returns The current instance for method chaining.
     */
    where(column, operator, value = null) {
        this._where.push(this.prepareWhereOperatorAndValue(column, operator, value));
        return this;
    }
    /**
     * Adds an OR WHERE clause to the query.
     * @param column - The column to filter.
     * @param operator - The operator to use for comparison.
     * @param value - The value to compare against.
     * @returns The current instance for method chaining.
     */
    orWhere(column, operator, value = null) {
        this._or_where.push(this.prepareWhereOperatorAndValue(column, operator, value));
        return this;
    }
    /**
     * Adds a WHERE clause for date comparison to the query.
     * @param column - The column to filter.
     * @param operator - The operator to use for comparison.
     * @param value - The date value to compare against.
     * @returns The current instance for method chaining.
     * @throws Will throw an error if the date string is invalid.
     */
    whereDate(column, operator, value = null) {
        if (value === undefined || value === null) {
            value = operator;
            operator = "=";
        }
        if (!(0, helper_1.isDateString)(value)) {
            throw new Error("Invalid date string, please provide a valid date. like: 2020-01-25");
        }
        const formattedValue = new Date(value).toISOString().substring(0, 10);
        return this.where(column, `${operator}_DATE`, formattedValue);
    }
    /**
     * Adds a WHERE LIKE clause to the query.
     * @param column - The column to filter.
     * @param value - The value to compare using LIKE.
     * @param operator - The type of LIKE operation (both, left, right).
     * @returns The current instance for method chaining.
     */
    whereLike(column, value, operator = "both") {
        operator = "like_" + operator;
        return this.where(column, operator, value);
    }
    /**
     * Adds a WHERE IN clause to the query.
     * @param column - The column to filter.
     * @param value - The array of values to compare against.
     * @returns The current instance for method chaining.
     */
    whereIn(column, value) {
        return this.where(column, "IN_ARRAY", value);
    }
    /**
     * Adds a WHERE NOT IN clause to the query.
     * @param column - The column to filter.
     * @param value - The array of values to compare against.
     * @returns The current instance for method chaining.
     */
    whereNotIn(column, value) {
        return this.where(column, "NOT_IN_ARRAY", value);
    }
    /**
     * Adds an ORDER BY clause to the query.
     * @param column - The column to order by.
     * @param operator - The sort order (ASC or DESC).
     * @returns The current instance for method chaining.
     * @throws Will throw an error if the column or operator is invalid, or if multiple orderings are applied.
     */
    orderBy(column, operator = "DESC") {
        if (!this.isValidColumn(column)) {
            throw new Error(`Invalid ordering/sorting operation key: \`${column}\`.`);
        }
        if (!SortingClosure_1.default.isValidOperator(operator)) {
            throw new Error(`Invalid ordering/sorting operator: \`${operator}\`.`);
        }
        if (this._order !== null) {
            throw new Error("Multiple orerMultiple ordering/sorting operations are not allowed.");
        }
        this._order = {
            key: column,
            order: operator,
        };
        return this;
    }
    /**
     * Adds an ORDER BY DESC clause to the query, defaulting to the 'id' column.
     * @param column - The column to order by.
     * @returns The current instance for method chaining.
     */
    latest(column = "id") {
        return this.orderBy(column, "desc");
    }
    /**
     * Adds an ORDER BY ASC clause to the query, defaulting to the 'id' column.
     * @param column - The column to order by.
     * @returns The current instance for method chaining.
     */
    oldest(column = "id") {
        return this.orderBy(column, "asc");
    }
    /**
     * Adds a LIMIT clause to the query.
     * @param limit - The maximum number of rows to return.
     * @param offset - The number of rows to skip before starting to return rows.
     * @returns The current instance for method chaining.
     */
    limit(limit, offset = 0) {
        this._limit = {
            length: limit,
            offset: offset,
        };
        return this;
    }
    /** ================ Private Methods ===================== */
    /**
     * Prepares the WHERE clause parameters.
     * @param column - The column to filter.
     * @param operator - The operator to use for comparison.
     * @param value - The value to compare against.
     * @returns A WhereObject containing the column, operator, and value.
     * @throws Will throw an error if the column or operator is invalid.
     */
    prepareWhereOperatorAndValue(column, operator, value = null) {
        if (value === null) {
            value = operator;
            operator = "=";
        }
        if (!this.isValidColumn(column)) {
            throw new Error(`Unsupported key for WHERE operation: \`${column}\`.`);
        }
        if (!WhereClosure_1.default.isValidOperator(operator)) {
            throw new Error(`Unsupported operator: ${operator}`);
        }
        return {
            column: column,
            operator: operator,
            value: value,
        };
    }
    /**
     * Validates if a column exists in the fields array.
     * @param column - The column to validate.
     * @returns True if the column is valid, false otherwise.
     */
    isValidColumn(column) {
        if (!this._fields ||
            this._fields.length === 0 ||
            !this._fields.includes(column)) {
            return false;
        }
        return true;
    }
    /**
     * Validates if a column can be used for aggregation.
     * @param column - The column to validate.
     * @returns True if the column is valid for aggregation, false otherwise.
     */
    isValidAggColumn(column) {
        if (this._columns.includes("*") || this._columns.includes(column)) {
            return true;
        }
        return false;
    }
}
exports.default = builder;
//# sourceMappingURL=builder.js.map