import { readFile, readFileSync, writeFile } from "fs";

const outputFile = "problem/output";
const testOutputFile = "problem/test_output";

readFile(outputFile, (e) => {
    writeFile(outputFile, "", (e) => {});
});

// Compare two output files

const compare = () => {
    const testOutput = readFileSync(testOutputFile, "utf-8");
    const submissionOutput = readFileSync(outputFile, "utf-8");

    const testLines = testOutput.split("\n").filter((line) => line !== "");
    const submissionLinees = submissionOutput.split("\n").filter((line) => line !== "");

    if (testLines.length !== submissionLinees.length) {
        return "WA, test number mismatch";
    }

    for (let i = 0; i < testLines.length; i++) {
        if (testLines[i].trim() !== submissionLinees[i].trim()) {
            return `WA in test ${i + 1}`;
        }
    }

    return "AC";
};

console.log(compare());
