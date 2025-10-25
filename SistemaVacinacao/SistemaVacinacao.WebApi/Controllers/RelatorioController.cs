using Microsoft.AspNetCore.Mvc;
using SistemaVacinacao.Dominio;
using SistemaVacinacao.Servico;

namespace SistemaVacinacao.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatorioController : ControllerBase
    {
        private readonly RelatorioServico _servico;

        public RelatorioController(RelatorioServico servico)
        {
            _servico = servico;
        }

        [HttpGet]
        public IActionResult Listar() => Ok(_servico.Listar());

        [HttpPost]
        public IActionResult Criar([FromBody] Relatorio r)
        {
            _servico.Criar(r);
            return Ok(r);
        }
    }

}
