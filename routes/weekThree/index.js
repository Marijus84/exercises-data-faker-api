const path = require("path");
const { NAME } = require(path.resolve(__dirname, "constants"));
const {
  generateSelected,
  generateTranslations,
  generatePartyGuests,
  getMeme,
} = require(path.resolve(__dirname, "utils"));

const Pool = require("pg").Pool;
const pool = new Pool({
  connectionString: `postgres://vqgjkxxmxlnuvq:6b219d81fe0b192ca16706e6f72ff084c7d1f341eb92991f030ebb1a8289e45f@ec2-54-155-110-181.eu-west-1.compute.amazonaws.com:5432/d97np0smkrhvot`,
  ssl: {
    rejectUnauthorized: false,
  },
});

// const { Client } = require("pg");

// const client = new Client({
//   connectionString: `postgres://vqgjkxxmxlnuvq:6b219d81fe0b192ca16706e6f72ff084c7d1f341eb92991f030ebb1a8289e45f@ec2-54-155-110-181.eu-west-1.compute.amazonaws.com:5432/d97np0smkrhvot`,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

const routes = (app) => {
  app.get(`/${NAME}/selected`, (req, res) => res.json(generateSelected()));

  app.get(`/${NAME}/translations`, (req, res) =>
    res.json(generateTranslations())
  );

  app.get(`/${NAME}/party`, (request, response) => {
    console.log(1984);
    pool.query("SELECT * FROM public.test", (error, results) => {
      console.log(1985);
      if (error) {
        console.log(error);
        throw error;
      }
      responst.status(200).json(results.rows);
    });
  });

  app.get(`/${NAME}/wedding`, (req, res) =>
    res.json(generatePartyGuests("plusOne"))
  );

  app.get(`/${NAME}/meme`, (req, res) => res.json(getMeme()));

  app.post(`/${NAME}/test-post`, (req, res) => {
    let { id } = req.body;
    console.log("-+-+-+--++");
    console.log(req.body);
    id = parseInt(id);
    client.connect();

    client.query(
      "INSERT INTO public.test (id) VALUES ($1) RETURNING *",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        client.end();
        res.status(200);
      }
    );

    //console.log(req);
    // res.send("all good");
  });
};

module.exports = routes;

//persidaryti ant async;
