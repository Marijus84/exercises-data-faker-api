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
  user: "vqgjkxxmxlnuvq",
  host: "ec2-54-155-110-181.eu-west-1.compute.amazonaws.com",
  database: "d97np0smkrhvot",
  password: "6b219d81fe0b192ca16706e6f72ff084c7d1f341eb92991f030ebb1a8289e45f",
  port: 5432,
});

const routes = (app) => {
  app.get(`/${NAME}/selected`, (req, res) => res.json(generateSelected()));

  app.get(`/${NAME}/translations`, (req, res) =>
    res.json(generateTranslations())
  );

  app.get(`/${NAME}/party`, (req, res) =>
    res.json(
      pool.query("SELECT * FROM test ORDER BY id ASC", (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      })
    )
  );
  app.get(`/${NAME}/wedding`, (req, res) =>
    res.json(generatePartyGuests("plusOne"))
  );

  app.get(`/${NAME}/meme`, (req, res) => res.json(getMeme()));

  app.post(`/${NAME}/test-post`, (req, res) => {
    const { id } = req.body;
    console.log(req.body);

    pool.query(
      "INSERT INTO test (id) VALUES ($1) RETURNING *",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).send(`User added with ID: ${results.rows[0].id}`);
      }
    );
    // console.log(req);
    // res.send("all good");
  });
};

module.exports = routes;
