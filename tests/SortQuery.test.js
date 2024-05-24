import { test, expect } from "vitest";
import csvq from "../src/csvq";

const filePath = "tests/files/data.csv";

test("it throws an error, invalid ordering/sorting operation key", async () => {
    const key = "ages";
    const message = `Invalid ordering/sorting operation key: \`${key}\`.`;

    let qb = await csvq.from(filePath);
    expect(() => {
        qb.orderBy(key, "desc");
    }).toThrowError(message);
});

test("it throws an error, invalid ordering/sorting operator", async () => {
    const operator = "<===>";
    const message = `Invalid ordering/sorting operator: \`${operator}\`.`;

    let qb = await csvq.from(filePath);

    expect(() => {
        qb.orderBy("id", operator);
    }).toThrowError(message);
});

test("it throws a error, Multiple ordering/sorting operations are not allowed", async () => {
    const message = "Multiple ordering/sorting operations are not allowed.";

    let qb = await csvq.from(filePath);

    expect(() => {
        qb.orderBy("id", "desc").orderBy("age", "asc");
    }).toThrowError(message);
});

test("it should get results sorted as ascending", async () => {
    let results = await csvq.from(filePath);
    results = results.orderBy("id", "asc").get();

    expect(results[0]["id"]).toBe("1");
    expect(results[0]["name"]).toBe("Allis");
});

test("it should get results sorted as descending", async () => {
    let results = await csvq.from(filePath);
    results = results.orderBy("id", "desc").get();

    expect(results[0]["id"]).toBe("20");
    expect(results[0]["name"]).toBe("Ethan Hernandez");
});

test("it should get results sorted by date as ascending", async () => {
    let results = await csvq.from(filePath);
    results = results.orderBy("dob", "asc").get();

    expect(results[0]["id"]).toBe("3");
    expect(results[0]["name"]).toBe("Sashenka");
});

test("it should get results sorted by date as descending", async () => {
    let results = await csvq.from(filePath);
    results = results.orderBy("dob", "desc").get();

    expect(results[0]["id"]).toBe("9");
    expect(results[0]["name"]).toBe("Ava Wilson");
});

test("it should get column-wise latest results", async () => {
    let results = await csvq.from(filePath);
    results = results.latest().get();

    expect(results[0]["id"]).toBe("20");
    expect(results[0]["name"]).toBe("Ethan Hernandez");
});

test("it should get column-wise oldest results", async () => {
    let results = await csvq.from(filePath);
    results = results.oldest().get();

    expect(results[0]["id"]).toBe("1");
    expect(results[0]["name"]).toBe("Allis");
});
