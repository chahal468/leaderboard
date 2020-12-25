function routineOraString(str, isLike) {
  let resultStr = str.replace("'", "''");

  if (isLike) {
    resultStr = resultStr.replace('%', '~%');
  }

  return resultStr;
}

module.exports = { routineOraString };
