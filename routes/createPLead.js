var express = require('express');
var router = express.Router();
var jsforce = require('jsforce');

router.get('/', function(req, res, next) {
function connectSfdc(req){
  return new Promise((resolve,reject)=>{
      console.log(req.body.url);
      console.log(req.body.uName);
      console.log(req.body.pwd);
      var conn = new jsforce.Connection({
          loginUrl : req.body.url 
      });
      conn.login(req.body.uName, req.body.pwd, function(err, userInfo) {
        if (err) {  
          console.error(err);
          var resObj={};
          resObj.status ='400';
          resObj.con='error';
          resolve(resObj);
        }
        else{
          console.log(conn.accessToken);
          console.log(conn.instanceUrl);
          console.log("User ID: " + userInfo.id);
          console.log("Org ID: " + userInfo.organizationId);
          resolve();
          var resObj={};
          resObj.status ='200';
          resObj.con=conn;
          resolve(resObj);
        }
      });
  })
}
function createRecord(conn,req){
    return new Promise((resolve,reject)=>{
      logger.debug('Object to insert..');
      logger.debug(req);
      logger.debug(req.objectToCreate);
      logger.debug(req.objectJson);
      conn.sobject("Account").create(req.objectJson, function(err, ret) {
        if (err || !ret.success) 
        { 
          console.error(err, ret);
          var resObj={};
          resObj.status=400;
          resObj.message='Record Creation Failed!';
          reject(resObj);
        }
        else
        {
          console.log("Created record id : " + ret.id);
          var resObj={};
          resObj.recordId=ret.id;
          resObj.status=200;
          resObj.message='Record Created Successfully!';
          resolve(resObj);
        }
      });
    })
}
function main(){
    let verifyConn = connectSfdc(req)();
    verifyConn.then((response)=>{
        console.log('connection verified... ');
        logger.debug(response);
        if(res.status='200'){
          return createRecord(res.con,req);
        }
        else{
          res.json({status: "400", message : "Salesforce connection Failed"});
        }
    })
    .then((finalRes)=>{
      logger.debug(finalRes);
      res.json(finalRes);
    })
    .catch((error)=>{
      res.json(error);
    })
}
main();
});

module.exports = router;
