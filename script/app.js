function pedirDato(mensaje, validador) {
  var datoValido = false;
  var dato = "";

  do {
    dato = prompt(mensaje);
    datoValido = validador(dato);

    if (datoValido) {
      break;
    } else {
      dato = false;
    }
  } while (!datoValido);

  return dato;
}

function validadorNumero(numero) {
  return !isNaN(numero);
}

function validadorNombre(nombre) {
  return nombre !== "";
}


function formatDate(date){
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();
  return `${day}/${month}/${year}`
}
// Main

function main() {
  const usuario1 = new Usuario("Ricardo", "Jhonson", "rick", "1234");
  const cuenta1 = new Cuenta(usuario1, 0, Cuenta.generarNumeroCuenta());

  // Agrego operaciones para demostracion 
  cuenta1.addOperacion(100, Operacion.DEPOSITO, new Date(2020,1,24))
  cuenta1.addOperacion(500, Operacion.DEPOSITO, new Date(2020,2,14))
  cuenta1.addOperacion(1000, Operacion.DEPOSITO, new Date(2020,3,15))
  cuenta1.addOperacion(1850, Operacion.DEPOSITO, new Date(2020,4,8))
  cuenta1.addOperacion(3500, Operacion.DEPOSITO, new Date(2020,5,4))

  var userName = pedirDato("Ingrese su usuario", validadorNombre);

  console.log(`Ingreso el nombre de: ${userName}`);

  var password = pedirDato("Ingrese su clave:", validadorNumero);
  console.log(`Ingreso la clave de: ${password}`);

  let access = false;
  if (usuario1.ingreso(userName, password)) {
    access = true;
  } else {
    alert("Password incorrecto");
    return
  }

  if (access) {
    var deposito = parseFloat(
      pedirDato("Ingrese el valor a depositar", validadorNumero)
    );
    console.log(`Ingreso $${deposito} a depositar en su cuenta`);
    cuenta1.addOperacion(deposito, Operacion.DEPOSITO, new Date())
    console.log(cuenta1.operaciones)

    alert(`Su saldo actual es: $${cuenta1.getSaldo()}`)
    
    let historicoFormat = cuenta1.obtenerHistorico().map(({monto,fecha,tipo})=>{
      return `${formatDate(fecha)}       ${tipo}      $${monto}`
    })
    console.log(`---------  Historico  ---------`)
    console.log(historicoFormat.join("\n"))

  }
}
main();
