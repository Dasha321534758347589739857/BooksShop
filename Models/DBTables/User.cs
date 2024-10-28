using MongoDB.Bson;

namespace BooksShop.Models.DBTables
{
    public class User
    {
        public ObjectId Id { get; set; }
        public string? Name { get; set; }
        public string? Password { get; set; }

        //public Role? Role { get; set; }

        //public List<Book>? Book { get; set; }
        
    }
}
