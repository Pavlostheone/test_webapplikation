using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace bookApi.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        // 🧠 In-memory user list 
        private static List<User> users = new()
        {
            new User { Username = "admin", Password = "password" }
        };

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request.Username == null || request.Password == null)
                return BadRequest("Username and password are required");

            var user = users.FirstOrDefault(u => 
                u.Username == request.Username && u.Password == request.Password);

            if (user == null)
                return Unauthorized("Invalid credentials");

            var token = GenerateJwtToken(request.Username);
            return Ok(new { token });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (request.Username == null || request.Password == null)
                return BadRequest("Username and password are required");

            if (users.Any(u => u.Username == request.Username))
                return BadRequest("User already exists");

            users.Add(new User
            {
                Username = request.Username,
                Password = request.Password 
            });

            var token = GenerateJwtToken(request.Username);
            return Ok(new { token });
        }

        private string GenerateJwtToken(string username)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super_secret_dev_key_which_is_longer_1234"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        
        public class LoginRequest
        {
            public string? Username { get; set; }
            public string? Password { get; set; }
        }

        public class RegisterRequest
        {
            public string? Username { get; set; }
            public string? Password { get; set; }
        }

        public class User
        {
            public string? Username { get; set; }
            public string? Password { get; set; }
        }
    }
}
