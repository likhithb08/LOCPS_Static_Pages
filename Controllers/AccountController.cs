using Microsoft.AspNetCore.Mvc;

namespace Trial_Loan_Origination.Controllers
{
    public class AccountController : Controller
    {
        // GET: /Account/Login
        public IActionResult Login()
        {
            return View();
        }

        // GET: /Account/Redirect?username=foo&role=Customer
        public IActionResult Redirect(string username, string role)
        {
            // In a real app you'd set authentication cookie here.
            // For demo we just forward role as query string to the dashboard.
            if (string.IsNullOrEmpty(role))
                return RedirectToAction("Login");

            role = role.ToLower();
            if (role == "customer")
                return Redirect($"/Portal/CustomerDashboard?role={role}");
            else if (role == "loanofficer" || role == "underwriter" || role == "admin")
                return Redirect($"/Portal/StaffDashboard?role={role}");
            else
                return RedirectToAction("Login");
        }
    }
}
