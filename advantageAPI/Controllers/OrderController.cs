namespace advantageAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class OrderController : ControllerBase
{
    private readonly ApiContext _context;

    public OrderController(ApiContext context)
    {
        _context = context;
    }
}
