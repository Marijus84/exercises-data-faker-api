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

  // app.get(`/${NAME}/party`, (request, response) => {
  //   pool.query("SELECT * FROM public.test", (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //     response.status(200).json(results.rows);
  //   });
  // });
  app.get(`/${NAME}/party`, (req, res) => res.json(generatePartyGuests()));

  app.get(`/${NAME}/wedding`, (req, res) =>
    res.json(generatePartyGuests("plusOne"))
  );

  app.get(`/${NAME}/meme`, (req, res) => res.json(getMeme()));

  app.delete(`/${NAME}/delete/:id`, (request, response) => {
    let it = parseInt(request.params.id);
    console.log("-+-+-+--++");
    console.log(request);

    pool.query(
      "DELETE FROM public.test WHERE id = $1"[id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`user deleted`);
      }
    );
  });

  app.post(`/${NAME}/test-post`, (request, response) => {
    let { id } = request.body;
    console.log("-+-+-+--++");
    console.log(request.body);
    id = parseInt(id);

    pool.query(
      "INSERT INTO public.test (id) VALUES ($1) RETURNING *",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`user added`);
      }
    );
  });
};

module.exports = routes;

//! ties delete sustojau, kazko dar neveikia;
