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

    internal static string MakeCustomerName()
    {
        var prefix = GetRandom(bizPrefix);
        var suffix = GetRandom(bizSuffix);

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

    internal static string MakeCustomerEmail(string name)
    {
        return $"contact@{name.ToLower()}.com";
    }

    internal static string MakeCustomerState()
    {
        throw new NotImplementedException();
    }

    // Generar una lista con todas las 25  provincias de la República Argentina
    private static readonly List<string> states = new List<string>()
    {
        "/buenosaires"> Buenos Aires</a></li>"/caba"> Ciudad Autónoma de Buenos Aires</a></li>"/catamarca"> Catamarca</a></li>"/chaco"> Chaco</a></li>"/chubut"> Chubut</a></li>"/cordoba"> Córdoba</a></li>"/corrientes"> Corrientes</a></li>"/entre-rios"> Entre Ríos</a></li>"/formosa"> Formosa</a></li>"/jujuy"> Jujuy</a></li>"/lapampa"> La Pampa</a></li>"/la-rioja"> La Rioja</a></li>"/mendoza"> Mendoza</a></li>"/misiones"> Misiones</a></li>"/neuquen"> Neuquén</a></li>"/rionegro"> Río Negro</a></li>"/salta"> Salta</a></li>"/sanjuan"> San Juan</a></li>"/sanluis"> San Luis</a></li>"/santacruz"> Santa Cruz</a></li>"/santafe"> Santa Fe</a></li>"/santiago"> Santiago del Estero</a></li>"/tierradelfuego"> Tierra del Fuego, Antártida e Islas del Atlántico Sur</a></li>"/tucuman"> Tucumán</a></li></ul>
    };

}
