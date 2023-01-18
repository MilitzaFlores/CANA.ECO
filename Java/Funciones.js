function SumarParametros(numero1, numero2, numero3) {
    conts resultado = numero1 + numero2 + numero3;
    console.log(resultado);
}
SumarParametros(1, 2, 3);

function Comparar(numero1, numero2) {
    if (numero1 > numero2) {
        console.log("No se puede efectuar la compra");
    } else {

    }
    numero1 > numero2
    console.log(resultado);
}

function SumarParametros(numero1, numero2, numero3) {
    const resultado = numero1 + numero2 + numero3;
    console.log(resultado);
}
SumarParametros(1, 2, 3);

function Comparar(numero1, numero2) {
    if (numero1 > numero2) {
        console.log("No se puede efectuar la compra");
    } else {
        console.log("La compra se puede efectuar");
    }
}
Comparar(1,2);

const {
    nombre: nombreUsuario,
    edad: edadUsuario,
    trabajo: trabajoUsuario
} = objeto;
console.log(nombreUsuario);
console.log(edadUsuario);
console.log(trabajoUsuario);

const arreglo = ["Hola mundo", 42, 3.14, [true, "desestructurar"]];

const [mensaje, numero1, numero2, [valor1, valor2]] = arreglo;
console.log(mensaje);
console.log(numero1);
console.log(numero2);
console.log(valor2);

