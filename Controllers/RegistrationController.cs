using System;
using System.Text;
using System.Web.Mvc;

using RegistrationDemo.Data;
using RegistrationDemo.Repository;
using RegistrationDemo.Service;

namespace RegistrationDemo.Controllers
{
    public class RegistrationController : Controller
    {
        
        private IRegistration<Registration> registration;

        public RegistrationController()
        {
            this.registration = new RegistrationRepository<Registration>();
        }

        [Authorize]
        public ActionResult Registrations()
        {
            var registrations = registration.GetRegistrations();
            return View(registrations);
        }

        [HttpGet]
        public PartialViewResult Create()
        {
            var registration = new Registration();
            return PartialView(registration);
        }

        [HttpGet][Authorize]
        public PartialViewResult Edit(Guid id)
        {
            var rgs = registration.GetRegistrationByID(id);
            return PartialView(rgs);
        }

        [HttpPost][Authorize]
        public JsonResult Edit(Registration changedRegistration)
        {
            if (ModelState.IsValid)
            {
                changedRegistration.LastUpdatedOn = DateTime.Now;
                registration.UpdateRegistration(changedRegistration);
                registration.Save();
                return Json(new { result = true });
            }
            else
            {
                var modelErrors = new StringBuilder();
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var modelError in modelState.Errors)
                    {
                        modelErrors.Append(modelError.ErrorMessage + Environment.NewLine);
                    }
                }
                return Json(new { result = false, error = modelErrors.ToString() });
            }
        }

        [HttpPost][Authorize]
        public JsonResult Delete(string ids)
        {
            if (!string.IsNullOrWhiteSpace(ids))
            {
                registration.DeleteRegistration(ids);
                registration.Save();
                return Json(new { result = true });
            }
            else
            {
                var modelErrors = new StringBuilder();
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var modelError in modelState.Errors)
                    {
                        modelErrors.Append(modelError.ErrorMessage + Environment.NewLine);
                    }
                }
                return Json(new { result = false, error = modelErrors.ToString() });
            }
        }

        [HttpPost]        
        public JsonResult Save(int id, string name, string phone, string email, string address, string username, string password)
        {
            var tempSalt                    = PasswordService.CreateSalt();
            Registration newRegistration    = new Registration();
            User newUser                    = new User();
            Guid newId                      = Guid.NewGuid();
            newRegistration.Id              = newId;
            newRegistration.Name            = name;
            newRegistration.Email           = email;
            newRegistration.Phone           = phone;
            newRegistration.Address         = address;
            newRegistration.CreatedOn       = DateTime.Now;
            newRegistration.Active          = true;

            newUser.Id                      = newId;
            newUser.Username                = username;
            newUser.Salt                    = tempSalt;
            newUser.HashPassword            = PasswordService.HashPasswordAndSalt(password, tempSalt);
            newUser.CreatedOn               = DateTime.Now;
            newUser.Active                  = true;
            newRegistration.User            = newUser;

            registration.CreateRegistration(newRegistration);
            registration.Save();
            return Json(new { result = true });
        }
    }
}