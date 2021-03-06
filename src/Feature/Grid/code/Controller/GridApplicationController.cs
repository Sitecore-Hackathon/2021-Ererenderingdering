using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Feature.Grid.Controllers
{
    public class GridApplicationController : Controller
    {
        // GET: Application
        public ActionResult Index()
        {
            return View(); 
        }
    }
}