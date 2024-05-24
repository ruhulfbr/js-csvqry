// vitest.config.ts
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom", // or 'node' depending on your testing needs
        exclude: [...configDefaults.exclude, "tests/"], // This excludes the test directory from the build
    },
});
