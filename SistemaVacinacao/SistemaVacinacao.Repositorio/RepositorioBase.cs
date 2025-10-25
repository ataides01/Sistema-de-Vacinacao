using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaVacinacao.Repositorio
{
    public class RepositorioBase<T> where T : class
    {
        protected readonly AppDbContext _context;
        private readonly DbSet<T> _dbSet;

        public RepositorioBase(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public IEnumerable<T> ObterTodos() => _dbSet.ToList();
        public T? ObterPorId(int id) => _dbSet.Find(id);

        public void Adicionar(T entidade)
        {
            _dbSet.Add(entidade);
            _context.SaveChanges();
        }

        public void Atualizar(T entidade)
        {
            _dbSet.Update(entidade);
            _context.SaveChanges();
        }

        public void Remover(T entidade)
        {
            _dbSet.Remove(entidade);
            _context.SaveChanges();
        }
    }
}
