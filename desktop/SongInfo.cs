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

        public SongInfo(HttpClient httpClient)
        {
            InitializeComponent();
            _httpClient = httpClient;
        }

        private async void Form8_Load(object sender, EventArgs e)
        {
            var list = await getparticipants();
            var table = SerializeSongs(list);
            dataGridView1.DataSource = table;
        }

        private async Task<List<Participant>> getparticipants()
        {
            var response = await _httpClient.GetFromJsonAsync<List<Participant>>($"/participant/populated");
            return response;
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private DataTable SerializeSongs(List<Participant> list)
        {
            DataTable returnTable = new DataTable("Song Info");
            returnTable.Columns.Add("Participant Name");
            returnTable.Columns.Add("Solo Song Name");
            returnTable.Columns.Add("Solo Song Artist");
            int i = 1;
            foreach(Participant part in list)
            {
                int columnsRequired = (part.duetSong.Length * 2) + 3;

                while(returnTable.Columns.Count < columnsRequired)
                {
                    returnTable.Columns.Add("Duet Song " + i + " Name");
                    returnTable.Columns.Add("Duet Song " + i + " Artist");
                    i++;
                }
                returnTable.AcceptChanges();
                DataRow row = returnTable.NewRow();
                row[0] = part.firstname + " " + part.lastname;
                row[1] = part.soloSong.songname;
                row[2] = part.soloSong.artist;
                int j = 3;
                foreach(Duetsong duet in part.duetSong)
                {
                    row[j] = duet.songname;
                    j++;
                    row[j] = duet.artist;
                    j++;
                }
                returnTable.Rows.Add(row);
            }
            return returnTable;
        }

        private void dataGridView1_CellContentClick_1(object sender, DataGridViewCellEventArgs e)
        {

        }
    }
}
