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

  app.get(`/${NAME}/party`, (req, res) => {
    pool.query("SELECT * FROM public.crud", (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      res.status(200).json(results.rows);

      // console.log("--------------", results.rows[0]);
      // res.status(200);
    });
    // console.log(1984);
    // res.status(200).json("i got you");
  });
  app.get(`/${NAME}/wedding`, (req, res) =>
    res.json(generatePartyGuests("plusOne"))
  );

  app.get(`/${NAME}/meme`, (req, res) => res.json(getMeme()));

  app.post(`/${NAME}/party`, (req, res) => {
    let { fullName, attending, plusOne, children } = req.body;
    console.log("-+-+-+--++");
    console.log(req.body);
    children = parseInt(children);

    try {
      pool.query(
        "INSERT INTO public.crud (full_name, attending, plus_one, children) VALUES ($1, $2, $3, $4) RETURNING *",
        [fullName, attending, plusOne, children],
        (error, results) => {
          // if (error) {
          //   throw error;
          // }
          if (!error) {
            res.status(201).send(`user added`);
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Insert failed");
    }

    //console.log(req);
    // res.send("all good");
  });
};

module.exports = routes;

//persidaryti ant async;
