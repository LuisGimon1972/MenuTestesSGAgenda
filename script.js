async function executar(cmd) {
  
 const log = document.getElementById('log')
 let valorcmd;

 const botoesAtivos = document.querySelectorAll('button.ativo');
  botoesAtivos.forEach(btn => btn.classList.remove('ativo'));
  
  const botaoAlvo = document.querySelector(`button[onclick*="'${cmd}'"]`) || document.querySelector(`button[onclick*='executarTodos']`);
  if (botaoAlvo) {
    botaoAlvo.classList.add('ativo');
  }

  const relacaoComandoSecao = {
      empresasbr: "empresas", empresaspy: "empresas", 

      agendamento: "agenda", finalizar: "agenda", cancelar: "agenda",

      pessoas: "cadastros", atendentes: "cadastros", servicos: "cadastros", 
      produtos: "cadastros", categorias: "cadastros", planos:"cadastros",

      edicaoclientes: "edicoes", edicaoatendente: "edicoes", edicaoservico: "edicoes",
      edicaoprodutos: "edicoes", edicaocategoria: "edicoes", edicaoplano: "edicoes", 

      buscapessoas: "buscas", buscaatendente: "buscas", 
      buscaservico: "buscas", buscaprodutos: "buscas",
      buscacategoria: "buscas", buscaplano: "buscas", 

      exclusaoclientes: "exclusoes", exclusaoprodutos: "exclusoes", exclusaofuncionarios: "exclusoes",      
      exclusaosubgrupos: "exclusoes", exclusaomarcas: "exclusoes",
      
      validacaopessoas: "validacoes", validacaoprodutos: "validacoes", validacaofuncionarios: "validacoes",
      validacaoespecies: "validacoes", validacaousuarios: "validacoes",      
      
      
      desempenhologin: "desempenho", cadastropessoas: "desempenho", cadastroprodutos: "desempenho",
      cadastrofuncionarios: "desempenho", cadastrousuarios: "desempenho", cadastroespecies: "desempenho",
      desbuscapessoas: "desempenho", desbuscaprodutos: "desempenho", desbuscafuncionarios: "desempenho",
      desbuscausuarios: "desempenho", desbuscaespecies: "desempenho",
      navegacaomobile: "responsividade", navegacaotablet: "responsividade",
      pessoa_fatura: "integracao", pessoa_dav: "integracao", funcionario_fatura: "integracao",
      funcionario_dav: "integracao", produto_fatura: "integracao", produto_dav: "integracao",
      fornecedor_produto: "integracao", usuario_funcionario: "integracao", perfil_usuario: "integracao"
    };

    const secaoAlvo = relacaoComandoSecao[cmd];
    if (secaoAlvo) {
      const sections = ["empresas", "agenda", "cadastros", "edicoes", "buscas", "exclusoes", "validacoes", "desempenho", "responsividade", "integracao"];
      sections.forEach(sec => {
        const el = document.getElementById(sec);
        if (el) el.style.display = (sec === secaoAlvo) ? "block" : "none";
      });
    }  
 

const comandos = {
  login: "Autenticação do Sistema",
  seguranca: "Segurança do Sistema",  
  navegacao: "Navegação do Sistema",  
  empresasbr: "Cadastro de Empresas do Brasil",
  empresaspy: "Cadastro de Empresas do Paraguai",
  agendamento: "Cadastro de Agendamentos",
  finalizar: "Finalizar Agendamentos",
  cancelar: "Cancelar Agendamentos",
  pessoas: "Cadastro de Clientes",
  atendentes: "Cadastro de Atendentes",
  produtos: "Cadastro de Produtos",
  categorias: "Cadastro de Categorias",
  planos: "Cadastro de Planos",
  servicos: "Cadastro de Serviços",            
  validacaopessoas: "Validação de dados de Pessoas",
  validacaoprodutos: "Validação de dados de Produtos",         
  buscapessoas: "Buscas de Pessoas",
  buscaatendente: "Buscas de Atendentes",  
  buscaservico: "Buscas de Serviços",      
  buscaprodutos: "Buscas de Produtos",              
  buscacategoria: "Buscas de Categorias",              
  buscaplano: "Buscas de Planos",                        
  edicaoclientes:"Edição de Dados Clientes", 
  edicaoatendente:"Edição de Dados Atendentes", 
  edicaoprodutos:"Edição de Dados Produtos",
  edicaocategoria:"Edição de Dados Categorias",
  edicaoplano:"Edição de Dados Planos",
  edicaoservico:"Edição de Dados Serviços",    
  edicaocategoria:"Edição de Dados Categorias",
  edicaoplano:"Edição de Dados Planos",
  exclusaoclientes:"Exclusão de Dados Clientes",
  exclusaoatendentes:"Exclusão de Dados Atendentes",  
  exclusaoprodutos:"Exclusão de Dados Protutos",
  exclusaoservicos:"Exclusão de Dados Serviços",  
  exclusaocategorias:"Exclusão de Dados Categorias",  
  exclusaoplanos:"Exclusão de Dados Planos",  
  desempenhologin:"Desempenho de Login",
  cadastropessoas:"Desempenho de Cadastro Pessoas",
  cadastroprodutos:"Desempenho de Cadastro Produtos",  
  desbuscapessoas:"Desempenho de Buscas Pessoas",
  desbuscaprodutos:"Desempenho de Buscas Produtos",  
  navegacaomobile:"Responsividade Navegação Mobile",
  navegacaotablet:"Responsividade Navegação Tablet",
  agendamentomobile: "Agendamento Mobile",
  agendamentotablet: "Agendamento Tablet",
  pessoa_fatura:"Integração Cliente e Faturamento",
  pessoa_dav:"Integração Cliente e DAV",
  funcionario_fatura:"Integração Funcionário e Faturamento",
  funcionario_dav:"Integração Funcionário e DAV",
  todos: "Execução completa dos testes"
};

let resultadoCmd = comandos[cmd] || "Comando não encontrado";

  log.innerText += '\n🖥️ Execução de Teste: ' + resultadoCmd + '\n'

  try {
    const res = await fetch('http://localhost:3000/executar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cmd })
    })

    const text = await res.text()

    log.innerText += text + '\n✔ Finalizado\n'

  } catch (err) {
    log.innerText += '❌ Erro: ' + err.message + '\n'
    showToast("⚠️ Não foi possível conectar ao servidor de testes!", "error");
  }

  log.scrollTop = log.scrollHeight
}

