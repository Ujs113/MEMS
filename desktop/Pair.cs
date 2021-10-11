using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music_event_management_system
{
    public enum songType
    {
        Solo,
        Duet
    }
    class Pair
    {
        public Participant[] participants { get; set; }
        public Duetsong song { get; set; }
        public Solosong solosong { get; set; }
        public songType type { get; set; }
        public Pair()
        {
            participants = new Participant[2];
        }
    }
}
