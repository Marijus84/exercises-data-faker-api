const { name, random } = require("faker");
const { firstName, lastName } = name;
const { uuid, boolean } = random;
const myStudents = [
  "Andrius",
  "Artūras",
  "Daniel",
  "Domas",
  "Dovilė",
  "Dovydas",
  "Eimantas",
  "Greta",
  "Jonas",
  "Kasparas",
  "Lukas",
  "Martynas",
  "Neivydas",
  "Povilas",
  "Robert",
  "Vaidas",
];

const generatePartyGuests = (key) => {
  const arrayLength = myStudents.length * 10 + 9;
  const result = [...Array(arrayLength)].map((v, i) => {
    const insertStudent = i % 10 === 0 && i !== 0;
    const fullName = `${firstName()} ${lastName()}`;

    return {
      name: insertStudent ? myStudents[i / 10 - 1] : fullName,
      id: uuid(),
      [key]: insertStudent || boolean(),
      attending: insertStudent || boolean(),
    };
  });

  return result;
};

module.exports = generatePartyGuests;
