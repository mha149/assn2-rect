const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {rejectUnauthorized: false}
})

pool.connect()

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
})

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('pages/index'));

app.get('/db', (req, res) => {
  var getUsersQuery = `SELECT * FROM rectangle`;
  pool.query(getUsersQuery, (error, result) => {
    if (error) res.end(error);
    var results = { 'rows': result.rows };
    res.render('pages/db', results);
  })
});

app.get('/adddb', (req, res) => {
  res.render('pages/adddb');
});

app.get('/infodb/:id', (req, res) => {
  pool.query(`SELECT * FROM rectangle where id=$1`, [req.params.id], (error, result) => {
    if (error) res.end(error);
    var results = { 'rows': result.rows };
    res.render('pages/infodb', results);
  })
});

app.get('/editdb/:id', (req, res) => {
  pool.query(`SELECT * FROM rectangle where id=$1`, [req.params.id], (error, result) => {
    if (error) res.end(error);
    var results = { 'rows': result.rows };
    res.render('pages/editdb', results);
  })
});

app.post('/adddb', (req, res) => {
  try {
    var name = req.body.name;
    var width = req.body.width;
    var height = req.body.height;
    var color = req.body.color;
    var bordersize = req.body.bordersize;
    var bordercolor = req.body.bordercolor;
    var opacity = req.body.opacity;
    pool.query('insert into rectangle(name, width, height, color, bordersize, bordercolor, opacity) values($1, $2, $3, $4, $5, $6, $7)', [name, width, height, color, bordersize, bordercolor, opacity], (error, result) => {
      var getUsersQuery = `SELECT * FROM rectangle`;
      pool.query(getUsersQuery, (error, result) => {
        if (error) res.end(error);
        var results = { 'rows': result.rows };
        res.render('pages/db', results);
      })
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/infodb/:id", (req, res) => {
  try {
    pool.query("DELETE FROM rectangle WHERE id=$1 RETURNING *", [req.params.id], (error, result) => {
      var getUsersQuery = `SELECT * FROM rectangle`;
      pool.query(getUsersQuery, (error, result) => {
        if (error) res.end(error);
        var results = { 'rows': result.rows };
        res.render('pages/db', results);
      })
    });
  } catch (error) {
    console.log(error);
  }
});

app.post('/editdb/:id', (req, res) => {
  try {
    pool.query(`UPDATE rectangle SET name=$1, width=$2, height=$3, color=$4,
    bordersize=$5, bordercolor=$6, opacity=$7 WHERE id=$8 RETURNING *`, [req.body.name, req.body.width,
    req.body.height, req.body.color, req.body.bordersize, req.body.bordercolor, req.body.opacity, req.params.id], (error, result) => {
      var results = { 'rows': result.rows };
      res.render('pages/infodb', results);
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
