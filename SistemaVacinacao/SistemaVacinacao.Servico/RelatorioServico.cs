using SistemaVacinacao.Dominio;
using SistemaVacinacao.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaVacinacao.Servico
{
    public class RelatorioServico
    {
        private readonly RepositorioBase<Relatorio> _repositorio;

        public RelatorioServico(RepositorioBase<Relatorio> repositorio)
        {
            _repositorio = repositorio;
        }

        public IEnumerable<Relatorio> Listar() => _repositorio.ObterTodos();
        public void Criar(Relatorio relatorio) => _repositorio.Adicionar(relatorio);
    }
}
