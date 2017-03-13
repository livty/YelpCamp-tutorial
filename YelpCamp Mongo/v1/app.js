var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));



app.set("view engine","ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
        name:String,
        image:String,
        description:String
});
var Campground = mongoose.model("Campground", campgroundSchema);
//create a new background and save to DB

// Campground.create( 
//      {
//               name:"Sherlock Holmes",
//               image:"https://images.unsplash.com/photo-1487772841463-eb1f383a9e67?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=",
//               description:"If you ever wanted to visit Mr Poirot's famous beach case, this is the place."
//       },function(err, campground){
//               if(err){
//                       console.log(err);
                      
//           }else{
//                   console.log("You made a new one");
//                       console.log(campground);

//       } });


// app.get("/",function(req,res){
//     res.render("landing");
// });

app.get("/campgrounds",function(req,res){
    //get all campgrounds from db
    Campground.find({},function(err, allCampgrounds){
            if(err){
                    console.log(err);
             }else{
                res.render("index",{campgrounds:allCampgrounds});  
            }
    });
        
});

app.post("/campgrounds",function(req,res){
        var name= req.body.name;
        var image = req.body.image;
        var desc = req.body.description;
        var newCampground ={name:name,image:image, description: desc};
        Campground.create(newCampground,function(err, newlyCreated){
        if(err){
                console.log(err);
        }else{
              res.redirect("/campgrounds");  
        }
});
});

app.get("/campgrounds/new",function(req,res){
        res.render("new.ejs");
});

app.get("/campgrounds/:id",function(req,res){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
                   console.log(err);
           }     else{
                    res.render("show",{campground: foundCampground});
           }
        });
       
       
});

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp server has started");
});