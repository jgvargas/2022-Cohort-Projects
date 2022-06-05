using WebAPI.Models;

namespace WebAPI.Data {


    public class DataSeeder {
        private readonly ApplicationDbContext _dbContext;


        public DataSeeder(ApplicationDbContext dbContext) {
            _dbContext = dbContext;
        }



        public void Seed() {
            if (!_dbContext.Categories.Any()) {
                var categories = new List<Category> {
                    new Category {
                        CategoryName = "Any",
                        CategoryClassName = "other"
                    },
                    new Category {
                        CategoryName = "Stay Home",
                        CategoryClassName = "stay-home"
                    },
                    new Category {
                        CategoryName = "Restaurant",
                        CategoryClassName = "restaurant"
                    },
                    new Category {
                        CategoryName = "Road Trip",
                        CategoryClassName = "road-trip"
                    },
                    new Category {
                        CategoryName = "Indoors",
                        CategoryClassName = "indoor"
                    },
                    new Category {
                        CategoryName = "Outdoors",
                        CategoryClassName = "outdoor"
                    }
                };

                _dbContext.Categories.AddRange(categories);
                _dbContext.SaveChanges();
            }
        }
    }
}
