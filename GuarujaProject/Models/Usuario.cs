using System.ComponentModel.DataAnnotations;

namespace GuarujaProject.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Nome { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public DateTime DataCadastro { get; set; } = DateTime.Now;

        // relacionamento com transacoes
        public List<Transacao>? Transacoes { get; set; }
    }
}