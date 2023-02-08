const presentacionshampoo = [{
        tipo: "Presentación 50 gr",
        tipodecambio: "MXN",
        monto: 48,
        precio: "Presentación 50 gr $48 MXN",
    },
    {
        tipo: "Presentación 100 gr",
        tipodecambio: "MXN",
        monto: 98,
        precio: "Presentación 100 gr $98 MXN",
    }
];


const ShampooSólido = [{
        id: 1,
        nombre: "Revitalizante",
        presentación: presentacionshampoo,
        descripción: "Para TODO TIPO DE PELO, ESPECIALMENTE NORMAL Y MIXTO. Vas a sentir como tu cabello vuelve a la vida, el nombre le hace total justicia. Con: Extracto de avena, hibiscus (jamaica), aceite de avellana e inulina.",
        image: "./Imagenes/Catálogo/Shampoo Revitalizante.jpg",
    },
    {
        id: 2,
        nombre: "Lavanda y Romero",
        presentación: presentacionshampoo,
        descripción: "Ideal para TODO TIPO DE PELO. Perfecto para cuero cabelludo: GRASO, con caspa, barritos, comezón, psoriasis. Seborregulador, controla la caída, controla la caspa, estimula el crecimiento, reparador, antifrizz, hidratante, antiséptico, antiinflamatorio. De extracto de lavanda, romero, arcilla verde y aceite de semilla de uva. ¡Nuestro favorito, es perfecto!",
        image: "./Imagenes/Catálogo/Shampoo Lavanda Romero.jpg",
    },
];


const ShampoosSólidosContainer = document.getElementById("ShampoosSólidosContainer");

ShampooSólido.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    const productImage = document.createElement("img");
    productImage.src = `./Imagenes/Catálogo/${product.imagen}`;
    productImage.classList.add("product-image");

    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    const productnombre = document.createElement("h3");
    productnombre.innerHTML = product.nombre;

    const productdescripción = document.createElement("p");
    productdescripción.innerHTML = product.descripción;

    product.presentación.forEach((presentacion) => {
        const productprecio = document.createElement("p");
        productprecio.innerHTML = presentacion.precio;

        productInfo.appendChild(productprecio);
    });

    const addToCartButton = document.createElement("button");
    addToCartButton.innerHTML = "Add to cart";

    productInfo.appendChild(productnombre);
    productInfo.appendChild(productdescripción);
    productInfo.appendChild(addToCartButton);

    productItem.appendChild(productImage);
    productItem.appendChild(productInfo);

    ShampoosSólidosContainer.appendChild(productItem);
});
