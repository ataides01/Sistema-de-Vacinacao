using SistemaVacinacao.Dominio;
using SistemaVacinacao.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaVacinacao.Servico
{
    public class VacinaServico
    {
        private readonly RepositorioBase<Vacina> _repositorio;

        public VacinaServico(RepositorioBase<Vacina> repositorio)
        {
            _repositorio = repositorio;
        }

        public IEnumerable<Vacina> Listar() => _repositorio.ObterTodos();
        public void Criar(Vacina vacina) => _repositorio.Adicionar(vacina);
        public void Atualizar(Vacina vacina) => _repositorio.Atualizar(vacina);
        public void Deletar(int id)
        {
            var v = _repositorio.ObterPorId(id);
            if (v != null) _repositorio.Remover(v);
        }
    }
}
