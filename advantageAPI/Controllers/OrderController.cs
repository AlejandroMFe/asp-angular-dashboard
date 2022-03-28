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

    // GET /orders/pageIndex/pageSize
    [HttpGet("{pageIndex:int}/{pageSize:int}")]
    public IActionResult Get(int pageIndex, int pageSize)
    {
        // Obtengo todas las ordenes de la BD y su relación con los clientes
        // ordenados por su estado de colocado, Placed.
        var data = _context.Orders.Include(e => e.Customer).OrderByDescending(c => c.Placed);

        // Genera una paginacion de los datos solicitados a la base de datos
        var page = new PaginatedResponse<Order>(data, pageIndex, pageSize);

        var totalCount = data.Count();
        // redondea el total de páginas para que sea exacto
        var totalPages = Math.Ceiling((double)totalCount / pageSize);

        var response = new { Page = page, TotalPages = totalPages };

        return Ok(response);
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id){
        var order = _context.Orders.Include(e => e.Customer).FirstOrDefault(e => e.Id == id);
        
        if(order is null)
            return NotFound();
        
        return Ok(order);
    }
}
