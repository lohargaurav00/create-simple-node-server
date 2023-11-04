import chalk from "chalk";

import { validateNpmName } from "./functions.js";

const questions = [
  {
    type: "input",
    name: "projectName",
    message: `What is the name of your project?`,
    default: "my-app",
    validate: (projectName) => {
      const { valid, problems } = validateNpmName(projectName);
      if (valid) return true;

      return chalk.red("Invalid project name: " + problems[0]);
    },
  },
  {
    type: "list",
    name: "typescript",
    message: `Would you like to have ${chalk.blue("Typescript")}?`,
    choices: ["Yes", "No"],
    default: "Yes",
  },
  {
    type: "list",
    name: "srcDir",
    message: `Would you like to have ${chalk.blue("src directory")}?`,
    choices: ["Yes", "No"],
    default: "Yes",
  },
];

export default questions;
