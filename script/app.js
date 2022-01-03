import { Usuario, Cuenta, Operacion } from "./Clases.js";
const DATE_FORMAT = "DD/MM/YYYY HH:mm:ss"
var user = null;
var access = false;
const USER_KEY = "USER_KEY";
var cuenta1 = null;
var usuario1 = null;

function formatDate(date){
  return dayjs(date).format(DATE_FORMAT)
}

function checkLogin() {
  toggleLoading(true);
  const data = localStorage.getItem(USER_KEY);

  if (data) {
    access = true;
    const objData = JSON.parse(data);
    
    printuserNameLabel(`${objData.nombre} ${objData.apellido}`);

    fetchOperaciones(()=>{
      showSaldo();
      showOperaciones();

      cambiarPage(`home-page`)
      toggleLoading(false)
    });
    
  } else {
    toggleLoading(false)
    cambiarPage(`login-page`)
  }
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
  var form = document.getElementById("dataForm");
  form.addEventListener("submit", enviarFormulario);

  //Modal de deposito
  $("#deposito").on("click", openDeposito);
  $("#closeD").on("click", closeDeposito);

  var formDepo = document.getElementById("dataDepo");
  formDepo.addEventListener("submit", envioDeposito);


  // Botones 
  $("#consulta-saldo").on("click", showSaldo);
  $("#dolar").on("click", consultaValorDolar);
}

function enviarFormulario(event) {
  event.preventDefault();
  const form = document.getElementById("dataForm");

  const data = new FormData(form);
  const obtDataName = data.get("userName");
  const obtDataPass = data.get("password");

  if (usuario1.ingreso(obtDataName, obtDataPass)) {
    toggleLoading(true);
    const userData = {
      nombre: usuario1.nombre,
      apellido: usuario1.apellido,
      userName: obtDataName,
      numeroCuenta: cuenta1.numeroCuenta,
    };

    var userDataString = JSON.stringify(userData);
    localStorage.setItem(USER_KEY, userDataString);

    dataForm.reset();
    
    
    printuserNameLabel(`${userData.name} ${userData.lastName}`);
    
    closeModal();
    fetchOperaciones(()=> {
      showSaldo();
      showOperaciones();
      cambiarPage(`home-page`)
      toggleLoading(false);
    });
      

  } else {
    alert("Password incorrecto");
    return;
  }
}

function fetchOperaciones(onFinish) {
  $.get("../data/operaciones.json", (data) => {
    console.log(data)
    data.forEach(op => cuenta1.addOperacion(op.monto, op.tipo, op.fecha ))

    setTimeout(() => {
      onFinish()
    }, 1000)
    
})
}

function envioDeposito(event) {
  event.preventDefault();
  const formDepo = document.getElementById("dataDepo");
  const dataDepo = new FormData(formDepo);
  const deposito = dataDepo.get("cant-depositar");
  
  if(deposito && deposito !== "" && !isNaN(deposito)){
    const deposito = parseInt($("#cant-depositar").val());
    
    cuenta1.addOperacion(deposito, Operacion.DEPOSITO, new Date())
    showOperaciones();
  }
  closeDeposito();
  alert("Su deposito a sigo exitoso!");
}

//Imprimir
function printuserNameLabel(name) {
  $("#nombre").html(`Bienvenido ${name}`);
}

function showOperaciones(){
  $("#operaciones-body").html("")
    cuenta1.obtenerHistorico().forEach((op) => {
    $("#operaciones-body").append(
     `<div class="operacion">
     <div class="data">
      <span class="fecha">${formatDate(op.fecha)}</span>
      <span class="tipo">${op.tipo}</span>
    </div>
   <div class="monto">$${op.monto}</div>
 </div>`
  );
});
}

function initData() {
  usuario1 = new Usuario("Ricardo", "Jhonson", "rick6", "1234");
  cuenta1 = new Cuenta(usuario1, 0, Cuenta.generarNumeroCuenta());

  // Agrego operaciones para demostracion
  // cuenta1.addOperacion(300, Operacion.DEPOSITO, new Date(2020, 1, 24, 20,30,15));
  // cuenta1.addOperacion(1500, Operacion.DEPOSITO, new Date(2020, 2, 14, 19,25,10 ));
  // cuenta1.addOperacion(10000, Operacion.DEPOSITO, new Date(2020, 3, 15, 14,15,25));
  // cuenta1.addOperacion(1850, Operacion.DEPOSITO, new Date(2020, 4, 8, 11,29,45));
  // cuenta1.addOperacion(3500, Operacion.DEPOSITO, new Date(2020, 5, 4, 12,10,45));
}


function showSaldo() {
  $("#saldo-cuenta").html(`$${cuenta1.saldo}`);
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

const toggleLoading = (visible) => {
  if (visible) {
    $('#main-loading').fadeIn()
  } else {
    $('#main-loading').fadeOut()
  }
}

function logout (){
  toggleLoading(true);
  localStorage.setItem(USER_KEY, null);
  


}
//LLamados de los eventos
initData();
setupEvent();
checkLogin();

function cambiarPage(idPage) {
  $(".page").fadeOut(500, () => {
    $(`#${idPage}`).fadeIn(500);
  })
}

// logout 
//    - mostrar loading
//    - limpiar local Storage
//    - ocultar home-page
//    - mostrar login-page
//    - ocultar loading
   