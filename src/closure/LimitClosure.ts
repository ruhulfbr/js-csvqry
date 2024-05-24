import { isEmpty } from "../utilitis/helper";
import { LimitObject, RowData } from "../utilitis/Types";

class LimitClosure {
    /**
     * Applies a limit to the results, slicing the array to include only the specified range.
     * @param results - The array of data rows to limit.
     * @param limit - An object containing the limit parameters (length and offset).
     * @returns A new array containing the limited range of rows.
     */
    public static apply(
        results: RowData[],
        limit: LimitObject | null
    ): RowData[] {
        if (limit) {
            let start: number = limit.offset;
            let end: number = start + limit.length;

            return results.slice(start, end);
        }

        return results;
    }
}

export default LimitClosure;
