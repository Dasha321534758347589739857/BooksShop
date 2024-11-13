let res = document.getElementById('GFG');
let select = document.getElementById("userRole");


async function getUsers() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/Home/Privacy/api/users", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const users = await response.json();

        const rows = document.querySelector("#tusers");
        // добавляем полученные элементы в таблицу
        users.forEach(user => rows.append(row(user)));
    }
}
async function getRoles() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/Home/Privacy/api/roles", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });



    if (response.ok === true) {
        // получаем данные
        const roles = await response.json();
        let elmts = [];
        roles.forEach(role => elmts.push(role));
        for (let i = 0; i < elmts.length; i++) {
            let optn = elmts[i];
            let el = document.createElement("option");
            el.textContent = optn.name;
            el.value = optn.id;
            select.appendChild(el);
        }

    }
}



// Получение одного пользователя
async function getUser(id) {
    const response = await fetch(`/Home/Privacy/api/users/${id}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        document.getElementById("userId").value = user.id;
        document.getElementById("userName").value = user.name;
        document.getElementById("userPassword").value = user.password;
        document.getElementById("userRole").value = user.roleId;
    }
    else {
        // если произошла ошибка, получаем сообщение об ошибке
        const error = await response.json();
        console.log(error.message); // и выводим его на консоль
    }
}

async function getSUser(searchV) { //поиск
    const response = await fetch("/Home/Privacy/api/users", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const users = await response.json();
        const rows = document.querySelector("#susers");
        let findV = new Boolean(false);

        // добавляем полученные элементы в таблицу
        users.forEach(user => {
            if (user.name.includes(searchV)) {
                rows.append(serchRow(user));
                findV = true;
            }
            else { }
        }
        );

        if (findV == false) {
            DeleteTable();
            notFound();

        }
    }
}

async function getRole(id, roleTd) {
    const response = await fetch(`/Home/Privacy/api/roles/${id}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {

        const role = await response.json();
        roleTd.append(role);

    }
    else {
        // если произошла ошибка, получаем сообщение об ошибке
        const error = await response.json();
        console.log(error.message); // и выводим его на консоль
    }
}
// Добавление пользователя
async function createUser(userName, userPassword, userRole, userId) {

    const response = await fetch("/Home/Privacy/api/users", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: userId,
            name: userName,
            password: userPassword,
            roleId: userRole

        })

    });
    if (response.ok === true) {
        const user = await response.json();
        document.querySelector("#tusers").append(row(user));
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}
// Изменение пользователя
async function editUser(userId, userName, userPassword, userRole) {
    const response = await fetch("/Home/Privacy/api/users", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: userId,
            name: userName,
            password: userPassword,
            roleId: userRole
        })
    });
    if (response.ok === true) {
        const user = await response.json();
        document.querySelector(`tr[data-rowid='${user.id}']`).replaceWith(row(user));
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}
// Удаление пользователя
async function deleteUser(id) {
    const response = await fetch(`/Home/Privacy/api/users/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        document.querySelector(`tr[data-rowid='${user.id}']`).remove();
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}
function notFound() {
    // const tableS = document.getElementById("#susers");
    // tableS.innerHTML='';
    const rows = document.querySelector("#susers");

    const tr = document.createElement("tr");
    const nameTd = document.createElement("td");
    nameTd.append("-");
    tr.append(nameTd);

    const passwordTd = document.createElement("td");
    passwordTd.append("-");
    tr.append(passwordTd);

    const roleTd = document.createElement("td");
    roleTd.append("-");
    tr.append(roleTd);
    rows.append(tr);
}

function DeleteTable() {
    let tableS = document.querySelector('#susers');
    while (tableS.rows.length) {
        tableS.deleteRow(0);

    }

}


// сброс данных формы после отправки
function reset() {
    document.getElementById("userId").value =
        document.getElementById("userName").value =
        document.getElementById("userPassword").value =
        document.getElementById("userRole").value = "";
}
// создание строки для таблицы
function row(user) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", user.id);

    const nameTd = document.createElement("td");
    nameTd.append(user.name);
    tr.append(nameTd);

    const passwordTd = document.createElement("td");
    passwordTd.append(user.password);
    tr.append(passwordTd);

    const roleTd = document.createElement("td");
    getRole(user.roleId, roleTd);
    tr.append(roleTd);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("button");
    editLink.append("Изменить");
    editLink.addEventListener("click", async () => await getUser(user.id));
    linksTd.append(editLink);

    const removeLink = document.createElement("button");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", async () => await deleteUser(user.id));

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}

function serchRow(user) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", user.id);

    const nameTd = document.createElement("td");
    nameTd.append(user.name);
    tr.append(nameTd);

    const passwordTd = document.createElement("td");
    passwordTd.append(user.password);
    tr.append(passwordTd);

    const roleTd = document.createElement("td");
    getRole(user.roleId, roleTd);
    tr.append(roleTd);

    return tr;
}
// сброс значений формы
document.getElementById("resetBtn").addEventListener("click", () => reset());

// отправка формы
document.getElementById("saveBtn").addEventListener("click", async () => {

    const id = document.getElementById("userId").value;
    const name = document.getElementById("userName").value;
    const password = document.getElementById("userPassword").value;
    const roleId = document.getElementById("userRole").value;
    if (id === "")
        await createUser(name, password, roleId);
    else
        await editUser(id, name, password, roleId);
    reset();
});


document.getElementById("searchBtn").addEventListener("click", async () => {
    const searchV = document.getElementById("searchUserT").value;
    if (searchV === "") {
        DeleteTable();
        notFound();
    }
    else {

        DeleteTable();
        await getSUser(searchV);
    }

}
)

function CreateRol() {
    window.open("/Home/Roles");
}
// загрузка пользователей
getUsers();
getRoles();

