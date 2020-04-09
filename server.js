var express = require('express');
var app = express();
var cors = require('cors');
var port = process.env.port || 8081;
var bodyParser = require('body-parser');
var fs = require("fs");
// let getComplexDetails = require('./src/data/getComplexDetails.json');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
app.use(cors({origin: true}));
app.use(bodyParser.json());
var allowCrossDomain = function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
   // intercept OPTIONS method
   if ('OPTIONS' == req.method) {
   res.sendStatus(200);
   } else {
   next();
   }
   };
   
   app.use(allowCrossDomain);

fs.readFile('./src/data/getComplexDetails.json', 'utf-8', function(err, data) {
            if (err) throw err
         
            var arrayOfObjects = JSON.parse(data);
            console.log('list of data',arrayOfObjects)
            APICALLSERVICE(arrayOfObjects)
            
         })
function WRITEAPIRESOPONCE(responce){
   fs.writeFile('./src/data/getComplexDetails.json', JSON.stringify(responce), 'utf-8', function(err) {
      if (err) throw err
      console.log('Done!')
   })
}

function APICALLSERVICE(getComplexDetails){
      app.get('/complexDetails', function (req, res) {
         console.log( getComplexDetails );
         res.end( JSON.stringify(getComplexDetails) );
      });

      app.post('/saveData', urlencodedParser, function (req, res) {
         // First read existing users.
         console.log('paymentDetails is',req.body)
          response = {
              rent : req.body.paymentDetails.rent,
              month : req.body.paymentDetails.month,
              paid : req.body.paymentDetails.paid,
              balance : req.body.paymentDetails.balance,
              total : req.body.paymentDetails.total,
              remarks : req.body.paymentDetails.remarks
          };
          var getYear = new Date(req.body.paymentDetails.month).getFullYear();
          var months = ["January","February","March","April","May","June","July","August","Septmber","October","November","December"]
          var getMonth = months[new Date(req.body.paymentDetails.month).getMonth()];
          response.date = months[new Date(req.body.paymentDetails.month).getMonth()];
          for(let k=0;k<getComplexDetails.length;k++){
             if(getComplexDetails[k].ownerDetails.complexName == req.body.selectedComplex){
              console.log('complex data match',getComplexDetails[k].ownerDetails.complexName == req.body.selectedComplex)
                for(let m=0;m<getComplexDetails[k].userList.length;m++){
                   if(getComplexDetails[k].userList[m].meterInfo.clNo == req.body.clNo){
                    console.log('Inside complex data',getComplexDetails[k].userList[m].meterInfo.clNo == req.body.clNo)
                    getComplexDetails[k].userList[m].recentPaymentsInfo = response;
                    console.log('output',getComplexDetails[k]);
                    for(let n=0;n<getComplexDetails[k].userList[m].rentDetails.length;n++){
                       if(getComplexDetails[k].userList[m].rentDetails[n].year==getYear){
                          console.log('getYear',getComplexDetails[k].userList[m].rentDetails[n].year==getYear);
                          for(let p=0;p<getComplexDetails[k].userList[m].rentDetails[n].month.length;p++){
                             console.log('getYearMonths',getComplexDetails[k].userList[m].rentDetails[n].month[p],getMonth);
                             if(getComplexDetails[k].userList[m].rentDetails[n].month[p].date==getMonth){
                                console.log('getYearMonthsObj',getComplexDetails[k].userList[m].rentDetails[n].month[p].date==getMonth);
                                getComplexDetails[k].userList[m].rentDetails[n].month[p] = response
                                console.log('getYearMonthsObjval',getComplexDetails[k].userList[m].rentDetails[n].month[p]);
                             }
                          }
                       }
                    }
                   }
                }
             }
          }
          WRITEAPIRESOPONCE(getComplexDetails)
            res.end(JSON.stringify(getComplexDetails));
         
      });

      app.post('/deleteUser', urlencodedParser, function (req, res) {
         response = {
            complexName : req.body.complexName,
            clNo : req.body.clNo
      };
      for(let k=0;k<getComplexDetails.length;k++){
         if(getComplexDetails[k].ownerDetails.complexName == req.body.complexName){
         console.log('complex data match',getComplexDetails[k].ownerDetails.complexName == req.body.complexName)
            for(let m=0;m<getComplexDetails[k].userList.length;m++){
               if(getComplexDetails[k].userList[m].meterInfo.clNo == req.body.clNo){
               console.log('Inside complex data',getComplexDetails[k].userList[m].meterInfo.clNo == req.body.clNo)
               console.log('Inside complex data length before',getComplexDetails[k].userList.length)
               getComplexDetails[k].userList.splice(m, 1)
               //[k].userList[m].recentPaymentsInfo = response;
               console.log('Inside complex data length after',getComplexDetails[k].userList.length)
               }
            }
         }
      }
      WRITEAPIRESOPONCE(getComplexDetails)
      res.end(JSON.stringify(getComplexDetails));
})


app.post('/addUser', urlencodedParser, function (req, res) {
   var date11 = new Date(req.body.advanceInfo.date);
   var year = date11.getFullYear();
   var rentDetails = [];
   console.log('add user data is',req.body.advanceInfo.date,date11,year)
   var months = ["January","February","March","April","May","June","July","August","Septmber","October","November","December"]
   for(var j=0;j<5;j++){
         var obj = {
            "year":year+j,
            "month":[]
         }
         if(j==0){
            var month = date11.getMonth();
            console.log('getMonth',month)
            for(var k=month;k<months.length;k++){
                        var monthObj = {  
                                             "date": months[month], 
                                             "month": "-",
                                             "rent": "-",
                                             "paid": "-",
                                             "balance": "-",
                                             "total": "-",
                                             "remarks": "-"
                                       }
                     
                  obj.month.push(monthObj); 
               month+=1  
            }
         }else{
            for(var k=0;k<months.length;k++){
                        var monthObj1 = {  
                                             "date": months[k], 
                                             "month": "-",  
                                             "rent": "-",
                                             "paid": "-",
                                             "balance": "-",
                                             "total": "-",
                                             "remarks": "-"
                                       }
                     
                  obj.month.push(monthObj1);   

            }
         }
      rentDetails.push(obj);

}
   response = {
      personalInfo : req.body.personalInfo,
      meterInfo : req.body.meterInfo,
      advanceDetails:req.body.advanceInfo,
      recentPaymentsInfo : {
         "month" : "-",
         "rent" : "-",
         "paid" : "-",
         "balance" : "-",
         "total" : "-",
         "remarks" : "-"
   },
   rentDetails : rentDetails
};
   
for(let k=0;k<getComplexDetails.length;k++){
   console.log('add user match',getComplexDetails[k].ownerDetails.complexName,req.body.complexName +' '+'Complex');
   if(getComplexDetails[k].ownerDetails.complexName == req.body.complexName +' '+'Complex'){
   getComplexDetails[k].userList.push(response);
   }
}
WRITEAPIRESOPONCE(getComplexDetails)
   res.end(JSON.stringify(getComplexDetails));
})


app.post('/updateUser', urlencodedParser, function (req, res) {
   response = {
      personalInfo : req.body.personalInfo,
      meterInfo : req.body.meterInfo,
      advanceDetails:req.body.advanceInfo,
      recentPaymentsInfo : req.body.recentPaymentsInfo,
      rentDetails : req.body.rentDetails
};
   
   for(let k=0;k<getComplexDetails.length;k++){
      var complexDataConcat = getComplexDetails[k].ownerDetails.complexName.split(' ');
      console.log('update user match',complexDataConcat[0]+''+complexDataConcat[1],req.body.objKeys.complexName);
      if(complexDataConcat[0]+''+complexDataConcat[1] == req.body.objKeys.complexName){
         for(let m=0;m<getComplexDetails[k].userList.length;m++){
            if(getComplexDetails[k].userList[m].meterInfo.clNo == req.body.objKeys.clNo){
            console.log('update Inside complex data',getComplexDetails[k].userList[m].meterInfo.clNo == req.body.objKeys.clNo)
            getComplexDetails[k].userList[m] = response;
            }
         }
      }
   }
   WRITEAPIRESOPONCE(getComplexDetails)
   res.end(JSON.stringify(getComplexDetails));
})
   }


    
    
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})