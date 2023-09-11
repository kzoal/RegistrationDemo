using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

using RegistrationDemo.Data;

namespace RegistrationDemo.Repository
{
    public class UserRepository : IUser
    {
        private RegistrationDemoDBEntities db;

        public UserRepository()
        {
            db = new RegistrationDemoDBEntities();
        }

        public bool Login(string username, string password)
        {
            ObjectParameter loginSuccess = new ObjectParameter("success", typeof(int));
            db.ValidateUser(username, password, loginSuccess);
            return Convert.ToInt32(loginSuccess.Value) == 1 ? true : false;
        }
    }
}