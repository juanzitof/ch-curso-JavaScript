import {Usuario, Cuenta, Operacion} from "./Clases.js";

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}/${month}/${year}`;
}
//Modal

if(document.getElementById("btnModal")){
  var modal = document.getElementById("myModal");
  var btn = document.getElementById("btnModal");
  var span = document.getElementsByClassName("close")[0];
  var body = document.getElementsByTagName("body")[0];

  btn.onclick = function() {
    modal.style.display = "block";
    body.style.position = "static";
    body.style.height = "100%";
    body.style.overflow = "hidden";
  }

  span.onclick = function() {
    modal.style.display = "none";
    body.style.position = "inherit";
    body.style.height = "auto";
    body.style.overflow = "visible";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      body.style.position = "inherit";
      body.style.height = "auto";
      body.style.overflow = "visible";
    }
  }
}
// Main
var main = function () {
  const usuario1 = new Usuario("Ricardo", "Jhonson", "rick", "1234");
  const cuenta1 = new Cuenta(usuario1, 0, Cuenta.generarNumeroCuenta());

  // Agrego operaciones para demostracion
  cuenta1.addOperacion(100, Operacion.DEPOSITO, new Date(2020, 1, 24));
  cuenta1.addOperacion(500, Operacion.DEPOSITO, new Date(2020, 2, 14));
  cuenta1.addOperacion(1000, Operacion.DEPOSITO, new Date(2020, 3, 15));
  cuenta1.addOperacion(1850, Operacion.DEPOSITO, new Date(2020, 4, 8));
  cuenta1.addOperacion(3500, Operacion.DEPOSITO, new Date(2020, 5, 4));

  var userName = document.getElementById(`nameUser`).value;
  console.log(`Ingreso el nombre de: ${userName}`);

  var password = document.getElementById(`password`).value;;
  console.log(`Ingreso la clave de: ${password}`);

  let access = false;
  if (usuario1.ingreso(userName, password)) {
    access = true;
  } else {
    alert("Password incorrecto");
    return;
  }

  if (access) {
    var deposito = parseFloat(
      pedirDato("Ingrese el valor a depositar", validadorNumero)
    );
    console.log(`Ingreso $${deposito} a depositar en su cuenta`);
    cuenta1.addOperacion(deposito, Operacion.DEPOSITO, new Date());
    console.log(cuenta1.operaciones);

    //alert(`Su saldo actual es: $${cuenta1.getSaldo()}`);

    let historicoFormat = cuenta1
      .obtenerHistorico()
      .map(({ monto, fecha, tipo }) => {
        return `${formatDate(fecha)}       ${tipo}      $${monto}`;
      });
    console.log(`---------  Historico  ---------`);
    console.log(historicoFormat.join("\n"));
  //Manipulacion del DOM
    document.getElementById("nombre").innerHTML = `Bienvenido/a ${userName}`;
    document.getElementById("saldo-cuenta").innerHTML =`Su saldo es$ ${cuenta1.getSaldo()}`;
  }
}


// Incio los eventos de los botones
//document.getElementById("comenzar").onclick = main;




