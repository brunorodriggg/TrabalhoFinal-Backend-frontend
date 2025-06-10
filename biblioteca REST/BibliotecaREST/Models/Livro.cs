namespace BibliotecaREST.Models;

public class Livro
{
    public string id { get; set; }
    public string titulo { get; set; }
    public string autor { get; set; }
    public int disponivel { get; set; }
    public Categoria categoria { get; set; }
    public int categoriaId { get; set; }

    public Livro()
    {
        id = Guid.NewGuid().ToString();
    }

}