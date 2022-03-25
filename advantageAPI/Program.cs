var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration["connectionString"];

// Add services to the container.
builder.Services.AddDbContext<ApiContext>(options => options.UseNpgsql(connectionString));
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
builder.Services.AddControllers();
builder.Services.AddTransient<DataSeed>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Acá le pido al asp.net que me gener un nuevo objeto del tipo DataSeed
// este es un nuevo objeto en el contexto (scope) de la petición al servidor
using (var scope = app.Services.CreateScope())
{
    // pido el servicio que necesito
    var service = scope.ServiceProvider.GetService<DataSeed>();
    service.SeedData(20, 1000);
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
