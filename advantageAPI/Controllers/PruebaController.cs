namespace advantageAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PruebaController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Esto es una prueba 😃💪");
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok($"Esto es una prueba con el id {id} 🐱‍🏍🚀");
        }
    }
}
