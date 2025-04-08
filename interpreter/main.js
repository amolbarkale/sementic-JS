import fs from "fs";
import chalk from "chalk";
import { tokenize } from "../lexer/tokenizer.js";
import { codeCleaner } from "../lexer/cleaners.js";
import { Parse } from "../parser/main.js";
import { logMemory } from "../core/helpers.js";
import { Memory } from "../core/memory.js";
import { stringSanitizeforFinalOutput } from "./helpers.js";

function InterpretJS(sourcecode) {
  //Step1: read sourcecode using node fs module

  //step2: cleaning the source code
  let result = codeCleaner(sourcecode);

  //step3: tokenize source code
  const tokens = tokenize(result);

  //Step4: parser(tokens) -> AST
  const AST = Parse(tokens);
  console.log("AST:", AST);

  let output = [];
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

        switch (currentNodeMetaData.printType) {
          case "variable":
            console.log(
              chalk.yellow(
                "AST Node: Print Statement: variable",
                currentNodeMetaData.toPrint
              )
            );

            result = Memory.read(currentNodeMetaData.toPrint[0]);
            output.push(result.value);
            break;
          case "literal":
            console.log(
              chalk.cyan(
                "AST Node: Print Statement: literal",
                currentNodeMetaData.toPrint
              )
            );
            let literalString = currentNodeMetaData.toPrint.join(" ");
            console.log("literalString:", literalString);
            result = stringSanitizeforFinalOutput(literalString);
            output.push(result);
            break;

          default:
            break;
        }

        break;

      default:
        console.log("Unknown nodeType:", currentNode);
        break;
    }
  }
  logMemory();
  return output;
}

function runFile(filePath) {
  fs.readFile(filePath, "utf8", (err, sourcecode) => {
    if (err) {
      console.error(`Error reading file: ${filePath}`);
      console.log(err);
      return;
    }

    //passing the sourcecode
    let output = InterpretJS(sourcecode);

    output.forEach((item) => {
      console.log("output:", item);
    });
  });
}

if (process.argv.length < 3) {
  console.log("Usage: node mainer.js <filename>");
  process.exit(1);
}

const fileName = process.argv[2];
runFile(fileName);

// node ./interpreter/main.js test.sjs
