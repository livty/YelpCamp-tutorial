var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));



app.set("view engine","ejs");
var campgrounds = [
        {name:"Iron Man",image:"https://images.unsplash.com/photo-1477346611705-65d1883cee1e?dpr=1&auto=format&fit=crop&w=1500&h=1001&q=80&cs=tinysrgb&crop="},
        {name:"Sherlock Holmes",image:"https://images.unsplash.com/photo-1487772841463-eb1f383a9e67?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop="},
        {name:"Thor's place",image:"https://images.unsplash.com/photo-1456244440184-1d494704a505?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop="},
        ];

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    
        res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
        var name= req.body.name;
        var image = req.body.image;
        var newCampground ={name:name,image:image}
        campgrounds.push(newCampground);
        res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
        res.render("new.ejs");
});


app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp server has started");
});