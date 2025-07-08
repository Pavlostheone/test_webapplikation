using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ✅ Add a CORS policy for your Netlify frontend BEFORE builder.Build()
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNetlify", policy =>
    {
        policy.WithOrigins("https://zingy-kheer-9240ae.netlify.app")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials(); // optional, keep only if you need cookies or auth
    });
});

// ✅ Add services: controllers, JWT, authorization
builder.Services.AddControllers();

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("super_secret_dev_key_which_is_longer_1234")) // Replace for prod
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ✅ Apply CORS policy before authentication
app.UseCors("AllowNetlify");

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "bookApi v1");
    c.RoutePrefix = "swagger"; // optional, sets it at /swagger
});


app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers(); // needed for /auth/login etc.

app.MapFallbackToFile("index.html");

app.Run();
