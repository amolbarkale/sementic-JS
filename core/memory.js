import { getHeapValue, generateMemoryAddress } from "./helpers.js";

class MemoryImp {
  constructor() {
    this.stack = []; //for addresses
    this.heap = new Map(); //for values
  }

  // Define the read method to read values from memory
  read(nodeName) {}

  // Define AssignValue method to assign new values to a node
  write(node, newval) {
    // node: { name: 'num', dataType: 'number', value: '12', kind: 'let' }

    // multiple cases
    // 1. this is a new entry
    // 2. this is a update entry

    //  does this memory node already exists
    // stack: { name: 'arr', dataType: 'array', value: '[ 1 , 2 , 3 , 4 ]', kind: 'const'}

    let memoryNode = this.stack.find((item) => item.name === node.name);
    console.log("write to MemoryNode:", memoryNode);
    if (!memoryNode) {
      // method to create a new entry to memory
      this._createMemooryNode(node);
    } else {
      // method to update to memory
      this._updateMemoryNode(memoryNode, node, newval);
    }
  }
  _createMemooryNode(node) {
    let memoryNode = { ...node };
    memoryNode.value = undefined;
    // stack: { name: 'arr', dataType: 'array', value: undefined, kind: 'const'}
    this.stack.push(memoryNode);
  }

  _updateMemoryNode(memoryNode, node, newval) {
    let address = generateMemoryAddress();

    memoryNode.value = address;

    node.value = newval;

    this.heap.set(address, node);
  }
}

const Memory = new MemoryImp();

export { Memory };
