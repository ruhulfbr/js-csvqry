"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class csvq {
    constructor(filePath) {
        this._fields = [];
        this._data = [];
        this._filePath = filePath;
        this.extractCSVData();
        this.checkHasData();
    }
    static from(filePath) {
        return new csvq(filePath);
    }
    get() {
        return this._data;
    }
    extractCSVData() {
        this.validateFile();
        const fileContent = (0, fs_1.readFileSync)(this._filePath, 'utf-8');
        const rows = fileContent.split('\n');
        const headers = rows[0].trim().split(',');
        this._fields = headers;
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].trim().split(',');
            if (row.length !== headers.length) {
                throw new Error(`Invalid row data at line ${i + 1} in file ${this._filePath}`);
            }
            const rowData = {};
            for (let j = 0; j < headers.length; j++) {
                rowData[headers[j]] = row[j];
            }
            this._data.push(rowData);
        }
    }
    validateFile() {
        if (!this._filePath || !this._filePath.trim()) {
            throw new Error('Invalid file path');
        }
        const extension = this.getFileExtension(this._filePath);
        if (extension.toLowerCase() !== 'csv') {
            throw new Error(`File type not allowed: ${extension}`);
        }
    }
    getFileExtension(filePath) {
        return filePath.split('.').pop() || '';
    }
    checkHasData() {
        if (this._fields.length === 0 && this._data.length === 0) {
            throw new Error(`No data found in the CSV file: ${this._filePath}`);
        }
        if (this._fields.length === 0) {
            throw new Error(`CSV header is empty, the first row is considered as header/columns: ${this._filePath}`);
        }
    }
}
try {
    let sona = new csvq("example.csv");
    console.log(sona.get());
}
catch (e) {
    console.log(e);
}