function toggleSection(id) {
  const sections = ["empresas", "agenda", "cadastros", "validacoes", "edicoes", "exclusoes", "buscas", "desempenho", "responsividade", "integracao"];
  
  sections.forEach(sec => {
    const el = document.getElementById(sec);
    if (sec === id) {      
      el.style.display = (el.style.display === "none" || el.style.display === "") ? "block" : "none";
    } else {
      // Fecha os demais
      el.style.display = "none";
    }
  });
}

function limparLogs() {
 if(document.getElementById("log").textContent != "")
 {
    document.getElementById("log").textContent = "";
    showToast("🧹 Logs removidos com sucesso!", "success");
    return;
 }
 else{
    showToast("⚠️ Nenhum log encontrado para limpeza.", "error");
    return;
 }   
 }

function sair() {
  
  limparLogs();  
  window.location.href = "about:blank";
  // Se quiser apenas fechar a aba (funciona em alguns navegadores):
  // window.close();
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.className = "show " + type;

  setTimeout(() => {
    toast.className = toast.className.replace("show", "").trim();
  }, 3000);
}

function downloadLogs() {
  const logContent = document.getElementById("log").innerText;  
  if (!logContent.trim()) {
    showToast("⚠️ Não há logs para descarregar!", "error");
    return;
  }  
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // meses começam em 0
  const year = now.getFullYear();  
  const dateStr = `${day}-${month}-${year}`;  
  const randomNumber = Math.floor(Math.random() * 1000000) + Date.now();  
  const fileName = `logs_${dateStr}_${randomNumber}.txt`;
  const blob = new Blob([logContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
  showToast("✅ Logs descarregados com sucesso!");
}

async function executarTodos() {

  const botoesAtivos = document.querySelectorAll('button.ativo');
  botoesAtivos.forEach(btn => btn.classList.remove('ativo'));
  
  const btnTodos = document.querySelector(`button[onclick*='executarTodos']`);

  const sections = ["empresas", "agenda", "cadastros", "validacoes", "edicoes", "exclusoes", "buscas", "desempenho", "responsividade", "integracao"];
  sections.forEach(sec => {
    const el = document.getElementById(sec);
    if (el) el.style.display = "none";
  });
  
  const comandos = [
    'login', 'seguranca', 'navegacao', 'empresasbr', 'empresaspy', 
    'agendamento', 'finalizar', 'cancelar',
    'pessoas', 'atendentes', 'servicos',
    'produtos', 'categorias', 'planos',
    'edicaoclientes', 'edicaoatendente', 'edicaoprodutos', 'edicaoservico', 'edicaocategoria', 'edicaoplano',  
    'buscapessoas', 'buscaatendente', 'buscaservico', 'buscaprodutos', 'buscacategoria', 'buscaplano',        
    'exclusaoclientes', 'exclusaoatendentes', 'exclusaoprodutos', 
    'exclusaoservicos', 'exclusaocategorias', 'exclusaoplanos',        
    'validacaopessoas', 'validacaousuarios', 'validacaoprodutos', 
    'validacaogrupos', 'validacaosubgrupos', 'validacaomarcas',    
    'desempenhologin', 'cadastropessoas', 'cadastroprodutos',    
    'desbuscapessoas', 'desbuscaprodutos', 
    'navegacaomobile', 'navegacaotablet', 'agendamentomobile', 'agendamentotablet', 
    'pessoa_fatura', 'pessoa_dav'   
  ]

  for (const cmd of comandos) {
    await executar(cmd)
  }
  
}