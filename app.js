var app=require("express")();
var bodyParser=require("body-parser");
var request=require("request");

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.render("search.ejs");
})

app.post("/movies",function(req,res){
    var movie = req.body.movieName;
    var url="http://www.omdbapi.com/?s="+movie+"&apikey=thewdb";
    
    request(url,function(error,response,body){
        if(!error&&response.statusCode==200)
        {
            var data=JSON.parse(body);
            res.render("show.ejs",{data : data.Search});
            
            // for(var i=0;i<data.Search.length;i++)
            // console.log(data.Search[i].Title);
        }
    })
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is active!!");
})