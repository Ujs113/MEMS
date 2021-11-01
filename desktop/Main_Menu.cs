using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Extensions.Http;

namespace Music_event_management_system
{
    public partial class Main_Menu : Form
    {
        private static HttpClient _httpClient;
        public Main_Menu(IHttpClientFactory httpClientFactory)
        {
            InitializeComponent();
            _httpClient = httpClientFactory.CreateClient("MEMS");
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void radioButton1_CheckedChanged(object sender, EventArgs e)
        {

        }

        private void domainUpDown1_SelectedItemChanged(object sender, EventArgs e)
        {

        }

        private void button4_Click(object sender, EventArgs e)
        {
            PartListForm f4 = new PartListForm(_httpClient);
            f4.Show();
        }

        private void button5_Click(object sender, EventArgs e)
        {
            PairList f5 = new PairList(_httpClient);
            f5.Show();
        }

        private void button6_Click(object sender, EventArgs e)
        {
            SongOrder f6 = new SongOrder(_httpClient);
            f6.Show();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            EntryLink f7 = new EntryLink(_httpClient);
            f7.Show();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            SongInfo f8 = new SongInfo(_httpClient);
            f8.Show();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }
    }
}
