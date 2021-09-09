using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Infrastructure.Models;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Infrastructure.Data.Interfaces
{
  public interface IMongoRepository<TDocument> where TDocument : BaseEntity
  {
    IMongoQueryable<TDocument> AsQueryable();
    IAggregateFluent<TDocument> AsAggregate();

    IEnumerable<TDocument> FilterBy(
        Expression<Func<TDocument, bool>> filterExpression);

    IEnumerable<TProjected> FilterBy<TProjected>(
        Expression<Func<TDocument, bool>> filterExpression,
        Expression<Func<TDocument, TProjected>> projectionExpression);

    TDocument FindOne(Expression<Func<TDocument, bool>> filterExpression);

    Task<TDocument> FindOneAsync(Expression<Func<TDocument, bool>> filterExpression);

    TDocument FindById(Guid id);

    Task<TDocument> FindByIdAsync(Guid id);

    void InsertOne(TDocument document);

    Task InsertOneAsync(TDocument document);

    void InsertMany(ICollection<TDocument> documents);

    Task InsertManyAsync(ICollection<TDocument> documents);

    Task UpdateOneAsync(Expression<Func<TDocument, bool>> filterExpression, UpdateDefinition<TDocument> update);

    void ReplaceOne(TDocument document);

    Task ReplaceOneAsync(TDocument document);

    void DeleteOne(Expression<Func<TDocument, bool>> filterExpression);

    Task DeleteOneAsync(Expression<Func<TDocument, bool>> filterExpression);

    void DeleteById(Guid id);

    Task DeleteByIdAsync(Guid id);

    void DeleteMany(Expression<Func<TDocument, bool>> filterExpression);

    Task DeleteManyAsync(Expression<Func<TDocument, bool>> filterExpression);
  }
}