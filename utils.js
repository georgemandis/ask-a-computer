import { Configuration, OpenAIApi } from "openai";
import chalk from "chalk";

export const processFlags = (flags) => {
  process.argv
    .filter((arg) => {
      return (
        arg.startsWith("-") &&
        Object.keys(flags).includes(arg.replace(/^-+/, ""))
      );
    })
    .map((arg) => arg.replace(/^-+/, ""))
    .forEach((flag) => {
      flags[flag] = true;
    });

  return flags;
};

export const log = {
  debug: (title, msg) =>
    console.log(chalk.yellow(`\n[DEBUG] - ${title}\n`), msg),
  error: (title, msg) => console.log(chalk.red(`\n[ERROR] - ${title}\n`), msg),
  info: (title, msg) => console.log(chalk.cyan(`\n[INFO] - ${title}`), msg),
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_TOKEN,
});

export const openai = new OpenAIApi(configuration);
