using Microsoft.AspNetCore.Mvc;
using SistemaVacinacao.Dominio;
using SistemaVacinacao.Servico;

namespace SistemaVacinacao.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolicitacaoController : ControllerBase
    {
        private readonly SolicitacaoServico _servico;

        public SolicitacaoController(SolicitacaoServico servico)
        {
            _servico = servico;
        }

        [HttpGet]
        public IActionResult Listar() => Ok(_servico.Listar());

        [HttpPost]
        public IActionResult Criar([FromBody] Solicitacao s)
        {
            _servico.Criar(s);
            return Ok(s);
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, [FromBody] Solicitacao s)
        {
            s.Id = id;
            _servico.Atualizar(s);
            return Ok(s);
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            _servico.Deletar(id);
            return Ok();
        }
    }
}
