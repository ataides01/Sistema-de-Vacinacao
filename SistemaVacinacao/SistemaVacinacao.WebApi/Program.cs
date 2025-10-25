using Microsoft.EntityFrameworkCore;
using SistemaVacinacao.Repositorio;
using SistemaVacinacao.Servico;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("VacinacaoDB"));
builder.Services.AddScoped(typeof(RepositorioBase<>));
builder.Services.AddScoped<UsuarioServico>();
builder.Services.AddScoped<VacinaServico>();
builder.Services.AddScoped<SolicitacaoServico>();
builder.Services.AddScoped<RelatorioServico>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5000") // URL do seu front Angular
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Add services to the container.

builder.Services.AddControllers();
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

app.UseCors("AllowAngularApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
