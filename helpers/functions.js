import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import validateProjectName from "validate-npm-package-name";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

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
  const __filename = fileURLToPath(import.meta.url);
  const dirPath = path.resolve(
    `${path.dirname(__filename)}/../templates/${isJsOrTs}`
  );
  return dirPath;
};

export const copyTemplateFilesWithSrcCheck = (
  sourcePath,
  destination,
  destPath,
  srcDir,
  file
) => {
  if (fs.lstatSync(sourcePath).isDirectory()) {
    if (file === "src" && srcDir === "No") {
      copyTemplateFiles(sourcePath, destination); // Copy files to root directory
    } else {
      copyTemplateFiles(sourcePath, destPath); // Recursively copy subdirectory
    }
  } else {
    fs.copyFileSync(sourcePath, destPath); // Copy file
  }
};

export const copyTemplateFiles = (source, destination, srcDir) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  const files = fs.readdirSync(source);
  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);

    copyTemplateFilesWithSrcCheck(
      sourcePath,
      destination,
      destPath,
      srcDir,
      file
    );
  });
};

export const writeTemplateFiles = (name, typescript, srcDir) => {
  const dirPath = getPathJsOrTs(typescript);
  const newDirPath = path.join(process.cwd(), name);

  if (fs.existsSync(newDirPath)) {
    console.error(chalk.red(`This directory already exists: ${newDirPath}`));
    process.exit(1);
  }

  copyTemplateFiles(dirPath, newDirPath, srcDir);
};

export const changePackageJsonName = async (name) => {
  const jsonPath = path.join(process.cwd() + "/" + name, "/package.json");

  if (!fs.existsSync(jsonPath)) {
    console.error(chalk.red(`This file does not exist: ${jsonPath}`));
    process.exit(1);
  }

  const packageJson = await JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  packageJson["name"] = name;

  const newPackageJson = JSON.stringify(packageJson, null, 2);

  fs.writeFileSync(jsonPath, newPackageJson);
};

export const changeFilesName = (name) => {
  const filePath = path.join(process.cwd(), name);
  const files = fs.readdirSync(filePath);

  files.forEach((file) => {
    if (file === ".env.example") {
      fs.renameSync(`${filePath}/${file}`, `${filePath}/.env`);
    } else if (file === ".gitignore.example") {
      fs.renameSync(`${filePath}/${file}`, `${filePath}/.gitignore`);
    }
    return;
  });
};

//for git init and commit initial to git

export const gitInit = (name) => {
  const gitPath = path.join(process.cwd() + "/" + name);
  exec(
    `cd ${gitPath} && git init && git add . && git commit -m "initial commit"`,
    (err) => {
      if (err) {
        console.error(chalk.red(err));
        return;
      }
    }
  );
};
