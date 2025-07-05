using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bookApi.Controllers;

[ApiController]
[Route("books")]
[Authorize] // requires a valid JWT
public class BooksController : ControllerBase
{
    private static readonly List<Book> books = new();

    [HttpGet]
    public IActionResult GetAll() => Ok(books);

    [HttpPost]
    public IActionResult Create([FromBody] Book book)
    {
        books.Add(book);
        return CreatedAtAction(nameof(GetAll), book);
    }
}

public class Book
{
    public string? Title { get; set; }
    public string? Author { get; set; }
}
