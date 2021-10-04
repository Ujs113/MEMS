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
    public partial class SongInfo : Form
    {
        private static HttpClient _httpClient;
        private static BindingSource masterSource;
        private static BindingSource detailSourceSolo;
        private static BindingSource detailSourceDuet;

        public SongInfo(HttpClient httpClient)
        {
            InitializeComponent();
            _httpClient = httpClient;
        }

        private async void Form8_Load(object sender, EventArgs e)
        {
            await getparticipants();
        }

        private async Task getparticipants()
        {
            var response = await _httpClient.GetFromJsonAsync<List<Participant>>($"/participant/populated");
            var list = new BindingList<Participant>(response);
            masterSource = new BindingSource(list, null);
            dataGridView1.DataSource = masterSource;
            detailSourceSolo = new BindingSource(list, "SoloSong");
            detailSourceDuet = new BindingSource(list, "DuetSong");
            dataGridView2.DataSource = detailSourceSolo;
            dataGridView3.DataSource = detailSourceDuet;
            DataTable table = new DataTable("Solo");
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }
    }
}
