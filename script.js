/**
const boton_cambiar = document.querySelector('#btn-cambiar');

boton_cambiar.addEventListener("click", () =>{

  const mensaje = document.querySelector('#mensaje');

  mensaje.textContent = "Este mensaje viene de JavaScript, k lo que manito"

})

// Apartado 2.
// La pagina saluda al usuario por el nombre que ingresó.

const boton_saludar = document.querySelector('#btn-saludar');

boton_saludar.addEventListener("click", () => {
  const cuadroTexto = document.querySelector('#nombre');

  if (cuadroTexto.value.trim() === "") {
    alert("Debe ingresar un nombre para saludar")
  } else {
    alert("Hola " + cuadroTexto.value)
  }

  cuadroTexto.value = "";
})

// Apartado 4.
// Agregar productos a la lista de productos.

const boton_agregar = document.querySelector('#btn-agregar');

boton_agregar.addEventListener("click", () => {
  const producto = document.querySelector('#producto');
  const lista = document.querySelector('#lista-productos');

  let li = document.createElement('li')
  li.textContent = producto.value;
  producto.value = "";

  lista.appendChild(li);

})
 */

const btn_comprar = document.querySelector('#btn-comprar');

btn_comprar.addEventListener("click", () => {
  const lista = document.querySelector('#lista-productos');
  const productos = lista.querySelectorAll('li');
})