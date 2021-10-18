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

namespace Music_event_management_system
{
    public partial class PairList : Form
    {
        private static HttpClient _httpClient;
        private static Utility utility = new Utility();
        private List<Participant> data;
        private List<Pair> list;
        private int index;

        public PairList(HttpClient httpClient)
        {
            InitializeComponent();
            _httpClient = httpClient;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Finalized");
        }

        private async void button1_Click(object sender, EventArgs e)
        {
            var duet = list[index].song;
            duet.preference = long.Parse(textBox1.Text);
            await updateDuet(duet);
            data = await utility.getparticipants(_httpClient);
            list = utility.PairUp(data);
            var table = SerializePairs(list);
            dataGridView1.DataSource = table;
            MessageBox.Show("Sucessfully edited");
        }

        private async Task<bool> updateDuet(Duetsong duet)
        {
            var options = new JsonSerializerOptions();
            string jsonString = JsonSerializer.Serialize(duet, options);
            var content = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var req = new HttpRequestMessage(new HttpMethod("PATCH"), $"/songs/duets/" + duet._id);
            req.Content = content;
            var res = await _httpClient.SendAsync(req);
            return res.IsSuccessStatusCode;
        }

        private async void Form5_Load(object sender, EventArgs e)
        {
            data = await utility.getparticipants(_httpClient);
            list = utility.PairUp(data);
            var table = SerializePairs(list);
            dataGridView1.DataSource = table;
        }

        private DataTable SerializePairs(List<Pair> list)
        {
            DataTable returnTable = new DataTable("Pairs");
            returnTable.Columns.Add("Participant1");
            returnTable.Columns.Add("Participant2");
            returnTable.Columns.Add("Song Name");
            returnTable.Columns.Add("Artist");
            returnTable.Columns.Add("Type");
            foreach(Pair pair in list)
            {
                DataRow row = returnTable.NewRow();
                row[0] = pair.participants[0].firstname + " " + pair.participants[0].lastname;
                row[1] = pair.participants[1].firstname + " " + pair.participants[1].lastname;
                row[2] = pair.song.songname;
                row[3] = pair.song.artist;
                row[4] = pair.song.type;
                returnTable.Rows.Add(row);
            }
            returnTable.AcceptChanges();
            return returnTable;
        }

        private void dataGridView1_RowHeaderMouseClick(object sender, DataGridViewCellMouseEventArgs e)
        {
            index = e.RowIndex;
            DataGridViewRow row = dataGridView1.Rows[index];
            if(row.Cells[0].Value != null)
            {
                textBox1.Text = list[index].song.preference.ToString();
            }
        }
    }
}
