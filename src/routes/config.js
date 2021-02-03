const {Router} = require("express");
const pool = require("../database");

const router = Router();


router.post('/newCargo', async(req, res)=>{
    const datos = req.body;
    await pool.query("INSERT INTO cargos set ?", datos);
    res.json({message : "Un nuevo cargo esta registrado en el sistema"} );
});

router.post('/newDep', async(req, res)=>{
    const datos = req.body;
    await pool.query("INSERT INTO departamentos set ?", datos);
    res.json({message : "Un nuevo departamento esta registado en el sistema"});
});


module.exports = router;