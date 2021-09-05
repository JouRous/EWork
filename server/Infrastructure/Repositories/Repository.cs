using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Infrastructure.Data.Interfaces;
using Infrastructure.Helpers;
using Infrastructure.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Infrastructure.Repositories
{
  public class Repository<TDocument> : IIRepository<TDocument> where TDocument : BaseEntity
  {
    private readonly IMongoCollection<TDocument> _collection;

    public Repository(IConfiguration configuration)
    {
      var database = new MongoClient(configuration.GetConnectionString("Default")).GetDatabase("EWork");
      _collection = database.GetCollection<TDocument>(GetCollectionName(typeof(TDocument)));
    }

    private protected string GetCollectionName(Type documentType)
    {
      return ((BsonCollectionAttribute)documentType.GetCustomAttributes(
              typeof(BsonCollectionAttribute),
              true)
          .FirstOrDefault())?.CollectionName;
    }

    public virtual IMongoQueryable<TDocument> AsQueryable()
    {
      return _collection.AsQueryable();
    }

    public virtual IAggregateFluent<TDocument> AsAggregate()
    {
      return _collection.Aggregate();
    }

    public virtual IEnumerable<TDocument> FilterBy(
        Expression<Func<TDocument, bool>> filterExpression)
    {
      return _collection.Find(filterExpression).ToEnumerable();
    }

    public virtual IEnumerable<TProjected> FilterBy<TProjected>(
        Expression<Func<TDocument, bool>> filterExpression,
        Expression<Func<TDocument, TProjected>> projectionExpression)
    {
      return _collection.Find(filterExpression).Project(projectionExpression).ToEnumerable();
    }

    public virtual TDocument FindOne(Expression<Func<TDocument, bool>> filterExpression)
    {
      return _collection.Find(filterExpression).FirstOrDefault();
    }

    public virtual Task<TDocument> FindOneAsync(Expression<Func<TDocument, bool>> filterExpression)
    {
      return Task.Run(() => _collection.Find(filterExpression).FirstOrDefaultAsync());
    }

    public virtual TDocument FindById(Guid id)
    {
      var filter = Builders<TDocument>.Filter.Eq(doc => doc.Id, id);
      return _collection.Find(filter).SingleOrDefault();
    }

    public virtual Task<TDocument> FindByIdAsync(Guid id)
    {
      return Task.Run(() =>
      {
        var filter = Builders<TDocument>.Filter.Eq(doc => doc.Id, id);
        return _collection.Find(filter).SingleOrDefaultAsync();
      });
    }


    public virtual void InsertOne(TDocument document)
    {
      _collection.InsertOne(document);
    }

    public virtual Task InsertOneAsync(TDocument document)
    {
      return Task.Run(() => _collection.InsertOneAsync(document));
    }

    public void InsertMany(ICollection<TDocument> documents)
    {
      _collection.InsertMany(documents);
    }


    public virtual async Task InsertManyAsync(ICollection<TDocument> documents)
    {
      await _collection.InsertManyAsync(documents);
    }

    public void ReplaceOne(TDocument document)
    {
      var filter = Builders<TDocument>.Filter.Eq(doc => doc.Id, document.Id);
      _collection.FindOneAndReplace(filter, document);
    }

    public virtual async Task ReplaceOneAsync(TDocument document)
    {
      var filter = Builders<TDocument>.Filter.Eq(doc => doc.Id, document.Id);
      await _collection.FindOneAndReplaceAsync(filter, document);
    }

    public void DeleteOne(Expression<Func<TDocument, bool>> filterExpression)
    {
      _collection.FindOneAndDelete(filterExpression);
    }

    public Task DeleteOneAsync(Expression<Func<TDocument, bool>> filterExpression)
    {
      return Task.Run(() => _collection.FindOneAndDeleteAsync(filterExpression));
    }

    public void DeleteById(Guid id)
    {
      var filter = Builders<TDocument>.Filter.Eq(doc => doc.Id, id);
      _collection.FindOneAndDelete(filter);
    }

    public Task DeleteByIdAsync(Guid id)
    {
      return Task.Run(() =>
      {
        var filter = Builders<TDocument>.Filter.Eq(doc => doc.Id, id);
        _collection.FindOneAndDeleteAsync(filter);
      });
    }

    public void DeleteMany(Expression<Func<TDocument, bool>> filterExpression)
    {
      _collection.DeleteMany(filterExpression);
    }

    public Task DeleteManyAsync(Expression<Func<TDocument, bool>> filterExpression)
    {
      return Task.Run(() => _collection.DeleteManyAsync(filterExpression));
    }

    public Task UpdateOneAsync(Expression<Func<TDocument, bool>> filterExpression, UpdateDefinition<TDocument> update)
    {
      return Task.Run(() => _collection.UpdateOneAsync(filterExpression, update));
    }
  }
}