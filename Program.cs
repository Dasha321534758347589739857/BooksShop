using BooksShop.Data;
using BooksShop.Models.DBTables;
using MongoDB.Bson;
using MongoDB.Driver;
using System;


var client = new MongoClient("mongodb://localhost:27017");  // ���������� ������
var db = client.GetDatabase("test");    // ���������� ������ ���� ������
var collectionName = "users";   // ��� ���������
var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddControllersWithViews();//��������� ������������ � �������������



var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api/users", () =>
    db.GetCollection<User>(collectionName).Find("{}").ToListAsync());

app.MapGet("/api/users/{id}", async (string id) =>
{
    var user = await db.GetCollection<User>(collectionName)
        .Find(p => p.Id.ToString() == id)
        .FirstOrDefaultAsync();

    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (user == null) return Results.NotFound(new { message = "������������ �� ������" });

    // ���� ������������ ������, ���������� ���
    return Results.Json(user);
});
app.MapDelete("/api/users/{id}", async (string id) =>
{
    var user = await db.GetCollection<User>(collectionName).FindOneAndDeleteAsync(p => p.Id.ToString() == id);
    // ���� �� ������, ���������� ��������� ��� � ��������� �� ������
    if (user is null) return Results.NotFound(new { message = "������������ �� ������" });
    return Results.Json(user);
});
app.MapPost("/api/users", async (User user) => {

    // ��������� ������������ � ������
    await db.GetCollection<User>(collectionName).InsertOneAsync(user);
    return user;
});

app.MapPut("/api/users", async (User userData) => {

    var user = await db.GetCollection<User>(collectionName)
        .FindOneAndReplaceAsync(p => p.Id == userData.Id, userData, new() { ReturnDocument = ReturnDocument.After });
    if (user == null)
        return Results.NotFound(new { message = "������������ �� ������" });
    return Results.Json(user);
});
//Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapControllerRoute(//������������� ��������� � �������������
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.Run();
