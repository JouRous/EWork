using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Infrastructure.Data;
using Infrastructure.Models;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace Api.Data
{
  public class Repository<T> : IRepository<T> where T : BaseEntity
  {
    public Repository(AppDbContext context)
    {
      Context = context;
      DbSet = Context.Set<T>();
    }

    protected DbContext Context { get; }

    protected DbSet<T> DbSet { get; }

    public void Add(T entity)
    {
      if (entity != null)
        DbSet.Add(entity);
    }

    public void AddRange(IList<T> entities)
    {
      if (entities != null && entities.Count > 0)
      {
        DbSet.AddRange(entities);
      }
    }

    public IDbContextTransaction BeginTransaction()
    {
      return Context.Database.BeginTransaction();
    }

    public int SaveChanges()
    {
      return Context.SaveChanges();
    }

    public Task<int> SaveChangesAsync()
    {
      return Context.SaveChangesAsync();
    }

    public IQueryable<T> Query()
    {
      return DbSet;
    }

    public void Remove(T entity)
    {
      if (entity != null)
        DbSet.Remove(entity);
    }

    public Task<T> FirstOrDefaultAsync(Guid id)
    {
      return DbSet.FirstOrDefaultAsync(c => c.Id.Equals(id));
    }

    public IQueryable<T> Query(Expression<Func<T, bool>> predicate)
    {
      return DbSet.Where(predicate);
    }
  }
}