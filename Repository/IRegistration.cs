using System;
using System.Collections.Generic;

namespace RegistrationDemo.Repository
{
    internal interface IRegistration<T> where T : class
    {
        void CreateRegistration(T Registration);

        IEnumerable<T> GetRegistrations();

        T GetRegistrationByID(Guid RegistrationId);

        void UpdateRegistration(T Registration);

        void DeleteRegistration(string idsToDelete);

        void Save();
    }
}
