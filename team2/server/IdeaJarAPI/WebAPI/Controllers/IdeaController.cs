using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace WebAPI.Controllers {


    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class IdeaController : ControllerBase {
        private static readonly string[] Ideas = new[] {
            "Go to Theaters", "Stay Home", "Road Trip", "Any", "Indoors", "Outdoors"
        };



        //[Authorize]
        [HttpGet("GetAll")]
        public IEnumerable<string> Get() {
            Response.Cookies.Append("testing", "test", new CookieOptions {
                HttpOnly = true
            });
            Console.WriteLine(Request.Cookies["testing"]);
            return Ideas.ToArray();
        }
    }
}
