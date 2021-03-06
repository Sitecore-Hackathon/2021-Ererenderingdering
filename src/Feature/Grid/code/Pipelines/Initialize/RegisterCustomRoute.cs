using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Sitecore.Diagnostics;
using Sitecore.Pipelines;

namespace Feature.Grid.Pipelines.Initialize
{
    public class RegisterCustomRoutes
    {
        public void Process(PipelineArgs args)
        {
            Log.Info("Sitecore is starting", this);
            RegisterRoutes(RouteTable.Routes);
        }
        public void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Grid Application",
                "grid/{controller}/{action}",
                new { controller = "Application", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}