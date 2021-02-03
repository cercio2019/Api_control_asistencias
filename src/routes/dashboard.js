const {Router} = require("express");
const pool = require("../database");
const router = Router();

router.get('/',  (req, res)=>{
    res.json({message : "Bienvenido al dashboard"})    
});


router.get('/entrada/:fecha', async(req, res)=>{
    const {fecha} = req.params;
    await pool.query("Select count(*) as nroEntrada from asistencia Where fecha = ? ", fecha, 
    (err, results, fiels)=>{
        if(err)throw err;
        res.json({results});
    });
});

router.get('/salida/:fecha', async(req, res)=>{
    const {fecha} = req.params;
    await pool.query("Select count(*) nroSalida from asistencia WHERE fecha = ? and horaSalida != 00-00-00", fecha,
    (err, results, fiels)=>{
        if(err)throw err;
        res.json({results});
    });
});

router.get('/total', async(req, res)=>{
    await pool.query("select count(*) as nroEmpleados from empleados", (err, results, fiels)=>{
        if(err)throw err;
        res.json({results});
    })
});


// function isAuthenticated(req, res, next) {
//     if(req.isAuthenticated()) {
//       return next();
//     }  
//     res.redirect('/')
//   }

module.exports = router;