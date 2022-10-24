import { promisify } from "util";
import { exec as _exec } from "child_process";
import chalk from "chalk";
import path from "path";

export const exec = promisify(_exec);

const PROBLEMS_PATH = "problems";
const INPUT_FILE = "input";
const CHECKER_FILE = "checker.js";
const OUTPUT_FILE = "output";

const init = async () => await exec("docker compose build");

const problemFilePath = (problem, file) => path.posix.join(PROBLEMS_PATH, problem, file);

const submit = async (problem, submissionPath) => {
    const inputPath = problemFilePath(problem, INPUT_FILE);
    const checkerPath = problemFilePath(problem, CHECKER_FILE);
    const outputPath = problemFilePath(problem, OUTPUT_FILE);
    console.log(chalk.cyan(`Submitting ${submissionPath}...`));
    let color, verdict;
    try {
        let { stdout } = await exec(
            `docker compose run --no-deps --rm node bash -c "node ${submissionPath} < ${inputPath} > ${outputPath} && node ${checkerPath}"`
        );
        stdout = stdout.trim();

        color = stdout === "AC" ? chalk.green : chalk.red;
        verdict = stdout;
    } catch (e) {
        verdict = "RTE";
        color = chalk.yellow;
    }

    console.log(`Verdict for ${submissionPath}:`);
    console.log(color(verdict));
};

const main = async () => {
    await init();
    submit("problemA", "submissions/ac.js");
    submit("problemA", "submissions/wa.js");
    submit("problemA", "submissions/wa_2.js");
    submit("problemA", "submissions/rte.js");
};

main();
