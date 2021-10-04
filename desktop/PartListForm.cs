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
using Microsoft.Extensions.Http;


namespace Music_event_management_system
{
    public partial class PartListForm : Form
    {
        private static HttpClient _httpClient;
        private static BindingSource source;

        public PartListForm (HttpClient httpClient)
        {
            InitializeComponent();
            _httpClient = httpClient;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Successfully Edited");

        }

        private void button2_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Finalized");
        }

        private async void Form4_Load(object sender, EventArgs e)
        {
            await getparticipants();
        }
        private async Task getparticipants()
        {
            var response = await _httpClient.GetFromJsonAsync<List<Participant>>($"/participant/populated");
            var list = new BindingList<Participant>(response);
            source = new BindingSource(list, null);
            dataGridView1.DataSource = source;
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }
    }
}
