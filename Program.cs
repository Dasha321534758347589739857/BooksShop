using BooksShop.Data;
using BooksShop.Models.DBTables;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Data;


var client = new MongoClient("mongodb://localhost:27017");  // определяем клиент
var db = client.GetDatabase("testBD");    // определяем объект базы данных
var collectionUserName = "users";   // имя коллекции
var collectionRoleName = "roles";   // имя коллекции
var a = db.GetCollection<User>(collectionUserName).Find("{}").ToList();
//var b = db.GetCollection<Role>(collectionUserName).Find("{}").ToList();





var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddControllersWithViews();//поддержка контроллеров и представлений



var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();


app.MapGet("/Home/Privacy/api/users", async () => {
    var users2 = await db.GetCollection<User>(collectionUserName).Find("{}").ToListAsync();

    // если не найден, отправляем статусный код и сообщение об ошибке
    if (users2 == null) return Results.NotFound(new { message = "Пользователи не найдены" });

    // если пользователь найден, отправляем его
    return Results.Json(users2);
});

app.MapGet("/Home/Privacy/api/roles", async () => {
    var roles2 = await db.GetCollection<Role>(collectionRoleName).Find("{}").ToListAsync();

    // если не найден, отправляем статусный код и сообщение об ошибке
    if (roles2 == null) return Results.NotFound(new { message = "Роли не найдены" });

    // если пользователь найден, отправляем его
    return Results.Json(roles2);
});

app.MapGet("/Home/Roles/api/roles", async () => 
{
    var roles = await db.GetCollection<Role>(collectionRoleName).Find("{}").ToListAsync();

    // если не найден, отправляем статусный код и сообщение об ошибке
    if (roles == null) return Results.NotFound(new { message = "Пользователи не найдены" });

    // если пользователь найден, отправляем его
    return Results.Json(roles);
});

app.MapGet("/Home/Privacy/api/users/{id}", async (string id) =>
{
    var user = await db.GetCollection<User>(collectionUserName)
        .Find(p => p.Id == id)
        .FirstOrDefaultAsync();

    // если не найден, отправляем статусный код и сообщение об ошибке
    if (user == null) return Results.NotFound(new { message = "Пользователь не найден" });

    // если пользователь найден, отправляем его
    return Results.Json(user);
});
app.MapGet("/Home/Roles/api/roles/{id}", async (string id) =>
{
    var role = await db.GetCollection<Role>(collectionRoleName)
        .Find(p => p.Id == id)
        .FirstOrDefaultAsync();

    // если не найден, отправляем статусный код и сообщение об ошибке
    if (role == null) return Results.NotFound(new { message = "Пользователь не найден" });

    // если пользователь найден, отправляем его
    return Results.Json(role);
});
app.MapDelete("/Home/Privacy/api/users/{id}", async (string id) =>
{
    var user = await db.GetCollection<User>(collectionUserName).FindOneAndDeleteAsync(p => p.Id == id);
    // если не найден, отправляем статусный код и сообщение об ошибке
    if (user is null) return Results.NotFound(new { message = "Пользователь не найден" });
    return Results.Json(user);
});

app.MapDelete("/Home/Roles/api/roles/{id}", async (string id) =>
{
    var role = await db.GetCollection<Role>(collectionRoleName).FindOneAndDeleteAsync(p => p.Id == id);
    // если не найден, отправляем статусный код и сообщение об ошибке
    if (role is null) return Results.NotFound(new { message = "Пользователь не найден" });
    return Results.Json(role);
});

app.MapPost("/Home/Privacy/api/users", async (User user) => {

    // добавляем пользователя в список
    await db.GetCollection<User>(collectionUserName).InsertOneAsync(user);
    return user;
});

app.MapPost("/Home/Roles/api/roles", async (Role role) => {

    // добавляем пользователя в список
    await db.GetCollection<Role>(collectionRoleName).InsertOneAsync(role);
    return role;
});

app.MapPut("/Home/Privacy/api/users", async (User userData) => {

    var user = await db.GetCollection<User>(collectionUserName)
        .FindOneAndReplaceAsync(p => p.Id == userData.Id, userData, new() { ReturnDocument = ReturnDocument.After });
    if (user == null)
        return Results.NotFound(new { message = "Пользователь не найден" });
    return Results.Json(user);
});


if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseHttpsRedirection();

app.UseRouting();
app.UseAuthorization();
//Configure the HTTP request pipeline.
app.MapControllerRoute(//сопоставление маршрутов с контроллерами
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
