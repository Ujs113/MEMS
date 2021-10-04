using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music_event_management_system
{
    public class Participant
    {
        public string _id { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string gender { get; set; }
        public long mobileno { get; set; }
        public int __v { get; set; }
        public Duetsong[] duetSong { get; set; }
        public Solosong soloSong { get; set; }
        public int duetSize { get; set; }
    }

    public class Solosong
    {
        public string _id { get; set; }
        public string songname { get; set; }
        public string artist { get; set; }
        public int __v { get; set; }
    }

    public class Duetsong
    {
        public string _id { get; set; }
        public string songname { get; set; }
        public string artist { get; set; }
        public string type { get; set; }
        public long preference { get; set; }
        public int __v { get; set; }
    }
}


