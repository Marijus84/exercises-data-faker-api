const { random } = require("faker");
const { number } = random;

const getMeme = () => {
  const memeImage = number({ max: 13650, min: 0 });
  return {
    imgUrl: `https://img.memegenerator.net/images/${memeImage}.jpg`,
  };
};

module.exports = getMeme;
