var express = require("express");
var app = express();
var path = require('path');

app.get('/',function(req,res){
  res.send("Pass the unix timestamp or a natural language date (example: January 1, 2016) to get the detail of date </br> </br> "+
  "Such as : <ul> <li> <span style='color:red'>https://timestamp-namhoang185.herokuapp.com/December%2015,%202015</span>"+
"<li><span style='color:red'> https://timestamp-namhoang185.herokuapp.com/1450137600 </span></ul>") ;
})

app.get('/:datestring', function(req,res){
    function unixToNatural(unix){
        var date = new Date(unix * 1000);
        var monthArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var month = monthArr[date.getMonth()];
        var year = date.getFullYear();
        var day = date.getDate();
        var result = month + " " +day+" " + year;
        return result;
    }
    // console.log(req.params.datestring);
    if(!isNaN(req.params.datestring)){
        var result = unixToNatural(req.params.datestring);
        var dataRes1 = {
          unix : req.params.datestring,
          natural : result
        }
        res.json(dataRes1);
    }
    else{
        var natural = new Date(req.params.datestring);
        if(!isNaN(natural)){
            var unix = natural / 1000;
            var dataRes2 = {
              unix : unix, 
              natural : req.params.datestring}
            res.json(dataRes2);
        }
        else {
            var dataNull = {unix : null, natural : null}
            res.json(dataNull)
        }
        
    }
    // var myDate;
    // if(/^\d{8,}$/.test(req.params.datestring)) {
    //   myDate = new Date(req.params.datestring * 1000);
    // } else {
    //   myDate = new Date(req.params.datestring, "MMMM D, YYYY");
    // }

    // if(myDate.isValid()) {
    //   res.json({
    //     unix: myDate.format("X"),
    //     natural: myDate.format("MMMM D, YYYY")
    //   });
    // } else {
    //   res.json({
    //     unix: null,
    //     natural: null
    // });
      
    // }
});
app.listen(process.env.PORT || 8080,function(){
  console.log("Server is running");
});

