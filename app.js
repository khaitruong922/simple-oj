import { promisify } from "util";
import { exec as _exec } from "child_process";
import chalk from "chalk";
import { getInputPath, getCheckerPath, getOutputPath, getAllSubmissions, TMP_DIR } from "./config.js";
import * as fs from "fs";

export const exec = promisify(_exec);

const init = async () => {
    await exec("docker compose build");
    if (fs.existsSync(TMP_DIR)) fs.rmSync(TMP_DIR, { recursive: true, force: true });
    fs.mkdirSync(TMP_DIR);
};

const colors = {
    AC: chalk.green,
    RTE: chalk.yellow,
};

const makeVerdict = (submissionPath, content) => {
    content = content.trim();
    const color = colors[content] || chalk.red;
    console.log("Verdict for", submissionPath);
    console.log(color(content));
};

const submit = async (problem, submissionPath) => {
    console.log(chalk.cyan(`Running ${submissionPath}...`));
    const inputPath = getInputPath(problem);
    const submissionFilename = submissionPath.split("/").pop();
    const outputPath = `${TMP_DIR}/${submissionFilename}.out`;
    let output;
    try {
        const { stdout } = await exec(
            `docker compose run --no-deps --rm node bash -c "node ${submissionPath} < ${inputPath}"`
        );
        output = stdout;
    } catch (e) {
        makeVerdict(submissionPath, "RTE");
        return;
    }
    await fs.promises.writeFile(outputPath, output);
    const checkerPath = getCheckerPath(problem);
    const { stdout: verdict } = await exec(`node ${checkerPath} < ${outputPath}`);
    makeVerdict(submissionPath, verdict);
    await fs.promises.unlink(outputPath);
};

const runSubmissions = async (problem) => getAllSubmissions(problem).forEach((s) => submit(problem, s));

const main = async () => {
    await init();

    runSubmissions("problemA");
};

main();
