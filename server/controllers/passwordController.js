const db = require("../models/passwordModel");

const passwordController = {};

passwordController.getLogin = (req, res, next) => {
  const queryGetLogin = "SELECT * FROM users";
  db.query(queryGetLogin).then((rset) => {
    res.locals.userMetaData = {
      userExists: false,
      userAdded: false,
      userID: null,
    };
    for (let i = 0; i < rset.rowCount; i++) {
      if (
        req.query.username === rset.rows[i].username &&
        req.query.passwordUser === rset.rows[i].password
      ) {
        res.locals.userMetaData = {
          userExists: true,
          userAdded: false,
          userID: rset.rows[i]._id,
        };

        res.locals.currentUserID = rset.rows[i]._id;
        return next();
      }
    }
    return next();
  });
};

passwordController.getTotalUsers = (req, res, next) => {
  const queryGetTotal = "SELECT COUNT(username) FROM users";
  db.query(queryGetTotal).then((rset) => {
    res.locals.totalUsers = Number(rset.rows[0].count);
    return next();
  });
};

passwordController.getSignup = (req, res, next) => {
  const currID = Number(res.locals.totalUsers) + 1;
  const values = [currID, req.query.username, req.query.passwordUser];
  const queryInsertUser =
    "INSERT INTO users (_id, username, password) VALUES($1, $2, $3);";

  if (!!res.locals.userMetaData.userExists) {
    return next();
  } else if (!res.locals.userMetaData.userExists) {
    db.query(queryInsertUser, values).then(() => {
      res.locals.userMetaData = {
        userExists: true,
        userAdded: true,
        userID: currID,
      };
      return next();
    });
  }
};

passwordController.getAllEntries = (req, res, next) => {
  // console.log(req.query.userID)
  // const queryGetEntries = `SELECT * FROM entry WHERE user_id=${req.query.userID};`;
  const queryGetEntries = `SELECT * FROM entry WHERE userid=${Number(req.query.userID)} ORDER BY urlentry ASC;`;
  db.query(queryGetEntries).then((rset) => {
    // console.log("rset", rset);
    res.locals.entries = [...rset.rows];
    return next();
  });
};

passwordController.addEntry = (req, res, next) => {

  const values = [
    // we need to add another property "userName"
    req.query.urlEntry,
    req.query.userName,
    req.query.userID,
    req.query.passwordEntry,
  ];
  const queryInsertUser =
    // we need
    "INSERT INTO entry (urlentry, username, userid, passwordentry) VALUES($1, $2, $3, $4) RETURNING *;";
  db.query(queryInsertUser, values, (rset) => {
    res.locals.entryAdded = true;
    return next();
  });
};

passwordController.updateEntry = (req, res, next) => {
  const updatedValues = [
    req.query.userName,
    req.query.passwordEntry,
    req.query.urlEntry,
    req.query.userID
  ];
  // console.log(`this is updatedValues`, updatedValues);
  // const queryUpdateEntry = "UPDATE entry SET(urlentry, username, userid, passwordentry) VALUES($1, $2, $3, $4);"; 
  // const queryUpdateEntry = "UPDATE entry SET(urlentry, username, userid, passwordentry) VALUES($1, $2, $3, $4) WHERE (urlentry, userid) VALUES($1, $3);"; 
  // const queryUpdateEntry = "UPDATE entry SET urlentry = $1 AND username=$2 AND userid=$3 AND passwordentry=$4 WHERE urlentry=$1 AND userid=$3;"; 
  // const queryUpdateEntry = "UPDATE entry SET(urlentry, username, userid, passwordentry) VALUES($1, $2, $3, $4) WHERE urlentry=$1 AND userid=$3;";
  const queryUpdateEntry = "UPDATE entry SET username=$1, passwordentry=$2 WHERE urlentry=$3 AND userid=$4;";
  db.query(queryUpdateEntry, updatedValues, (rset) => {
    // have to save result to res.locals.entries
    console.log(`this is rset`, rset);
    res.locals.entries = rset;
    return next();
  });
}

passwordController.deleteEntry = (req, res, next) => {
  const deletedValues = [
    req.query.urlEntry,
    // req.query.userName,
    req.query.userID,
    // req.query.passwordEntry
  ];
  const queryDeleteEntry = "DELETE FROM entry WHERE urlentry=$1 AND userid=$2;";
  db.query(queryDeleteEntry, deletedValues, (rset) => {
    console.log(`delete rset`, rset);
    return next();
  });
}

module.exports = passwordController;
