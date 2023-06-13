document.addEventListener("DOMContentLoaded", function() {
  const sucursalDestinoSelect = document.getElementById("sucursalDestinoSelect");
  const kilosInput = document.getElementById("kilosInput");
  const calcularButton = document.getElementById("calcularButton");
  const productosList = document.getElementById("productosList");
  const totalMensaje = document.getElementById("totalMensaje");
  const borrarTodoButton = document.getElementById("borrarTodoButton");

  calcularButton.addEventListener("click", function() {
    let sucursalDestino = sucursalDestinoSelect.value;
    let kilos = parseInt(kilosInput.value);

    if (sucursalDestino === "") {
      totalMensaje.textContent = "Por favor, selecciona la sucursal de destino.";
      return;
    }

    let costoEnvio = calcularCostoEnvio(sucursalDestino, kilos);
    let producto = {
      sucursalSalida: "Rosario",
      sucursalDestino: sucursalDestinoSelect.options[sucursalDestino - 1].text,
      kilos: kilos,
      costo: costoEnvio
    };

    let productos = JSON.parse(sessionStorage.getItem("productos")) || [];
    productos.push(producto);
    sessionStorage.setItem("productos", JSON.stringify(productos));

    actualizarListaProductos(productos);
    actualizarTotal(productos);

    kilosInput.value = "";
    kilosInput.placeholder = "0";
    sucursalDestinoSelect.disabled = true;
  });
//Elimina los items para volver a empezar
  borrarTodoButton.addEventListener("click", function() {
    sessionStorage.removeItem("productos");
    sucursalDestinoSelect.disabled = false;
    productosList.innerHTML = "";
    totalMensaje.textContent = "";
  });
//Costo de envio segun seleccion
  function calcularCostoEnvio(sucursalDestino, kilos) {
    let sucursales = [
      { nombre: "Rosario", costo: 52.7 },
      { nombre: "Paraná", costo: 105.9 },
      { nombre: "Puerto Madryn", costo: 236.3 },
      { nombre: "La Pampa", costo: 82.5 }
    ];

    let seleccionSucursalDestino = sucursales[parseInt(sucursalDestino) - 1];

    return seleccionSucursalDestino.costo * kilos;
  }

  function actualizarListaProductos(productos) {
    productosList.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
      let producto = productos[i];
      let listItem = document.createElement("li");
      let numeroProducto = i + 1;

      listItem.textContent = `${numeroProducto}: ${producto.kilos} kg - $${producto.costo.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;

      // Crear el elemento de imagen del basurero
      let basureroImg = document.createElement("img");
      basureroImg.src = "../img/x-circle.svg";
      basureroImg.alt = "Eliminar";
      basureroImg.classList.add("basurero"); 

      // Agregar un evento de clic para manejar la eliminación del producto
      basureroImg.addEventListener("click", function() {
        eliminarProducto(i);
      });

      listItem.appendChild(basureroImg);

      productosList.appendChild(listItem);
    }
  }

  function eliminarProducto(index) {
    let productos = JSON.parse(sessionStorage.getItem("productos")) || [];
    productos.splice(index, 1);
    sessionStorage.setItem("productos", JSON.stringify(productos));

    actualizarListaProductos(productos);
    actualizarTotal(productos);
  }

  function actualizarTotal(productos) {
    let total = 0;
    let totalKilos = 0;

    for (let i = 0; i < productos.length; i++) {
      total += productos[i].costo;
      totalKilos += productos[i].kilos;
    }

    totalMensaje.textContent = `Total a abonar: $${total.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} (${totalKilos.toLocaleString()} kg)`;
  }

  let productos = JSON.parse(sessionStorage.getItem("productos")) || [];
  actualizarListaProductos(productos);
  actualizarTotal(productos);
});
