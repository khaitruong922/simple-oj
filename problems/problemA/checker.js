import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { readFile, readFileSync, writeFile } from "fs";
import path from "path";

const testOutputPath = path.join(__dirname, "test_output");
const outputPath = path.join(__dirname, "output");

readFile(outputPath, (e) => {
    writeFile(outputPath, "", (e) => {});
});

// Compare two output files

const getLines = (path) => {
    const output = readFileSync(path, "utf-8");
    return output
        .split("\n")
        .filter((line) => line !== "")
        .map((line) => line.trim());
};

const compare = () => {
    const testLines = getLines(testOutputPath);
    const outputLines = getLines(outputPath);

    if (testLines.length !== outputLines.length) return "PE";

    for (let i = 0; i < testLines.length; i++) {
        if (testLines[i] !== outputLines[i]) return `WA in test ${i + 1}`;
    }

    return "AC";
};

console.log(compare());
