import { promisify } from "util";
import { exec as _exec } from "child_process";
import { getInputPath, getCheckerPath, getTestPath, getAllSubmissions, TMP_DIR } from "./config.js";
import * as fs from "fs";
import chalk from "chalk";
import { makeVerdict } from "./util.js";

export const exec = promisify(_exec);

const init = async () => {
    await exec("docker compose build");
    if (fs.existsSync(TMP_DIR)) fs.rmSync(TMP_DIR, { recursive: true, force: true });
    fs.mkdirSync(TMP_DIR);
};

const runSubmissions = async (problem) => getAllSubmissions(problem).forEach((s) => submit(problem, s));

const submit = async (problem, submissionPath) => {
    console.log(chalk.cyan(`Running ${submissionPath}...`));
    const inputPath = getInputPath(problem);
    const submissionFilename = submissionPath.split("/").pop();
    const outputPath = `${TMP_DIR}/${submissionFilename}.out`;
    let output;
    try {
        const { stdout } = await exec(`docker compose run --rm node bash -c "node ${submissionPath} < ${inputPath}"`);
        output = stdout;
    } catch (e) {
        makeVerdict(submissionPath, "RTE");
        return;
    }
    await fs.promises.writeFile(outputPath, output);
    const checkerPath = getCheckerPath(problem);
    const testPath = getTestPath(problem);
    const { stdout: verdict } = await exec(`node ${checkerPath} ${testPath} ${outputPath}`);
    makeVerdict(submissionPath, verdict);
    await fs.promises.unlink(outputPath);
};

const main = async () => {
    await init();
    runSubmissions("problemA");
};

main();
