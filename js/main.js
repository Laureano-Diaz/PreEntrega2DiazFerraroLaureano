let nombre = prompt("Ingresa tu nombre")
let sucursal= parseInt(prompt("Bienvenido/a "+ nombre + "!\n"+"Indica el numero de sucursal a la que deseas enviar tu pedido\n"+"1-Rosario\n2-Paraná\n3-Puerto Madryn"))
let kilos =parseInt(prompt("Ingresa los kilos del producto que deseas enviar."));

//Acumula lo que se va a enviar
kilosAgregados = []

var seleccionSucursal;
//Sucursal a la que se desea enviar
switch (sucursal) {
  case 1:
    seleccionSucursal = {
      nombre: "Rosario",
      costo: 52.7,
    };
    break;
  case 2:
    seleccionSucursal = {
      nombre: "Paraná",
      costo: 105.9,
    };
    break;
  case 3:
    seleccionSucursal = {
      nombre: "Puerto Madryn",
      costo: 236.3,
    };
    break;
  default:
    // Sucursal inválida o no reconocida
    alert("La sucursal ingresada no es válida.");
    break;
}

console.log("La sucursal seleccionada es " + seleccionSucursal.nombre);

//Ingresa la cantidad de productos que desea.
while (kilos != "0") {
    
    console.log("Ingresaste " + kilos + " kilos.");

    kilosAgregados.push(kilos);
    
    //Condicion de salida
    kilos =parseInt(prompt("Ingresa los kilos del nuevo producto que deseas enviar.\nSi no deseas enviar mas productos, ingresa 0."))
}
 
//Se calcula lo que se envia por el costo
function precioFinal(seleccionSucursal, kilosAgregados) {
    var sumarKilos = kilosAgregados.reduce(function(a, b) {
      return a + b;
    }, 0);
  
    return sumarKilos * seleccionSucursal.costo;
  }
 
  var resultado = precioFinal(seleccionSucursal, kilosAgregados);
console.log(resultado);

//Se notifica el monto a pagar
 console.log("El monto a abonar es de $" + resultado.toLocaleString()+ ".");   
alert("El monto a abonar es de $" + resultado.toLocaleString()+ ".")
 