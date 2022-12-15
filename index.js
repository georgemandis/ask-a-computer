import { execSync } from "child_process";
import readline from "readline";
import chalk from "chalk";
import { openai, log, processFlags } from "./utils.js";

// change as needed
const platform = "macOS";

// console.log(process.argv);
const flags = processFlags({
  debug: false,
  "dry-run": false,
});

const gpt3Response = async (prompt) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return response;
};

const getOsCommand = async (prompt) => {
  const response = await gpt3Response(
    `Convert the following phrase into a ${platform} command line argument that might reveal enough information to answer it:\n\n"${prompt}"\n\n`
  );

  flags.debug &&
    log.debug("OpenAI translation to command-line", response?.data?.choices);

  return response?.data?.choices?.pop()?.text || "";
};

const translateToNaturalLanguage = async (cmd, query) => {
  if (flags["dry-run"]) {
    log.info(`Command that would have run:`, `${cmd}`);
    return "";
  }

  flags.debug && log.debug("Running command", `${cmd}\n`);

  const output = execSync(cmd).toString();
  const response = await gpt3Response(
    `${output}\n From the previous response, answer the following question: "${query}"\n\n`
  );

  flags.debug &&
    log.debug(
      "OpenAI interpretation of command-line output",
      response?.data?.choices
    );

  return response.data?.choices?.pop()?.text || "";
};

const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt(
  chalk.italic.bold("\n🖥 💬 Ask a computer™ ") + chalk.yellow("→") + "\n\n> "
);
rl.prompt();

rl.on("line", function (line) {
  const query = line.trim().toLowerCase();

  if (["quit", "exit"].includes(query)) {
    rl.close();
  }

  /**
   * The recipe:
   * 1. Get a command for this platform from GPT-3 based on a prompt/question
   * 2. Run the command and capture the output
   * 3. Ask GPT-3 to interpret the command-line output based on the original prompt/question and return an natural-language answer
   */

  getOsCommand(query)
    .then((cmd) => {
      return translateToNaturalLanguage(cmd, query);
    })
    .then((reply) => {
      flags.debug && log.debug("Final response", reply.trim());
      console.log(chalk.green(`\n${reply.trim()}`));
      rl.prompt();
    })
    .catch((err) => {
      log.error("Something went wrong", flags.debug ? err : "");
      rl.prompt();
    });
}).on("close", function () {
  console.log("👋🏼 Goodbye!");
  process.exit(0);
});
