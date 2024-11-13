using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BooksShop.Models.DBTables
{
    public class Book
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public string? Author { get; set; }
        public string? Genre { get; set; }
    }
}
