var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Отдаём статику (Angular)
app.UseDefaultFiles();
app.UseStaticFiles();

// API endpoint
app.MapGet("/api/hello", () => new { Message = "Hello from .NET backend!" });

// Angular SPA fallback
app.MapFallbackToFile("index.html");

await app.RunAsync();