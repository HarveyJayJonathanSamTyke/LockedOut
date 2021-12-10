const db = require("../models/passwordModel");

const passwordController = {};

passwordController.getLogin = (req, res, next) => {
  facebookid=[req.query.id]
  // console.log(req.query.id);
  // console.log('line 7 in pwcontrol', facebookid);
  const queryGetLogin = "SELECT * FROM oauth WHERE facebookid=$1;";
  // console.log('get login query', queryGetLogin)
  db.query(queryGetLogin, facebookid)
    .then((result) => {
      // console.log('this is the result of dbquery', result);
      res.locals.userMetaData = {
        userExists: false,
        // userAdded: false,
        userID: null,
      };

      // if user exists, then return userMetaData with userExists = true & userID
      if (result.rows.length > 0) {
        res.locals.userMetaData = {
          userExists: true,
          // userAdded: false,
          userID: result.rows[0]._id,
          name: result.rows[0].name
        };
        return next();
      }
      // if user doesn't exist, then create another user (insert query to database)
      else {

        const values = [req.query.id, req.query.name, req.query.pictureurl]
        // console.log('this is line 34 create new user values:', values);
        const queryInsertUser = "INSERT INTO oauth (facebookid, name, pictureurl) VALUES($1, $2, $3) RETURNING _id;";
        db.query(queryInsertUser, values)
          .then(result => {
            // console.log(`this is insert result`, result);
            res.locals.userMetaData = {
              userExists: true,
              // userAdded: false,
              userID: result.rows[0]._id,
              // name: result.rows[0].name
            };
            return next();
          })
          .catch(error => {
            return next({
            log: 'Error in db.queryInsertUse',
            status: 400,
            message: { err: 'Error in db.queryInsertUse' },
          })})
      }
        // console.log result just to see if we need to do some sort of error handling
        // if successful, return userExists = true & userID

      // for (let i = 0; i < result.rowCount; i++) {
      //   if (
      //     req.query.id === result.rows[i].facebookid &&
      //     req.query.name === result.rows[i].name
      //   ) {
      //     res.locals.userMetaData = {
      //       userExists: true,
      //       userAdded: false,
      //       userID: result.rows[i]._id,
      //     };

      //     res.locals.currentUserID = result.rows[i]._id;
      //     return next();
      //   }
      // }
      return next();
    })
    .catch(error => {return next({
      log: 'Error in db.queryGetLogin',
      status: 400,
      message: { err: 'Error in db.queryGetLogin' },
    })})
};

passwordController.getTotalUsers = (req, res, next) => {
  const queryGetTotal = "SELECT COUNT(username) FROM oauth";
  db.query(queryGetTotal).then((rset) => {
    res.locals.totalUsers = Number(rset.rows[0].count);
    return next();
  });
};

passwordController.getSignup = (req, res, next) => {
  const currID = Number(res.locals.totalUsers) + 1;
  const values = [currID, req.query.id, req.query.name, req.query.pictureurl];
  const queryInsertUser =
    "INSERT INTO oauth (_id, facebookid, name, pictureurl) VALUES($1, $2, $3);";
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
    req.query.urlEntry,
    req.query.userName,
    req.query.userID,
    req.query.passwordEntry,
  ];
  const queryInsertUser =
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
