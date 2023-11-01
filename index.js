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
  writeTemplateFiles,
} from "./helpers/functions.js";
import questions from "./helpers/questions.js";

const init = async () => {
  const text = "welcome to create-node-server cli";
  console.clear();
  const coloredText = await animatedText(text);
  const spinner = ora("Loading questions...");

  coloredText.start();
  spinner.start().color = "yellow";

  // setTimeout(async () => {
  coloredText.stop();
  spinner.stop();

  const { projectName, typescript, srcDir } = await getCliAnswers(questions);
  changePackageJsonName(projectName, typescript);
  writeTemplateFiles(projectName, typescript, srcDir);

 
  // }, 2000);
};

init();
