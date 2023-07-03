document.addEventListener("DOMContentLoaded", function() {
  const sucursalDestinoSelect = document.getElementById("sucursalDestinoSelect");
  const kilosInput = document.getElementById("kilosInput");
  const calcularButton = document.getElementById("calcularButton");
  const productosList = document.getElementById("productosList");
  const totalMensaje = document.getElementById("totalMensaje");
  const borrarTodoButton = document.getElementById("borrarTodoButton");

  calcularButton.addEventListener("click", async function() {
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
    await actualizarTotal(productos);

    kilosInput.value = "";
    kilosInput.placeholder = "0";
    sucursalDestinoSelect.disabled = true;

    // Mostrar notificación con Toastify
    Toastify({
      text: "Agregaste el producto a tu carrito",
      backgroundColor: "green",
      duration: 3000
    }).showToast();
  });

  borrarTodoButton.addEventListener("click", function() {
    sessionStorage.removeItem("productos");
    sucursalDestinoSelect.disabled = false;
    productosList.innerHTML = "";
    totalMensaje.textContent = "";

    // Mostrar notificación con Toastify
    Toastify({
      text: "Carrito vaciado correctamente",
      backgroundColor: "red",
      duration: 3000
    }).showToast();
  });

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

      let basureroImg = document.createElement("img");
      basureroImg.src = "../img/x-circle.svg";
      basureroImg.alt = "Eliminar";
      basureroImg.classList.add("basurero");

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

    // Mostrar notificación con Toastify
    Toastify({
      text: "Eliminaste el producto del carrito",
      backgroundColor: "red",
      duration: 2000
    }).showToast();
  }

  async function actualizarTotal(productos) {
    let total = 0;
    let totalKilos = 0;
    let totalDiasEnvio = 0;

    for (let i = 0; i < productos.length; i++) {
      total += productos[i].costo;
      totalKilos += productos[i].kilos;
    }

    const response = await fetch('../json/datos.json');
    const data = await response.json();
    totalDiasEnvio = calcularDiasEnvio(totalKilos, data);

    totalMensaje.textContent = `Total a abonar: $${total.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} (${totalKilos.toLocaleString()} kg). Llegada estimada en ${totalDiasEnvio} días.`;
  }

  function calcularDiasEnvio(kilos, data) {
    const envio = data.find((item) => kilos >= item.min && kilos <= item.max);

    if (envio) {
      return envio.dias;
    } else {
      return 'No disponible';
    }
  }

  let productos = JSON.parse(sessionStorage.getItem("productos")) || [];
  actualizarListaProductos(productos);
  actualizarTotal(productos);
});
