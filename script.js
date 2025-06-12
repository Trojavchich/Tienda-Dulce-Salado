(function() {
  emailjs.init("gYxdOejQbwkC-AfE5"); // Reemplazá con tu PUBLIC KEY real
})();

let carrito = [];
const listaCarrito = document.getElementById("lista-carrito");
const totalEl = document.getElementById("total");
const textareaPedido = document.getElementById("pedido");

const productosDisponibles = [
  { nombre: "Tarta de Frutilla", precio: 2500 },
  { nombre: "Torta de Chocolate", precio: 3000 },
  { nombre: "Pizzeta Napolitana", precio: 2000 }
];

function agregarAlCarrito(nombre) {
  const producto = productosDisponibles.find(p => p.nombre === nombre);
  carrito.push(producto);
  renderizarCarrito();
}

function renderizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach((item) => {
    total += item.precio;
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    listaCarrito.appendChild(li);
  });
  totalEl.textContent = `Total: $${total}`;
  if (textareaPedido) {
    textareaPedido.value = carrito.map(p => `${p.nombre} - $${p.precio}`).join("\n") + `\nTotal: $${total}`;
  }
}

function enviarPedido() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const mensaje = carrito.map(p => `${p.nombre} - $${p.precio}`).join("\n");
  const total = carrito.reduce((sum, p) => sum + p.precio, 0);

  emailjs.send("service_m3xgav8", "template_lgw0eji", {
    mensaje: mensaje,
    total: `$${total}`,
    para: "trojavchichtomi@gmail.com"
  })
  .then(() => {
    alert("Pedido enviado correctamente.");
    carrito = [];
    renderizarCarrito();
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Error al enviar el pedido.");
  });
}
