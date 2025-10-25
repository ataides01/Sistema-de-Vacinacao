using SistemaVacinacao.Dominio;
using SistemaVacinacao.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaVacinacao.Servico
{
    public class UsuarioServico
    {
        private readonly RepositorioBase<Usuario> _repositorio;

        public UsuarioServico(RepositorioBase<Usuario> repositorio)
        {
            _repositorio = repositorio;
        }

        public IEnumerable<Usuario> Listar() => _repositorio.ObterTodos();

        public Usuario? ObterPorId(int id) => _repositorio.ObterPorId(id);

        public void Criar(Usuario usuario)
        {
            var existe = _repositorio.ObterTodos().Any(u => u.Email == usuario.Email);
            if (existe) throw new Exception("E-mail já cadastrado.");
            _repositorio.Adicionar(usuario);
        }

        public void Atualizar(Usuario usuario) => _repositorio.Atualizar(usuario);

        public void Deletar(int id)
        {
            var u = _repositorio.ObterPorId(id);
            if (u != null) _repositorio.Remover(u);
        }

        public object Autenticar(string email, string senha)
        {
            throw new NotImplementedException();
        }
    }
}
