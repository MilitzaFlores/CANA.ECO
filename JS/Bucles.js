// let edad = 29;
// if (edad >= 18) {
//     console.log("VÁLIDO");
// } else {
//     console.log("NO VÁLIDO");
// }

let personas = [{
    nombre: "Mili",
    edad: 29,
    ciudad: "Puebla"
}, {
    nombre: "Betty",
    edad: 30,
    ciudad: "Cholula"
}, {
    nombre: "Agus",
    edad: 28,
    ciudad: "Puebla"
}, {
    nombre: "Montse",
    edad: 23,
    ciudad: "Atlixco"
}];

for (let i = 0; i < personas.length; i++) {
    console.log(personas[i]);
}

let edad = 29;
switch (true) {
    case edad < 18:
        console.log("Oferta especial para estudiantes: 30% de descuento en entrada");
        break;
    case edad >= 18 && edad <= 29:
        console.log("Oferta especial para universitarios: 50% de descuento en entrada");
        break;
    case edad > 25 && edad <= 65:
        console.log("Oferta especial para parejas adultas: 10% de descuento en entrada");
        break;
    case edad > 65:
        console.log("Oferta especial para adultos mayores: Entrada Gratis");
        break;
    default:
        console.log("No se aplica ninguna oferta especial");
}