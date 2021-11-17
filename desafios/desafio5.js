class Usuario {
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

class Cuenta {
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

  addOperacion(monto, tipo) {
    let operacion = new Operacion(monto, new Date(), tipo);
    this.operaciones.push(operacion);
    this.saldo += monto;
  }
}

class Operacion {
  static DEPOSITO = "DEPOSITO";

  constructor(monto, fecha, tipo) {
    this.monto = monto;
    this.fecha = fecha;
    this.tipo = tipo;
  }
}
