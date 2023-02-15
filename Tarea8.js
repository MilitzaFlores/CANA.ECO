// marcas con stock y sin stock, el arreglo se llamara PRODUCTOS, solo en los que tengan mayor a 0

for (let i = 0; i < productos.length; i++) {
    if (productos[i].stock > 0) {
        console.log(productos[i].nombre + " - Disponible"); // Imprime el nombre del producto si tiene stock
    } else {
        console.log(productos[i].nombre + " - Agotado"); // Imprime el nombre del producto si no tiene stock
    }
}

// productos que cuesten más de 200, el arreglo se llamara PRODUCTOS

for (let i = 0; i < productos.length; i++) {
    if (productos[i].precio > 200) {
        console.log(productos[i]); // Imprime el objeto si el precio es mayor a 200
    }
}

// sacando el promedio de los productos

let precioTotal = 0;

for (let i = 0; i < productos.length; i++) {
    precioTotal += productos[i].precio; // Suma el precio de cada producto al total
}

let precioPromedio = precioTotal / productos.length; // Calcula el precio promedio

console.log("El precio promedio de los productos es: " + precioPromedio);

// imprimiendo el producto mas costodo y redondeando a entero

let productoMasCostoso = productos[0];

for (let i = 1; i < productos.length; i++) {
    if (productos[i].precio > productoMasCostoso.precio) {
        productoMasCostoso = productos[i];
    }
}

let precioRedondeado = Math.round(productoMasCostoso.precio);

console.log("El producto más costoso es: " + productoMasCostoso.nombre);
console.log("Su precio es: " + precioRedondeado);

// ordenando una lista alfabeticamente

function sortList() {
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("productos");
    switching = true;
    while (switching) {
        switching = false;
        b = list.getElementsByTagName("LI");
        for (i = 0; i < (b.length - 1); i++) {
            shouldSwitch = false;
            if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
        }
    }
}