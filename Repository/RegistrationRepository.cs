using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

using RegistrationDemo.Data;

namespace RegistrationDemo.Repository
{
    public class RegistrationRepository<T> : IRegistration<T> where T : class
    {
        private RegistrationDemoDBEntities db;
        private DbSet<T> dbSet;

        public RegistrationRepository()
        {
            db = new RegistrationDemoDBEntities();
            dbSet = db.Set<T>();
        }

        public T GetRegistrationByID(Guid RegistrationId)
        {
            return dbSet.Find(RegistrationId);
        }

        public IEnumerable<T> GetRegistrations()
        {
            return dbSet.ToList();
        }

        public void CreateRegistration(T Registration)
        {
            dbSet.Add(Registration);
        }

        public void UpdateRegistration(T Registration)
        {
            db.Entry(Registration).State = EntityState.Modified;
        }

        public void DeleteRegistration(string idsToDelete)
        {
            Guid id = Guid.Empty;
            List<Guid> intList = idsToDelete.Split(',')
                                    .Select(x => { Guid.TryParse(x, out id); return id; })
                                    .Where(x => x != Guid.Empty)
                                    .ToList();

            foreach (Guid regId in intList)
            {
                T pId = dbSet.Find(regId);
                dbSet.Remove(pId);

                User user = db.Users.Find(regId);
                db.Users.Remove(user);
            }
        }

        public void Save()
        {
            db.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (this.db != null)
                {
                    this.db.Dispose();
                    this.db = null;
                }
            }
        }
    }
}