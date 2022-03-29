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
    public IActionResult Get(int id)
    {
        var order = _context.Orders.Include(e => e.Customer).FirstOrDefault(e => e.Id == id);

        if (order is null)
            return NotFound();

        return Ok(order);
    }

    [HttpGet("ByState")]
    public IActionResult ByState()
    {
        /** Otra forma de hacer la consulta
        // solicita a la BD que agrupe las ventas por State de cada Customer
        // var orders = _context.Orders.Include(o => o.Customer).GroupBy(g => g.Customer.State)
        // .Select(s => new {
        //     State = s.Key,
        //     Total = s.Sum(x => x.Total)
        // })
        // .ToList();
        */

        // trae todas las ordenes con la info de sus clientes
        var orders = _context.Orders.Include(o => o.Customer).ToList();

        var groupedResult = orders
            // agrupo las ordenes por el estado del cliente
            .GroupBy(o => o.Customer.State)
            .ToList()
            // de la agrupación creo un objeto y sumo los totales
            // la agrupación tiene como clave State
            .Select(grp => new { State = grp.Key, Total = grp.Sum(x => x.Total) })
            .OrderByDescending(res => res.Total)
            .ToList();

        return Ok(groupedResult);
    }

    [HttpGet("ByCustomer/{nro}")]
    public IActionResult ByCustomer(int nro)
    {
        // trae todas las ordenes con la info de sus clientes
        var orders = _context.Orders.Include(o => o.Customer).ToList();

        var groupedResult = orders
            .GroupBy(o => o.Customer.Id)
            .ToList()
            .Select(
                grp =>
                    new
                    {
                        Name = _context.Customers.Find(grp.Key).Name,
                        Total = grp.Sum(x => x.Total)
                    }
            )
            .OrderByDescending(res => res.Total)
            .Take(nro)
            .ToList();

        return Ok(groupedResult);
    }
}
