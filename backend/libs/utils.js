const generateRandomString = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  while (result.length < 5) {
    const randomChar =
      characters[Math.floor(Math.random() * characters.length)];
    if (!result.includes(randomChar)) {
      result += randomChar;
    }
  }

  return result;
};

module.exports = {
  generateRandomString,
};
