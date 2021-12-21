import { Usuario, Cuenta, Operacion } from "./Clases.js";
var user = null;
var access = false;
const USER_KEY = "USER_KEY";
var cuenta1 = null;
var usuario1 = null;

//const DATE_FORMAT = "DD/MM/YYYY HH:mm:ss"
//dayjs().format(DATE_FORMAT)

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}/${month}/${year}`;
}

function checkLogin() {
  const data = localStorage.getItem(USER_KEY);

  if (data) {
    access = true;
    const objData = JSON.parse(data);
    closeModal();
  }
  var body = document.getElementsByTagName("body")[0];
  body.style.display = "block";
}

//Mostra modal de Ingreso
function openModal() {
  $("#sombra").fadeIn(100, () => {
    $("#modal").fadeIn(400);
  });
}

//Cerrar modal de ingreso
function closeModal() {
  $("#modal").fadeOut(400, () => {
    $("#dataForm").trigger("reset");
    $("#sombra").fadeOut(100);
  });
}

//Mostrar modal de deposito
function openDeposito() {
  $("#sombraD").fadeIn(100, () => {
    $("#modalD").fadeIn(400);
  });
}

//Cerrar modal de deposito
function closeDeposito() {
  $("#modalD").fadeOut(400, () => {
    $("#formDeposito").trigger("reset");
    $("#sombraD").fadeOut(100);
  });
}

//Eventos

function setupEvent() {
  //Modal de ingreso
  $("#btnModal").on("click", openModal);
  $("#close").on("click", closeModal);

  var form = document.getElementById("dataForm");
  form.addEventListener("submit", enviarFormulario);

  //Modal de deposito
  $("#deposito").on("click", openDeposito);
  $("#closeD").on("click", closeDeposito);

  var formDepo = document.getElementById("dataDepo");
  formDepo.addEventListener("submit", envioDeposito);
}

function enviarFormulario(event) {
  event.preventDefault();
  const form = document.getElementById("dataForm");

  const data = new FormData(form);
  const obtDataName = data.get("userName");
  const obtDataPass = data.get("password");

  if (usuario1.ingreso(obtDataName, obtDataPass)) {
    const userData = {
      name: usuario1.nombre,
      lastName: usuario1.apellido,
      userName: obtDataName,
      numeroCuenta: cuenta1.numeroCuenta,
    };

    var userDataString = JSON.stringify(userData);
    localStorage.setItem(USER_KEY, userDataString);

    dataForm.reset();
    var print = $("#nombre");

    userNameLabel(print, obtDataName);
    closeModal();
    

  } else {
    alert("Password incorrecto");
    return;
  }
}

function envioDeposito(event) {
  event.preventDefault();
  const formDepo = document.getElementById("dataDepo");
  const dataDepo = new FormData(formDepo);
  const deposito = dataDepo.get("cant-depositar");
  
  if(deposito && deposito !== "" && !isNaN(deposito)){
    const deposito = parseInt($("#cant-depositar").val());
    
    cuenta1.addOperacion(deposito, Operacion.DEPOSITO, new Date())
    cuenta1.saldo
  }
  closeDeposito();
  alert("Su deposito a sigo exitoso!");
}

//Imprimir
function userNameLabel(container, nameUser) {
  container.append(`Bienvenido ${nameUser}`);
}

//function obtenerOperaciones() {
//  $.get("../data/operaciones.json", (data) => {
//   data.obtenerHistorico().forEach((element) => {
//     listaOperaciones.push(
//       new Operacion(element.monto, element.tipo, element.fecha)
//    );
//    $("#").append(
//      `<div class="operacion">
//     <div class="data">
//       <span class="fecha">${formatDate(op.fecha)}</span>
//       <span class="tipo">${op.tipo}</span>
//    </div>
//    <div class="monto">$${op.monto}</div>
// </div>`
//  );
//});
//});
//}

function initData() {
  usuario1 = new Usuario("Ricardo", "Jhonson", "rick6", "1234");
  cuenta1 = new Cuenta(usuario1, 0, Cuenta.generarNumeroCuenta());

  // Agrego operaciones para demostracion
  cuenta1.addOperacion(300, Operacion.DEPOSITO, new Date(2020, 1, 24));
  cuenta1.addOperacion(1500, Operacion.DEPOSITO, new Date(2020, 2, 14));
  cuenta1.addOperacion(10000, Operacion.DEPOSITO, new Date(2020, 3, 15));
  cuenta1.addOperacion(1850, Operacion.DEPOSITO, new Date(2020, 4, 8));
  cuenta1.addOperacion(3500, Operacion.DEPOSITO, new Date(2020, 5, 4));
}

function showOperaciones(cuenta) {
  const container = $("#operaciones-body");
  cuenta1.obtenerHistorico().forEach((op) => {
    container.append(
      `<div class="operacion">
        <div class="data">
          <span class="fecha">${op.fecha}</span>
          <span class="tipo">${op.tipo}</span>
        </div>
        <div class="monto">$${op.monto}</div>
      </div>`
    );
  });
}

function showSaldo() {
  $("#saldo-cuenta").append(`Saldo $ ${cuenta1.saldo}`);
}

//LLamado a la api
function consultaValorDolar() {
  const urlDolar = "https://api.bluelytics.com.ar/v2/latest";
  $.ajax({
    method: "GET",
    url: urlDolar,
    success: function (valorDolar) {
      $("#operacion-dolar").append(
        `<div class="style-dolar"><h1>Dolar oficial venta $ ${valorDolar.oficial.value_sell}</h1>
        <h1>Dolar oficial compra $ ${valorDolar.oficial.value_buy}</h1>
      <h1>Dolar blue venta  $ ${valorDolar.blue.value_sell}</h1>
      <h1>Dolar blue compra  $ ${valorDolar.blue.value_buy}</h1></div>`
      );
    },
  });
}

// Botones 
$("#consulta-saldo").on("click", showSaldo);
$("#dolar").on("click", consultaValorDolar);
$("#ultimos-movi").on("click", showOperaciones);

//LLamados de los eventos
initData();
setupEvent();
checkLogin();
