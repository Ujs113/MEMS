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
        public EntryLink(HttpClient httpClient)
        {
            InitializeComponent();
            _httpClient = httpClient;
        }

        private async void Form7_Load(object sender, EventArgs e)
        {
            await OrganizeEvent();
        }

        private async Task OrganizeEvent()
        {
            EventState state = new EventState();
            state.isOrganized = true;
            state.partInfoCollected = false;
            state.songInfoCollected = false;
            var response = await _httpClient.PostAsJsonAsync($"/event", state);

        }
    }
}
