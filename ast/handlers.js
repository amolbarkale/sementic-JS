import { findTokenDataType, findTokenValue } from "./tokens-find.js";

function parseVariableDeclaration(tokens, index, kind) {
  // [let, x, =, 10]

  // we are at 0th index
  // let + 1 = variable name
  // let + 2 = assignment
  // let + 3 = value

  //JS goes through code in 2 phases
  //in first it only declared nodes

  //Memory Phase 1:
  {
    let x = undefined;
    let y = undefined;
  }

  //Memory Phase 2:
  {
    let x = undefined;
    let y = undefined;
  }

  //create two nodes: declaration node, assignment node

  const declarationNode = {
    nodeType: "VariableDeclaration",
    metaData: {
      name: tokens[i + 1],
      value: undefined,
      kind: kind,
      dataType: findTokenDataType(tokens, index),
    },
  };

  const assignmentNode = {
    nodeType: "VariableAssignment",
    metaData: {
      name: tokens[i + 1],
      dataType: findTokenDataType(tokens, index),
      value: findTokenValue(tokens, index),
    },
  };
  return { declarationNode, assignmentNode };
}

export { parseVariableDeclaration };
