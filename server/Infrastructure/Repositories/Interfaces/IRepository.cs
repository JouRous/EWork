using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore.Storage;

namespace Infrastructure.Repositories
{
  public interface IRepository<T> where T : BaseEntity
  {
    IQueryable<T> Query();

    void Add(T entity);

    void AddRange(IList<T> entities);

    IDbContextTransaction BeginTransaction();

    int SaveChanges();

    Task<int> SaveChangesAsync();

    void Remove(T entity);

    Task<T> FirstOrDefaultAsync(Guid id);

    IQueryable<T> Query(Expression<Func<T, bool>> predicate);
  }
}