import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import validateProjectName from "validate-npm-package-name";
import chalk from "chalk";
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

export const getPathJsOrTs = (typescript) => {
  const isJsOrTs = typescript === "No" ? "js" : "ts";
  const dirPath = path.join(process.cwd() + `/templates/${isJsOrTs}`);
  return dirPath;
};

export const changePackageJsonName = async (name, typescript) => {
  const jsonPath = getPathJsOrTs(typescript) + "/package.json";

  const packageJson = await JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  packageJson["name"] = name;

  const newPackageJson = JSON.stringify(packageJson, null, 2);

  fs.writeFileSync(jsonPath, newPackageJson);
};

export const copyTemplateFiles = (source, destination) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  const files = fs.readdirSync(source);
  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyTemplateFiles(sourcePath, destPath); // Recursively copy subdirectory
    } else {
      fs.copyFileSync(sourcePath, destPath); // Copy file
    }
  });
};

export const writeTemplateFiles = (name, typescript, srcDir) => {
  const dirPath = getPathJsOrTs(typescript);
  const newDirPath = path.join(process.cwd(), name);

  if (fs.existsSync(newDirPath)) {
    console.log(chalk.red(`This directory already exists: ${newDirPath}`));
    return;
  }

  fs.mkdirSync(newDirPath);

  copyTemplateFiles(dirPath, newDirPath);
};
