using Microsoft.EntityFrameworkCore;

namespace WebAPI.Repositories {
    public class UsersRepository {
        //private readonly IdeaJarContext _context;

        //public UsersRepository(IdeaJarContext context) {
        //    _context = context;
        //}

        public Task GetById(int id) {
            //var user = _context.Users.Where(x => x.Id == id).FirstAsync();

            return null;
        }
    }
}
