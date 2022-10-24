import path from "path/posix";

const PROBLEMS_PATH = "problems";
const INPUT_FILE = "input";
const CHECKER_FILE = "checker.js";
const OUTPUT_FILE = "output";

const getProblemFilePath = (problem, file) => path.join(PROBLEMS_PATH, problem, file);
export const getInputPath = (problem) => getProblemFilePath(problem, INPUT_FILE);
export const getCheckerPath = (problem) => getProblemFilePath(problem, CHECKER_FILE);
export const getOutputPath = (problem) => getProblemFilePath(problem, OUTPUT_FILE);
