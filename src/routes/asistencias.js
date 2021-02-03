const {Router} = require("express");
const pool = require("../database");

const router = Router();

router.get('/', async(req, res)=>{
    await pool.query("Select * from asistencia", (err, results, fiels)=>{
        if(err)throw err;
        asistencias = results
        res.json({asistencias});
    });
});

router.post('/registrar', async(req, res)=>{
    const datos = req.body;
    const {nombre_apellido} = req.body
    await pool.query("insert into asistencia set ?", datos);
    res.json({message : `Bienvenido ${nombre_apellido}`})
});

router.post('/fechas', async(req, res)=>{
    const {fechaDesde, fechaHasta} = req.body;
    await pool.query("Select * from  asistencia where fecha BETWEEN ? and ? " ,
    [fechaDesde, fechaHasta], (err, results, fiels)=>{
        if(err)throw err;
        datos = results;
        res.json({datos});
    });
});

router.put('/:id', async(req, res)=>{
    const {id} = req.params;
    const {nombre_apellido, horaSalida} = req.body;
    await pool.query("update asistencia set horaSalida = ? where id = ?", [horaSalida, id]);
    res.json({message : `Hasta luego Sr ${nombre_apellido}`})
});

module.exports = router;