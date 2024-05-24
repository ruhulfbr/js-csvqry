import SortingClosure from "./closure/SortingClosure";
import WhereClosure from "./closure/WhereClosure";
import LimitClosure from "./closure/LimitClosure";

import { isEmpty, isNumeric, isDateString } from "./utilitis/helper";
import {
    SortObject,
    RowData,
    SortOrder,
    LimitObject,
    WhereObject,
} from "./utilitis/Types";
import SelectClosure from "./closure/SelectClosure";

abstract class builder {
    private _columns: string[] = ["*"];
    private _where: WhereObject[] = [];
    private _or_where: WhereObject[] = [];
    private _order: SortObject | null = null;
    private _limit: LimitObject | null = null;

    private _data: RowData[] = [];
    private _fields: string[] = [];

    /**
     * Initializes the data and fields for the query.
     * @param data - Array of data rows.
     * @param fields - Array of field names.
     */
    protected init(data: RowData[], fields: string[]) {
        this._data = data;
        this._fields = fields;
    }

    /**
     * Returns all data rows, optionally sorted.
     * @returns An array of all data rows.
     */
    public all(): RowData[] {
        return SortingClosure.apply(this._data, this._order);
    }

    /**
     * Applies query filters and returns the filtered data rows.
     * @returns An array of filtered data rows.
     */
    public get(): RowData[] {
        if (isEmpty(this._data)) {
            return [];
        }

        let results = WhereClosure.apply(
            this._data,
            this._where,
            this._or_where
        );
        results = SortingClosure.apply(results, this._order);
        results = LimitClosure.apply(results, this._limit);
        results = SelectClosure.apply(results, this._columns);

        return results;
    }

    /**
     * Returns the first row of the filtered data.
     * @returns The first row of the filtered data.
     */
    public row(): RowData {
        return this.first();
    }

    /**
     * Returns the first row of the filtered data.
     * @returns The first row of the filtered data.
     */
    public first(): RowData {
        return this.get()[0];
    }

    /**
     * Returns the last row of the filtered data.
     * @returns The last row of the filtered data.
     */
    public last(): RowData {
        let results: RowData[] = this.get();
        return results[results.length - 1];
    }

    /**
     * Returns the nth row of the filtered data.
     * @param index - The index of the row to retrieve.
     * @returns The nth row of the filtered data or false if index is out of range.
     */
    public nth(index: number): RowData | boolean {
        let results: RowData[] = this.get();

        return results[index] ?? false;
    }

    /**
     * Checks if the query result has any data.
     * @returns True if data exists, false otherwise.
     */
    public hasData(): boolean {
        return this.get().length > 0;
    }

    /**
     * Alias for hasData method.
     * @returns True if data exists, false otherwise.
     */
    public exist(): boolean {
        return this.get().length > 0;
    }

    /**
     * Returns the count of rows in the filtered data.
     * @returns The number of rows in the filtered data.
     */
    public count(): number {
        return this.get().length;
    }

