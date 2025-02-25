let getCategorySQL = `SELECT * FROM category`
 
let createCategorySQL =
`INSERT INTO category(title, description)
VALUES (?, ?)`

let createThreadSQL = 
`INSERT INTO thread(title, author_id, creation_date, icon_path, category_id)
VALUES (?, ?, ?, ?, ?)`

let getThreadByCategorySQL = `SELECT thread.creation_date AS thread_creation_date, user.creation_date AS user_creation_date, 
* FROM thread INNER JOIN user ON user.id = author_id WHERE category_id = ?`


let getPostByThreadSQL = 
`SELECT post.creation_date AS post_creation_date, user.creation_date AS user_creation_date, 
* FROM post INNER JOIN user ON user.id = post.author_id WHERE thread_id = ?`

let createPostSQL = 
`INSERT INTO post(thread_id, author_id, creation_date, image_path, text)
VALUES(?,?,?,?,?)`

let getUserSQL = `SELECT * FROM user`

let createUserSQL = 
`INSERT INTO user(username, bio)
VALUES (?, ?)`
 
module.exports.getCategorySQL = function() {
    return getCategorySQL;
}

module.exports.getPostByThreadSQL = function() {
    return getPostByThreadSQL;
}

module.exports.getThreadByCategorySQL = function() {
    return getThreadByCategorySQL;
}
 
module.exports.createCategorySQL = function() {
    return createCategorySQL;
}

module.exports.getUserSQL = function() {
    return getUserSQL
}

module.exports.createUserSQL = function() {
    return createUserSQL
}

module.exports.createThreadSQL = function() {
    return createThreadSQL;
}
 
module.exports.createPostSQL = function() {
    return createPostSQL;
}

