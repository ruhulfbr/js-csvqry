"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LimitClosure {
    /**
     * Applies a limit to the results, slicing the array to include only the specified range.
     * @param results - The array of data rows to limit.
     * @param limit - An object containing the limit parameters (length and offset).
     * @returns A new array containing the limited range of rows.
     */
    static apply(results, limit) {
        if (limit) {
            let start = limit.offset;
            let end = start + limit.length;
            return results.slice(start, end);
        }
        return results;
    }
}
exports.default = LimitClosure;
//# sourceMappingURL=LimitClosure.js.map