namespace BibliotecaREST.Models;

public class Categoria
{
    public int id { get; set; }
    public string? nome { get; set; }
    public DateTime dataCriacao { get; set; } = DateTime.Now;
}