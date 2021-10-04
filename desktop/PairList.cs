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
    public partial class PairList : Form
    {
        private static HttpClient _httpClient;
        public PairList(HttpClient httpClient)
        {
            InitializeComponent();
            _httpClient = httpClient;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Finalized");
        }

        private void button1_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Sucessfully edited");
        }

        private async void Form5_Load(object sender, EventArgs e)
        {
            var data = await getparticipants();
            var list = PairUp(data);
            var table = SerializePairs(list);
            dataGridView1.DataSource = table;
        }

        private async Task<List<Participant>> getparticipants()
        {
            var response = await _httpClient.GetFromJsonAsync<List<Participant>>($"/participant/populated");
            return response;
        }

        private List<Pair> PairUp(List<Participant> participantList)
        {
            List<Pair> pairs = new List<Pair>();
            foreach(Participant participant in participantList)
            {
                foreach(Duetsong duet in participant.duetSong)
                {
                    Pair tmp = new Pair();
                    tmp.participants[0] = participant;
                    //var id = duet._id;
                    var mobileno = duet.preference;
                    var part = findParticipant(participantList, mobileno);
                    tmp.participants[1] = part;
                    tmp.song = duet;
                    pairs.Add(tmp);
                }
            }
            return pairs;
        }

        private Participant findParticipant(List<Participant> list, long mobileno)
        {
            foreach(Participant part in list)
            {
                if (part.mobileno == mobileno)
                    return part;
            }
            return null;
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
    }
}
