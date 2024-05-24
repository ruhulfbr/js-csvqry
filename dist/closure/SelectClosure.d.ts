import { RowData } from "../utilitis/Types";
declare class SelectClosure {
    /**
     * Filters the data to include only the specified columns.
     * @param data - The array of data rows to filter.
     * @param columns - The columns to retain in each row. If "*" is included, all columns are retained.
     * @returns A new array of data rows with only the specified columns.
     */
    static apply(data: RowData[], columns: string[]): RowData[];
}
export default SelectClosure;
