using BibliotecaREST.Models;
using Microsoft.EntityFrameworkCore;

public class AppDataContext : DbContext
{
    public DbSet<Livro> livros { get; set; }
    public DbSet<Categoria> categorias { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=BibliotecaDB.db");
    }

}