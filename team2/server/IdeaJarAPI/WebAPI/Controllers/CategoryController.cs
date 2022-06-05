using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers {


    [ApiController]
    [Route("Api/[controller]")]
    public class CategoryController : ControllerBase {
        private readonly ApplicationDbContext _context;


        public CategoryController(ApplicationDbContext context) {
            _context = context;
        }



        [HttpGet("GetAll")]
        public async Task<IActionResult> Index() => Ok(await _context.Categories.ToListAsync());

    }
}
