using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models {


    public class Idea {


        [Key]
        public int Id { get; set; }


        [Required]
        public string IdeaName { get; set; }


        [Required]
        public int CategoryId { get; set; }


        [Required]
        public DateTime Date { get; set; }

    }
}
