const express = require("express");

let app = express();

let path = require("path");

const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended:true}));

// const knex = require("knex")({
//     client: "pg",
//     connection: {
//         host: process.env.RDS_HOSTNAME || "localhost",
//         user: process.env.RDS_USERNAME || "postgres",
//         password: process.env.RDS_PASSWORD || "$NOM2020",
//         database: process.env.RDS_DB_NAME || "socialmedia",
//         port: process.env.RDS_PORT || 5432,
//         ssl: process.env.DB_SSL ? {rejectUnauthorized: false} : false
//     }
// });

const knex = require('knex')({
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '$NOM2020',
      database: 'socialmedia',
      port: 5432
    }
  });

app.get("/", (req, res) => {
    knex.select().from("surveydata").then( data => {
        res.render("datatable", { mysmresults : data});
    })
});

app.post("/search", (req, res) => {
  knex.select().from("surveydata").where( data => {
      res.render("datatable", { mysmresults : data});
  })
});

// app.post("/deleteCountry/:id", (req, res) => {
//    knex("country").where("country_id",req.params.id).del().then( mycountry => {
//       res.redirect("/");
//    }).catch( err => {
//       console.log(err);
//       res.status(500).json({err});
//    });
// });

app.listen( port, () => console.log("Server is listening"));