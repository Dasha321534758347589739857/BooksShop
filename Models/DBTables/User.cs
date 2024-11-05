using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace BooksShop.Models.DBTables
{
    public class User
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Password { get; set; }
        public Role? Role { get; set; }

        //public List<Book>? Book { get; set; }

    }
}
