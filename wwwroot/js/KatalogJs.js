async function getSBooks(searchV) { //поиск
    const response = await fetch("/Home/Katalog/api/books", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const books = await response.json();
        const rows = document.querySelector("#sbooks");
        let findV = new Boolean(false);

        // добавляем полученные элементы в таблицу
        books.forEach(book => {
            if (searchV.includes(book.genre)) {
                rows.append(serchRow(book));
                findV = true;
            }
            else { }
        }
        );

        if (findV == false) {
            DeleteTable();


        }
    }
}


async function getABooks(searchV1, searchV2, searchV3, searchV4, searchV5, searchV6, searchV7, searchV8) { //поиск
    const response = await fetch("/Home/Katalog/api/books", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const books = await response.json();
        const rows = document.querySelector("#sbooks");
        let findV = new Boolean(false);

        // добавляем полученные элементы в таблицу
        books.forEach(book => {
            if (!searchV2.includes(book.genre) && !searchV1.includes(book.genre) && !searchV3.includes(book.genre) && !searchV4.includes(book.genre) && !searchV5.includes(book.genre) && !searchV6.includes(book.genre) && !searchV7.includes(book.genre) && !searchV8.includes(book.genre)) {
                rows.append(serchRow(book));
                findV = true;
            }
            else { }
        }
        );

        if (findV == false) {
            DeleteTable();


        }
    }
}

document.getElementById("RomButton").addEventListener("click", async () => {
    const searchV = "романы";



    DeleteTable();
    await getSBooks(searchV);

}
)

document.getElementById("DetButton").addEventListener("click", async () => {
    const searchV = "детективы";



    DeleteTable();
    await getSBooks(searchV);

}
)

document.getElementById("FanButton").addEventListener("click", async () => {
    const searchV = "фантастика";



    DeleteTable();
    await getSBooks(searchV);

}
)

document.getElementById("KlassButton").addEventListener("click", async () => {
    const searchV = "классика";



    DeleteTable();
    await getSBooks(searchV);

}
)


document.getElementById("TrillButton").addEventListener("click", async () => {
    const searchV = "триллеры";



    DeleteTable();
    await getSBooks(searchV);

}
)
document.getElementById("PoeButton").addEventListener("click", async () => {
    const searchV = "поэзия";



    DeleteTable();
    await getSBooks(searchV);

}
)

document.getElementById("EroButton").addEventListener("click", async () => {
    const searchV = "эротика";



    DeleteTable();
    await getSBooks(searchV);

}
)

document.getElementById("ScienButton").addEventListener("click", async () => {
    const searchV = "наука";



    DeleteTable();
    await getSBooks(searchV);

}
)

document.getElementById("AnoButton").addEventListener("click", async () => {
    const searchV1 = "романы";
    const searchV2 = "детективы";
    const searchV3 = "фантастика";
    const searchV4 = "классика";
    const searchV5 = "триллеры";
    const searchV6 = "поэзия";
    const searchV7 = "эротика";
    const searchV8 = "наука";
    DeleteTable();
    await getABooks(searchV1, searchV2, searchV3, searchV4, searchV5, searchV6, searchV7, searchV8);

}
)

function DeleteTable() {
    let tableS = document.querySelector('#sbooks');
    while (tableS.rows.length) {
        tableS.deleteRow(0);

    }

}

function serchRow(book) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", book.id);

    var imageTd = document.createElement('img');
    imageTd.src = "https://localhost:7116/image/" + book.image;
    tr.append(imageTd);

    const nameTd = document.createElement("td");
    nameTd.append(book.name);
    tr.append(nameTd);

    const descTd = document.createElement("td");
    descTd.append(book.description);
    tr.append(descTd);

    const autorTd = document.createElement("td");
    autorTd.append(book.author);
    tr.append(autorTd);

    const genreTd = document.createElement("td");
    genreTd.append(book.genre);
    tr.append(genreTd);




    return tr;
}
