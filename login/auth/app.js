var express=require("express"),
    mongoose=require("mongoose"),
    passport=require("passport"),
    bodyParser=require("body-parser"),
    User=require("./models/user"),
    LocalStrategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"),
    app=express();

    mongoose.connect("mongodb://127.0.0.1:27017/authentication",{useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true});

    app.use(express.static(__dirname + '/public'));

    app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

    app.use(require("express-session")({
        secret: " connection to plugin for decode n encode",
        resave: false,
        saveUninitialized: false
    }));


app.use(passport.initialize());
app.use(passport.session());




passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes

app.get("/",function(req,res){
    res.render("home");

});

app.get("/secret",isLoggedIn,function(req,res){
    res.render("secret");
});



//auth routes

//SIGN UP
app.get("/register",function(req,res){
    res.render("register");
});

//HANDLING SIGN up
app.post("/register",function(req,res){

    var newUser =new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            return res.redirect("/campgrounds");
        });
    });
    
});

//login routes
//render login
app.get("/login",function(req,res){
    res.render("login");
});

//login logic
//middleware

app.post("/login",passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}) , function(req,res){

});

//LOGOUT
app.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/");
})

function isLoggedIn(req ,res , next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}






app.listen(3000,function(){
    console.log("started!!");
});

// modules imported
// npm init
// npm install express mongoose --save
// npm install  passport passport-local --save
// npm install passport-local-mongoose --save
// npm install body-parser express-session --save
// npm install ejs

