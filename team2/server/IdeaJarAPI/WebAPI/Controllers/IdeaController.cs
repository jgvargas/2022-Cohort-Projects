using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Controllers {


    [Route("Api/[controller]")]
    [ApiController]
    public class IdeaController : ControllerBase {
        private readonly ApplicationDbContext _context;


        public IdeaController(ApplicationDbContext context) {
            _context = context;
        }



        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll() => Ok(await _context.Ideas.ToListAsync());


        [HttpPost("AddIdea")]
        public async Task<IActionResult> AddIdea([FromBody] IdeaDTO model) {
            if (!ModelState.IsValid) {
                return BadRequest("Some properties are not valid.");
            }

            var idea = new Idea {
                IdeaName = model.IdeaName,
                Date = model.Date,
                CategoryId = model.CategoryId
            };

            _context.Ideas.Add(idea);
            var output = await _context.SaveChangesAsync();

            if (output == 1) {
                return Ok(new UserManagerResponseDTO {
                    IsSuccess = true,
                    Message = "Successfully added the idea"
                });
            }

            return Ok(new UserManagerResponseDTO {
                IsSuccess = false,
                Message = "Unable to add the idea"
            });
        }


        [HttpGet("GetRandomIdea")]
        public async Task<IActionResult> GetRandomIdea() => Ok(await _context.Ideas.OrderBy(x => Guid.NewGuid()).FirstAsync());


        [HttpGet("GetRandomIdeaByCategory/{id}")]
        public async Task<IActionResult> GetRandomIdeaByCategory(int id) => Ok(await _context.Ideas.Where(x => x.CategoryId == id && x.CategoryId != 1).FirstOrDefaultAsync());


        [HttpPost("DeleteIdea")]
        public async Task<IActionResult> DeleteIdea([FromBody] IdeaDTO model) {
            if (!ModelState.IsValid) {
                return BadRequest("Some properties are not valid.");
            }

            var idea = new Idea {
                Id = model.Id,
            };

            _context.Ideas.Remove(idea);
            var output = await _context.SaveChangesAsync();

            if (output == 1) {
                return Ok(new UserManagerResponseDTO {
                    IsSuccess = true,
                    Message = "Successfully removed the idea"
                });
            }

            return Ok(new UserManagerResponseDTO {
                IsSuccess = false,
                Message = "Unable to remove the idea"
            });
        }
    }
}
