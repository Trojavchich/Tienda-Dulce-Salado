let carrito = [];
const listaCarrito = document.getElementById("lista-carrito");
const totalEl = document.getElementById("total");

const productosDisponibles = [
  { nombre: "Tarta de Frutilla", precio: 2500 },
  { nombre: "Torta de Chocolate", precio: 3000 },
  { nombre: "Pizzeta Napolitana", precio: 2000 }
];

function agregarAlCarrito(nombre) {
  const producto = productosDisponibles.find(p => p.nombre === nombre);
  if (producto) {
    carrito.push(producto);
    renderizarCarrito();
  }
}

function renderizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach(item => {
    total += item.precio;
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    listaCarrito.appendChild(li);
  });
  totalEl.textContent = `Total: $${total}`;
}

function enviarPedido() {
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const comentario = document.getElementById("mensaje").value.trim();

  if (!nombre || !email) {
    alert("Por favor completá tu nombre y correo.");
    return;
  }

  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const mensaje = carrito.map(p => `${p.nombre} - $${p.precio}`).join("\n");
  const total = carrito.reduce((sum, p) => sum + p.precio, 0);

  const templateParams = {
    nombre_cliente: nombre,
    email_cliente: email,
    mensaje: mensaje + (comentario ? `\n\nComentario: ${comentario}` : ""),
    total: `$${total}`
  };

  console.log("Enviando datos:", templateParams);

  emailjs.send("service_m3xgav8", "template_lgw0eji", templateParams)
    .then(() => {
      alert("Pedido enviado correctamente.");
      carrito = [];
      renderizarCarrito();
      document.getElementById("formulario").reset();
    })
    .catch((error) => {
      console.error("Error al enviar pedido:", error);
      alert("Error al enviar el pedido.");
    });
}
