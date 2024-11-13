async function getUser(userName, userPassword) {
    // отправляет запрос и получаем ответ
    const response = await fetch("/Home/Login/api/users", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const users = await response.json();

        users.forEach(user => {

            if (user.name == userName && user.password == userPassword) {
                getRole(user.roleId);
                
            }
            else {
                document.getElementById("login").value = "Введите логин";
                document.getElementById("password").value = "Введите пароль";
            }


        }




        );
    }

}

async function getRole(id) {
    const response = await fetch(`/Home/Login/api/roles/${id}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {

        const role = await response.json();

        if (role == "admin") {

            document.getElementById("privacyCall").style.visibility = "visible";
            document.getElementById("booksCall").style.visibility = "visible";
            document.getElementById("booksUsersCall").style.visibility = "hidden";
        }
        else if (role == "user") {
            document.getElementById("booksUsersCall").style.visibility = "visible";
            document.getElementById("privacyCall").style.visibility = "hidden";
            document.getElementById("booksCall").style.visibility = "hidden";
        }
        else
        {
            document.getElementById("privacyCall").style.visibility = "hidden";
            document.getElementById("booksCall").style.visibility = "hidden";
            document.getElementById("booksUsersCall").style.visibility = "hidden";
        }


    }
    else {
        // если произошла ошибка, получаем сообщение об ошибке
        const error = await response.json();
        console.log(error.message); // и выводим его на консоль
    }
}

document.getElementById("loginUser").addEventListener("click", async () => {
    const userName = document.getElementById("login").value;
    const userPassword = document.getElementById("password").value;
    
    if (userName == "" && userPassword == "") {
        document.getElementById("login").value = "Введите логин";
        document.getElementById("password").value = "Введите пароль";
    }
    else if (userPassword == "") {
        document.getElementById("password").value = "Введите пароль";
    }
    else if (userName == "") {
        document.getElementById("login").value = "Введите логин";

    }
    else if (userName == "Введите логин" || userPassword === "Введите пароль") { }
    else {

        getUser(userName, userPassword);
    }

}
)

document.getElementById("privacyCall").addEventListener("click", async () => {
    window.open("/Home/Privacy");
}

)

document.getElementById("booksCall").addEventListener("click", async () => {
    window.open("/Home/Books");
}

)
document.getElementById("booksUsersCall").addEventListener("click", async () => {
    window.open("/Home/Surch");
}

)