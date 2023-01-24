module.exports = {
  sortImports: false,
  groupImports: false,
  emptyLineBetweenGroups: false,
  danglingCommas: false,
  declarationKeyword: 'const',
  importStatementFormatter({ importStatement }) {
    return importStatement.replace(/;$/, '');
  },
}
