using advantageAPI.Models;

namespace advantageAPI;

public class DataSeed
{
    private readonly ApiContext _context;

    public DataSeed(ApiContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Sembrar datos de prueba
    /// </summary>
    /// <param name="nCustomers"></param>
    /// <param name="nOrders"></param>
    public void SeedData(int nCustomers, int nOrders)
    {
        if (!_context.Customers.Any())
            SeedCustomers(nCustomers);

        if (!_context.Orders.Any())
            SeedOrders(nOrders);

        if (!_context.Servers.Any())
            SeedServers();

        _context.SaveChanges();
    }

    private void SeedServers()
    {
        throw new NotImplementedException();
    }

    // Siembra las ordenes en la base de datos
    private void SeedOrders(int nOrders)
    {
        List<Order> orders = BuildOrderList(nOrders);

        foreach (Order order in orders)
        {
            _context.Orders.Add(order);
        }
    }

    private List<Order> BuildOrderList(int nOrders)
    {
        var orders = new List<Order>();
        var rand = new Random();

        for (int i = 0; i <= nOrders; i++)
        {
            // elige aleatoriamente un cliente de todos los que
            // existen en la BD
            var randCustomerId = rand.Next(_context.Customers.Count());
            
            var placed = Helpers.GetRandomOrderPlaced();
            var completed = Helpers.GetRandomOrderCompleted(placed);

            orders.Add(new Order
            {
                Id = i,
                // relaciona la orden con uno de los clientes
                Customer = _context.Customers.First(c => c.Id == randCustomerId),
                Total = Helpers.GetRandomOrderTotal(),
                Placed = placed,
                Completed = completed 
            });
        }

        return orders;
    }

    private void SeedCustomers(int nCustomers)
    {
        List<Customer> customers = BuildCustomerList(nCustomers);

        foreach (Customer customer in customers)
        {
            _context.Customers.Add(customer);
        }
    }

    private List<Customer> BuildCustomerList(int nCustomers)
    {
        var customers = new List<Customer>();
        var names = new List<string>();

        for (var i = 1; i <= nCustomers; i++)
        {
            var name = Helpers.MakeUniqueCustomerName(names);
            names.Add(name);

            customers.Add(
                new Customer
                {
                    Id = i,
                    Name = name,
                    Email = Helpers.MakeCustomerEmail(name),
                    State = Helpers.GetRandomState(),
                }
            );
        }

        return customers;
    }
}
