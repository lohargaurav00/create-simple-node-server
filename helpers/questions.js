
import chalk from "chalk";

 const questions = [
  {
    type: "list",
    name: "typescript",
    message: `Would you like to have ${chalk.blue("Typescript")}?`,
    choices: ["Yes", "No"],
    default: "No",
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