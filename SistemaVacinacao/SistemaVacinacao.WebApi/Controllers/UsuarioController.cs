using Microsoft.AspNetCore.Mvc;
using SistemaVacinacao.Dominio;
using SistemaVacinacao.Servico;

namespace SistemaVacinacao.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioServico _servico;

        public UsuarioController(UsuarioServico servico)
        {
            _servico = servico;
        }

        [HttpGet]
        public IActionResult Listar() => Ok(_servico.Listar());

        [HttpPost]
        public IActionResult Criar([FromBody] Usuario usuario)
        {
            _servico.Criar(usuario);
            return Ok(usuario);
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, [FromBody] Usuario usuario)
        {
            usuario.Id = id;
            _servico.Atualizar(usuario);
            return Ok(usuario);
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            _servico.Deletar(id);
            return Ok();
        }
    }
}
