const express = require("express");
const morgan  = require("morgan");
const cors = require("cors"); 
const path = require("path");
const multer = require('multer');
const uuid = require("uuid/v4");
const session = require("express-session");
//const passport = require("passport");
//const cookieParser = require("cookie-parser");

require("./database");
//require("./passport/local-auth");
const app = express();

app.set("port", process.env.PORT || 2000);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//app.use(cookieParser('mi secreto'));
 app.use(session({
     secret : 'mi secreto',
     resave : true,
     saveUninitialized : true
 }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use((req, res, next) => {
//     app.locals.signinMessage = req.flash('signinMessage');
//     app.locals.usuario = req.usuario;
//     console.log(app.locals)
//     next();
//   });
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) =>{
        cb(null, uuid() + path.extname(file.originalname));
    }
});

app.use(multer({storage}).single('fotoPerfil'));

//routers
app.use("/", require("./routes"));
app.use("/asistencias", require("./routes/asistencias"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/logout", require("./routes/logout"));
app.use("/empleados", require("./routes/empleados"));
app.use("/config", require("./routes/config"));
app.use("/usuarios", require("./routes/usuarios"));
app.use("/datos", require("./routes/datos"));


// call server
app.listen(app.get("port"), ()=>{
    console.log("El servidor esta activo en el puerto", app.get("port"));
})