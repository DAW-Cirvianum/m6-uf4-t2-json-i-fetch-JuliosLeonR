
// URL: https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/9681?nult=10

// PARAMETRES:  https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/{id_tabla}[nult={n_ult_datos}||date=AAAAMMDD:AAAAMMDD]

// Nota: Para evitar consultas muy grandes, el servicio web devuelve los 500 primeros ítems.
// Utiliza el parámetro 'page' para paginar de 500 en 500 ítems.

const getData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
        const dades = await response.json();
        //console.log("Dades:", dades);
        return dades;
    } catch (error) {
        console.error("No s'han pogut trobar les dades", error)
        throw error;
    }
}

const getRentPrices = async () => {
    const url = 'https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/59057?nult=10';
    try {
        const data = await getData(url)
        const catalunya = data.filter((element) => element.Nombre.includes('Cataluña. Total'))

        return catalunya
    } catch (error) {
        console.error("Error:", error)
        return [];
    }
};


const showRentPrices = (data) => {
    const divs = document.querySelectorAll('.contenidor > div');

    //Crear Element llista
    const ulElementVariacio = document.createElement('ul');
    const ulElementIndex = document.createElement('ul');

    data.forEach(element => {
        element.Data.forEach(elementData => {
            const liElement = document.createElement('li');

            if (element.Nombre.includes('Índice')) {
                liElement.innerHTML = `<b>${elementData.Anyo} - ${elementData.Valor}</b>`;
                ulElementIndex.appendChild(liElement)
            } else if (element.Nombre.includes('Variación')) {
                liElement.innerHTML = `<b>${elementData.Anyo} - ${elementData.Valor}</b>`;
                ulElementVariacio.appendChild(liElement)
            }
        })
    });
    divs[0].appendChild(ulElementIndex)
    divs[1].appendChild(ulElementVariacio)
};

const getIPC = async () => {
}

const showIPC = async () => {
}

let chart = null; // Declarem una variable global per a guardar el gràfic

const myChart = () => {
}

main = async () => {
    try {
        const data = await getRentPrices();
        showRentPrices(data)
    } catch (error) {
        console.error("No s'han pogut trobar les dades", error)
        throw error;
    }
}

main();