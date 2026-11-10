
import { useState } from 'react'
import './App.css'
import Inicio from './pages/Inicio.jsx'
import Calcular from './pages/Calcular.jsx'
import MeusServicos from './pages/MeusServicos.jsx'
import CadastrarServico from './pages/CadastrarServico.jsx'
import ServicoSelecionado from './pages/ServicoSelecionado.jsx'

const unidades = [
  'un',
  'm',
  'kg',
  'L',
  'caixa',
  'rolo',
  'pacote',
  'Outra',
]

const unidadesDespesas = [
  'Litro',
  'Km',
  'Unidade',
  'Almoço',
  'Refeição',
  'Diária',
  'Hora',
  'Dia',
  'Pacote',
  'Outra',
]

function App() {
  const [tela, setTela] = useState('Inicio')
  const [servicos, setServicos] = useState([])
  const [servicoSelecionado, setServicoSelecionado] = useState(null)
  const [materiaisCalculo, setMateriaisCalculo] = useState([])

  const [nomeServico, setNomeServico] = useState('')
  const [margem, setMargem] = useState('30')

  const [nomeMaterial, setNomeMaterial] = useState('')
  const [unidadeMaterial, setUnidadeMaterial] = useState('un')
  const [outraUnidade, setOutraUnidade] = useState('')
  const [precoMaterial, setPrecoMaterial] = useState('')
  const [materiais, setMateriais] = useState([])
  const [despesas, setDespesas] = useState([])
  const [tipoDespesa, setTipoDespesa] = useState('Deslocamento')
  const [descricaoDespesa, setDescricaoDespesa] = useState('')
  const [valorDespesa, setValorDespesa] = useState('')
  const [unidadeDespesa, setUnidadeDespesa] = useState('')
  const [outraUnidadeDespesa, setOutraUnidadeDespesa] = useState('')

  function abrirCadastro() {
    setNomeServico('')
    setMargem('30')
    setMateriais([])
    setNomeMaterial('')
    setUnidadeMaterial('un')
    setOutraUnidade('')
    setPrecoMaterial('')
    setTela('cadastrar')
    setDespesas([])
    setTipoDespesa('Deslocamento')
    setDescricaoDespesa('')
    setValorDespesa('')
  }

  function adicionarMaterial() {
    const nome = nomeMaterial.trim()
    const unidade =
      unidadeMaterial === 'Outra'
        ? outraUnidade.trim()
        : unidadeMaterial

    if (!nome) {
      alert('Informe o nome do material.')
      return
    }

    if (!unidade) {
      alert('Informe a unidade do material.')
      return
    }

    if (
      precoMaterial !== '' &&
      (!Number.isFinite(Number(precoMaterial)) ||
        Number(precoMaterial) < 0)
    ) {
      alert('Informe um preço válido ou deixe o campo vazio.')
      return
    }

    setMateriais([
      ...materiais,
      {
        id: `${Date.now()}-${materiais.length}`,
        nome,
        unidade,
        precoReferencia:
          precoMaterial === '' ? '' : Number(precoMaterial),
      },
    ])

    setNomeMaterial('')
    setUnidadeMaterial('un')
    setOutraUnidade('')
    setPrecoMaterial('')
  }

  function removerMaterial(id) {
    setMateriais(materiais.filter((material) => material.id !== id))
  }

  function salvarServico(event) {
    event.preventDefault()

    const margemNumerica = Number(margem)

    if (!nomeServico.trim()) {
      alert('Informe o nome do serviço.')
      return
    }

    if (
      !Number.isFinite(margemNumerica) ||
      margemNumerica < 1 ||
      margemNumerica > 99
    ) {
      alert('A margem deve estar entre 1% e 99%.')
      return
    }

    const novoServico = {
      id: `${Date.now()}`,
      nome: nomeServico.trim(),
      margemPadrao: margemNumerica,
      materiais: [...materiais],
      despesas: [...despesas],
    }

    setServicos([...servicos, novoServico])
    setServicoSelecionado(novoServico)
    setTela('meus-servicos')
  }


function adicionarDespesaCadastro() {
  const descricao =
    tipoDespesa === 'Outras despesas'
      ? descricaoDespesa.trim()
      : tipoDespesa

  if (!descricao) {
    alert('Informe a descrição da despesa.')
    return
  }

  if (!unidadeDespesa.trim()) {
  alert('Informe a unidade da despesa.')
  return
}

  if (
    valorDespesa === '' ||
    !Number.isFinite(Number(valorDespesa)) ||
    Number(valorDespesa) < 0
  ) {
    alert('Informe um preço unitário válido.')
    return
  }

  setDespesas((despesasAtuais) => [
    ...despesasAtuais,
    {
      id: `${Date.now()}-${despesasAtuais.length}`,
      tipo: tipoDespesa,
      descricao,
      unidade:
        unidadeDespesa === 'Outra'
          ? outraUnidadeDespesa.trim()
          : unidadeDespesa,
      precoUnitario: Number(valorDespesa),
    },
  ])

  setTipoDespesa('Deslocamento')
  setDescricaoDespesa('')
  setValorDespesa('')
  setUnidadeDespesa('')
  setOutraUnidadeDespesa('')
}


function removerDespesaCadastro(id) {
  setDespesas((despesasAtuais) =>
    despesasAtuais.filter((despesa) => despesa.id !== id)
  )
}

 
function selecionarServico(servico) {
  setServicoSelecionado(servico)

  const materiaisIniciais = servico.materiais.map((material) => ({
    ...material,
    quantidade: '',
    precoUnitario:
      material.precoReferencia === ''
        ? ''
        : String(material.precoReferencia),
    tipo: 'cadastrado',
  }))

  setMateriaisCalculo(materiaisIniciais)
  setTela('servico-selecionado')
}

function atualizarMaterial(id, campo, valor) {
  setMateriaisCalculo((materiaisAtuais) =>
    materiaisAtuais.map((material) =>
      material.id === id
        ? { ...material, [campo]: valor }
        : material
    )
  )
}

function adicionarMaterialExtra(material) {
  setMateriaisCalculo((materiaisAtuais) => [
    ...materiaisAtuais,
    {
      ...material,
      id: `${Date.now()}-${materiaisAtuais.length}`,
      tipo: 'extra',
    },
  ])
}

function removerMaterialExtra(id) {
  setMateriaisCalculo((materiaisAtuais) =>
    materiaisAtuais.filter((material) => material.id !== id)
  )
}


  function voltarInicio() {
    setServicoSelecionado(null)
    setTela('Inicio')
  }

  return (
    <main className="pagina-inicial">
      <header className="cabecalho">
        <div className="marca">
          <span className="icone-marca">❄</span>
          <h1>ClimaCusto</h1>
        </div>

        <p>Cálculo de custos para serviços de climatização</p>
      </header>

  {tela === 'Inicio' && (
  <Inicio
    onCalcular={() => setTela('calcular')}
    onMeusServicos={() => setTela('meus-servicos')}
    onCadastrar={abrirCadastro}
  />
)}
  
      {tela === 'calcular' && (
  <Calcular
    servicos={servicos}
    onSelecionarServico={selecionarServico}
    onCadastrar={abrirCadastro}
    onVoltar={voltarInicio}
  />
)}

      {tela === 'meus-servicos' && (
  <MeusServicos
    servicos={servicos}
    onCadastrar={abrirCadastro}
    onVoltar={voltarInicio}
  />
)}

      
{tela === 'cadastrar' && (
  <CadastrarServico
    nomeServico={nomeServico}
    setNomeServico={setNomeServico}
    nomeMaterial={nomeMaterial}
    setNomeMaterial={setNomeMaterial}
    unidadeMaterial={unidadeMaterial}
    setUnidadeMaterial={setUnidadeMaterial}
    outraUnidade={outraUnidade}
    setOutraUnidade={setOutraUnidade}
    precoMaterial={precoMaterial}
    setPrecoMaterial={setPrecoMaterial}
    margem={margem}
    setMargem={setMargem}
    unidades={unidades}
    materiais={materiais}
    onAdicionarMaterial={adicionarMaterial}
    onRemoverMaterial={removerMaterial}
    despesas={despesas}
    tipoDespesa={tipoDespesa}
    setTipoDespesa={setTipoDespesa}
    descricaoDespesa={descricaoDespesa}
    setDescricaoDespesa={setDescricaoDespesa}
    valorDespesa={valorDespesa}
    setValorDespesa={setValorDespesa}
    onAdicionarDespesa={adicionarDespesaCadastro}
    onRemoverDespesa={removerDespesaCadastro}
    onSalvar={salvarServico}
    onCancelar={() => setTela('meus-servicos')}
    unidadeDespesa={unidadeDespesa}
    setUnidadeDespesa={setUnidadeDespesa}
    outraUnidadeDespesa={outraUnidadeDespesa}
    unidadesDespesas={unidadesDespesas}
    setOutraUnidadeDespesa={setOutraUnidadeDespesa}
  />
)}


{tela === 'servico-selecionado' && servicoSelecionado && (
  <ServicoSelecionado
    servicoSelecionado={servicoSelecionado}
    materiaisCalculo={materiaisCalculo}
    onAtualizarMaterial={atualizarMaterial}
    onAdicionarMaterial={adicionarMaterialExtra}
    onRemoverMaterial={removerMaterialExtra}
    unidades={unidades}
    onEscolherOutro={() => setTela('calcular')}
    onVoltar={voltarInicio}
  />
)}
    </main>
  )
}

export default App
