const path = require("path");
const { NAME } = require(path.resolve(__dirname, "constants"));
const {
  generateSelected,
  generateTranslations,
  generatePartyGuests,
  getMeme,
} = require(path.resolve(__dirname, "utils"));

// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "vqgjkxxmxlnuvq",
//   host: "ec2-54-155-110-181.eu-west-1.compute.amazonaws.com",
//   database: "d97np0smkrhvot",
//   password: "6b219d81fe0b192ca16706e6f72ff084c7d1f341eb92991f030ebb1a8289e45f",
//   port: 5432,
// });

const { Client } = require("pg");

const client = new Client({
  connectionString: `postgres://vqgjkxxmxlnuvq:6b219d81fe0b192ca16706e6f72ff084c7d1f341eb92991f030ebb1a8289e45f@ec2-54-155-110-181.eu-west-1.compute.amazonaws.com:5432/d97np0smkrhvot`,
  ssl: {
    rejectUnauthorized: false,
  },
});

const routes = (app) => {
  app.get(`/${NAME}/selected`, (req, res) => res.json(generateSelected()));

  app.get(`/${NAME}/translations`, (req, res) =>
    res.json(generateTranslations())
  );

  app.get(`/${NAME}/party`, (req, res) => {
    client.connect();

    client.query("SELECT * FROM public.test", (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      for (let row of results.rows) {
        console.log(JSON.stringify(row));
      }
      res.status(201).send(results.rows);

      // console.log("--------------", results.rows[0]);
      // res.status(200);
    });
    client.end();
    // console.log(1984);
    // res.status(200).json("i got you");
  });
  app.get(`/${NAME}/wedding`, (req, res) =>
    res.json(generatePartyGuests("plusOne"))
  );

  app.get(`/${NAME}/meme`, (req, res) => res.json(getMeme()));

  app.post(`/${NAME}/test-post`, (req, res) => {
    let { id } = req.body;
    console.log("-+-+-+--++");
    console.log(req);
    id = parseInt(id);
    client.connect();
    client.query(
      "INSERT INTO public.test (id) VALUES ($1) RETURNING *",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200);
      }
    );
    client.end();
    // console.log(req);
    // res.send("all good");
  });
};

module.exports = routes;
