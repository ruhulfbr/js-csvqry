import { test, expect } from "vitest";
import csvq from "../src/csvq";
import { isEmpty } from "../src/utilitis/helper";

const filePath = "tests/files/data.csv";

it("should throw an error unsupported select column", async () => {
    const column = "nana";
    const message = `Unsupported column for SELECT: \`${column}\`.`;

    let results = await csvq.from(filePath);

    expect(() => {
        results.select(["nana"]);
    }).toThrowError(message);
});

it("should throw an error unsupported where column", async () => {
    const column = "ages";
    const message = "Unsupported key for WHERE operation: `" + column + "`.";

    let results = await csvq.from(filePath);

    expect(() => {
        results.where(column, "=", 20);
    }).toThrowError(message);
});

it("should throw an error unsupported where operator", async () => {
    let operator = "<===>";
    let message = `Unsupported operator: ${operator}`;

    let results = await csvq.from(filePath);

    expect(() => {
        results.where("age", operator, 20);
    }).toThrowError(message);
});

it("should throw an error, invalid date string", async () => {
    let date = "555-555-555";
    let message = "Invalid date string, please provide a valid date.";

    let results = await csvq.from(filePath);

    expect(() => {
        results.whereDate("dob", "=", date);
    }).toThrowError(message);
});

it("Expect All Results", async () => {
    let results = await csvq.from(filePath);
    results = results.all();

    expect(results.length).toBe(20);
});

it("Expect results without where operation", async () => {
    let results = await csvq.from(filePath);
    results = results.get();

    expect(results.length).toBe(20);
});

it("Expect All Results with Selected Columns", async () => {
    let columns = ["id", "name"];
    let results = await csvq.from(filePath);
    results = results.select(columns).get();

    let result = results[0];

    expect(isEmpty(result.id)).toBe(false);
    expect(isEmpty(result.name)).toBe(false);
    expect(isEmpty(result.age)).toBe(true);
});

it("Expect only one result", async () => {
    let result = await csvq.from(filePath);
    result = result.row();

    expect(result.id).toBe("1");
    expect(result.name).toBe("Allis");
});

it("Expect One result with where Condition", async () => {
    let result = await csvq.from(filePath);
    result = result.where("id", 1).row();

    expect(result.id).toBe("1");
    expect(result.name).toBe("Allis");
});

it("Expect Nth Item of result without where Condition", async () => {
    let result = await csvq.from(filePath);
    result = result.nth(1);

    expect(result.id).toBe("2");
    expect(result.name).toBe("Gwyneth");
});

it("Expect Nth Item of result with where Condition", async () => {
    let result = await csvq.from(filePath);
    result = result.whereIn("id", [1, 2, 3]).nth(2);

    expect(result.id).toBe("3");
    expect(result.name).toBe("Sashenka");
});

it("Expect False when getting Nth Item of results", async () => {
    let result = await csvq.from(filePath);
    result = result.whereIn("id", [1, 2, 3]).nth(6);

    expect(result).toBe(false);
});

it("Expect true when check has data", async () => {
    let result = await csvq.from(filePath);
    result = result.where("id", 1).hasData();

    expect(result).toBe(true);
});

it("Expect false when check has data", async () => {
    let result = await csvq.from(filePath);
    result = result.where("id", 100).hasData();

    expect(result).toBe(false);
});

it("Expect true when check does exist", async () => {
    let result = await csvq.from(filePath);
    result = result.where("id", 1).exist();

    expect(result).toBe(true);
});

it("Expect false when check has data", async () => {
    let result = await csvq.from(filePath);
    result = result.where("id", 100).exist();

    expect(result).toBe(false);
});

it("Expect First item of result without apply where condition", async () => {
    let result = await csvq.from(filePath);
    result = result.first();

    expect(result.id).toBe("1");
    expect(result.name).toBe("Allis");
});

it("Expect Last item of result without apply where condition", async () => {
    let result = await csvq.from(filePath);
    result = result.last();

    expect(result.id).toBe("20");
    expect(result.name).toBe("Ethan Hernandez");
});

it("Expect results with simple where condition", async () => {
    let results = await csvq.from(filePath);
    results = results.where("id", 1).get();

    expect(results.length).toBe(1);
});

it("Expect results with greater than where condition", async () => {
    let results = await csvq.from(filePath);
    results = results.where("id", ">", 2).get();

    expect(results.length).toBe(18);
});

it("Expect results with greater than equal where condition", async () => {
    let results = await csvq.from(filePath);
    results = results.where("id", ">=", 18).get();

    expect(results.length).toBe(3);
});

it("Expect results with less than where condition", async () => {
    let results = await csvq.from(filePath);
    results = results.where("id", "<", 5).get();

    expect(results.length).toBe(4);
});

it("Expect results with less than equal where condition", async () => {
    let results = await csvq.from(filePath);
    results = results.where("id", "<=", 3).get();

    expect(results.length).toBe(3);
});

it("Expect results with not equal where condition", async () => {
    let results = await csvq.from(filePath);
    results = results.where("id", "!=", 3).get();

    expect(results.length).toBe(19);
});

it("Expect results with whereIn condition", async () => {
    let results = await csvq.from(filePath);
    results = results.whereIn("id", [1, 2]).get();

    expect(results.length).toBe(2);
});

it("Expect results with whereNotIn condition", async () => {
    let results = await csvq.from(filePath);
    results = results.whereNotIn("id", [1, 2]).get();

    expect(results.length).toBe(18);
});

it("Expect results with whereLke Contain (both) condition", async () => {
    let results = await csvq.from(filePath);
    results = results.whereLike("name", "Smi").get();

    expect(results.length).toBe(2);
});

it("Expect results with whereLke contains with condition", async () => {
    let results = await csvq.from(filePath);
    results = results.whereLike("name", "mr", "start").get();

    expect(results.length).toBe(1);
});

it("Expect results with whereLke End with condition", async () => {
    let results = await csvq.from(filePath);
    results = results.whereLike("name", "Smith", "end").get();

    expect(results.length).toBe(2);
});

it("Expect results with whereDate Equal condition", async () => {
    let results = await csvq.from(filePath);
    results = results.where("dob", "1997-07-02").get();

    expect(results.length).toBe(1);
});

it("Expect results with whereDate Not Equal condition", async () => {
    let results = await csvq.from(filePath);
    results = results.where("dob", "!=", "1997-07-02").get();

    expect(results.length).toBe(19);
});

it("Expect results with whereDate Greater Than condition", async () => {
    let results = await csvq.from(filePath);
    results = results.where("dob", ">", "1997-07-02").get();

    expect(results.length).toBe(3);
});

it("Expect results with whereDate Greater Than Equal condition", async () => {
    let results = await csvq.from(filePath);
    results = results.where("dob", ">=", "1997-07-02").get();

    expect(results.length).toBe(4);
});

it("Expect results with whereDate Less Than condition", async () => {
    let results = await csvq.from(filePath);
    results = results.where("dob", "<", "1997-07-02").get();

    expect(results.length).toBe(16);
});

it("Expect results with whereDate Less Than Equal condition", async () => {
    let results = await csvq.from(filePath);
    results = results.where("dob", "<=", "1997-07-02").get();

    expect(results.length).toBe(17);
});

it("Expect results with where and Or_Where condition", async () => {
    let results = await csvq.from(filePath);
    results = results.where("id", 1).orWhere("id", 3).get();

    expect(results.length).toBe(2);
});
