
async function getRoles() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/Home/Roles/api/roles", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const roles = await response.json();
        const rows = document.querySelector("tbody");
        // добавляем полученные элементы в таблицу
        roles.forEach(role => rows.append(row(role)));
    }
}

async function getRole(id) {
    const response = await fetch(`/Home/Roles/api/roles/${id}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const role = await response.json();
        document.getElementById("roleId").value = role.id;
        document.getElementById("roleName").value = role.name;
    }
    else {
        // если произошла ошибка, получаем сообщение об ошибке
        const error = await response.json();
        console.log(error.message); // и выводим его на консоль
    }
}

async function createRole(roleName, roleId) {

    const response = await fetch("/Home/Roles/api/roles", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: roleId,
            name: roleName,

        })
    });
    if (response.ok === true) {
        const role = await response.json();
        document.querySelector("tbody").append(row(role));
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}

// Изменение пользователя
async function editRole(roleId, roleName) {
    const response = await fetch("/Home/Roles/api/roles", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: roleId,
            name: roleName,
        })
    });
    if (response.ok === true) {
        const role = await response.json();
        document.querySelector(`tr[data-rowid='${role.id}']`).replaceWith(row(role));
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}

// Удаление пользователя
async function deleteRole(id) {
    const response = await fetch(`/Home/Roles/api/roles/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const role = await response.json();
        document.querySelector(`tr[data-rowid='${role.id}']`).remove();
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}




// сброс данных формы после отправки
function reset() {
    document.getElementById("roleId").value =
        document.getElementById("roleName").value = "";
}
// создание строки для таблицы
function row(role) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", role.id);

    const nameTd = document.createElement("td");
    nameTd.append(role.name);
    tr.append(nameTd);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("button");
    editLink.append("Изменить");
    editLink.addEventListener("click", async () => await getRole(role.id));
    linksTd.append(editLink);

    const removeLink = document.createElement("button");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", async () => await deleteRole(role.id));

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}
// сброс значений формы
document.getElementById("resetBtn").addEventListener("click", () => reset());

// отправка формы
document.getElementById("saveBtn").addEventListener("click", async () => {

    const id = document.getElementById("roleId").value;
    const name = document.getElementById("roleName").value;

    if (id === "")
        await createRole(name);
    else
        await editRole(id, name);
    reset();
});


// загрузка пользователей
getRoles();