    /**
     * Calculates the sum of the values in the specified column.
     * @param column - The column to sum.
     * @returns The sum of the values in the column.
     * @throws Will throw an error if the column is invalid.
     */
    public sum(column: string): number {
        if (!this.isValidColumn(column) || !this.isValidAggColumn(column)) {
            throw new Error(`Unsupported Aggregate Columns: \`${column}\`.`);
        }

        const results = this.get();
        let sum = 0;

        if (results.length > 0) {
            for (const row of results) {
                if (
                    row[column] !== undefined &&
                    row[column] !== null &&
                    isNumeric(row[column])
                ) {
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
    public avg(column: string): number {
        if (!this.isValidColumn(column) || !this.isValidAggColumn(column)) {
            throw new Error(`Unsupported Aggregate Columns: \`${column}\`.`);
        }

        const results = this.get();
        let avg = 0;

        if (results.length > 0) {
            let sum = 0;
            for (const row of results) {
                if (
                    row[column] !== undefined &&
                    row[column] !== null &&
                    isNumeric(row[column])
                ) {
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
    public min(column: string): RowData {
        if (!this.isValidColumn(column) || !this.isValidAggColumn(column)) {
            throw new Error(`Unsupported Aggregate Columns: \`${column}\`.`);
        }

        const results = this.get();
        if (results.length === 0) {
            return {};
        }

        const values = results
            .map((row) => (isNumeric(row[column]) ? row[column] : null))
            .filter((value) => value !== undefined && value !== null);

        if (values.length > 0) {
            const minValue = Math.min(...values.map((value) => Number(value)));
            const minIndex = values.findIndex(
                (value) => Number(value) === minValue
            );
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
    public max(column: string): RowData {
        if (!this.isValidColumn(column) || !this.isValidAggColumn(column)) {
            throw new Error(`Unsupported Aggregate Columns: \`${column}\`.`);
        }

        const results = this.get();
        if (results.length === 0) {
            return {};
        }

        const values = results
            .map((row) => (isNumeric(row[column]) ? row[column] : null))
            .filter((value) => value !== undefined && value !== null);

        if (values.length > 0) {
            const maxValue = Math.max(...values.map((value) => Number(value)));
            const maxIndex = values.findIndex(
                (value) => Number(value) === maxValue
            );
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
    public select(...columns: any[]): this {
        this._columns = [];
        if (Array.isArray(columns[0])) {
            columns = columns[0];
        }

        for (const column of columns) {
            if (column === "*") {
                this._columns = ["*"];
                break;
            } else if (!this.isValidColumn(column)) {
                throw new Error(
                    `Unsupported column for SELECT: \`${column}\`.`
                );
            } else {
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
    public where(column: string, operator: any, value: any = null): this {
        this._where.push(
            this.prepareWhereOperatorAndValue(column, operator, value)
        );
        return this;
    }

    /**
     * Adds an OR WHERE clause to the query.
     * @param column - The column to filter.
     * @param operator - The operator to use for comparison.
     * @param value - The value to compare against.
     * @returns The current instance for method chaining.
     */
    public orWhere(column: string, operator: any, value: any = null): this {
        this._or_where.push(
            this.prepareWhereOperatorAndValue(column, operator, value)
        );
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
    public whereDate(
        column: string,
        operator: string,
        value: string | null = null
    ): this {
        if (value === undefined || value === null) {
            value = operator;
            operator = "=";
        }

        if (!isDateString(value)) {
            throw new Error(
                "Invalid date string, please provide a valid date. like: 2020-01-25"
            );
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
    public whereLike(
        column: string,
        value: string | number,
        operator: string = "both"
    ): this {
        operator = "like_" + operator;
        return this.where(column, operator, value);
    }

    /**
     * Adds a WHERE IN clause to the query.
     * @param column - The column to filter.
     * @param value - The array of values to compare against.
     * @returns The current instance for method chaining.
     */
    public whereIn(column: string, value: (string | number)[]): this {
        return this.where(column, "IN_ARRAY", value);
    }

    /**
     * Adds a WHERE NOT IN clause to the query.
     * @param column - The column to filter.
     * @param value - The array of values to compare against.
     * @returns The current instance for method chaining.
     */
    public whereNotIn(column: string, value: (string | number)[]): this {
        return this.where(column, "NOT_IN_ARRAY", value);
    }

    /**
     * Adds an ORDER BY clause to the query.
     * @param column - The column to order by.
     * @param operator - The sort order (ASC or DESC).
     * @returns The current instance for method chaining.
     * @throws Will throw an error if the column or operator is invalid, or if multiple orderings are applied.
     */
    public orderBy(column: string, operator: SortOrder = "DESC"): this {
        if (!this.isValidColumn(column)) {
            throw new Error(
                `Invalid ordering/sorting operation key: \`${column}\`.`
            );
        }

        if (!SortingClosure.isValidOperator(operator)) {
            throw new Error(
                `Invalid ordering/sorting operator: \`${operator}\`.`
            );
        }

        if (this._order !== null) {
            throw new Error(
                "Multiple orerMultiple ordering/sorting operations are not allowed."
            );
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
    public latest(column: string = "id"): this {
        return this.orderBy(column, "desc");
    }

    /**
     * Adds an ORDER BY ASC clause to the query, defaulting to the 'id' column.
     * @param column - The column to order by.
     * @returns The current instance for method chaining.
     */
    public oldest(column: string = "id"): this {
        return this.orderBy(column, "asc");
    }

    /**
     * Adds a LIMIT clause to the query.
     * @param limit - The maximum number of rows to return.
     * @param offset - The number of rows to skip before starting to return rows.
     * @returns The current instance for method chaining.
     */
    public limit(limit: number, offset: number = 0): this {
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
    private prepareWhereOperatorAndValue(
        column: string,
        operator: any,
        value: any = null
    ): WhereObject {
        if (value === null) {
            value = operator;
            operator = "=";
        }

        if (!this.isValidColumn(column)) {
            throw new Error(
                `Unsupported key for WHERE operation: \`${column}\`.`
            );
        }

        if (!WhereClosure.isValidOperator(operator)) {
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
    private isValidColumn(column: string): boolean {
        if (
            !this._fields ||
            this._fields.length === 0 ||
            !this._fields.includes(column)
        ) {
            return false;
        }

        return true;
    }

    /**
     * Validates if a column can be used for aggregation.
     * @param column - The column to validate.
     * @returns True if the column is valid for aggregation, false otherwise.
     */
    private isValidAggColumn(column: string): boolean {
        if (this._columns.includes("*") || this._columns.includes(column)) {
            return true;
        }

        return false;
    }
}

export default builder;
