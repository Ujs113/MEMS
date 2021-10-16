using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Extensions.Http;


namespace Music_event_management_system
{
    public partial class PartListForm : Form
    {
        private static HttpClient _httpClient;
        private static BindingSource source;
        private static Utility utility = new Utility();

        public PartListForm (HttpClient httpClient)
        {
            InitializeComponent();
            _httpClient = httpClient;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Successfully Edited");

        }

        private async void button2_Click(object sender, EventArgs e)
        {
            var state = await utility.getEventState(_httpClient);
            if(state.isOrganized == true && state.partInfoCollected == false)
            {
                state.partInfoCollected = true;
                var res = await utility.updateEventState(state, _httpClient);
                if(res)
                {
                    MessageBox.Show("Finalized");
                }
                else
                {
                    MessageBox.Show("Error occurred while finalizing!");
                }
            }
            else
            {
                MessageBox.Show("Participant list already finalized!");
            }
            //MessageBox.Show("Finalized");
        }

        //private async Task<EventState> getEventState()
        //{
        //    var response = await _httpClient.GetFromJsonAsync<List<EventState>>($"/event");
        //    return response[0];
        //}

        //private async Task<bool> updateEventState(EventState e)
        //{
        //    var options = new JsonSerializerOptions();
        //    string jsonString = JsonSerializer.Serialize(e, options);
        //    var content = new StringContent(jsonString, Encoding.UTF8, "application/json");
        //    var req = new HttpRequestMessage(new HttpMethod("PATCH"), $"/event")
        //    {
        //        Content = content
        //    };
        //    var res = await _httpClient.SendAsync(req);
        //    return res.IsSuccessStatusCode;
        //}

        private async void Form4_Load(object sender, EventArgs e)
        {
            var res = await utility.getparticipants(_httpClient);
            var list = new BindingList<Participant>(res);
            source = new BindingSource(list, null);
            dataGridView1.DataSource = source;
        }
        //private async Task<List<Participant>> getparticipants()
        //{
        //    var response = await _httpClient.GetFromJsonAsync<List<Participant>>($"/participant/populated");
        //    return response;   
        //}

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }
    }
}
