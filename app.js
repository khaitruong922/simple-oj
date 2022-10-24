import { promisify } from "util";
import { exec as _exec } from "child_process";
import chalk from "chalk";
import { getInputPath, getCheckerPath, getOutputPath } from "./path.js";

export const exec = promisify(_exec);

const init = async () => await exec("docker compose build");

const submit = async (problem, submissionPath) => {
    const inputPath = getInputPath(problem);
    const checkerPath = getCheckerPath(problem);
    const outputPath = getOutputPath(problem);
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
