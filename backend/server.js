import express from 'express'
import cors from 'cors'
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

const app = express()

app.use(cors())
app.use(express.json())

function limparCache() {
  const cachePath = path.join(process.env.USERPROFILE, 'AppData', 'Local', 'Temp', 'playwright-transform-cache')
  try {
    if (fs.existsSync(cachePath)) {
      fs.rmSync(cachePath, { recursive: true, force: true })
      console.log('🧹 Cache do Playwright removido!')
    }
  } catch (error) {
    console.error('Erro ao limpar cache:', error)
  }
}

app.post('/executar', (req, res) => {
  
  const { cmd } = req.body

  const comandos = {
    login: 'npx playwright test tests/setup.spec.ts --headed',
    navegacao: 'npx playwright test tests/navegacao.spec.ts --headed',
    seguranca: 'npx playwright test tests/seguranca.spec.ts --headed',    

    empresasbr: 'npx playwright test tests/cadastros/empresasbr.spec.ts --headed',
    empresaspy: 'npx playwright test tests/cadastros/empresaspy.spec.ts --headed',

    agendamento: 'npx playwright test tests/agendamentos/agendamento.spec.ts --headed',
    finalizar: 'npx playwright test tests/agendamentos/finalizar.spec.ts --headed',
    cancelar: 'npx playwright test tests/agendamentos/cancelar.spec.ts --headed',
    
    pessoas: 'npx playwright test tests/cadastros/pessoas.spec.ts --headed',         
    atendentes: 'npx playwright test tests/cadastros/atendentes.spec.ts --headed',
    servicos: 'npx playwright test tests/cadastros/servicos.spec.ts --headed',      
    produtos: 'npx playwright test tests/cadastros/produtos.spec.ts --headed',
    categorias: 'npx playwright test tests/cadastros/categorias.spec.ts --headed',
    planos: 'npx playwright test tests/cadastros/planos.spec.ts --headed',

    edicaoclientes: 'npx playwright test tests/edicao/edicaoclientes.spec.ts --headed',    
    edicaoatendente: 'npx playwright test tests/edicao/edicaoatendente.spec.ts --headed',   
    edicaoprodutos: 'npx playwright test tests/edicao/edicaoprodutos.spec.ts --headed',   
    edicaoservico: 'npx playwright test tests/edicao/edicaoservico.spec.ts --headed',   
    edicaocategoria: 'npx playwright test tests/edicao/edicaocategoria.spec.ts --headed',   
    edicaoplano: 'npx playwright test tests/edicao/edicaoplano.spec.ts --headed',       

    buscapessoas: 'npx playwright test tests/buscas/buscapessoas.spec.ts --headed',
    buscaatendente: 'npx playwright test tests/buscas/buscaatendente.spec.ts --headed',
    buscaservico: 'npx playwright test tests/buscas/buscaservico.spec.ts --headed',   
    buscaprodutos: 'npx playwright test tests/buscas/buscaprodutos.spec.ts --headed',
    buscacategoria: 'npx playwright test tests/buscas/buscacategoria.spec.ts --headed',
    buscaplano: 'npx playwright test tests/buscas/buscaplano.spec.ts --headed',    

    exclusaoclientes: 'npx playwright test tests/exclusao/exclusaoclientes.spec.ts --headed',    
    exclusaoatendentes: 'npx playwright test tests/exclusao/exclusaoatendentes.spec.ts --headed',    
    exclusaoprodutos: 'npx playwright test tests/exclusao/exclusaoprodutos.spec.ts --headed',    
    exclusaoservicos: 'npx playwright test tests/exclusao/exclusaoservicos.spec.ts --headed',    
    exclusaocategorias: 'npx playwright test tests/exclusao/exclusaocategorias.spec.ts --headed',    
    exclusaoplanos: 'npx playwright test tests/exclusao/exclusaoplanos.spec.ts --headed',        
    
    validacaopessoas: 'npx playwright test tests/validacoes/validacaopessoas.spec.ts --headed',
    validacaoprodutos: 'npx playwright test tests/validacoes/validacaoprodutos.spec.ts --headed',                  
    
    desempenhologin: 'npx playwright test tests/desempenho/desempenhologin.spec.ts --headed',    
    cadastropessoas: 'npx playwright test tests/desempenho/cadastropessoas.spec.ts --headed',    
    cadastroprodutos: 'npx playwright test tests/desempenho/cadastroprodutos.spec.ts --headed',        
    desbuscapessoas: 'npx playwright test tests/desempenho/desbuscapessoas.spec.ts --headed',    
    desbuscaprodutos: 'npx playwright test tests/desempenho/desbuscaprodutos.spec.ts --headed',    

    navegacaomobile: 'npx playwright test tests/responsividade/navegacaomobile.spec.ts --headed',    
    navegacaotablet: 'npx playwright test tests/responsividade/navegacaotablet.spec.ts --headed',   
    agendamentomobile: 'npx playwright test tests/responsividade/agendamentomobile.spec.ts --headed',   
    agendamentotablet: 'npx playwright test tests/responsividade/agendamentotablet.spec.ts --headed',   
    
    pessoa_fatura: 'npx playwright test tests/integracao/pessoa_fatura.spec.ts --headed',    
    pessoa_dav: 'npx playwright test tests/integracao/pessoa_dav.spec.ts --headed',    
    
    todos: 'npx playwright test --headed'
  }

    const comando = comandos[cmd]
  if (!comando) {
    return res.status(400).send('Comando inválido!')
  }

  limparCache()

  const [programa, ...args] = comando.split(' ')
  const processo = spawn(programa, args, { cwd: 'C:/TestesSGAgenda', shell: true })

  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Transfer-Encoding': 'chunked'
  })

  processo.stdout.on('data', (data) => {
    res.write(data.toString()) 
  })

  processo.stderr.on('data', (data) => {
    res.write(data.toString()) 
  })

  processo.on('close', (code) => {
    res.write(`\nProcesso finalizado!`)
    res.end()
    limparCache()
  })
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})
