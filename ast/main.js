import { parsePrintStatement, parseVariableDeclaration } from "./handlers.js";

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
        const { declarationNode, assignmentNode, newIndex } =
          parseVariableDeclaration(tokens, i, token);

        ast.push(assignmentNode);
        ast.unshift(declarationNode);

        //store this variables in memory
        //1st phase: Memory will have only declarations
        //2nd phase: Memory will have assignments

        //we need to implement memory

        //Stack memory and heap memory

        i = newIndex;

        break;

      case "print":
        const { node: nodePrint, newIndex: newIndexPrint } =
          parsePrintStatement(i, tokens);

        ast.push(nodePrint);

        i = newIndexPrint - 1;

        break;
      default:
        //handle unknown tokens

        break;
    }
  }
  console.log("ast:", ast);
}

export { createAst };
