import fs from "fs";
import chalk from "chalk";
import { tokenize } from "../lexer/tokenizer.js";
import { codeCleaner } from "../lexer/cleaners.js";
import { Parse } from "../parser/main.js";
import { logMemory } from "../core/helpers.js";
import { Memory } from "../core/memory.js";

function InterpretJS(sourcecode) {
  //Step1: read sourcecode using node fs module

  //step2: cleaning the source code
  let result = codeCleaner(sourcecode);

  //step3: tokenize source code
  const tokens = tokenize(result);

  //Step4: parser(tokens) -> AST

  const AST = Parse(tokens);
  console.log("AST:", AST);

  logMemory();

  //loop over AST node and interpret

  for (let i = 0; i < AST.length; i++) {
    const currentNode = AST[i];
    const currentNodeType = currentNode.nodeType;
    const currentNodeMetaData = currentNode.metaData;

    let result;

    switch (currentNodeType) {
      case "VariableDeclaration":
        // interprete var dec here
        console.log(
          chalk.red("AST Node: Var Declaration", currentNodeMetaData.name)
        );
        result = currentNodeMetaData.value;
        Memory.write(currentNodeMetaData, result);
        break;
      case "PrintStatement":
        // interprete print statements here
        console.log(
          chalk.blue("AST Node: Print Statement", currentNodeMetaData.toPrint)
        );

        break;

      default:
        console.log("Unknown nodeType:", currentNode);
        break;
    }
  }
  logMemory();
}

function runFile(filePath) {
  fs.readFile(filePath, "utf8", (err, sourcecode) => {
    if (err) {
      console.error(`Error reading file: ${filePath}`);
      console.log(err);
      return;
    }

    //passing the sourcecode
    let result = InterpretJS(sourcecode);
  });
}

if (process.argv.length < 3) {
  console.log("Usage: node mainer.js <filename>");
  process.exit(1);
}

const fileName = process.argv[2];
runFile(fileName);

// node ./interpreter/main.js test.sjs
