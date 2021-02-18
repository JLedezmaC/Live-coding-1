/**
 * Live Coding 1
 * Vamos desarrollar un sistema para manejo de parqueos
 *
 * ¿Como funciona?
 * 1. El usuario ingresa la placa
 * 2. El usuario presiona enter o hace click en "Agregar"
 * 3. Se agrega el carro al primer parqueo que este libre, se agrega
      - Emoji de carro
      - Placa
      - Hora de entrada (cuando se agrega)
      - Boton de eliminar
 * 4. Al hacer click en el boton de "Eliminar" se elimina el carro del parqueo
 * 5.  Hay que actualizar el texto "Tienes N parqueos libres" cada vez que se agregue o
 *    elimine un carro
 *
 * //////// PARA LA CASA
 * 6. Cuando el parqueo este lleno (para la casa)
 *      6.1. cambiamos el texto a: "Parqueo lleno" en rojo.
 *      6.2. deshabiltamos el formulario, tanto el input como el boton
 *
 *      Para deshabilitar elemntos del formulario se usa el attr
 *      disabled, ejemplo: <button disabled="true">Agregar</button>
 *
 *      setAttribute
 *      removeAttribute
 * ////////////////////////
 *
 * Saber
 * 1. CSS selector para empty elements https://developer.mozilla.org/en-US/docs/Web/CSS/:empty
 * 2. Delegación de eventos: https://ed.team/blog/como-usar-la-delegacion-de-eventos-en-javascript
 *
 * ¿Que voy a evaluar?
 * 1. Que funcione y cumpla con los requerimientos
 * 2. Buenas practicas
 *
 */

/*
  PASOS:

  1. Agarrar el valor del input (placa) con un evento submit
  2. Calcular la hora y guardarla en una variable
  3. Crear los elementos para agregar a la tabla
  4. Recorremos hasta encontrar el primer campo vacio
  5. Agregar el carro al campo vacio
  6. Actualizar el mensaje de parqueos libres
     - Guardar la <b> dentro del <h3>
     - Agarramos todos los espacios vacios
     - Usar innerText para actualizar el numero

  <span>🚗</span>
  <small>BBR-449</small>
  <small>7:14am</small>
  <button class="botonEliminar">Eliminar</button>

    celdaVacia.innerHTML = `
    <span>🚗</span>
    <small>${input.value}</small>
    <small>${hora}</small>
    <button>Eliminar</button>
  `;

 */

const formulario = document.querySelector("form");
const table = document.querySelector("table");
const input = document.querySelector('form input[type="text"]');

table.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.innerHTML = "";
    actualizarMensaje(input);
  }
});

const crearElementos = (hora, placa) => {
  const celdaVacia = document.querySelector("td:empty");
  /*
  const vehiculoIcono = document.createElement("span");
  const placaNuevoIngreso = document.createElement("small");
  const horaNuevoIngreso = document.createElement("small");
  const botonEliminar = document.createElement("button");
  */

  celdaVacia.innerHTML=`
  <span>🚗</span>
  <small>${placa}</small>
  <small>${hora}</small>
  <button>Eliminar</button>
`;
/*
  vehiculoIcono.innerText = "🚗";
  placaNuevoIngreso.innerText = placa;
  horaNuevoIngreso.innerText = hora;
  botonEliminar.innerText = "Eliminar";
/*
  celdaVacia.appendChild(vehiculoIcono);
  celdaVacia.appendChild(placaNuevoIngreso);
  celdaVacia.appendChild(horaNuevoIngreso);
  celdaVacia.appendChild(botonEliminar);
  */
};

const AumentaroDisminuirParqueos = (espaciosLibres,celdasVacias) => {
  const boton = document.querySelector('form button');
  if(celdasVacias.length === 0){
    boton.disabled = true
    input.disabled = true
    espaciosLibres.innerHTML = "Parqueo lleno";
    espaciosLibres.classList.add('red');
  }else if (celdasVacias.length === 1){
    espaciosLibres.innerHTML = `tiene ${celdasVacias.length} parqueo libre`;
    espaciosLibres.classList.remove('red');
    boton.disabled = false
    input.disabled = false
  }else{
    espaciosLibres.innerHTML = `tienes ${celdasVacias.length} parqueos libres`;
    espaciosLibres.classList.remove('red');
    boton.disabled = false
    input.disabled = false
  }
}

const actualizarMensaje = () => {
  // Guardar el b dentro del h3
  const espaciosLibres = document.querySelector("body h3");

  // Agarrar todos las celdas vacias
  const celdasVacias = document.querySelectorAll("td:empty");

  // Agregar la cantidad de celdas vacias a `espaciosLibres`
  espaciosLibres.innerText = celdasVacias.length;

  AumentaroDisminuirParqueos(espaciosLibres,celdasVacias)
};


formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const fecha = new Date();
  const horaActual = fecha.getHours() + ":" + fecha.getMinutes();

  if (input.value) {
    crearElementos(horaActual, input.value);
    actualizarMensaje(input);
  } else {
    alert("Favor ingrese una placa");
  }

  input.value = "";
});
