using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bookApi.Controllers;

[ApiController]
[Route("books")]
[Authorize] // kräver giltig JWT
public class BooksController : ControllerBase
{
    private static readonly List<Book> books = new()
    {
        new Book { Id = 1, Title = "Example Book 1", Author = "Author 1" },
    new Book { Id = 2, Title = "Example Book 2", Author = "Author 2" }
    };
    private static int nextId = 1; // för att generera unika ID:n

    [HttpGet]
    public IActionResult GetAll() => Ok(books);

    [HttpPost]
    public IActionResult Create([FromBody] Book book)
    {
        if (string.IsNullOrWhiteSpace(book.Title) || string.IsNullOrWhiteSpace(book.Author))
            return BadRequest("Title and Author are required.");

        book.Id = nextId++;
        books.Add(book);
        return CreatedAtAction(nameof(GetAll), book);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Book updatedBook)
    {
        var book = books.FirstOrDefault(b => b.Id == id);
        if (book == null) return NotFound();

        book.Title = updatedBook.Title;
        book.Author = updatedBook.Author;
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var book = books.FirstOrDefault(b => b.Id == id);
        if (book == null) return NotFound();

        books.Remove(book);
        return NoContent();
    }
}

public class Book
{
    public int Id { get; set; }               // behövs för att unikt identifiera böcker
    public string? Title { get; set; }
    public string? Author { get; set; }
}
