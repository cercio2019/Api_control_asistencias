const {Router} = require("express");
const pool = require("../database");

const router = Router();

router.get('/', (req, res)=>{
    res.json({mensaje : "Porfavor indicar el tipo de datos que quiers extraer"});
});

router.get('/cargos', async(req, res)=>{
    await pool.query("SELECT nombre_cargo from cargos", (err, result, fiels)=>{
        if(err)throw err;
        datos = result;
        res.json({datos});
    });
});

router.get('/dep', async(req, res)=>{
    await pool.query("SELECT nombre, numero_empleados from departamentos", (err, result, fiels)=>{
        if(err)throw err;
        datos = result;
        res.json({datos});
    });
});

// Seleccionar cargo por departamento
router.get('/cargos/:dep', async(req, res)=>{
    const {dep} = req.params;
    console.log(dep);
    await pool.query("SELECT nombre_cargo FROM cargos WHERE departamento = ? ",
     dep, (err, result, fiels)=>{
        if(err)throw err;
        datos = result;
        res.json({datos});
    });
});

router.get('/empresa/:id', async(req, res)=>{
    const {id} = req.params;
    await pool.query("SELECT nombre_empresa, rif from empresas WHERE id = ? ", id,
    (err, results, fiels)=>{
        if(err)throw err;
        res.json({results});
    });
});

 module.exports= router;