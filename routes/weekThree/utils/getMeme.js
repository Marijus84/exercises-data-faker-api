const { random } = require("faker");
const { number } = random;

const getMeme = () => {
  const memeImage = number({ max: 13650, min: 0 });
  return {
    imgUrl: `https://memegenerator.net/images/x500/${memeImage}.jpg`,
  };
};

module.exports = getMeme;
