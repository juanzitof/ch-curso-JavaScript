export class Usuario {
  constructor(nombre, apellido, username, password) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.username = username;
    this.password = password;
    this.cuenta = null;
  }

  setCuenta(cuenta) {
    this.cuenta = cuenta;
  }

  validacion(username, password) {
    if (this.password === password && this.username === username) return true;
    else return false;
  }

  ingreso(username, password) {
    if (this.validacion(username, password)) {
      console.log(this.nombre, `ingreso correctamente`);
      return true;
    } else {
      return false;
    }
  }
}

export class Cuenta {
  constructor(usuario, montoIncial, numeroCuenta) {
    this.saldo = montoIncial || 0;
    this.operaciones = [];
    this.numeroCuenta = numeroCuenta;

    if (usuario) {
      usuario.setCuenta(this);
    }
  }
  static generarNumeroCuenta() {
    return Math.floor(Math.random() * 10000 + 10000);
  }

  addOperacion(monto, tipo, fecha) {
    let operacion = new Operacion(monto, tipo, dayjs(fecha) );
    this.operaciones.push(operacion);
    this.saldo += monto;
  }

  getSaldo(){
    let estadoCuenta = this.saldo
    this.operaciones.forEach((operacion)=>{
     estadoCuenta = estadoCuenta + operacion.monto
    })
    return estadoCuenta
  }
  
  obtenerHistorico(){
    return this.operaciones.sort((ope1,ope2)=>{
      return ope2.fecha-ope1.fecha
    })

  }
}

export class Operacion {
  static DEPOSITO = "DEPOSITO";
  static TRANSFERENCIA = "TRANSFERECIA";
  static PAGOIMP="PAGOS-IMP";
  
  constructor(monto, tipo, fecha ) {
    this.monto = monto;
    this.tipo = tipo;
    this.fecha = fecha;
  }
}



