namespace advantageAPI
{
    public class PaginatedResponse<T>
    {
        public int Total { get; set; }
        public IEnumerable<T> Data { get; set; }

        /// <summary>
        /// Genera una paginacion de los datos solicitados a la base de datos
        /// </summary>
        /// <param name="data">Lista de registros</param>
        /// <param name="pageNumber">Número de la página que solicito</param>
        /// <param name="pageSize">Cantidad de elementos por página</param>
        public PaginatedResponse(IEnumerable<T> data, int pageNumber, int pageSize)
        {
            // Pasa por alto, Skip, los elementos que corresponden a "páginas" anteriores
            // y toma los elementos que corresponden a la página solicitada
            Data = data.Skip((pageNumber - 1) * pageSize).Take(pageSize);
            Total = data.Count();
        }
    }
}
