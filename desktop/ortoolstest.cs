using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Google.OrTools.Sat;

namespace Music_event_management_system
{
    class ortoolstest
    {
        public void Solve()
        {
            int num_songs = 15;
            int num_participants = 5;
            int upperGap = 2;
            int lowerGap = 1;
            int[][] pairs =
            {
                new int[] {0, -1},
                new int[] {1, -2},
                new int[] {2, -3},
                new int[] {3, -4},
                new int[] {4, -5},
                new int[] {0, 1},
                new int[] {0, 4},
                new int[] {1, 2},
                new int[] {1, 4},
                new int[] {2, 0},
                new int[] {2, 3},
                new int[] {3, 0},
                new int[] {3, 1},
                new int[] {4, 2},
                new int[] {4, 3}
            };
            var slots = Enumerable.Range(0, num_songs);
            var participants = Enumerable.Range(0, num_participants);
            CpModel model = new CpModel();
            IntVar[,] assingment = new IntVar[num_songs, num_songs];
            foreach(var s in slots)
            {
                for(int i = 0; i < 15; i++)
                {
                    assingment[s, i] = model.NewBoolVar(String.Format("slot_s{0}p1{1}p2{2}", s, pairs[i][0], pairs[i][1]));
                }
            }

            foreach(var s in slots)
            {
                IntVar[] tmp = new IntVar[num_songs];
                for(int i = 0; i < 15; i++)
                {
                    tmp[i] = assingment[s, i];
                }

                model.Add(LinearExpr.Sum(tmp) == 1);
            }

            for(int i = 0; i < 15; i++)
            {
                IntVar[] tmp = new IntVar[num_songs];
                foreach(var s in slots)
                {
                    tmp[s] = assingment[s, i];
                }
                model.Add(LinearExpr.Sum(tmp) == 1);
            }

            for(int i = 0; i < 15; i++)
            {
                
            }
        }
    }
}
