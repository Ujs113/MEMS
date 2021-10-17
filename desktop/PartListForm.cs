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

        private async void button1_Click(object sender, EventArgs e)
        {
            var part = new Participant
            {
                firstname = textBox1.Text,
                lastname = textBox2.Text,
                gender = textBox3.Text,
                mobileno = long.Parse(textBox4.Text),
                duetSize = int.Parse(textBox5.Text)
            };
            await addParticipant(part);
            var res = await utility.getparticipants(_httpClient);
            var list = new BindingList<Participant>(res);
            source = new BindingSource(list, null);
            dataGridView1.DataSource = source;
            MessageBox.Show("Successfully Updated");
        }

        private async Task<bool> updateParticipant(Participant part)
        {
            var options = new JsonSerializerOptions();
            string jsonString = JsonSerializer.Serialize(part, options);
            var content = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var req = new HttpRequestMessage(new HttpMethod("PATCH"), $"/participant");
            req.Content = content;
            var res = await _httpClient.SendAsync(req);
            return res.IsSuccessStatusCode;
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
        }

        private async void Form4_Load(object sender, EventArgs e)
        {
            var res = await utility.getparticipants(_httpClient);
            var list = new BindingList<Participant>(res);
            source = new BindingSource(list, null);
            dataGridView1.DataSource = source;
        }    

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void dataGridView1_RowHeaderMouseClick(object sender, DataGridViewCellMouseEventArgs e)
        {
            var index = e.RowIndex;
            DataGridViewRow row = dataGridView1.Rows[index];
            if(row.Cells[0].Value != null)
            {
                textBox1.Text = row.Cells[0].Value.ToString();
                textBox2.Text = row.Cells[1].Value.ToString();
                textBox3.Text = row.Cells[2].Value.ToString();
                textBox4.Text = row.Cells[3].Value.ToString();
                textBox5.Text = row.Cells[4].Value.ToString();
            }
            
        }

        private void participantBindingSource_ListChanged(object sender, ListChangedEventArgs e)
        {
            var changedType = e.ListChangedType;
            MessageBox.Show(changedType.ToString());
        }

        private async Task<bool> addParticipant(Participant part)
        {
            var res = await _httpClient.PostAsJsonAsync($"/participant", part);
            return res.IsSuccessStatusCode;
        }

        private async void button3_Click(object sender, EventArgs e)
        {
            var part = new Participant
            {
                firstname = textBox1.Text,
                lastname = textBox2.Text,
                gender = textBox3.Text,
                mobileno = long.Parse(textBox4.Text),
                duetSize = int.Parse(textBox5.Text)
            };
            await addParticipant(part);
            var res = await utility.getparticipants(_httpClient);
            var list = new BindingList<Participant>(res);
            source = new BindingSource(list, null);
            dataGridView1.DataSource = source;
            MessageBox.Show("Successfully Added");
        }
    }
}
