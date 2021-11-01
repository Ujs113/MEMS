using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Music_event_management_system
{
    public partial class EntryLink : Form
    {
        private static HttpClient _httpClient;
        private static Utility utility = new Utility();
        public EntryLink(HttpClient httpClient)
        {
            InitializeComponent();
            _httpClient = httpClient;
        }

        private async void Form7_Load(object sender, EventArgs e)
        {
            
            var state = await utility.getEventState(_httpClient);
            if(state == null)
            {
                state = new EventState
                {
                    isOrganized = true,
                    partInfoCollected = false,
                    songInfoCollected = false
                };
                var response = await _httpClient.PostAsJsonAsync($"/event", state);
                if(response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Event Successfully Organized");
                }
                else
                {
                    MessageBox.Show("Error ocurred while organizing the event");
                }
            }
            else
            {
                MessageBox.Show("Event already Organized!");
            }
            
        }
    }
}
