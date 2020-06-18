using chat_app.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace chat_app.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(Message message)
        {
            await Clients.All.SendAsync("MessageReceived", message);
        }
    }
}