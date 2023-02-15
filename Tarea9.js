setTimeout(function () {
    document.getElementById("ejercicio").innerHTML = "Gracias por revisar la tarea :D";
}, 3000);

// Crendo una lista
var lista = document.createElement("ul");

var item1 = document.createElement("li");
item1.innerText = "Shampoo";
var item2 = document.createElement("li");
item2.innerText = "Acondicionador";
var item3 = document.createElement("li");
item3.innerText = "Maquillaje";
var item4 = document.createElement("li");
item4.innerText = "Crema";

lista.appendChild(item1);
lista.appendChild(item2);
lista.appendChild(item3);
lista.appendChild(item4);

document.getElementById("ejercicio2").appendChild(lista);


// Productos

const btnMostrarOcultar = document.getElementById("btn-mostrar-ocultar");
const contenedor = document.getElementById("div");

var elemento1 = document.createElement("div");
elemento1.innerHTML = "Marca: <span style='color: red;'>Garnier</span><br>" +
    "Cantidad: <span style='color: red;'>10</span><br>" +
    "Precio: <span style='color: red;'>50</span>";
elemento1.style.color = "black";
elemento1.style.margin = "10px";
elemento1.style.padding = "10px";
elemento1.style.border = "1px solid red";
contenedor.appendChild(elemento1);

var elemento2 = document.createElement("div");
elemento2.innerHTML = "Marca: <span style='color: red;'>Bisu</span><br>" +
    "Cantidad: <span style='color: red;'>100</span><br>" +
    "Precio: <span style='color: red;'>250</span>";
elemento2.style.color = "black";
elemento2.style.margin = "10px";
elemento2.style.padding = "10px";
elemento2.style.border = "1px solid red";
contenedor.appendChild(elemento2);

var elemento3 = document.createElement("div");
elemento3.innerHTML = "Marca: <span style='color: red;'>Cana</span><br>" +
    "Cantidad: <span style='color: red;'>80</span><br>" +
    "Precio: <span style='color: red;'>35</span>";
elemento3.style.color = "black";
elemento3.style.margin = "10px";
elemento3.style.padding = "10px";
elemento3.style.border = "1px solid red";
contenedor.appendChild(elemento3);

btnMostrarOcultar.addEventListener("click", () => {
    if (contenedor.style.display === "none") {
        contenedor.style.display = "block";
    } else {
        contenedor.style.display = "none";
    }
});

// saludo

let nombre = localStorage.getItem("nombre");

if (nombre === null) {
    nombre = prompt("Ingrese su nombre:");
    localStorage.setItem("nombre", nombre);
}

mostrarBienvenida(nombre);
function mostrarBienvenida(nombre) {
    alert(`¡Bienvenido nuevamente, ${nombre}!`);
    document.getElementById('reiniciar').style.display = 'block';
}

document.getElementById("reiniciar").addEventListener("click", function () {
    localStorage.removeItem("nombre");
    location.reload();
});