using System;

namespace chat_app.Models
{
    public class Message
    {
        public string clientuid { get; set; }
        public string type { get; set; }
        public string message { get; set; }
        public DateTime date { get; set; }
    }
}