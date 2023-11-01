import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";

export const animatedText = async (text) => {
  const coloredText = chalkAnimation.rainbow(text);
  return coloredText;
};

export const getCliAnswers = async (questions) => {
  const answers = await inquirer.prompt(questions);
  return answers;
};
