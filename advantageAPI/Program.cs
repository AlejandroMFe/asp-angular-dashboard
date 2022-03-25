using advantageAPI;
using advantageAPI.Models;
using Microsoft.EntityFrameworkCore;

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

using (var scope = app.Services.CreateScope())
{
    var service = scope.ServiceProvider.GetService<DataSeed>();
    service.SeedData(20, 1000);
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
