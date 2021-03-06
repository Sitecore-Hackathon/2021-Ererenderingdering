using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Feature.Grid.Models;
using Newtonsoft.Json;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Data.Templates;
using Sitecore.SecurityModel;

namespace Feature.Grid.Controllers
{
    public class GridApplicationController : Controller
    {
        private List<string> _includedFields = new List<string>() {  };
        private List<string> _defaultFields = new List<string>() { "__Icon" };
        // GET: Application
        public ActionResult Index(string id, string database)
        {
            var model = new Page();
            using (new DatabaseSwitcher(Sitecore.Data.Database.GetDatabase(database)))
            {
                var item = Sitecore.Context.Data.Database.GetItem(new ID(id));
                var children = item.Children;
                var templates = children.Select(x => x.Template).Take(1).Distinct();
                var fields = new List<string>();

                foreach (var templateItem in templates)
                {
                    fields.AddRange(templateItem.OwnFields.Select(x=>x.Name));
                }

                model.FieldsJson = string.Join(",", fields);
                model.TemplatesJson = JsonConvert.SerializeObject(templates.Select(x=>x.ID));
            }

            model.Id = id;
            model.Database = database;

            return View(model);
        }

        public ActionResult Children(string id, string database)
        {
            using (new DatabaseSwitcher(Sitecore.Data.Database.GetDatabase(database)))
            {
                var item = Sitecore.Context.Data.Database.GetItem(new ID(id));
                var fields = new List<string> { "__Icon" };
                var children = item.Children;
                var list = new List<Dictionary<string, string>>();
                foreach (Item child in children)
                {
                    var dictionary = new Dictionary<string, string>();
                    dictionary["ID"] = child.ID.ToString();
                    dictionary["Name"] = child.Name;
                    foreach (string field in fields)
                    {
                        var value = child[field];
                        dictionary[field] = value;
                    }

                    list.Add(dictionary);
                }

                return Content(JsonConvert.SerializeObject(list));
            }
        }

        public ActionResult Data(string id, string database, string fields)
        {
            var columns = new List<string>();
            columns.Add("ID");
            columns.Add("Name");

            var fieldsList = new List<string>();
            fieldsList.AddRange(_includedFields);
            if (!string.IsNullOrEmpty(fields))
            {
                var requestedFields = fields.Split(',');
                if (requestedFields.Any())
                {
                    fieldsList.AddRange(requestedFields);
                }
                else
                {
                    fieldsList.AddRange(_defaultFields);
                }
            }

            var model = new GridData();
            model.Columns = fieldsList;

            using (new DatabaseSwitcher(Sitecore.Data.Database.GetDatabase(database)))
            {
                var item = Sitecore.Context.Data.Database.GetItem(new ID(id));
                var data = new List<List<string>>();
                var children = item.Children;
                foreach (Item child in children)
                {
                    var row = new List<string>();
                    row.Add(child.ID.ToString());
                    row.Add(child.Name);
                    foreach (string field in fieldsList)
                    {
                        row.Add(child[field]);
                    }

                    data.Add(row);
                }

                model.Data = data;
            }

            return Content(JsonConvert.SerializeObject(model));
        }

        [HttpPost]
        public ActionResult Delete(string id, string database)
        {
            try
            {
                using (new DatabaseSwitcher(Sitecore.Data.Database.GetDatabase(database)))
                {
                    //ToDo figure out with security rights
                    using (new SecurityDisabler())
                    {
                        Sitecore.Context.Database.GetItem(new ID(id)).Delete();
                    }
                }
            }
            catch (Exception e)
            {
                return Content(e.Message + e.Source);
            }

            return Content("{\"result\":\"success\"}");
        }

        [HttpPost]
        public ActionResult Save(string id, string database, Dictionary<string,string> data)
        {
            try
            {
                using (new DatabaseSwitcher(Database.GetDatabase(database)))
                {
                    //ToDo figure out with security rights
                    using (new SecurityDisabler())
                    {
                        var item = Sitecore.Context.Database.GetItem(new ID(id));
                        item.Editing.BeginEdit();
                        foreach (var key in data.Keys)
                        {
                            item[key] = data[key];
                        }

                        item.Editing.EndEdit();
                        item.Editing.AcceptChanges();
                    }
                }
            }
            catch (Exception e)
            {
                return Content(e.Message + e.Source);
            }

            return Content("{\"result\":\"success\"}");
        }
    }
}