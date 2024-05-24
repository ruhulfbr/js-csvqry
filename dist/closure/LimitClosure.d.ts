import { LimitObject, RowData } from "../utilitis/Types";
declare class LimitClosure {
    /**
     * Applies a limit to the results, slicing the array to include only the specified range.
     * @param results - The array of data rows to limit.
     * @param limit - An object containing the limit parameters (length and offset).
     * @returns A new array containing the limited range of rows.
     */
    static apply(results: RowData[], limit: LimitObject | null): RowData[];
}
export default LimitClosure;
