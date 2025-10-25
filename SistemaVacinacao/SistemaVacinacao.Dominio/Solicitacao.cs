using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaVacinacao.Dominio
{
    public class Solicitacao
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int VacinaId { get; set; }
        public DateTime DataSolicitacao { get; set; } = DateTime.Now;
        public string Status { get; set; } = "Pendente"; // Pendente, Aprovada, Rejeitada
    }
}
