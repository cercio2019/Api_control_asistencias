const {Router} = require("express");
const pool = require('../database');

const router = Router();

router.get("/", async(req, res)=>{
    await pool.query("Select * from usuarios", (err, results, fiels)=>{
        if(err)throw err;
        usuarios = results;
        res.json({usuarios});
    }); 
});

router.get('/:cedula', async(req, res)=>{
    const {cedula} = req.params;
    await pool.query("Select * from usuarios where cedula = ? ", cedula, 
    (err, result, fiels)=>{
        if(err)throw err;
        usuario = result;
        res.json({usuario});
    });
});

router.post('/', async(req, res)=>{
    const datos = req.body;
    const {nombre, apellido} = req.body;
    await poo.query('Insert into usuarios set ? ', datos);
    res.json({message : `${nombre} ${apellido} se ha registrado como nuevo usuarios`})
});

router.put('/:cedula', async(req, res)=>{
    const {cedula} = req.params;
    const {nombre, apellido, password} = req.body;
    await pool.query("update usuarios set password = ? where cedula= ?", [password, cedula]);
    res.json({message : `La contraseña de ${nombre} ${apellido} ha sido modificada exitosamente`});
});

router.delete('/:cedula', async(req, res)=>{
    const {cedula} = req.params;
    await pool.query("delete from usuarios where cedula = ? ", cedula);
    res.json({message : `El usuario ha sido eliminado exitosamente del sistema`}); 
});

module.exports = router;