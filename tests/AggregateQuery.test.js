import { test, expect } from "vitest";
import csvq from "../src/csvq";

const filePath = "tests/files/data.csv";

test("it throws an exception for invalid aggregate column", async () => {
    let column = "ages";
    let message = `Unsupported Aggregate Columns: \`${column}\`.`;

    let qb = await csvq.from(filePath);

    expect(() => {
        qb.min(column);
    }).toThrowError(message);
});

test("it should return the count of the result", async () => {
    let qb = await csvq.from(filePath);

    expect(qb.count()).toBe(20);
});

test("it should return the count of the result with where condition", async () => {
    const qb = await csvq.from(filePath);
    let total = qb.whereIn("id", [1, 2, 3]).count();
    expect(total).toBe(3);
});

test("it should return the sum of age", async () => {
    const qb = await csvq.from(filePath);
    let sum = qb.whereIn("id", [1, 2, 3]).sum("age");
    expect(sum).toBe(109);
});

test("it should return the average of age", async () => {
    const qb = await csvq.from(filePath);
    let avg = qb.whereIn("id", [1, 2, 3]).avg("age");

    expect(parseInt(avg)).toBe(36);
});

test("it should return the result with minimum age", async () => {
    const qb = await csvq.from(filePath);
    const result = qb.whereIn("id", [1, 2, 3]).min("age");
    expect(result.id).toBe("1");
});

test("it should return the result with maximum age", async () => {
    const qb = await csvq.from(filePath);
    const result = qb.whereIn("id", [1, 2, 3]).max("age");
    expect(result.id).toBe("3");
});
