using Microsoft.AspNetCore.Mvc;
using SistemaVacinacao.Servico;

namespace SistemaVacinacao.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UsuarioServico _usuarioServico;

        public AuthController(UsuarioServico usuarioServico)
        {
            _usuarioServico = usuarioServico;
        }

        public class LoginDto { public string Email { get; set; } = string.Empty; public string Senha { get; set; } = string.Empty; }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            var user = _usuarioServico.Autenticar(dto.Email, dto.Senha);
            if (user == null) return Unauthorized(new { message = "Credenciais inválidas" });
            return Ok(user);
        }
    }
}
