
async function getBooks() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/Home/Books/api/books", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const books = await response.json();

        const rows = document.querySelector("#tbooks");
        // добавляем полученные элементы в таблицу
        books.forEach(book => rows.append(row(book)));
    }
}

// Получение одного пользователя
async function getBook(id) {
    const response = await fetch(`/Home/Books/api/books/${id}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const book = await response.json();
        document.getElementById("bookId").value = book.id;
        document.getElementById("bookName").value = book.name;
        document.getElementById("bookDesc").value = book.description;
        document.getElementById("bookAuthor").value = book.author;
        document.getElementById("bookImg").value = book.image;
        document.getElementById("bookGenre").value = book.genre;
    }
    else {
        // если произошла ошибка, получаем сообщение об ошибке
        const error = await response.json();
        console.log(error.message); // и выводим его на консоль
    }
}


async function createBook(bookNameC, bookDescriptionC, bookAuthorC, bookImageC, bookGenreC, bookIdC) {

    const response = await fetch("/Home/Books/api/books", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: bookIdC,
            name: bookNameC,
            description: bookDescriptionC,
            author: bookAuthorC,
            image: bookImageC,
            genre: bookGenreC
        })

    });
    if (response.ok === true) {
        const book = await response.json();
        document.querySelector("#tbooks").append(row(book));
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}
// Изменение пользователя
async function editBook(bookIdC, bookNameC, bookDescriptionC, bookAuthorC, bookImageC, bookGenreC) {
    const response = await fetch("/Home/Books/api/books", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: bookIdC,
            name: bookNameC,
            description: bookDescriptionC,
            author: bookAuthorC,
            image: bookImageC,
            genre: bookGenreC
        })
    });
    if (response.ok === true) {
        const book = await response.json();
        document.querySelector(`tr[data-rowid='${book.id}']`).replaceWith(row(book));
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}

async function deleteBook(id) {
    const response = await fetch(`/Home/Books/api/books/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const book = await response.json();
        document.querySelector(`tr[data-rowid='${book.id}']`).remove();
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}



// сброс данных формы после отправки
function reset() {
    document.getElementById("bookId").value =
        document.getElementById("bookName").value =
        document.getElementById("bookDesc").value =
        document.getElementById("bookAuthor").value =
        document.getElementById("bookImg").value =
        document.getElementById("bookGenre").value = "";
}
// создание строки для таблицы
function row(book) {

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

    const linksTd = document.createElement("td");

    const editLink = document.createElement("button");
    editLink.append("Изменить");
    editLink.addEventListener("click", async () => await getBook(book.id));
    linksTd.append(editLink);

    const removeLink = document.createElement("button");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", async () => await deleteBook(book.id));

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}


// сброс значений формы
document.getElementById("resetBtn").addEventListener("click", () => reset());

// отправка формы
document.getElementById("saveBtn").addEventListener("click", async () => {

    const id = document.getElementById("bookId").value;
    const name = document.getElementById("bookName").value;
    const description = document.getElementById("bookDesc").value;
    const author = document.getElementById("bookAuthor").value;
    const image = document.getElementById("bookImg").value;
    const genre = document.getElementById("bookGenre").value;
    if (id === "")
        await createBook(name, description, author, image, genre);
    else
        await editBook(id, name, description, author, image, genre);
    reset();
});



// загрузка пользователей
getBooks();
