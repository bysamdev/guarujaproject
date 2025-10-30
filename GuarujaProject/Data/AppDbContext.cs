using Microsoft.EntityFrameworkCore;
using GuarujaProject.Models;

namespace GuarujaProject.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Transacao> Transacoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>()
                .HasMany(u => u.Transacoes)
                .WithOne(t => t.Usuario)
                .HasForeignKey(t => t.UsuarioId);
        }
    }
}