import { parseVariableDeclaration } from "./handlers.js";

function createAst(tokens) {
  //Step 1: init AST
  let ast = []; //array of nodes

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
        const result = parseVariableDeclaration(tokens, i, token);
        console.log("result:", result);

        break;

      case "print":
        //handle print statements here

        break;
      default:
        //handle unknown tokens

        break;
    }
  }
}

export { createAst };
