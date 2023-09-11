using System;
using System.Data.Entity;

namespace RegistrationDemo.Data
{
    public class RegistrationDemoContext : DbContext, IDisposable
    {
        public RegistrationDemoContext() : base("name=RegistrationDemoDBEntities") { }
    }
}