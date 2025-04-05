function removeExtraWhitespaces(code) {
  // Replace instances of two or more whitespaces with a single space

  return code.replace(/\s{2,}/g, " ");
}

function removeSemicolons(code) {
  return code.replace(/;/g, " ");
}

function codeCleaner(code) {
  const codeclean1 = removeExtraWhitespaces(code);

  const codeclean2 = removeSemicolons(codeclean1);

  return codeclean2;
}

export { codeCleaner };
