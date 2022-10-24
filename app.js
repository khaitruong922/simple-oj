import { promisify } from "util";
import { exec as _exec } from "child_process";
import chalk from "chalk";
import { getInputPath, getCheckerPath, getOutputPath, getAllSubmissions } from "./config.js";

export const exec = promisify(_exec);

const init = async () => await exec("docker compose build");

const submit = async (problem, submissionPath) => {
    const inputPath = getInputPath(problem);
    const checkerPath = getCheckerPath(problem);
    const outputPath = getOutputPath(problem);
    console.log(chalk.cyan(`Running ${submissionPath}...`));
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

const runSubmissions = async (problem) => getAllSubmissions(problem).forEach((s) => submit(problem, s));

const main = async () => {
    await init();

    runSubmissions("problemA");
};

main();
