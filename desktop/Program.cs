using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http;
using Microsoft.Extensions.Hosting;


namespace Music_event_management_system
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        private static IServiceProvider ServiceProvider { get; set; }
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            ConfigureServices();
            Application.Run((Main_Menu)ServiceProvider.GetService(typeof(Main_Menu)));
        }
        private static void ConfigureServices()
        {
            var services = new ServiceCollection();
            services.AddHttpClient();
            services.AddHttpClient("MEMS", c =>
            {
                c.BaseAddress = new Uri("http://localhost:8080/");
            });
            services.AddSingleton<Main_Menu>();
            ServiceProvider = services.BuildServiceProvider();
        }

    }
}
