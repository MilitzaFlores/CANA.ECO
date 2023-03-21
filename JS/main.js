setTimeout(function () {
    document.getElementById("textobienvenida").innerHTML = "¡Bienvenid@ A Nuestra Tienda!";
}, 3000);

let productos = [];

fetch("./JS/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
let productosbuscar = document.querySelectorAll("mySearch");
const numero = document.querySelector("#numero");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <div class=" card mb-3">
        <div class="row g-0">
            <div class="col-md-4 columnas">
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <p>
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseWidthExample-${producto.id}" aria-expanded="false"
                        aria-controls="collapseWidthExample-${producto.id}">
                        Detalles
                    </button>
                </p>
                <div>
                    <div class="collapse collapse-horizontal" id="collapseWidthExample-${producto.id}">
                        <div class="card card-body" style="width: 500px;">
                            ${producto.detalles}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8 producto-detalles">
                <p class="producto-titulo variante">${producto.titulo}</p>
                <span class="ingredientes">${producto.ingredientes}</span>
                <p class="producto-titulo">$${producto.precio} MXN</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        </div>
    </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

function myFunction() {
    // Declare variables
    var input, filter, productos, i;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    productos = document.querySelectorAll(".producto");

    // Loop through all products, and hide those that don't match the search query
    for (i = 0; i < productos.length; i++) {
        const tituloProducto = productos[i].querySelector(".producto-titulo").textContent.toUpperCase();
        if (tituloProducto.indexOf(filter) > -1) {
            productos[i].style.display = "";
        } else {
            productos[i].style.display = "none";
        }
    }
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos Los Productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumero();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #36475B, #334A61)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '6rem',
            y: '6rem'
        },
        onClick: function () {}
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumero();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumero() {
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumero;
}