import { getHeapValue, generateMemoryAddress } from "./helpers.js";

class MemoryImp {

    constructor(){
        this.stack = [] //for addresses
        this.heap = new Map() //for values
    }
  

  // Define the read method to read values from memory
  read(nodeName) {
   
  }

  // Define AssignValue method to assign new values to a node
  write(node, newval, scope) {
  console.log('incoming var node phase 1:', node)
  
  }

 
}

const Memory = new MemoryImp();

export { Memory };