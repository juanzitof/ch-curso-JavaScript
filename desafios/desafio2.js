var respuesta = parseInt (prompt ("Cual es tu edad?:"));

var mayorDeEdad = respuesta >= 18;
console.log ("mayorDeEdad" ,mayorDeEdad)

var menorDeEdad = respuesta < 18;
console.log("menorDeEdad" ,menorDeEdad)

if (mayorDeEdad) {
alert ("Es mayor de edad y le da permiso para ingresar al sitio");
}else{
alert("Es menor de edad y no le da permiso para ingresar al sitio");
}