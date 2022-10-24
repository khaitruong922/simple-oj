import { promisify } from "util";
import { exec as _exec } from "child_process";
import chalk from "chalk";

export const exec = promisify(_exec);

const inputFile = "problem/input";
const checkerFile = "problem/checker.js";
const outputPath = "problem/output";

const init = async () => {
    console.log("Building docker image...");
    await exec("docker compose build");
};

const submit = async (filename) => {
    console.log(chalk.cyan(`Submitting ${filename}...`));
    let color, verdict;
    try {
        let { stdout } = await exec(
            `docker compose run --no-deps --rm app bash -c "node ${filename} < ${inputFile} > ${outputPath} && node ${checkerFile}"`
        );
        stdout = stdout.trim();

        color = stdout === "AC" ? chalk.green : chalk.red;
        verdict = stdout;
    } catch (e) {
        verdict = "RTE";
        color = chalk.yellow;
    }

    console.log(`Verdict for ${filename}:`);
    console.log(color(verdict));
};

const main = async () => {
    await init();
    submit("submissions/ac.js");
    submit("submissions/wa.js");
    submit("submissions/wa_2.js");
    submit("submissions/rte.js");
};

main();
