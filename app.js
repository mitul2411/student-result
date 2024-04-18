var mysql = require('mysql');
var express = require('express');
var bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.urlencoded({ extended: false }))


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "result"
});
connection.connect();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    var select = "select * from student";
    connection.query(select, function (error, result, field) {
        if (error) throw error;
        res.render('index', { result });
    })

});

app.post('/',function(req,res){
    var min,max,total,status,per;
    var name =req.body.name;
    var s1= req.body.s1;
    var s2 =req.body.s2;
    var s3 =req.body.s3;
    var s4 =req.body.s4;
    var s5 =req.body.s5;
 
    total=parseInt(s1)+parseInt(s2)+parseInt(s3)+parseInt(s4)+parseInt(s5);
    per=total/5;
    (s1>s2 && s1>s3 && s1>s4 && s1>s5)?max=s1:(s2>s3 && s2>s4 && s2>s5)?max=s2:(s3>s4 && s3>s5)?max=s3:(s4>s5)?max=s4:max=s5;
   
    (s1<s2 && s1<s3 && s1<s4 && s1<s5)?min=s1:(s2<s3 && s2<s4 && s2<s5)?min=s2:(s3<s4 && s3<s5)?min=s3:(s4<s5)?min=s4:min=s5;

    (min<33)?status= "fail":status="pass";

    var insert="insert into student (name,s1,s2,s3,s4,s5,total,per,min,max,status) values ('"+name+"','"+s1+"','"+s2+"','"+s3+"','"+s4+"','"+s5+"','"+total+"','"+per+"','"+min+"','"+max+"','"+status+"')";

    connection.query(insert, function (error, result, field) {
        if (error) throw error;
        res.redirect('/');
    })


});

app.get('/delete/:id',function (req,res){
    var id=req.params.id;
    var ans ="delete from student where id='"+id+"'";
    connection.query(ans, function (error, result, field) {
        if (error) throw error;
        res.redirect('/');
    })

})

app.get('/update/:id', function (req, res) {
    var id=req.params.id;
    var select = "select * from student where id='"+id+"'";
    connection.query(select, function (error, result, field) {
        if (error) throw error;
        res.render('update', { result });
    })

});

app.post('/update/:id',function(req,res){
    var min,max,total,status,per;
    var id=req.params.id;
    var name =req.body.name;
    var s1= req.body.s1;
    var s2 =req.body.s2;
    var s3 =req.body.s3;
    var s4 =req.body.s4;
    var s5 =req.body.s5;
 
    total=parseInt(s1)+parseInt(s2)+parseInt(s3)+parseInt(s4)+parseInt(s5);
    per=total/5;
    (s1>s2 && s1>s3 && s1>s4 && s1>s5)?max=s1:(s2>s3 && s2>s4 && s2>s5)?max=s2:(s3>s4 && s3>s5)?max=s3:(s4>s5)?max=s4:max=s5;
   
    (s1<s2 && s1<s3 && s1<s4 && s1<s5)?min=s1:(s2<s3 && s2<s4 && s2<s5)?min=s2:(s3<s4 && s3<s5)?min=s3:(s4<s5)?min=s4:min=s5;

    (min<33)?status= "fail":status="pass";

    var update="update student set name='"+name+"',s1='"+s1+"',s2='"+s2+"',s3='"+s3+"',s4='"+s4+"',s5='"+s5+"',total='"+total+"',per='"+per+"',min='"+min+"',max='"+max+"',status='"+status+"' where id='"+id+"'";

    connection.query(update, function (error, result, field) {
        if (error) throw error;
        res.redirect('/');
    })


});

 
app.listen(9900);