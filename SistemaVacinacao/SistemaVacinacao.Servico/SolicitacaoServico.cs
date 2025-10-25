using SistemaVacinacao.Dominio;
using SistemaVacinacao.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaVacinacao.Servico
{
    public class SolicitacaoServico
    {
        private readonly RepositorioBase<Solicitacao> _repositorio;

        public SolicitacaoServico(RepositorioBase<Solicitacao> repositorio)
        {
            _repositorio = repositorio;
        }

        public IEnumerable<Solicitacao> Listar() => _repositorio.ObterTodos();
        public void Criar(Solicitacao solicitacao) => _repositorio.Adicionar(solicitacao);
        public void Atualizar(Solicitacao solicitacao) => _repositorio.Atualizar(solicitacao);
        public void Deletar(int id)
        {
            var s = _repositorio.ObterPorId(id);
            if (s != null) _repositorio.Remover(s);
        }
    }
}
