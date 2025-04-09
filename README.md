# JavaScript Language Clone (WIP)

Welcome to our **sementicJS** a mini JavaScript language project! This repository aims to explore how JavaScript code works under the hood with step by step breakdown and execution. It involves multiple stages, from tokenizing (lexing) the source code, parsing, building an Abstract Syntax Tree (AST), Memory allocation and then interpreting the resulting structure.

This project tries to replicate JavaScript v1.0.
---

## Table of Contents

1. [Overview](#overview)  
2. [Project Structure](#project-structure)  
3. [Key Features](#key-features)  
4. [Getting Started](#getting-started)  
5. [Usage](#usage)  
6. [Planned Improvements](#planned-improvements)  
7. [Contributing](#contributing)  
8. [License](#license)

---

## Overview

This project is a **work in progress** experiment to understand the inner workings of JavaScript. We’re building a mini "engine" that processes JS-like syntax by performing:

- **Tokenization**: Splitting source code into meaningful tokens.  
- **Parsing**: Converting tokens into an intermediate representation or AST.  
- **Interpretation**: Executing the AST, simulating a JavaScript runtime with basic features such as variables, hoisting, function invocation, and more.

**Why?**  
- To deepen understanding of JavaScript internals.  
- To Understand the Memory allocation for primitives and non-primitives.  
- To understand JavaScript as a language engineer.

---