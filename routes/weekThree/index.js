const e = require("express");
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
    });
  });

  app.get(`/${NAME}/wedding`, (req, res) =>
    res.json(generatePartyGuests("plusOne"))
  );

  app.get(`/${NAME}/meme`, (req, res) => res.json(getMeme()));

  app.post(`/${NAME}/party`, (req, res) => {
    let { fullName, attending, plusOne, children } = req.body;
    console.log(req.body);
    children = parseInt(children);

    try {
      pool.query(
        "INSERT INTO public.crud (full_name, attending, plus_one, children) VALUES ($1, $2, $3, $4) RETURNING *",
        [fullName, attending, plusOne, children],
        (error, results) => {
          if (error) {
            res.status(500).send("Insert failed: " + error);
          } else {
            res.status(201).send(JSON.stringify(results.rows[0]));
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Insert failed: " + error);
    }
  });

  app.delete(`/${NAME}/party/:id`, (req, res) => {
    console.log("-+-+-+-+-+-+-+");
    console.log(req.params.id);
    console.log("-+-+-+-+-+-+-+");
    const { id } = req.params;

    try {
      pool.query(
        'DELETE FROM public.crud WHERE "guest_id" = ($1) RETURNING *',
        [id],
        (error, results) => {
          if (error) {
            res.status(500).send("Delete failed: " + error);
          } else {
            res.status(201).send(JSON.stringify(results));
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Delete failed: " + error);
    }
  });

  app.put(`/${NAME}/party/:id`, (req, res) => {
    console.log("-+-+-+-+-+-+-+");
    console.log(req.params.id);
    console.log(req.params.body);
    console.log("-+-+-+-+-+-+-+");
    const { id } = req.params;
    let { fullName, attending, plusOne, children } = req.body;
    console.log(req.body);
    children = parseInt(children);

    try {
      pool.query(
        'UPDATE public.crud SET "full_name" = $2, "attending" = $3, "plus_one" = $4, "children" = $5 WHERE "guest_id" = ($1) RETURNING *',
        [id, fullName, attending, plusOne, children],
        (error, results) => {
          if (error) {
            res.status(500).send("Update failed: " + error);
          } else {
            res.status(201).send(JSON.stringify(results));
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Update failed: " + error);
    }
  });
};

module.exports = routes;
