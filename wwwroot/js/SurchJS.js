

    async function getBooks() { //поиск
        const response = await fetch("/Home/Surch/api/books", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });
        // если запрос прошел нормально
        if (response.ok === true) {
            // получаем данные
            const books = await response.json();
            const rows = document.querySelector("#sbooks");
            books.forEach(book => {
                rows.append(serchRow(book));
            }
            );

        }
    }




async function getSBooks(searchV) { //поиск
    const response = await fetch("/Home/Surch/api/books", {
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
            if (book.name.includes(searchV) || book.author.includes(searchV)) {
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

document.getElementById("searchBtn").addEventListener("click", async () => {
    const searchV = document.getElementById("searchBookT").value;
    if (searchV === "") {
        DeleteTable();
        notFound();
    }
    else {

        DeleteTable();
        await getSBooks(searchV);
    }

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
getBooks();
