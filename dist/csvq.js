"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const builder_1 = __importDefault(require("./builder"));
const readFile = (0, util_1.promisify)(fs_1.default.readFile);
const { parse } = require("csv-parse");
class csvq extends builder_1.default {
    constructor() {
        super(...arguments);
        // Array to store CSV headers
        this._headers = [];
        // Array to store CSV row data
        this._rows = [];
    }
    /**
     * Static method to create and initialize a csvq instance from a file path.
     * @param filePath - The path to the CSV file.
     * @returns A Promise that resolves to an instance of csvq.
     */
    static async from(filePath) {
        const instance = new csvq();
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
    async initialize(filePath) {
        this.validateFile(filePath);
        const fileContent = await readFile(filePath, "utf8");
        await this.parseCsv(fileContent);
    }
    /**
     * Parses the CSV file content and populates the headers and rows.
     * @param fileContent - The content of the CSV file as a string.
     * @returns A Promise that resolves when parsing is complete.
     */
    async parseCsv(fileContent) {
        return new Promise((resolve, reject) => {
            parse(
                fileContent,
                { delimiter: ",", from_line: 1 },
                (err, rows) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    rows.forEach((row, index) => {
                        if (index === 0) {
                            this._headers = row;
                        } else {
                            const rowData = {};
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
    validateFile(filePath) {
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
    checkHasData() {
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
    validateFilePath(filePath) {
        try {
            fs_1.default.accessSync(filePath, fs_1.default.constants.F_OK);
            fs_1.default.accessSync(filePath, fs_1.default.constants.R_OK);
            return true;
        } catch (error) {
            return false;
        }
    }
}
exports.default = csvq;
