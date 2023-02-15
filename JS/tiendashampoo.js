let tiendashampoo = document.getElementById("tiendashampoo");

let carrito = JSON.parse(localStorage.getItem("data")) || [];

let generateShampoo = () => {
    return (tiendashampoo.innerHTML = tiendashampooItemsData
        .map((x) => {
            let {
                id,
                nombre,
                opciones,
                gramaje,
                precio,
                gramaje1,
                precio1,
                ingredientes,
                descripcion,
                cant,
                img } = x;
            let search = carrito.find((x) => x.id === id) || [];
            return `
            <div id=product-id-${id} class="card mx-auto mt-5">
            <div class="row g-0">
                <div class="col-md-4">
                    <img class="img-fluid rounded"
                    style="object-fit: fill; height: 100%;" src=${img} alt="">
                </div>
                <div class="col-md-5 mt-4">
                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <div class="mt-1 mb-0 text-muted small">
                            <p><span>${ingredientes}</span></p>
                        </div>
                        <p class="card-text">${descripcion}</p>
                    </div>
                </div>
                <div class="col-md-3 mt-3">
                    <div>
                        <h4>${opciones}:</h4>
                    </div>
                    <h6 class="text-success-emphasis">Producto Nuevo</h6>
                    <div class="d-flex flex-column">
                        <div class="options mt-3">
                            <input type="radio" name="size1" value="small" id="small" checked>
                            <label class="label" for="small">
                                <div><b>${gramaje} gr.</b></div>
                                <div><b>$ ${precio} MXN</b></div>
                            </label>
                        </div>
                        <div class="options">
                            <input type="radio" name="size1" value="large" id="large">
                            <label class="label" for="large">
                                <div><b>${gramaje1} gr.</b></div>
                                <div><b>$ ${precio1} MXN</b></div>
                            </label>
                        </div>
                    </div>
                    <div class="flex-row align-items-center mt-3">
                        <h5>${cant}:</h5>
                        <div class="botones">
                            <ion-icon onclick="decrement(${id})" name="remove-circle" class="icono-color"></ion-icon>
                            <div id=${id} class="cantidad">
                            ${search.item === undefined ? 0 : search.item}
                            </div>
                            <ion-icon onclick="increment(${id})" name="add-circle" class="icono-color"></ion-icon>
                        </div>
                    </div>
                    <div class="d-flex flex-row mt-3">
                        <button class="btn btn-m" type="button">Agregar Al Carrito</button>
                    </div>
                </div>
            </div>
        </div>
    `;
        })
        .join(""));
};

generateShampoo();

let increment = (id) => {
    let selectedItem = id;
    let search = carrito.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        carrito.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    // console.log(carrito);
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(carrito));
};
let decrement = (id) => {
    let selectedItem = id;
    let search = carrito.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    carrito = carrito.filter((x) => x.item !== 0);
    // console.log(carrito);
    localStorage.setItem("data", JSON.stringify(carrito));
};

let update = (id) => {
    let search = carrito.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = carrito.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();