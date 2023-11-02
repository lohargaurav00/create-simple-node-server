#!/usr/bin/env node

//   ________    _____   ____ _____________    _________   ____
//  /  _____/   /  _  \ |    |   \______   \  /  _  \   \ /   /
// /   \  ___  /  /_\  \|    |   /|       _/ /  /_\  \   Y   /
// \    \_\  \/    |    \    |  / |    |   \/    |    \     /
//  \______  /\____|__  /______/  |____|_  /\____|__  /\___/
//         \/         \/                 \/         \/

import ora from "ora";
import chalk from "chalk";

import {
  animatedText,
  changePackageJsonName,
  getCliAnswers,
  gitInit,
  writeTemplateFiles,
} from "./helpers/functions.js";
import questions from "./helpers/questions.js";

const init = async () => {
  const text = "welcome to create-node-server cli";
  console.clear();
  const coloredText = await animatedText(text);
  const spinner1 = ora("Loading questions...");

  coloredText.start();
  spinner1.start().color = "yellow";

  setTimeout(async () => {
    coloredText.stop();
    spinner1.succeed(chalk.green("Questions loaded successfully!"));
    spinner1.stop();

    const { projectName, typescript, srcDir } = await getCliAnswers(questions);
    console.clear();
    coloredText.start();
    coloredText.stop();
    const spinner2 = ora("Creating project...");
    spinner2.start().color = "yellow";

    setTimeout(() => {
      spinner2.text = "Copying files...";
      writeTemplateFiles(projectName, typescript, srcDir);
      changePackageJsonName(projectName);
      gitInit(projectName);
      
      setTimeout(() => {
        spinner2.succeed(chalk.green("Project created successfully!"));
      }, 2000);
    }, 1000);
  }, 2000);
};

init();
