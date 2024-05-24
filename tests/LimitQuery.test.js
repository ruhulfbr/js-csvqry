import { test, expect } from "vitest";
import csvq from "../src/csvq";

const filePath = "tests/files/data.csv";

test("it should get 3 results with limit", async () => {
    let results = await csvq.from(filePath);
    results = results.limit(3).get();
    expect(results.length).toBe(3);
});

test("it should get 2 results with limit and offset", async () => {
    let results = await csvq.from(filePath);
    results = results.limit(2, 1).get();
    expect(results.length).toBe(2);
});

test("it should get 0 results with high limit and offset", async () => {
    let results = await csvq.from(filePath);
    results = results.limit(200, 100).get();
    expect(results.length).toBe(0);
});
