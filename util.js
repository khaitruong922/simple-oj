import chalk from "chalk";

const colors = {
    AC: chalk.green,
    RTE: chalk.yellow,
};

export const makeVerdict = (submissionPath, content) => {
    content = content.trim();
    const color = colors[content] || chalk.red;
    console.log("Verdict for", submissionPath);
    console.log(color(content));
};
