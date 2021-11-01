using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music_event_management_system
{
    class EventState
    {
        public string _id { get; set; }
        public bool isOrganized { get; set; }
        public bool partInfoCollected { get; set; }
        public bool songInfoCollected { get; set; }
    }
}
