namespace advantageAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly ApiContext _context;

        public CustomerController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var customers = _context.Customers.OrderBy(c => c.Id).ToList();
            return Ok(customers);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            // trae las tablas relacionadas al customer id
            //var customer = _context.Customers.FindAsync(id);

            // trae solo los datos de la tabla customer id
            var customer = _context.Customers.FirstOrDefault(c => c.Id == id);

            if (customer == null)
                return NotFound();

            return Ok(customer);
        }

        [HttpPost]
        public IActionResult Create(Customer customer)
        {
            if (customer is null)
                return BadRequest();

            _context.Customers.Add(customer);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Create), new { id = customer.Id }, customer);
        }
    }
}
