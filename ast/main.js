import { Memory } from "../core/memory.js";
import {
  parseFunctionCall,
  parseFunctionStatement,
  parsePrintStatement,
  ParseVariableDeclaration,
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
        const { variableNode, newIndex } = ParseVariableDeclaration(
          tokens,
          i,
          token
        );

        ast.push(variableNode);

        //store this variables in memory
        //1st phase: Memory will have only declarations
        Memory.write(variableNode.metaData);

        //2nd phase: Memory will have assignments

        i = newIndex - 1;

        break;

      case "print":
        const { node: nodePrint, newIndex: newIndexPrint } =
          parsePrintStatement(i, tokens);

        ast.push(nodePrint);

        i = newIndexPrint - 1;

        break;
      case "function":
        let { node: nodeFunction, newIndex: newIndexFunction } =
          parseFunctionStatement(tokens, i);

        let functionBodyNode = createAst(nodeFunction.metaData.body);

        let functionNode = {
          name: nodeFunction.metaData.functionName,
          value: functionBodyNode,
          type: "function",
        };

        Memory.write(functionNode);

        nodeFunction.functionBodyNode = functionBodyNode;
        ast.push(nodeFunction);

        i = newIndexFunction - 1;
        break;
      default:
        //handle unknown tokens

        // Check for a function call pattern: functionName followed by '()'
        if (
          i + 2 < tokens.length &&
          tokens[i + 1] === "(" &&
          tokens[i + 2] === ")"
        ) {
          const { node: nodeFunctionCall, newIndex: newIndexFunctionCall } =
            parseFunctionCall(tokens, i);

          ast.push(nodeFunctionCall);

          i = newIndexFunctionCall - 1;
        }

        break;
    }
  }
  return ast;
}

export { createAst };
