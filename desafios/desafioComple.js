///Calculador de propina

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

function calculadorPropina(total, porc) {
	var resultado = total * porc / 100;
  console.log('El resultado de la propina a dar es:' + resultado);
  return resultado; 
}

// Main
function main() {
  var ingresoFact = parseFloat(pedirDato("Ingrese total de facturacion:", validadorNumero));
  console.log(`Ingreso total de facturacion: ${ingresoFact}`);
  var porcentaje = parseFloat(pedirDato("Ingrese porcentaje a dar:", validadorNumero));
  console.log(`Ingreso porcentaje a dar: ${porcentaje}`);

  if (ingresoFact && porcentaje) {
    var resultado = calculadorPropina(ingresoFact, porcentaje);
    alert(`La propina a entregar es de: ` + resultado);
  }
}
main();