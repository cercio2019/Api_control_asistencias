const SHA256 = require("crypto-js/sha256");

module.exports =  class QR {

    constructor(){
        this.comodin = 0;
        this.timestamp = new Date();
    }

    calcularhash(cedula, nombre){
        return SHA256(this.timestamp + 
            cedula +
            JSON.stringify(nombre) + this.comodincomodin).toString()
    }

}

