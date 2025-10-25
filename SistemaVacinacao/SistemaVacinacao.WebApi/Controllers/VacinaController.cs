using Microsoft.AspNetCore.Mvc;
using SistemaVacinacao.Dominio;
using SistemaVacinacao.Servico;

namespace SistemaVacinacao.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VacinaController : ControllerBase
    {
        private readonly VacinaServico _servico;

        public VacinaController(VacinaServico servico)
        {
            _servico = servico;
        }

        [HttpGet]
        public IActionResult Listar() => Ok(_servico.Listar());

        [HttpPost]
        public IActionResult Criar([FromBody] Vacina v)
        {
            _servico.Criar(v);
            return Ok(v);
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, [FromBody] Vacina v)
        {
            v.Id = id;
            _servico.Atualizar(v);
            return Ok(v);
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            _servico.Deletar(id);
            return Ok();
        }
    }
}
