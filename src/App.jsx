
import { useState } from 'react'
import './App.css'
import Inicio from './pages/Inicio.jsx'

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

function App() {
  const [tela, setTela] = useState('Inicio')
  const [servicos, setServicos] = useState([])
  const [servicoSelecionado, setServicoSelecionado] = useState(null)

  const [nomeServico, setNomeServico] = useState('')
  const [margem, setMargem] = useState('30')

  const [nomeMaterial, setNomeMaterial] = useState('')
  const [unidadeMaterial, setUnidadeMaterial] = useState('un')
  const [outraUnidade, setOutraUnidade] = useState('')
  const [precoMaterial, setPrecoMaterial] = useState('')
  const [materiais, setMateriais] = useState([])

  function abrirCadastro() {
    setNomeServico('')
    setMargem('30')
    setMateriais([])
    setNomeMaterial('')
    setUnidadeMaterial('un')
    setOutraUnidade('')
    setPrecoMaterial('')
    setTela('cadastrar')
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
    }

    setServicos([...servicos, novoServico])
    setServicoSelecionado(novoServico)
    setTela('meus-servicos')
  }

  function selecionarServico(servico) {
    setServicoSelecionado(servico)
    setTela('servico-selecionado')
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
  />
)}  
      {tela === 'calcular' && (
        <section className="opcoes">
          <h2>Qual serviço você vai calcular?</h2>

          {servicos.length === 0 ? (
            <div className="estado-vazio">
              <span className="icone-vazio">📋</span>
              <h3>Nenhum serviço cadastrado</h3>
              <p>
                Cadastre seu primeiro serviço para começar
                a calcular os custos.
              </p>
            </div>
          ) : (
            servicos.map((servico) => (
              <button
                className="botao-opcao"
                type="button"
                key={servico.id}
                onClick={() => selecionarServico(servico)}
              >
                <span className="icone-opcao">❄</span>
                <span className="texto-opcao">
                  <strong>{servico.nome}</strong>
                  <small>
                    {servico.materiais.length} material(is) cadastrado(s)
                  </small>
                </span>
                <span className="seta">›</span>
              </button>
            ))
          )}

          <button
            className="botao-opcao botao-principal"
            type="button"
            onClick={abrirCadastro}
          >
            <span className="texto-opcao">
              <strong>＋ Cadastrar novo serviço</strong>
            </span>
            <span className="seta">›</span>
          </button>

          <button className="botao-opcao" type="button" onClick={voltarInicio}>
            <span className="texto-opcao">
              <strong>Voltar ao início</strong>
            </span>
            <span className="seta">‹</span>
          </button>
        </section>
      )}

      {tela === 'meus-servicos' && (
        <section className="opcoes">
          <h2>Meus serviços</h2>

          {servicos.length === 0 ? (
            <div className="estado-vazio">
              <span className="icone-vazio">📋</span>
              <h3>Nenhum serviço cadastrado</h3>
              <p>
                Cadastre seus serviços para encontrá-los aqui.
              </p>
            </div>
          ) : (
            servicos.map((servico) => (
              <div className="botao-opcao" key={servico.id}>
                <span className="icone-opcao">❄</span>
                <span className="texto-opcao">
                  <strong>{servico.nome}</strong>
                  <small>
                    Margem padrão: {servico.margemPadrao}%
                    {' · '}
                    {servico.materiais.length} material(is)
                  </small>
                </span>
              </div>
            ))
          )}

          <button
            className="botao-opcao botao-principal"
            type="button"
            onClick={abrirCadastro}
          >
            <span className="texto-opcao">
              <strong>＋ Cadastrar novo serviço</strong>
            </span>
            <span className="seta">›</span>
          </button>

          <button className="botao-opcao" type="button" onClick={voltarInicio}>
            <span className="texto-opcao">
              <strong>Voltar ao início</strong>
            </span>
            <span className="seta">‹</span>
          </button>
        </section>
      )}

      {tela === 'cadastrar' && (
        <section className="opcoes">
          <h2>Cadastrar novo serviço</h2>

          <p>
            Informe os dados do serviço e os materiais
            que você costuma utilizar.
          </p>

          <form className="formulario" onSubmit={salvarServico}>
            <label htmlFor="nomeServico">Nome do serviço *</label>
            <input
              id="nomeServico"
              type="text"
              value={nomeServico}
              onChange={(event) => setNomeServico(event.target.value)}
              placeholder="Ex.: Instalação de ar-condicionado"
              required
            />

            <h3>Materiais de referência</h3>
            <p className="texto-ajuda">
              Você pode deixar o preço em branco e informá-lo
              quando for calcular um serviço.
            </p>

            <label htmlFor="nomeMaterial">Nome do material</label>
            <input
              id="nomeMaterial"
              type="text"
              value={nomeMaterial}
              onChange={(event) => setNomeMaterial(event.target.value)}
              placeholder="Ex.: Tubo de cobre"
            />

            <label htmlFor="unidadeMaterial">Unidade de medida</label>
            <select
              id="unidadeMaterial"
              value={unidadeMaterial}
              onChange={(event) => setUnidadeMaterial(event.target.value)}
            >
              {unidades.map((unidade) => (
                <option key={unidade} value={unidade}>
                  {unidade}
                </option>
              ))}
            </select>

            {unidadeMaterial === 'Outra' && (
              <>
                <label htmlFor="outraUnidade">Qual unidade?</label>
                <input
                  id="outraUnidade"
                  type="text"
                  value={outraUnidade}
                  onChange={(event) => setOutraUnidade(event.target.value)}
                  placeholder="Informe a unidade"
                />
              </>
            )}

            <label htmlFor="precoMaterial">Preço de referência (R$)</label>
            <input
              id="precoMaterial"
              type="number"
              min="0"
              step="0.01"
              value={precoMaterial}
              onChange={(event) => setPrecoMaterial(event.target.value)}
              placeholder="Opcional"
            />

            <button
              className="botao-opcao botao-principal"
              type="button"
              onClick={adicionarMaterial}
            >
              <span className="texto-opcao">
                <strong>＋ Adicionar material</strong>
              </span>
            </button>

            {materiais.length > 0 && (
              <div className="lista-materiais">
                <h3>Materiais adicionados</h3>

                {materiais.map((material) => (
                  <div className="material-item" key={material.id}>
                    <div>
                      <strong>{material.nome}</strong>
                      <small>
                        {material.unidade}
                        {' · '}
                        {material.precoReferencia === ''
                          ? 'Preço não informado'
                          : `R$ ${material.precoReferencia.toFixed(2)}`}
                      </small>
                    </div>

                    <button
                      className="botao-remover"
                      type="button"
                      onClick={() => removerMaterial(material.id)}
                      aria-label={`Remover ${material.nome}`}
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label htmlFor="margem">Margem de lucro padrão (%) *</label>
            <input
              id="margem"
              type="number"
              min="1"
              max="99"
              step="0.01"
              value={margem}
              onChange={(event) => setMargem(event.target.value)}
              required
            />

            <button className="botao-salvar" type="submit">
              Salvar serviço
            </button>

            <button
              className="botao-opcao"
              type="button"
              onClick={() => setTela('meus-servicos')}
            >
              <span className="texto-opcao">
                <strong>Cancelar cadastro</strong>
              </span>
            </button>
          </form>
        </section>
      )}

      {tela === 'servico-selecionado' && servicoSelecionado && (
        <section className="opcoes">
          <h2>Serviço selecionado</h2>

          <div className="botao-opcao">
            <span className="icone-opcao">❄</span>
            <span className="texto-opcao">
              <strong>{servicoSelecionado.nome}</strong>
              <small>
                Margem padrão: {servicoSelecionado.margemPadrao}%
              </small>
            </span>
          </div>

          <h3>Materiais cadastrados</h3>

          {servicoSelecionado.materiais.length === 0 ? (
            <p>Este serviço ainda não possui materiais cadastrados.</p>
          ) : (
            servicoSelecionado.materiais.map((material) => (
              <div className="material-item" key={material.id}>
                <div>
                  <strong>{material.nome}</strong>
                  <small>
                    {material.unidade}
                    {' · '}
                    {material.precoReferencia === ''
                      ? 'Preço não informado'
                      : `R$ ${material.precoReferencia.toFixed(2)}`}
                  </small>
                </div>
              </div>
            ))
          )}

          <p>
            A próxima etapa será preencher as quantidades e os preços
            utilizados neste cálculo.
          </p>

          <button
            className="botao-opcao"
            type="button"
            onClick={() => setTela('calcular')}
          >
            <span className="texto-opcao">
              <strong>Escolher outro serviço</strong>
            </span>
            <span className="seta">‹</span>
          </button>

          <button className="botao-opcao" type="button" onClick={voltarInicio}>
            <span className="texto-opcao">
              <strong>Voltar ao início</strong>
            </span>
            <span className="seta">‹</span>
          </button>
        </section>
      )}
    </main>
  )
}

export default App
