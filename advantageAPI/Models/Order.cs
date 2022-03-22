namespace advantageAPI.Models;

public class Order
{
    public int Id { get; set; }
    public Customer? Customer { get; set; } // 1:1 relación una orden siempre pertenece a un cliente
    public decimal Total { get; set; }
    public DateTime Placed { get; set; }
    public DateTime? Completed { get; set; }
}
