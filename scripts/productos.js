let productos = [];

fetch("./scripts/productos.json")
    .then(response => {
        if (!response.ok) throw new Error("No se pudo cargar el catálogo.");
        return response.json();
    })
    .then(async data => {
        try {
            const inventario = await window.cargarInventario();
            productos = data.map(producto => ({
                ...producto,
                stock: inventario.get(window.normalizarIdInventario(producto.id)) ?? 0
            }));
            inventarioDisponible = true;
        } catch (error) {
            console.error("No se pudo cargar el inventario:", error);
            productos = data.map(producto => ({ ...producto, stock: null }));
            contenedorEstadoInventario.textContent = "No se pudo consultar el inventario. Intenta recargar la página.";
        }
        cargarProductos(productos);
    })
    .catch(error => {
        console.error("No se pudo cargar la tienda:", error);
        contenedorEstadoInventario.textContent = "No se pudo cargar el catálogo.";
    });

const contenedorProductos = document.querySelector("#contenedor-productos");
const contenedorEstadoInventario = document.querySelector("#estado-inventario");
let inventarioDisponible = false;
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
let productosbuscar = document.querySelectorAll("mySearch");
const numero = document.querySelector("#numero");
const ecologicos = document.querySelector("variados");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const stockConocido = inventarioDisponible && Number.isInteger(producto.stock);
        const hayStock = stockConocido && producto.stock > 0;
        const textoBoton = !inventarioDisponible ? "Inventario no disponible" : "Agotado";

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <div class="card">
        <div class="row g-0">
            <div class="col-md-4 detalles">
                <a href="${producto.imagen}" data-featherlight="${producto.imagen}"><img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}"></a>
            </div>
            <div class="col-md-8 producto-contenido">
                <p class="producto-titulo variante">${producto.titulo}</p>
                <span class="ingredientes">${producto.ingredientes}</span>
                <p class="producto-titulo producto-precio">$${producto.precio} MXN</p>
            </div>
            <div class="col-12 producto-acciones">
                <div class="producto-botones">
                    <button class="btn detalles-btn" type="button"
                        aria-expanded="false"
                        aria-controls="collapseWidthExample-${producto.id}">
                        Detalles
                    </button>
                    <button class="producto-agregar" id="${producto.id}" ${hayStock ? "" : "disabled"}>${hayStock ? "Agregar" : textoBoton}</button>
                </div>
                <div class="collapse collapse-horizontal" id="collapseWidthExample-${producto.id}">
                    <div class="card card-body">
                        ${producto.detalles}
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
        `;
        contenedorProductos.append(div);
    })
    igualarAlturaTarjetas();
    actualizarBotonesAgregar();
    scrollToTop();
}

function igualarAlturaTarjetas() {
    const tarjetas = Array.from(contenedorProductos.querySelectorAll(".producto > .card"));

    if (window.innerWidth < 768) {
        tarjetas.forEach(tarjeta => {
            tarjeta.style.height = "";
        });
        return;
    }

    if (contenedorProductos.querySelector(".collapse.show, .collapsing")) {
        return;
    }

    tarjetas.forEach(tarjeta => {
        tarjeta.style.height = "";
    });

    for (let index = 0; index < tarjetas.length; index += 2) {
        const fila = tarjetas.slice(index, index + 2);
        const altura = Math.ceil(Math.max(...fila.map(tarjeta => tarjeta.getBoundingClientRect().height)));

        fila.forEach(tarjeta => {
            tarjeta.style.height = `${altura}px`;
        });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const botonesFiltroPrecio = document.querySelectorAll(".filtro-precio");

botonesFiltroPrecio.forEach(boton => {
    boton.addEventListener("click", () => {
        const precioMinimo = Number(boton.dataset.min);
        const precioMaximo = Number(boton.dataset.max);

        const productosFiltrados = productos.filter(producto => {
            return producto.precio >= precioMinimo && producto.precio <= precioMaximo;
        });

        cargarProductos(productosFiltrados);
    });
});

const btnMasVendidos = document.querySelector("#btn-mas-vendidos");
const btnNuevos = document.querySelector("#btn-nuevos");

btnMasVendidos.addEventListener("click", () => {
    const productosMasVendidos = productos.filter(producto => producto.masVendido === true);
    cargarProductos(productosMasVendidos);
});

btnNuevos.addEventListener("click", () => {
    const productosNuevos = productos.filter(producto => producto.esNuevo === true);
    cargarProductos(productosNuevos);
});

contenedorProductos.addEventListener("click", event => {
    const button = event.target.closest(".detalles-btn");
    if (!button) {
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    const panel = document.getElementById(button.getAttribute("aria-controls"));
    if (!panel || panel.classList.contains("collapsing")) {
        return;
    }

    const instance = bootstrap.Collapse.getInstance(panel) ||
        new bootstrap.Collapse(panel, { toggle: false });

    if (panel.classList.contains("show")) {
        instance.hide();
        return;
    }

    const openPanel = contenedorProductos.querySelector(".collapse.show, .collapsing");
    if (!openPanel) {
        instance.show();
        return;
    }

    const openInstance = bootstrap.Collapse.getInstance(openPanel) ||
        new bootstrap.Collapse(openPanel, { toggle: false });
    const showSelectedPanel = () => {
        openPanel.addEventListener("hidden.bs.collapse", () => instance.show(), { once: true });
        openInstance.hide();
    };

    if (openPanel.classList.contains("collapsing")) {
        openPanel.addEventListener("shown.bs.collapse", showSelectedPanel, { once: true });
    } else {
        showSelectedPanel();
    }
});

contenedorProductos.addEventListener("show.bs.collapse", event => {
    const tarjeta = event.target.closest(".producto > .card");
    if (tarjeta) {
        tarjeta.style.height = "auto";
    }
    event.target.closest(".producto-acciones").querySelector(".detalles-btn").setAttribute("aria-expanded", "true");
});

contenedorProductos.addEventListener("hide.bs.collapse", event => {
    event.target.closest(".producto-acciones").querySelector(".detalles-btn").setAttribute("aria-expanded", "false");
});

contenedorProductos.addEventListener("hidden.bs.collapse", igualarAlturaTarjetas);
window.addEventListener("resize", () => {
    if (!contenedorProductos.querySelector(".collapse.show, .collapsing")) {
        igualarAlturaTarjetas();
    }
});

document.addEventListener('click', () => {
    const collapsibleElements = document.querySelectorAll('.collapse');

    collapsibleElements.forEach((element) => {
        if (!element.classList.contains('show')) {
            return;
        }

        const collapse = bootstrap.Collapse.getInstance(element);
        collapse.hide();
    });
});

function myFunction() {
    var input, filter, productos, i;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    productos = document.querySelectorAll(".producto");

    for (i = 0; i < productos.length; i++) {
        const producto = productos[i];
        const tituloProducto = producto.querySelector(".producto-titulo").textContent.toUpperCase();
        const ingredientesProducto = producto.querySelector(".ingredientes").textContent.toUpperCase();
        const precioProducto = producto.querySelector(".producto-precio").textContent.toUpperCase();
        const productoEncontrado = tituloProducto.indexOf(filter) > -1 || ingredientesProducto.indexOf(filter) > -1 || precioProducto.indexOf(filter) > -1;
        if (productoEncontrado) {
            producto.style.display = "";
        } else {
            producto.style.display = "none";
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
            tituloPrincipal.innerText = "Catálogo";
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

async function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const botonAgregar = e.currentTarget;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (!productoAgregado) return;

    botonAgregar.disabled = true;
    let inventarioActual;

    try {
        inventarioActual = await window.cargarInventario();
    } catch (error) {
        console.error("No se pudo actualizar el inventario:", error);
        Toastify({
            text: "No se pudo verificar el inventario. Intenta de nuevo.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right"
        }).showToast();
        return;
    }

    productoAgregado.stock = inventarioActual.get(window.normalizarIdInventario(idBoton)) ?? 0;
    const productoEnCarrito = productosEnCarrito.find(producto => producto.id === idBoton);
    const cantidadActual = productoEnCarrito ? productoEnCarrito.cantidad : 0;

    if (productoAgregado.stock <= cantidadActual) {
        botonAgregar.textContent = productoAgregado.stock === 0 ? "Agotado" : "Máximo en carrito";
        botonAgregar.disabled = productoAgregado.stock === 0;
        Toastify({
            text: "No hay más existencias disponibles para agregar",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right"
        }).showToast();
        return;
    }

    botonAgregar.disabled = false;

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
            x: '5rem',
            y: '5rem'
        },
        onClick: function () {}
    }).showToast();

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
