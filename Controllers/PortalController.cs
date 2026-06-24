using Microsoft.AspNetCore.Mvc;

namespace Trial_Loan_Origination.Controllers
{
    public class PortalController : Controller
    {
        // GET: /Portal/CustomerDashboard
        public IActionResult CustomerDashboard()
        {
            return View();
        }

        // GET: /Portal/StaffDashboard?role=loanofficer|underwriter|admin
        public IActionResult StaffDashboard(string role)
        {
            // Role is passed as query string; view will render role‑specific partials.
            ViewBag.Role = role?.ToLower();
            return View();
        }

        // GET: /Portal/LoanOfficer
        public IActionResult LoanOfficer()
        {
            return View();
        }

        // GET: /Portal/Underwriter
        public IActionResult Underwriter()
        {
            return View();
        }

        // GET: /Portal/Admin
        public IActionResult Admin()
        {
            return View();
        }
    }
}
