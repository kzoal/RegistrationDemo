using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistrationDemo.Repository
{
    internal interface IUser
    {
        bool Login(string username, string password);
    }
}
