using System.Web.Mvc;
using System.Web.Security;

using RegistrationDemo.Repository;

namespace RegistrationDemo.Controllers
{
    public class UserController : Controller
    {
        private IUser user;

        public UserController()
        {
            this.user = new UserRepository();
        }

        [HttpPost]
        public JsonResult Login(string username, string password)
        {
            bool success = user.Login(username, password);
            

            if (success)
            {
                FormsAuthentication.SetAuthCookie(username, false);                
                return Json(Url.Action("Registrations", "Registration"));
            }

            return Json("Invalid username or password !!");
        }
        
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Clear();
            Session.RemoveAll();
            Session.Abandon();
            return RedirectToAction("Main", "Home");
        }

        [HttpPost]
        public JsonResult VerifyUser(string username, string password)
        {
            bool success = user.Login(username, password);
            return Json(new { result = success });
        }
    }
}