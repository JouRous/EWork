using System;

namespace Infrastructure.Helpers
{
  [AttributeUsage(AttributeTargets.Class, Inherited = false)]
  public class BsonCollectionAttribute : Attribute
  {
    public string CollectionName { get; }

    public BsonCollectionAttribute(string collectionName)
    {
      CollectionName = collectionName;
    }
  }
}