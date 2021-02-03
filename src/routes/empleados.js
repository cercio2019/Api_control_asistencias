const {Router}  = require("express");
const pool = require("../database");
const QR = require("../libs/qr");
const router = Router();

router.get('/', async(req, res)=>{
    await pool.query("select * from empleados", (err, results, fiels)=>{
    	if(err)throw err;
    	res.json({results});
    })
});


router.get('/:cedula', async (req, res)=>{
  const {cedula} = req.params;
  console.log(cedula);
  await pool.query("SELECT * FROM empleados WHERE cedula = ? ", [cedula], (err, result, fiels)=>{
       if(err)throw err;
    	res.json({result}) 
   });

});


router.post('/',  async(req, res, next)=>{
    const {cedula, nombre, apellido, departamento, cargo} = req.body;
    const fotoPerfil = req.file.path;
    console.log(fotoPerfil);
    const codigoQr = new QR();
    let codigo = codigoQr.calcularhash(cedula, nombre); 
    console.log(codigo);
    if(!buscarIndentidad(cedula)){
        res.json({mensaje : `La cedula ${cedula} ya existe en el sistema por favor registrar otro`});
    }else{
        let datos = {
            cedula : cedula,
            nombre : nombre,
            apellido : apellido,
            departamento : departamento,
            cargo : cargo,
            codigo : codigo,
            fotoPerfil : fotoPerfil,
            fecha_ingreso : generarFecha()
        }
        console.log(datos)
        mensaje = `Los datos de ${nombre} ${apellido} se han registrado satifactoriamente`;
        await pool.query("INSERT INTO  empleados set ?", datos);
        res.json({mensaje})
    }
});

async function buscarIndentidad(cedula){

    await pool.query("select cedula from empleados where cedula = ? ", 
    cedula, (err, result, fiels)=>{
        if(err) throw err;
        filas = result.length;
        if(filas == 0){
            return true;
        }else{
            return false;
        }
    });
    
}

function generarFecha(){
    data = new Date();

    day = data.getDate();
    month = data.getMonth();
    year = data.getFullYear();

    fecha = `${year}-${month < 10? '0'+month : month }-${day < 10? '0'+day : day}`;
    return fecha;
}

module.exports = router;
