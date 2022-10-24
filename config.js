import path from "path/posix";
import { readdirSync } from "fs";

const PROBLEMS_PATH = "problems";
const SUBMISSIONS_PATH = "submissions";
const INPUT_FILE = "input";
const CHECKER_FILE = "checker.js";
const OUTPUT_FILE = "output";

const getProblemFilePath = (problem, file) => path.join(PROBLEMS_PATH, problem, file);
const getSubmissionFolderPath = (problem) => path.join(SUBMISSIONS_PATH, problem);
const getSubmissionFilePath = (problem, file) => path.join(getSubmissionFolderPath(problem), file);

export const getInputPath = (problem) => getProblemFilePath(problem, INPUT_FILE);
export const getCheckerPath = (problem) => getProblemFilePath(problem, CHECKER_FILE);
export const getOutputPath = (problem) => getProblemFilePath(problem, OUTPUT_FILE);

export const getAllSubmissions = (problem) =>
    readdirSync(getSubmissionFolderPath(problem), { withFileTypes: true })
        .filter((item) => !item.isDirectory())
        .map((item) => getSubmissionFilePath(problem, item.name));
