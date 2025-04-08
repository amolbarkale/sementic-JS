import { Memory } from "../core/memory.js";
import {
  parseFunctionStatement,
  parsePrintStatement,
  ParseVariableStatement,
} from "./handlers.js";

function createAst(tokens) {
  //Step 1: init AST
  let ast = []; //array of nodes
  console.log("tokens:", tokens);

  //Step2: iterate through tokens
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    //Step3: Identifying the token

    //there are two type of tokens so far
    //a. Variables decl, assignment
    //b. Print keyword

    switch (token) {
      //figuring out variables in our tokens
      case "let":
      case "const":
      case "var":
        const { variableNode, newIndex } = ParseVariableStatement(
          tokens,
          i,
          token
        );
        ast.push(variableNode);

        //store this variables in memory
        //1st phase: Memory will have only declarations

        Memory.write(variableNode.metaData);
        //2nd phase: Memory will have assignments

        //we need to implement memory

        //Stack memory and heap memory

        i = newIndex - 1;

        break;

      case "print":
        const { node: nodePrint, newIndex: newIndexPrint } =
          parsePrintStatement(i, tokens);

        ast.push(nodePrint);

        i = newIndexPrint - 1;

        break;
      case "function":
        let temp = parseFunctionStatement(tokens, i);
        break;
      default:
        //handle unknown tokens

        break;
    }
  }
  return ast;
}

export { createAst };
