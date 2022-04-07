require("dotenv").config();
const { reject } = require("bcrypt/promises");
const mysql = require("mysql");
let instance = null;
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("database is " + connection.state);
});

class DbServices {
  static getDbServiceInstance() {
    return instance ? instance : new DbServices();
  }
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      //  console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async registerRenter(data) {
    console.log(data);
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO renters (name, username, pass_word, date_added) VALUES(?,?,?,?)";
        connection.query(
          query,
          [data.name, data.username, data.password, data.date],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result);
          }
        );
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async insertNewName(name) {
    try {
      const dateAdded = new Date();

      //I can say response but i am expecting insert ID
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO names (name, date_added) VALUES (?, ?)";
        connection.query(query, [name, dateAdded], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.insertId);
        });
      });
      //  console.log(insertId);
      return insertId;
    } catch (err) {
      console.log(err);
    }
  }
  async delete(id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM names WHERE id = ?";
        connection.query(query, [id], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result.affectedRows);
        });
      });
      // console.log(response);
      console.log("1 row deleted");
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  //update handler
  async edit({ id, name }) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `UPDATE names SET name = ? WHERE id = ?`;
        connection.query(query, [name, id], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result.affectedRows);
        });
      });
      // console.log(result);
      console.log("1 row updated");
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = DbServices;
