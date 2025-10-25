# Sistema de Gestão de Vacinas Hospitalares

Sistema frontend desenvolvido em Angular para gestão de vacinas em ambiente hospitalar, com três perfis de usuário distintos: Enfermeiro, Farmacêutico e Administrador.

## 🚀 Tecnologias Utilizadas

- **Angular 18+** - Framework principal
- **TypeScript** - Linguagem de programação
- **SCSS** - Estilização
- **RxJS** - Programação reativa
- **Material Icons** - Ícones

## 📋 Funcionalidades

### 👨‍⚕️ Perfil Enfermeiro
- Dashboard com visualização de movimentações de vacinas
- Solicitar vacinas com justificativa
- Acompanhar status das solicitações (Pendente, Aprovada, Rejeitada)
- Visualizar histórico de movimentações

### 💊 Perfil Farmacêutico
- Dashboard com estatísticas de solicitações e estoque
- Aprovar ou rejeitar solicitações de vacinas
- Registrar novos lotes de vacinas
- Gerenciar estoque e lotes
- Visualizar lotes próximos ao vencimento

### 👔 Perfil Administrador
- Dashboard com visão geral do sistema
- Gerar relatórios gerenciais (Movimentações, Estoque, Solicitações)
- Cadastrar novos funcionários
- Gerenciar funcionários (Ativar/Desativar)
- Visualizar estoque geral de todas as vacinas

## 🔐 Credenciais de Demonstração

O sistema utiliza dados mockados para demonstração. Use as seguintes credenciais:

### Enfermeiro
- **Email:** enfermeiro@hospital.com
- **Senha:** 123456

### Farmacêutico
- **Email:** farmaceutico@hospital.com
- **Senha:** 123456

### Administrador
- **Email:** admin@hospital.com
- **Senha:** 123456

## 🛠️ Estrutura do Projeto

```
src/app/
├── components/          # Componentes da aplicação
│   ├── login/          # Tela de login
│   ├── layout/         # Layout com sidebar e header
│   ├── enfermeiro/     # Dashboard do enfermeiro
│   ├── farmaceutico/   # Dashboard do farmacêutico
│   └── administrador/  # Dashboard do administrador
├── models/             # Interfaces TypeScript
│   ├── user.model.ts
│   ├── vacina.model.ts
│   └── relatorio.model.ts
├── services/           # Serviços da aplicação
│   ├── auth.service.ts
│   ├── vacina.service.ts
│   ├── solicitacao.service.ts
│   ├── relatorio.service.ts
│   └── usuario.service.ts
├── guards/             # Guards de rota
│   ├── auth.guard.ts
│   └── role.guard.ts
└── pipes/              # Pipes customizados
    └── filter.pipe.ts
```

## 🚀 Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm start
```

3. Acesse no navegador: `http://localhost:5000`

## 🔄 Integração com Backend C#

Este frontend está preparado para integração com uma API REST em C#. Para integrar:

### Endpoints Esperados

```
POST   /api/auth/login
GET    /api/vacinas
GET    /api/lotes
POST   /api/lotes
GET    /api/solicitacoes
POST   /api/solicitacoes
PUT    /api/solicitacoes/{id}/aprovar
PUT    /api/solicitacoes/{id}/rejeitar
GET    /api/usuarios
POST   /api/usuarios
GET    /api/relatorios/movimentacao
GET    /api/relatorios/estoque
GET    /api/relatorios/solicitacoes
```

### Passos para Integração

1. **Autenticação:**
   - Modifique `auth.service.ts` para fazer requisições HTTP ao endpoint de login
   - Implemente JWT token storage e refresh

2. **Configuração:**
   - Crie um arquivo `environment.ts` com a URL da API
   - Adicione interceptors HTTP para incluir tokens de autenticação

3. **Substituir Dados Mockados:**
   - Substitua os métodos nos services por chamadas HTTP reais
   - Use `HttpClient` do Angular para fazer as requisições

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop (1920px+)
- Tablet (768px - 1920px)
- Mobile (< 768px)

## 🎨 Design

- Interface moderna com gradientes roxo/azul
- Tema hospitalar profissional
- Cards informativos com estatísticas
- Tabelas responsivas
- Modais para ações importantes
- Feedback visual para ações do usuário

## 📝 Próximos Passos (Após Integração com Backend)

- [ ] Implementar autenticação JWT real
- [ ] Adicionar gráficos com Chart.js ou NgCharts
- [ ] Implementar paginação nas tabelas
- [ ] Adicionar filtros avançados
- [ ] Notificações em tempo real (SignalR)
- [ ] Exportação de relatórios em PDF/Excel
- [ ] Testes unitários e E2E

---

**Nota:** Os dados exibidos no sistema são mockados (simulados) no frontend. Para um ambiente de produção, todas as operações devem ser integradas com uma API backend real em C#.
