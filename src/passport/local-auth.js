const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require("../database");

passport.serializeUser((usuario, done)=>{
    console.log('serializar', usuario.cedula);
    done(null, usuario.cedula);
})

passport.deserializeUser(async(cedula, done)=>{
    console.log('deserializar', cedula);
  await pool.query("SELECT * from usuarios where cedula = ?", [cedula], (err, result, fiels)=>{
    if(err)throw err;
    const usuario = result[0];
    console.log(usuario);   
    done(null, usuario);
    });
});

passport.use('local-signin', new LocalStrategy({
    usernameField: 'cedula',
    passwordField : 'password',
    passReqToCallback: true
}, async(req, cedula, password, done) =>{

    await pool.query("SELECT * from usuarios where cedula = ? and password = ? ", [cedula, password], (err, result, fiels)=>{
        const usuario = result[0];
        console.log(usuario);
        if(usuario.cedula == ''){
            return done(null, false, req.flash('signinMessage', 'Usuario no existe'))
        }

        return done(null, usuario);
    });
}))