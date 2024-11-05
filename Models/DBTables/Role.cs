using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BooksShop.Models.DBTables
{
    public class Role
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Name { get; set; }
    }
}
