using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models {


    public class ApplicationDbContext : IdentityDbContext {


        public ApplicationDbContext(DbContextOptions options) : base(options) { }



        public DbSet<Category> Categories { get; set; }


        public DbSet<Idea> Ideas { get; set; }

    }
}