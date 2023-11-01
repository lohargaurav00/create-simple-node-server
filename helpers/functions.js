import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import validateProjectName from "validate-npm-package-name";
import fs from "fs";
import path from "path";

export const animatedText = async (text) => {
  const coloredText = chalkAnimation.rainbow(text);
  return coloredText;
};

export const getCliAnswers = async (questions) => {
  const answers = await inquirer.prompt(questions);
  return answers;
};

export const validateNpmName = (name) => {
  const nameValidation = validateProjectName(name);
  if (nameValidation.validForNewPackages) return { valid: true };
  return {
    valid: false,
    problems: [
      ...(nameValidation.errors || []),
      ...(nameValidation.warnings || []),
    ],
  };
};

export const changePackageJsonName = async (name, typescript) => {

  const isJsOrTs = typescript === "No" ? "js" : "ts";
  const jsonPath = path.join(process.cwd() + `/templates/${isJsOrTs}/package.json`);

  const packageJson = await JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  packageJson["name"] = name;

  const newPackageJson = JSON.stringify(packageJson, null, 2);

  fs.writeFileSync(jsonPath, newPackageJson);
};
