using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Feature.Grid.Models
{
    public class Page
    {
        public string FieldsJson { get; set; }
        public string TemplatesJson { get; set; }

        public string Id { get; set; }
        public string Database { get; set; }
    }
}