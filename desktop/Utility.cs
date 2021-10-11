using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace Music_event_management_system
{
    class Utility
    {

        public Participant findParticipant(List<Participant> list, long mobileno)
        {
            foreach (Participant part in list)
            {
                if (part.mobileno == mobileno)
                    return part;
            }
            return null;
        }

        public async Task<List<Participant>> getparticipants(HttpClient _httpClient)
        {
            var response = await _httpClient.GetFromJsonAsync<List<Participant>>($"/participant/populated");
            return response;
        }

        public List<Pair> PairUp(List<Participant> participantList)
        {
            List<Pair> pairs = new List<Pair>();
            foreach (Participant participant in participantList)
            {
                foreach (Duetsong duet in participant.duetSong)
                {
                    Pair tmp = new Pair();
                    tmp.participants[0] = participant;
                    var mobileno = duet.preference;
                    var part = findParticipant(participantList, mobileno);
                    tmp.participants[1] = part;
                    tmp.song = duet;
                    tmp.type = songType.Duet;
                    pairs.Add(tmp);
                }
            }
            return pairs;
        }
    }
}
