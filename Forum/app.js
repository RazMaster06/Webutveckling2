const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const sql = require("./sql")
const app = express()
const port = 4000
 
const db = new sqlite3.Database('database.db')
db.run("PRAGMA foreign_keys = ON;")

function getPreciseTime(){
  let yourDate = new Date()
  const offset = yourDate.getTimezoneOffset()
  yourDate = new Date(yourDate.getTime() - (offset*60*1000))
  let yourDateList = yourDate.toISOString().split('T')
  return `${yourDateList[0]} ${yourDateList[1].split('.')[0]}`
}
 
createTable =
`
CREATE TABLE post (
  id INTEGER PRIMARY KEY,
  thread_id INTEGER,
  author_id INTEGER,
  creation_date TEXT,
  image_path TEXT,
  text TEXT,
  FOREIGN KEY(author_id) REFERENCES user(id),
  FOREIGN KEY(thread_id) REFERENCES thread(id)
)
`
 
/*
db.serialize(() => {
  db.all(sql.createCategorySQL(), ["Anime", "Animation with Cute Girls, Sexy Guys and Fan Service"], (err, row) => {
    if (err) {
      console.error(err.message);
    }
  });
});
*/

/* Adds username + bio
db.serialize(() => {
    db.all(sql.createUserSQL(), ["Raz", "I am me"], (err, row) => {
        if (err) {
            console.error(err.message);
        }
    });
});
*/

/* Adds post
db.serialize(() => {
  db.all(sql.createPostSQL(), [1, 1, getPreciseTime(), "", "Very good!"], (err, row) => {
      if (err) {
          console.error(err.message);
      }
  });
});
 */

/* Adds thread
db.serialize(() => {
  db.all(sql.createThreadSQL(), ["", "", "", "", ""], (err, row) => {
    if (err) {
        console.error(err.message);
        }
    });
});
*/
app.use(express.static('public'))
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.set('view engine', 'pug')
 
app.get('/', (req, res) => {
  db.serialize(() => {
    db.all(sql.getCategorySQL(), (err, row) => {
      if (err) {
        console.error(err.message);
      }
 
      console.log(row)
 
      res.render('index', {"categoryList" : row})
    });
  });
})

app.get('/category/:id', (req, res) => {
  console.log(req.params.id)
  db.serialize(() => {
    db.all(sql.getThreadByCategorySQL(), [req.params.id], (err, row) => {
      if (err) {
        console.error(err.message);
      }
 
      console.log(row)
 
      res.render('category', {"threadList" : row})
    });
  });
  
})

app.get('/thread/:id', (req, res) => {
  console.log(req.params.id)
  db.serialize(() => {
    db.all(sql.getPostByThreadSQL(), [req.params.id], (err, row) => {
      if (err) {
        console.error(err.message);
      }
 
      console.log(row)
 
      res.render('thread', {"postList" : row})
    });
  });
  
})

app.get('/user', (req, res) => {
    db.serialize(() => {
      db.all(sql.getUserSQL(), (err, row) => {
        if (err) {
          console.error(err.message);
        }
   
        console.log(row)
   
        res.render('index', {"usernameList" : row})
      });
    });
  })
 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})