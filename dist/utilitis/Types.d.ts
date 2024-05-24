export type SortOrder = "ASC" | "DESC" | "asc" | "desc";
export type SortFormat = "Y-m-d" | string;
export interface WhereObject {
    column: string;
    operator: string;
    value: any;
    date_format?: string;
}
export interface SortObject {
    key: string;
    order: SortOrder;
}
export interface LimitObject {
    offset: number;
    length: number;
}
export interface RowData {
    [key: string]: string;
}
