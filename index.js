#!/usr/bin/env node

//   ________    _____   ____ _____________    _________   ____
//  /  _____/   /  _  \ |    |   \______   \  /  _  \   \ /   /
// /   \  ___  /  /_\  \|    |   /|       _/ /  /_\  \   Y   /
// \    \_\  \/    |    \    |  / |    |   \/    |    \     /
//  \______  /\____|__  /______/  |____|_  /\____|__  /\___/
//         \/         \/                 \/         \/

import ora from "ora";
import chalk from "chalk";

import { animatedText, getCliAnswers } from "./helpers/functions.js";
import questions from "./helpers/questions.js";

const init = async () => {
  const text = "welcome to create-node-server cli";
  const coloredText = await animatedText(text);
  const spinner = ora("Loading questions...");

  coloredText.start();
  spinner.start().color = "yellow";

  setTimeout(async () => {
    coloredText.stop();
    spinner.stop();

    const answers = await getCliAnswers(questions);
  }, 2000);
};

init();
