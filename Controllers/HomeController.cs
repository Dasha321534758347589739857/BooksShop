using BooksShop.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BooksShop.Controllers
{
    public class HomeController : Controller //контроллер для обработки данных
    {
        private readonly ILogger<HomeController> _logger; //логгирование

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult Information()
        {
            return View();
        }
        public IActionResult Katalog()
        {
            return View();
        }
        public IActionResult Contacts()
        {
            return View();
        }
        public IActionResult Roles()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
