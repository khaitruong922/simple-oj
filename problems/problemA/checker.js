import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";
import path from "path";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";

process.stdin.on("data", (inputStdin) => {
    inputString += inputStdin;
});

process.stdin.on("end", (_) => {
    console.log(judge());
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const testOutputPath = path.join(__dirname, "test_output");

const filterLines = (lines) => {
    return lines
        .split("\n")
        .filter((line) => line !== "")
        .map((line) => line.trim());
};

const judge = () => {
    const testLines = filterLines(readFileSync(testOutputPath, "utf-8"));
    const outputLines = filterLines(inputString);
    if (testLines.length !== outputLines.length) return "PE";
    for (let i = 0; i < testLines.length; i++) {
        if (testLines[i] !== outputLines[i]) return `WA in test ${i + 1}`;
    }

    return "AC";
};
