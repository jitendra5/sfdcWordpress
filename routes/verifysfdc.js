var express = require('express');
var router = express.Router();
var jsforce = require('jsforce');
let conn;
/* GET users listing. */
router.post('/sfdc', function(req, res, next) {
    //res.send(' Initiating Login process...');
  console.log(req.body.url);
  console.log(req.body.uName);
  console.log(req.body.pwd);
 conn = new jsforce.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl : req.body.url 
    //'https://test.salesforce.com'
    //'hariharan@cloudbyz.com.wcct.ctmsdev'
    //'wcct@2019AMcPMvXy8zYcwlAFG1TxEPqX'
});
conn.login(req.body.uName, req.body.pwd, function(err, userInfo) {
  if (err) {  
    console.error(err);
    //res.send(' Login failed...');
    //router.set('conData','');
    res.json({status: 400, message:"Login Failed"});
  }
  // Now you can get the access token and instance URL information.
  // Save them to establish connection next time.
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  //router.set('conData',conn);
  res.json({status: "200", message : "Login success"});
});
  
});

module.exports = router;
