
using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs {


    public class IdeaDTO {


        public int Id { get; set; }


        public string IdeaName { get; set; }


        public DateTime Date { get; set; }


        public int CategoryId { get; set; }
    }
}
