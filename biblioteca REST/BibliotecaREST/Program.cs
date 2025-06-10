using BibliotecaREST.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();

//EndPoints - Funcionalidades

//GET: /api/categorias
app.MapGet("/api/categorias", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.categorias.Any())
    {
        return Results.Ok(ctx.categorias.ToList());
    }
    return Results.Ok();
});

//POST: /api/categorias
app.MapPost("/api/categorias", ([FromBody] Categoria categoria,
    [FromServices] AppDataContext ctx) =>
{
    ctx.categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("/api/categorias/" + categoria.id, categoria);
});

//PUT: /api/categorias/{id}
app.MapPut("/api/categorias/{id}", ([FromRoute] int id,
    [FromBody] Categoria categoriaAlterada,
    [FromServices] AppDataContext ctx) =>
{
    Categoria? categoria = ctx.categorias.Find(id);
    if (categoria == null)
    {
        return Results.NotFound();
    }

    categoria.nome = categoriaAlterada.nome;
 
    ctx.categorias.Update(categoria);
    ctx.SaveChanges();
    return Results.Ok(categoria);
});

//GET: /api/livros
app.MapGet("/api/livros", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.livros.Any())
    {
        return Results.Ok(ctx.livros.Include(x => x.categoria).ToList());
    }
    return Results.NotFound();
});

//GET: /api/livros/{id}
app.MapGet("/api/livros/{id}", ([FromRoute] string id,
    [FromServices] AppDataContext ctx) =>
{
    //Expressão lambda em C#
    // Produto? produto = ctx.Produtos.FirstOrDefault(x => x.Nome == "Variável com o nome do produto");
    // List<Produto> lista = ctx.Produtos.Where(x => x.Quantidade > 10).ToList();
    Livro? livro = ctx.livros.Find(id);
    if (livro == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(livro);
});

//POST: /api/livros
app.MapPost("/api/livros", ([FromBody] Livro livro,
    [FromServices] AppDataContext ctx) =>
{
    Categoria? categoria = ctx.categorias.Find(livro.categoriaId);
    if (categoria is null)
    {
        return Results.NotFound();
    }
    livro.categoria = categoria;
    ctx.livros.Add(livro);
    ctx.SaveChanges();
    return Results.Created("/api/livros/" + livro.id, livro);
});

//DELETE: /api/livros/{id}
app.MapDelete("/api/livros/{id}", ([FromRoute] string id,
    [FromServices] AppDataContext ctx) =>
{
    Livro? livro = ctx.livros.Find(id);
    if (livro == null)
    {
        return Results.NotFound();
    }
    ctx.livros.Remove(livro);
    ctx.SaveChanges();
    return Results.Ok(livro);
});

//PUT: /api/livros/{id}
app.MapPut("/api/livros/{id}", ([FromRoute] string id,
    [FromBody] Livro livroAlterado,
    [FromServices] AppDataContext ctx) =>
{
    Livro? livro = ctx.livros.Find(id);
    if (livro == null)
    {
        return Results.NotFound();
    }
    Categoria? categoria = ctx.categorias.Find(livro.categoriaId);
    if (categoria is null)
    {
        return Results.NotFound();
    }
    livro.categoria = categoria;
    livro.titulo = livroAlterado.titulo;
    livro.disponivel = livroAlterado.disponivel;
    livro.autor = livroAlterado.autor;

    ctx.livros.Update(livro);
    ctx.SaveChanges();
    return Results.Ok(livro);
});

app.UseCors("Acesso Total");

app.Run();