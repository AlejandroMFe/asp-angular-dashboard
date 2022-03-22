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

    private void SeedOrders(int nOrders)
    {
        throw new NotImplementedException();
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

        for (var i = 1; i <= nCustomers; i++)
        {
            var name = Helpers.MakeCustomerName();

            customers.Add(
                new Customer
                {
                    Id = i,
                    Name = name,
                    Email = Helpers.MakeCustomerEmail(name),
                    State = Helpers.MakeCustomerState(),
                }
            );
        }
    }
}
