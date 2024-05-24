import fs from "fs";
import { promisify } from "util";
import { RowData } from "./utilitis/Types";
import builder from "./builder";

const readFile = promisify(fs.readFile);
const { parse } = require("csv-parse");

class CsvQ extends builder {
    // Array to store CSV headers
    private _headers: string[] = [];

    // Array to store CSV row data
    private _rows: RowData[] = [];

    /**
     * Static method to create and initialize a csvq instance from a file path.
     * @param filePath - The path to the CSV file.
     * @returns A Promise that resolves to an instance of csvq.
     */

    public static async from(filePath: string): Promise<CsvQ> {
        const instance = new CsvQ();
        await instance.initialize(filePath);

        instance.checkHasData();

        // Set data array & field in parent class
        instance.init(instance._rows, instance._headers);

        return instance;
    }

    /**
     * Initializes the csvq instance with data from the specified CSV file.
     * @param filePath - The path to the CSV file.
     * @returns A Promise that resolves when initialization is complete.
     */
    private async initialize(filePath: string): Promise<void> {
        this.validateFile(filePath);

        const fileContent = await readFile(filePath, "utf8");
        await this.parseCsv(fileContent);
    }

    /**
     * Parses the CSV file content and populates the headers and rows.
     * @param fileContent - The content of the CSV file as a string.
     * @returns A Promise that resolves when parsing is complete.
     */
    private async parseCsv(fileContent: string): Promise<void> {
        return new Promise((resolve, reject) => {
            parse(
                fileContent,
                { delimiter: ",", from_line: 1 },
                (err: any, rows: string[][]) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    rows.forEach((row: string[], index: number) => {
                        if (index === 0) {
                            this._headers = row;
                        } else {
                            const rowData: RowData = {};
                            for (let i = 0; i < this._headers.length; i++) {
                                rowData[this._headers[i]] = row[i];
                            }
                            this._rows.push(rowData);
                        }
                    });

                    resolve();
                }
            );
        });
    }

    /**
     * Validates the file path for the CSV file.
     * @param filePath - The path to the CSV file.
     * @throws Will throw an error if the file path is invalid, if the file is not a CSV, or if the file is unreadable.
     */
    private validateFile(filePath: string): void {
        if (!filePath || !filePath.trim()) {
            throw new Error("Invalid file path");
        }

        const extension = filePath.split(".").pop() || "";
        if (extension.toLowerCase() !== "csv") {
            throw new Error(`File type not allowed: ${extension}`);
        }

        if (!this.validateFilePath(filePath)) {
            throw new Error("Invalid/unreadable file path: " + filePath);
        }
    }

    /**
     * Checks if the CSV file has data.
     * Ensures that the file has at least headers or rows.
     * @throws Will throw an error if no data is found or if headers are missing.
     */
    private checkHasData(): void {
        if (this._headers.length === 0 && this._rows.length === 0) {
            throw new Error(`No data found in the CSV file.`);
        }

        if (this._headers.length === 0) {
            throw new Error(
                `CSV header is empty, the first row is considered as header/columns`
            );
        }
    }

    /**
     * Validates the file path accessibility.
     * Checks if the file exists and is readable.
     * @param filePath - The path of the file to check.
     * @returns True if the file is accessible and readable, false otherwise.
     */
    private validateFilePath(filePath: string): boolean {
        try {
            fs.accessSync(filePath, fs.constants.F_OK);
            fs.accessSync(filePath, fs.constants.R_OK);
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = CsvQ;
