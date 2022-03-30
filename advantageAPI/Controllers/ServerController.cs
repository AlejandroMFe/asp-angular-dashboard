namespace advantageAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class ServerController : ControllerBase
{
    private readonly ApiContext _context;

    public ServerController(ApiContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var servers = _context.Servers.OrderBy(s => s.Id).ToList();
        return Ok(servers);
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var response = _context.Servers.Find(id);

        if (response is null)
            return NotFound();

        return Ok(response);
    }

    [HttpPut("{id}")]
    public IActionResult Message(int id, ServerMessage msg)
    {
        var server = _context.Servers.Find(id);

        if (server is null)
            return NotFound();

        server.IsOnline = msg.Status;
        _context.SaveChanges();

        return NoContent();
    }
}
