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

// Main

function main() {
  const usuario1 = new Usuario("Ricardo", "Jhonson", "rick", "1234");
  const cuenta1 = new Cuenta(usuario1, 0, Cuenta.generarNumeroCuenta());

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
    cuenta1.addOperacion(deposito, Operacion.DEPOSITO)
    alert(`Tu saldo actual es ${cuenta1.saldo}`)
  }
}
main();
