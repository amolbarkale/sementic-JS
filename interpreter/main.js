import fs from "fs";
import chalk from "chalk";
import { tokenize } from "../lexer/tokenizer.js";

function InterpretJS(sourcecode) {
  const tokens = tokenize(sourcecode);
  console.log("tokens:", tokens);
}

function runFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${filePath}`);
      console.log(err);
      return;
    }

    //passing the sourcecode
    let result = InterpretJS(data);
  });
}

if (process.argv.length < 3) {
  console.log("Usage: node mainer.js <filename>");
  process.exit(1);
}

const fileName = process.argv[2];
runFile(fileName);

//run command

// node ./interpreter/main.js test.sjs
