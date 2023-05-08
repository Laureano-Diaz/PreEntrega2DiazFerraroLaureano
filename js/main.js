let nombre = prompt("Ingresa tu nombre")
let sucursal= parseInt(prompt("Bienvenido/a "+ nombre + "!\n"+"Indica el numero de sucursal a la que deseas enviar tu pedido\n"+"1-Rosario\n2-Paraná\n3-Puerto Madryn"))
let kilos =parseInt(prompt("Ingresa los kilos del producto que deseas enviar."));

let precioFinal = 0;


while (kilos != "0") {
    
    
    let destino = sucursal;
    

    if (sucursal==1 ||sucursal=="Rosario" || sucursal== "rosario" ) {
        console.log("La sucursal seleccionada es Rosario."); 
    } else if (sucursal==2 ||sucursal=="Paraná" || sucursal== "paraná"){
        console.log("La sucursal seleccionada es Paraná.");
    } else if (sucursal==3 ||sucursal=="Puerto Madryn" || sucursal== "puerto madryn") {
        console.log("La sucursal seleccionada es Puerto Madryn.");
    }  else{
        console.log("No has seleccionado una sucursal correctamente.");
    }
    console.log("Ingresaste " + kilos + " kilos.");
      //Valores segun distancia
      let rosario = 52.7;
      let parana = 105.9;
      let puertoMadryn = 236.3;
      

    //Calculo de valor final
    let precioItem 

    if (destino==1) {
        console.log(kilos * rosario);
        precioItem= kilos * rosario;
    } else if(destino==2) {
        console.log( kilos * parana);
        precioItem= kilos * parana
    } else if (destino ==3) {
        console.log( kilos * puertoMadryn);
        precioItem = kilos * puertoMadryn
    } else{
    }

    function total(n1,n2) {
        precioFinal = precioFinal + precioItem;    
    }
    
    total()
    

    
    //Condicion de salida
    kilos =parseInt(prompt("Ingresa los kilos del nuevo producto que deseas enviar.\nSi no deseas enviar mas productos, ingresa 0."))
}

console.log("El monto a abonar es de $" + precioFinal.toLocaleString()+ ".");   
alert("El monto a abonar es de $" + precioFinal.toLocaleString()+ ".")
    

