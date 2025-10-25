using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaVacinacao.Dominio
{
    public class Relatorio
    {
        public int Id { get; set; }
        public string Tipo { get; set; } = string.Empty; // Ex: "Vacinação", "Usuários", etc.
        public DateTime DataGeracao { get; set; } = DateTime.Now;
        public string Conteudo { get; set; } = string.Empty;
    }
}
