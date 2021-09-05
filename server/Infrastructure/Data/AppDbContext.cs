// using System.Threading.Tasks;
// using Domain.Entities;
// using Domain.Interfaces;
// using Microsoft.Extensions.Configuration;
// using MongoDB.Driver;

// namespace Infrastructure.Data
// {
//     public class AppDbContext : IAppDbContext
//     {
//         public AppDbContext(IConfiguration configuration)
//         {
//             var conn = configuration.GetConnectionString("Default");
//             var client = new MongoClient(configuration.GetConnectionString("Default"));
//             var database = client.GetDatabase("QTasks");

//             Users = database.GetCollection<User>("Users");
//             Projects = database.GetCollection<Project>("Projects");
//             Lists = database.GetCollection<ListItem>("Lists");
//             Tickets = database.GetCollection<Ticket>("Tickets");
//             Boards = database.GetCollection<Board>("Boards");

//             UserCollectionConfig(Users);
//             // var database = client.GetDatabase()
//         }

//         public IMongoCollection<User> Users { get; }
//         public IMongoCollection<Project> Projects { get; }
//         public IMongoCollection<ListItem> Lists { get; }
//         public IMongoCollection<Ticket> Tickets { get; }
//         public IMongoCollection<Board> Boards { get; }

//         private void UserCollectionConfig(IMongoCollection<User> userCollection)
//         {
//             var indexModel = new CreateIndexModel<User>(
//                 Builders<User>.IndexKeys.Ascending(x => x.Email),
//                 new CreateIndexOptions { Unique = true }
//             );
//             userCollection.Indexes.CreateOne(
//                 indexModel
//             );
//         }
//     }
// }