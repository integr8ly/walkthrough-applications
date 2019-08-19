function isValidFruit(fruit) {
  return !!fruit && !!fruit.name && (fruit.id !== null && fruit.id !== undefined);
}

module.exports = {
  isValidFruit
};
