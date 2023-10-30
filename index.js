import { exec } from "child_process";
import { detect } from "detect-package-manager";

const packageManager = await detect();
const child = exec(packageManager, (err, stdout, stderr) => {
  if (err) {
    throw err;
  } else if (stderr) {
    console.log(stderr);
  }

  console.log(stdout);
});
