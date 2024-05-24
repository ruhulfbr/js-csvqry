const csvq = require("./dist/csvq");

(async () => {
    try {
        const qb = await csvq.from("example.csv");
        let result = qb.get();

        console.log(result);
    } catch (error) {
        console.error("Error initializing csvq:", error);
    }
})();
