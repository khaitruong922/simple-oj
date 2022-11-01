import { readFileSync } from "fs";

const filterLines = (lines) => {
    return lines
        .split("\n")
        .filter((line) => line !== "")
        .map((line) => line.trim());
};

const judge = () => {
    if (process.argv.length !== 4) {
        console.log("Usage: node checker.js <testPath> <outputPath>");
        return;
    }
    const testLines = filterLines(readFileSync(process.argv[2], "utf-8"));
    const outputLines = filterLines(readFileSync(process.argv[3], "utf-8"));
    if (testLines.length !== outputLines.length) return "PE";
    for (let i = 0; i < testLines.length; i++) {
        if (testLines[i] !== outputLines[i]) return `WA in test ${i + 1}`;
    }
    return "AC";
};

process.stdout.write(judge());
