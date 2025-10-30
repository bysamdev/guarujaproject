using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GuarujaProject.Models
{
    public class Transacao
    {
        public int Id { get; set; }

        [Required]
        public string Descricao { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Valor { get; set; }

        public DateTime Data { get; set; } = DateTime.Now;

        [Required]
        public string Tipo { get; set; } // "Entrada" ou "Saida"

        // chave estrangeira
        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }
    }
}