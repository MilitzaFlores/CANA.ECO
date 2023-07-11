let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const contenedorTotalFinal = document.querySelector("#carrito-comprado #totalfinal");
const contenedorCarritoProductosFinal = document.querySelector("#carrito-productos-final");


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">
                <small>Título</small>
                <h6>${producto.titulo}</h6>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <ion-icon name="remove-circle" class="menos"></ion-icon>
                <p class="cantidad-numero">${producto.cantidad}</p>
                <ion-icon name="add-circle" class="mas"></ion-icon>
            </div>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>$${producto.precio} MXN</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad} MXN</p>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}">
                <ion-icon class="trash" name="trash"></ion-icon>
            </button>
                `;
            contenedorCarritoProductos.append(div);
        })

        actualizarBotonesEliminar();
        actualizarSubtotal()
        actualizarTotal();

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto Eliminado",
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

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        customClass: {
            confirmButton: 'estilos-swal'
        }

    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    })
}

function actualizarSubtotal() {
    const contenedoresSubtotal = document.querySelectorAll('.carrito-producto-subtotal p');

    productosEnCarrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        contenedoresSubtotal[index].textContent = `$${subtotal} MXN`;
    });
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado} MXN`;
}

const botonesMenos = document.querySelectorAll(".menos");
const botonesMas = document.querySelectorAll(".mas");

botonesMenos.forEach((botonMenos) => {
    botonMenos.addEventListener('click', () => {
        const contenedorCantidad = botonMenos.parentNode.querySelector('p');
        let cantidad = parseInt(contenedorCantidad.textContent);
        if (cantidad > 0) {
            cantidad--;
            contenedorCantidad.textContent = cantidad;
            actualizarTotal();
            const idProducto = botonMenos.closest('.carrito-producto').querySelector('.carrito-producto-eliminar').id;
            const producto = productosEnCarrito.find(producto => producto.id === idProducto);
            producto.cantidad = cantidad;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            actualizarSubtotal();
            actualizarTotal();
        }
        if (cantidad === 0) {
            const contenedorProducto = botonMenos.closest('.carrito-producto');
            contenedorProducto.remove();
            actualizarTotal();
            const idProducto = contenedorProducto.querySelector('.carrito-producto-eliminar').id;
            productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== idProducto);
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            actualizarSubtotal();
            actualizarTotal();
            actualizarNumero();

            if (productosEnCarrito.length === 0) {
                contenedorCarritoVacio.classList.remove("disabled");
                contenedorCarritoProductos.classList.add("disabled");
                contenedorCarritoAcciones.classList.add("disabled");
                contenedorCarritoComprado.classList.add("disabled");
            }
        }
    });
});

botonesMas.forEach((botonMas) => {
    botonMas.addEventListener('click', () => {
        const contenedorCantidad = botonMas.parentNode.querySelector('p');
        let cantidad = parseInt(contenedorCantidad.textContent);
        cantidad++;
        contenedorCantidad.textContent = cantidad;
        actualizarTotal();
        const idProducto = botonMas.closest('.carrito-producto').querySelector('.carrito-producto-eliminar').id;
        const producto = productosEnCarrito.find(producto => producto.id === idProducto);
        producto.cantidad = cantidad;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        actualizarSubtotal();
        actualizarTotal();
        actualizarNumero();
    });
});

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
    contenedorCarritoProductosFinal.classList.remove("disabled");

    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotalFinal.innerText = `$${totalCalculado} MXN`;

    contenedorCarritoProductosFinal.innerHTML = "";

    productosEnCarrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">
                <small>Título</small>
                <h6>${producto.titulo}</h6>
            </div>
            <div class="carrito-producto-cantidad">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
        <small>Precio</small>
        <p>$${producto.precio} MXN</p>
    </div>
        `;
        contenedorCarritoProductosFinal.append(div);
    });

    localStorage.removeItem("productos-en-carrito");
}