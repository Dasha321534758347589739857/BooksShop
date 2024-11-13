using BooksShop.Data;
using BooksShop.Models.DBTables;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Data;
using System.Text.Json;


var client = new MongoClient("mongodb://localhost:27017");  // ���������� ������
var db = client.GetDatabase("testBD");    // ���������� ������ ���� ������
var collectionUserName = "users";   // ��� ���������
var collectionRoleName = "roles";   // ��� ���������
var collectionBookName = "books";
var a = db.GetCollection<User>(collectionUserName).Find("{}").ToList();
var b = db.GetCollection<Role>(collectionRoleName).Find("{}").ToList();
var c = db.GetCollection<Book>(collectionBookName).Find("{}").ToList();

Role newRole = new Role();
newRole.Name = "admin";
db.GetCollection<Role>(collectionRoleName).InsertOne(newRole);

User newUser = new User();
newUser.Name = "admin";
newUser.Password = "admin";
newUser.RoleId = newRole.Id;
db.GetCollection<User>(collectionUserName).InsertOne(newUser);


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();//��������� ������������ � �������������



var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();


app.MapGet("/Home/Katalog/api/books", async () =>
{
    var books = await db.GetCollection<Book>(collectionBookName).Find("{}").ToListAsync();

    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (books == null) return Results.NotFound(new { message = "������������ �� �������" });

    // ���� ������������ ������, ���������� ���
    return Results.Json(books);
});



app.MapGet("/Home/Books/api/books", async () =>
{
    var books = await db.GetCollection<Book>(collectionBookName).Find("{}").ToListAsync();

    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (books == null) return Results.NotFound(new { message = "������������ �� �������" });

    // ���� ������������ ������, ���������� ���
    return Results.Json(books);
});

app.MapGet("/Home/Surch/api/books", async () =>
{
    var books = await db.GetCollection<Book>(collectionBookName).Find("{}").ToListAsync();

    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (books == null) return Results.NotFound(new { message = "������������ �� �������" });

    // ���� ������������ ������, ���������� ���
    return Results.Json(books);
});


app.MapPost("/Home/Books/api/books", async (Book book) =>
{

    // ��������� ������������ � ������
    await db.GetCollection<Book>(collectionBookName).InsertOneAsync(book);
    return book;
});


app.MapDelete("/Home/Books/api/books/{id}", async (string id) =>
{
    var book = await db.GetCollection<Book>(collectionBookName).FindOneAndDeleteAsync(p => p.Id == id);
    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (book is null) return Results.NotFound(new { message = "������������ �� ������" });
    return Results.Json(book);
});

app.MapGet("/Home/Books/api/books/{id}", async (string id) =>
{
    var book = await db.GetCollection<Book>(collectionBookName)
        .Find(p => p.Id == id)
        .FirstOrDefaultAsync();

    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (book == null) return Results.NotFound(new { message = "������������ �� ������" });

    // ���� ������������ ������, ���������� ���
    return Results.Json(book);
});

app.MapPut("/Home/Books/api/books", async (Book bookData) =>
{

    var book = await db.GetCollection<Book>(collectionBookName)
        .FindOneAndReplaceAsync(p => p.Id == bookData.Id, bookData, new() { ReturnDocument = ReturnDocument.After });
    if (book == null)
        return Results.NotFound(new { message = "������������ �� ������" });
    return Results.Json(book);
});





app.MapGet("/Home/Privacy/api/users", async () =>
{
    var users2 = await db.GetCollection<User>(collectionUserName).Find("{}").ToListAsync();

    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (users2 == null) return Results.NotFound(new { message = "������������ �� �������" });

    // ���� ������������ ������, ���������� ���
    return Results.Json(users2);
});

app.MapGet("/Home/Login/api/users", async () =>
{
    var users2 = await db.GetCollection<User>(collectionUserName).Find("{}").ToListAsync();

    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (users2 == null) return Results.NotFound(new { message = "������������ �� �������" });

    // ���� ������������ ������, ���������� ���
    return Results.Json(users2);
});

