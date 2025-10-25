using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaVacinacao.Dominio
{
    public class Vacina
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Fabricante { get; set; } = string.Empty;
        public int DosesDisponiveis { get; set; }
    }
}
