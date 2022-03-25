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
        {
            SeedCustomers(nCustomers);
            _context.SaveChanges();
        }
        if (!_context.Orders.Any())
        {
            SeedOrders(nOrders);
            _context.SaveChanges();
        }
        if (!_context.Servers.Any())
        {
            SeedServers();
            _context.SaveChanges();
        }
    }

    private void SeedServers()
    {
        List<Server> servers = BuildServerList();

        foreach (var server in servers)
        {
            _context.Servers.Add(server);
        }
    }

    private List<Server> BuildServerList()
    {
        return new List<Server>()
        {
            new Server()
            {
                Id = 1,
                Name = "Dev-Web",
                IsOnline = true
            },
            new Server()
            {
                Id = 2,
                Name = "Dev-Mail",
                IsOnline = true
            },
            new Server()
            {
                Id = 3,
                Name = "Dev-App",
                IsOnline = false
            },
            new Server()
            {
                Id = 4,
                Name = "Dev-DB",
                IsOnline = true
            },
            new Server()
            {
                Id = 5,
                Name = "Test-Web",
                IsOnline = false
            },
            new Server()
            {
                Id = 6,
                Name = "Test-Mail",
                IsOnline = false
            },
            new Server()
            {
                Id = 7,
                Name = "Test-App",
                IsOnline = true
            },
            new Server()
            {
                Id = 8,
                Name = "Test-DB",
                IsOnline = true
            },
            new Server()
            {
                Id = 9,
                Name = "Prod-Web",
                IsOnline = true
            },
            new Server()
            {
                Id = 10,
                Name = "Prod-Mail",
                IsOnline = true
            },
            new Server()
            {
                Id = 11,
                Name = "Prod-App",
                IsOnline = true
            },
            new Server()
            {
                Id = 12,
                Name = "Prod-DB",
                IsOnline = true
            },
        };
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

        for (int i = 1; i <= nOrders; i++)
        {
            // elige aleatoriamente un cliente de todos los que
            // existen en la BD
            var randCustomerId = rand.Next(1, _context.Customers.Count());

            var placed = Helpers.GetRandomOrderPlaced();
            var completed = Helpers.GetRandomOrderCompleted(placed);
            var customers = _context.Customers.ToList();

            orders.Add(
                new Order
                {
                    Id = i,
                    // relaciona la orden con uno de los clientes
                    Customer = customers.First(c => c.Id == randCustomerId),
                    Total = Helpers.GetRandomOrderTotal(),
                    Placed = placed,
                    Completed = completed
                }
            );
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