app.MapGet("/Home/Login/api/roles/{id}", async (string id) =>
{
    var role = await db.GetCollection<Role>(collectionRoleName)
        .Find(p => p.Id == id)
        .FirstOrDefaultAsync();

    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (role == null) return Results.NotFound(new { message = "������������ �� ������" });

    // ���� ������������ ������, ���������� ���
    return Results.Json(role.Name);
});


app.MapGet("/Home/Privacy/api/roles", async () =>
{
    var roles2 = await db.GetCollection<Role>(collectionRoleName).Find("{}").ToListAsync();

    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (roles2 == null) return Results.NotFound(new { message = "���� �� �������" });

    // ���� ������������ ������, ���������� ���
    return Results.Json(roles2);
});

app.MapGet("/Home/Roles/api/roles", async () =>
{
    var roles = await db.GetCollection<Role>(collectionRoleName).Find("{}").ToListAsync();

    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (roles == null) return Results.NotFound(new { message = "������������ �� �������" });

    // ���� ������������ ������, ���������� ���
    return Results.Json(roles);
});

app.MapGet("/Home/Privacy/api/users/{id}", async (string id) =>
{
    var user = await db.GetCollection<User>(collectionUserName)
        .Find(p => p.Id == id)
        .FirstOrDefaultAsync();

    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (user == null) return Results.NotFound(new { message = "������������ �� ������" });

    // ���� ������������ ������, ���������� ���
    return Results.Json(user);
});
app.MapGet("/Home/Roles/api/roles/{id}", async (string id) =>
{
    var role = await db.GetCollection<Role>(collectionRoleName)
        .Find(p => p.Id == id)
        .FirstOrDefaultAsync();

    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (role == null) return Results.NotFound(new { message = "������������ �� ������" });

    // ���� ������������ ������, ���������� ���
    return Results.Json(role);
});


app.MapGet("/Home/Privacy/api/roles/{id}", async (string id) =>
{
    var role = await db.GetCollection<Role>(collectionRoleName)
        .Find(p => p.Id == id)
        .FirstOrDefaultAsync();

    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (role == null) return Results.NotFound(new { message = "������������ �� ������" });

    // ���� ������������ ������, ���������� ���
    return Results.Json(role.Name);
});

app.MapDelete("/Home/Privacy/api/users/{id}", async (string id) =>
{
    var user = await db.GetCollection<User>(collectionUserName).FindOneAndDeleteAsync(p => p.Id == id);
    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (user is null) return Results.NotFound(new { message = "������������ �� ������" });
    return Results.Json(user);
});

app.MapDelete("/Home/Roles/api/roles/{id}", async (string id) =>
{
    var role = await db.GetCollection<Role>(collectionRoleName).FindOneAndDeleteAsync(p => p.Id == id);
    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (role is null) return Results.NotFound(new { message = "������������ �� ������" });
    return Results.Json(role);
});

app.MapPost("/Home/Privacy/api/users", async (User user) =>
{

    // ��������� ������������ � ������
    await db.GetCollection<User>(collectionUserName).InsertOneAsync(user);
    return user;
});

app.MapPost("/Home/Roles/api/roles", async (Role role) =>
{

    // ��������� ������������ � ������
    await db.GetCollection<Role>(collectionRoleName).InsertOneAsync(role);
    return role;
});

app.MapPut("/Home/Privacy/api/users", async (User userData) =>
{

    var user = await db.GetCollection<User>(collectionUserName)
        .FindOneAndReplaceAsync(p => p.Id == userData.Id, userData, new() { ReturnDocument = ReturnDocument.After });
    if (user == null)
        return Results.NotFound(new { message = "������������ �� ������" });
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
app.MapControllerRoute(//������������� ��������� � �������������
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
