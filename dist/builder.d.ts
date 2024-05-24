import { RowData, SortOrder } from "./utilitis/Types";
declare abstract class builder {
    private _columns;
    private _where;
    private _or_where;
    private _order;
    private _limit;
    private _data;
    private _fields;
    /**
     * Initializes the data and fields for the query.
     * @param data - Array of data rows.
     * @param fields - Array of field names.
     */
    protected init(data: RowData[], fields: string[]): void;
    /**
     * Returns all data rows, optionally sorted.
     * @returns An array of all data rows.
     */
    all(): RowData[];
    /**
     * Applies query filters and returns the filtered data rows.
     * @returns An array of filtered data rows.
     */
    get(): RowData[];
    /**
     * Returns the first row of the filtered data.
     * @returns The first row of the filtered data.
     */
    row(): RowData;
    /**
     * Returns the first row of the filtered data.
     * @returns The first row of the filtered data.
     */
    first(): RowData;
    /**
     * Returns the last row of the filtered data.
     * @returns The last row of the filtered data.
     */
    last(): RowData;
    /**
     * Returns the nth row of the filtered data.
     * @param index - The index of the row to retrieve.
     * @returns The nth row of the filtered data or false if index is out of range.
     */
    nth(index: number): RowData | boolean;
    /**
     * Checks if the query result has any data.
     * @returns True if data exists, false otherwise.
     */
    hasData(): boolean;
    /**
     * Alias for hasData method.
     * @returns True if data exists, false otherwise.
     */
    exist(): boolean;
    /**
     * Returns the count of rows in the filtered data.
     * @returns The number of rows in the filtered data.
     */
    count(): number;
    /**
     * Calculates the sum of the values in the specified column.
     * @param column - The column to sum.
     * @returns The sum of the values in the column.
     * @throws Will throw an error if the column is invalid.
     */
    sum(column: string): number;
    /**
     * Calculates the average of the values in the specified column.
     * @param column - The column to average.
     * @returns The average of the values in the column.
     * @throws Will throw an error if the column is invalid.
     */
    avg(column: string): number;
    /**
     * Finds the row with the minimum value in the specified column.
     * @param column - The column to find the minimum value.
     * @returns The row with the minimum value in the column.
     * @throws Will throw an error if the column is invalid.
     */
    min(column: string): RowData;
    /**
     * Finds the row with the maximum value in the specified column.
     * @param column - The column to find the maximum value.
     * @returns The row with the maximum value in the column.
     * @throws Will throw an error if the column is invalid.
     */
    max(column: string): RowData;
    /** ================ Apply Closures ===================== */
    /**
     * Selects specific columns for the query.
     * @param columns - The columns to select. Can be passed as individual arguments or as an array.
     * @returns The current instance for method chaining.
     * @throws Will throw an error if an invalid column is provided.
     */
    select(...columns: any[]): this;
    /**
     * Adds a WHERE clause to the query.
     * @param column - The column to filter.
     * @param operator - The operator to use for comparison.
     * @param value - The value to compare against.
     * @returns The current instance for method chaining.
     */
    where(column: string, operator: any, value?: any): this;
    /**
     * Adds an OR WHERE clause to the query.
     * @param column - The column to filter.
     * @param operator - The operator to use for comparison.
     * @param value - The value to compare against.
     * @returns The current instance for method chaining.
     */
    orWhere(column: string, operator: any, value?: any): this;
    /**
     * Adds a WHERE clause for date comparison to the query.
     * @param column - The column to filter.
     * @param operator - The operator to use for comparison.
     * @param value - The date value to compare against.
     * @returns The current instance for method chaining.
     * @throws Will throw an error if the date string is invalid.
     */
    whereDate(column: string, operator: string, value?: string | null): this;
    /**
     * Adds a WHERE LIKE clause to the query.
     * @param column - The column to filter.
     * @param value - The value to compare using LIKE.
     * @param operator - The type of LIKE operation (both, left, right).
     * @returns The current instance for method chaining.
     */
    whereLike(column: string, value: string | number, operator?: string): this;
    /**
     * Adds a WHERE IN clause to the query.
     * @param column - The column to filter.
     * @param value - The array of values to compare against.
     * @returns The current instance for method chaining.
     */
    whereIn(column: string, value: (string | number)[]): this;
    /**
     * Adds a WHERE NOT IN clause to the query.
     * @param column - The column to filter.
     * @param value - The array of values to compare against.
     * @returns The current instance for method chaining.
     */
    whereNotIn(column: string, value: (string | number)[]): this;
    /**
     * Adds an ORDER BY clause to the query.
     * @param column - The column to order by.
     * @param operator - The sort order (ASC or DESC).
     * @returns The current instance for method chaining.
     * @throws Will throw an error if the column or operator is invalid, or if multiple orderings are applied.
     */
    orderBy(column: string, operator?: SortOrder): this;
    /**
     * Adds an ORDER BY DESC clause to the query, defaulting to the 'id' column.
     * @param column - The column to order by.
     * @returns The current instance for method chaining.
     */
    latest(column?: string): this;
    /**
     * Adds an ORDER BY ASC clause to the query, defaulting to the 'id' column.
     * @param column - The column to order by.
     * @returns The current instance for method chaining.
     */
    oldest(column?: string): this;
    /**
     * Adds a LIMIT clause to the query.
     * @param limit - The maximum number of rows to return.
     * @param offset - The number of rows to skip before starting to return rows.
     * @returns The current instance for method chaining.
     */
    limit(limit: number, offset?: number): this;
    /** ================ Private Methods ===================== */
    /**
     * Prepares the WHERE clause parameters.
     * @param column - The column to filter.
     * @param operator - The operator to use for comparison.
     * @param value - The value to compare against.
     * @returns A WhereObject containing the column, operator, and value.
     * @throws Will throw an error if the column or operator is invalid.
     */
    private prepareWhereOperatorAndValue;
    /**
     * Validates if a column exists in the fields array.
     * @param column - The column to validate.
     * @returns True if the column is valid, false otherwise.
     */
    private isValidColumn;
    /**
     * Validates if a column can be used for aggregation.
     * @param column - The column to validate.
     * @returns True if the column is valid for aggregation, false otherwise.
     */
    private isValidAggColumn;
}
export default builder;
