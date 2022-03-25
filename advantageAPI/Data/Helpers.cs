namespace advantageAPI;

public class Helpers
{
    private static Random _rand = new Random();

    /// <summary>
    /// Elije un item de la lista de manera aleatoria
    /// </summary>
    /// <param name="items"></param>
    /// <returns></returns>
    private static string GetRandom(IList<string> items)
    {
        // elige un elemento al azar de la lista de items,
        // teniendo como valor maximo del random, la longitud de la lista
        // o sea imtes.Count
        return items[_rand.Next(items.Count)];
    }

    internal static string MakeUniqueCustomerName(List<string> names)
    {
        // combinación maxima de nombres
        var maxNames = bizPrefix.Count * bizSuffix.Count;

        if (names.Count >= maxNames)
            throw new System.InvalidOperationException(
                "Se ha alcanzado el máximo de nombres posibles"
            );

        var prefix = GetRandom(bizPrefix);
        var suffix = GetRandom(bizSuffix);
        var bizName = prefix + " " + suffix;

        if (names.Contains(bizName))
            MakeUniqueCustomerName(names);

        return prefix + suffix;
    }

    // Listas de ejemplso de nombres de empresas
    private static readonly List<string> bizPrefix = new List<string>()
    {
        "ABC",
        "XYZ",
        "MainSt",
        "Sales",
        "Enterprise",
        "Ready",
        "Quick",
        "Budget",
        "Peak",
        "Magic",
        "Family",
        "Comfort",
    };

    internal static DateTime GetRandomOrderPlaced()
    {
        var end = DateTime.Now;
        var start = end.AddDays(-90);

        // TimeSpan lo puedo usar para obtener la diferencia entre dos fechas
        // me brinda el espacio de tiempo transcurrido entre ambas.
        TimeSpan possibleSpan = end - start;
        TimeSpan newSpan = new TimeSpan(0, _rand.Next(0, (int)possibleSpan.TotalMinutes), 0);

        return start + newSpan;
    }

    internal static DateTime? GetRandomOrderCompleted(DateTime orderPlaced)
    {
        var now = DateTime.Now;
        var minLeadTime = TimeSpan.FromDays(7);
        var timePassed = now - orderPlaced;

        if (timePassed < minLeadTime)
            return null;

        return orderPlaced.AddDays(_rand.Next(7, 14));
    }

    private static readonly List<string> bizSuffix = new List<string>()
    {
        "Corporation",
        "Co",
        "Logistics",
        "Transit",
        "Bakery",
        "Goods",
        "Foods",
        "Cleaners",
        "Hotels",
        "Planners",
        "Automotive",
        "Software Development",
    };

    internal static decimal GetRandomOrderTotal()
    {
        return _rand.Next(100, 5000);
    }

    internal static string MakeUniqueCustomerEmail(string name)
    {
        return $"contact@{name.ToLower()}.com";
    }

    internal static string GetRandomState()
    {
        return GetRandom(arStates);
    }

    internal static string MakeCustomerEmail(string name)
    {
        return $"contact@{name.ToLower()}.com";
    }

    // Generar una lista con todas las 25  provincias de la República Argentina
    private static readonly List<string> arStates = new List<string>()
    {
        "Buenos Aires",
        "Ciudad Autónoma de Buenos Aires",
        "Catamarca",
        "Chaco",
        "Chubut",
        "Córdoba",
        "Corrientes",
        "Entre Ríos",
        "Formosa",
        "Jujuy",
        "La Pampa",
        "La Rioja",
        "Mendoza",
        "Misiones",
        "Neuquén",
        "Río Negro",
        "Salta",
        "San Juan",
        "San Luis",
        "Santa Cruz",
        "Salta",
        "San Juan",
        "San Luis",
        "Santa Cruz",
        "Santa Fe",
        "Santiago del Estero",
        "Tierra del Fuego",
        "Tucumán",
    };
}
