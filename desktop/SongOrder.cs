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

namespace Music_event_management_system
{
    public partial class SongOrder : Form
    {
        private static HttpClient _httpClient;
        public SongOrder(HttpClient httpClient)
        {
            InitializeComponent();
            httpClient = _httpClient;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Sucessfully edited");
        }

        private void button2_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Finalized");
        }

        private void Form6_Load(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }
    }
}
