using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Feature.Grid.Models
{
    public class GridData
    {
        public List<string>  Columns = new List<string>();
        public List<List<string>> Data = new List<List<string>>();
    }
}