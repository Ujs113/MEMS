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
    public partial class SongOrder : Form
    {
        private static HttpClient _httpClient;
        public SongOrder(HttpClient httpClient)
        {
            InitializeComponent();
            _httpClient = httpClient;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Sucessfully edited");
        }

        private void button2_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Finalized");
        }

        private async void Form6_Load(object sender, EventArgs e)
        {
            Utility utility = new Utility();
            var data = await utility.getparticipants(_httpClient);
            var list = utility.PairUp(data);
            foreach(var Person in data)
            {
                Pair pair = new Pair();
                pair.participants[0] = Person;
                pair.solosong = Person.soloSong;
                pair.type = songType.Solo;
                list.Add(pair);
            }
            var table = SerializeOrder(list);
            dataGridView1.DataSource = table;
            
        }

        private DataTable SerializeOrder(List<Pair> list)
        {
            DataTable returnTable = new DataTable("Pairs");
            returnTable.Columns.Add("Song Name");
            returnTable.Columns.Add("Artist");
            returnTable.Columns.Add("Type");
            returnTable.Columns.Add("Participant1");
            returnTable.Columns.Add("Participant2");
            foreach (Pair pair in list)
            {
                DataRow row = returnTable.NewRow();
                if(pair.type == songType.Solo)
                {
                    row[0] = pair.solosong.songname;
                    row[1] = pair.solosong.artist;
                    row[2] = pair.type.ToString();
                }
                else
                {
                    row[0] = pair.song.songname;
                    row[1] = pair.song.artist;
                    row[2] = pair.song.type;
                    row[4] = pair.participants[1].firstname + " " + pair.participants[1].lastname;
                }
                
                row[3] = pair.participants[0].firstname + " " + pair.participants[0].lastname;
                
                returnTable.Rows.Add(row);
            }
            returnTable.AcceptChanges();
            return returnTable;
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }
    }
}
