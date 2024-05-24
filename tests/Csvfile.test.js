import { test, expect } from "vitest";
import csvq from "../src/csvq";

test("it throws an error for invalid file path", () => {
    const filePath = "tests/files/data/non_existent_file.csv";

    expect(async () => {
        await csvq.from(filePath);
    }).rejects.toThrowError("Invalid/unreadable file path: " + filePath);
});

test("it throws an error for invalid file type", () => {
    const filePath = "tests/files/data.json";

    expect(async () => {
        await csvq.from(filePath);
    }).rejects.toThrowError("File type not allowed: json");
});

test("it throws an exception for empty CSV header", () => {
    const filePath = "tests/files/data-empty-header.csv";

    expect(async () => {
        await csvq.from(filePath);
    }).rejects.toThrowError(Error);
});

test("it throws an exception for empty CSV file", () => {
    const filePath = "tests/files/data-empty.csv";

    expect(async () => {
        await csvq.from(filePath);
    }).rejects.toThrowError("No data found in the CSV file.");
});
