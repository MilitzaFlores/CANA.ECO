(() => {
    const inventarioCsvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRqGXV5p7FIKqGSCiDfCV2MLSVyTrCT93izmOMVKjNfF6x0CAs_8K4_648ucwl_i2FM5KZw-yt3LaQM/pub?output=csv";

    function normalizarIdInventario(valor) {
        return String(valor)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");
    }

    function parseCsv(texto) {
        const filas = [];
        let fila = [];
        let valor = "";
        let entreComillas = false;

        for (let indice = 0; indice < texto.length; indice++) {
            const caracter = texto[indice];

            if (caracter === '"') {
                if (entreComillas && texto[indice + 1] === '"') {
                    valor += '"';
                    indice++;
                } else {
                    entreComillas = !entreComillas;
                }
            } else if (caracter === "," && !entreComillas) {
                fila.push(valor.trim());
                valor = "";
            } else if (caracter === "\n" && !entreComillas) {
                fila.push(valor.trim());
                if (fila.some(celda => celda !== "")) filas.push(fila);
                fila = [];
                valor = "";
            } else if (caracter !== "\r" || entreComillas) {
                valor += caracter;
            }
        }

        if (valor !== "" || fila.length > 0) {
            fila.push(valor.trim());
            if (fila.some(celda => celda !== "")) filas.push(fila);
        }

        return filas;
    }

    window.normalizarIdInventario = normalizarIdInventario;
    window.cargarInventario = async function () {
        const respuesta = await fetch(inventarioCsvUrl, { cache: "no-store" });
        if (!respuesta.ok) throw new Error("No se pudo leer la hoja de inventario.");

        const filas = parseCsv(await respuesta.text());
        const encabezados = filas.shift()?.map(normalizarIdInventario) || [];
        const indiceId = encabezados.indexOf("id");
        const indiceStock = encabezados.indexOf("stock");
        if (indiceId === -1 || indiceStock === -1) {
            throw new Error("La hoja debe incluir las columnas id y Stock.");
        }

        const inventario = new Map();
        filas.forEach(fila => {
            const id = normalizarIdInventario(fila[indiceId]);
            const valorStock = fila[indiceStock];
            const stock = Number(valorStock);

            if (!id) return;
            if (valorStock === "" || !Number.isInteger(stock) || stock < 0 || inventario.has(id)) {
                throw new Error("La hoja contiene un stock inválido o un id repetido.");
            }

            inventario.set(id, stock);
        });

        return inventario;
    };
})();
