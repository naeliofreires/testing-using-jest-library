module.exports.sum = (num1, num2) => {
  const number01 = parseInt(num1, 10);
  const number02 = parseInt(num2, 10);

  if (Number.isNaN(number01) || Number.isNaN(number02)) {
    throw new Error("Please check your input");
  }

  return number01 + number02;
};
