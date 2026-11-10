
import { useState } from 'react'

export default function ServicoSelecionado({
  servicoSelecionado,
  materiaisCalculo,
  onAtualizarMaterial,
  onAdicionarMaterial,
  onRemoverMaterial,
  unidades,
  onEscolherOutro,
  onVoltar,
}) {
  const unidadesDespesas = [
    'Litro',
    'Km',
    'Unidade',
    'Almoço',
    'Lanche',
    'Jantar',
    'Café da manhã',
    'Diária',
    'Outra',
  ]

  const [nomeMaterial, setNomeMaterial] = useState('')
  const [unidadeMaterial, setUnidadeMaterial] = useState('un')
  const [outraUnidade, setOutraUnidade] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [precoUnitario, setPrecoUnitario] = useState('')

  const [despesas, setDespesas] = useState(() =>
  (servicoSelecionado.despesas || []).map((despesa) => ({
    ...despesa,
    quantidade: '',
    precoUnitario: String(despesa.precoUnitario ?? ''),
  }))
)

  const [tipoDespesa, setTipoDespesa] = useState('Deslocamento')
  const [descricaoDespesa, setDescricaoDespesa] = useState('')
  const [valorDespesa, setValorDespesa] = useState('')
  const [unidadeDespesa, setUnidadeDespesa] = useState('')
  const [outraUnidadeDespesa, setOutraUnidadeDespesa] = useState('')
  const [margem, setMargem] = useState(
    String(servicoSelecionado.margemPadrao ?? 30)
  )

  const [resultado, setResultado] = useState(null)
  

function atualizarDespesa(id, campo, valor) {
  setDespesas((despesasAtuais) =>
    despesasAtuais.map((despesa) =>
      despesa.id === id
        ? { ...despesa, [campo]: valor }
        : despesa
    )
  )
}

function removerDespesa(id) {
  setDespesas((despesasAtuais) =>
    despesasAtuais.filter((despesa) => despesa.id !== id)
  )
}

function adicionarDespesaExtra() {
  const descricao =
    tipoDespesa === 'Outras despesas'
      ? descricaoDespesa.trim()
      : tipoDespesa

  if (!descricao) {
    alert('Informe a descrição da despesa.')
    return
  }

  if (
    valorDespesa === '' ||
    !Number.isFinite(Number(valorDespesa)) ||
    Number(valorDespesa) <= 0
  ) {
    alert('Informe um preço unitário válido.')
    return
  }

  if (!unidadeDespesa.trim()) {
    alert('Informe a unidade da despesa.')
    return
  }

  if (
  unidadeDespesa === 'Outra' &&
  !outraUnidadeDespesa.trim()
) {
  alert('Informe qual é a outra unidade.')
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
      precoUnitario: valorDespesa,
      quantidade: '',
      origem: 'extra',
    },
  ])

  setTipoDespesa('Deslocamento')
  setDescricaoDespesa('')
  setValorDespesa('')
  setUnidadeDespesa('')
  setOutraUnidadeDespesa('')
}


  function adicionarMaterialExtra(event) {
    event.preventDefault()

    const nome = nomeMaterial.trim()
    const unidade =
      unidadeMaterial === 'Outra'
        ? outraUnidade.trim()
        : unidadeMaterial

    if (!nome || !unidade) {
      alert('Informe o nome e a unidade do material.')
      return
    }

    if (
      !Number.isFinite(Number(quantidade)) ||
      Number(quantidade) <= 0
    ) {
      alert('Informe uma quantidade válida.')
      return
    }

    if (
      precoUnitario === '' ||
      !Number.isFinite(Number(precoUnitario)) ||
      Number(precoUnitario) < 0
    ) {
      alert('Informe um preço unitário válido.')
      return
    }

    onAdicionarMaterial({
      nome,
      unidade,
      quantidade,
      precoUnitario,
    })

    setNomeMaterial('')
    setUnidadeMaterial('un')
    setOutraUnidade('')
    setQuantidade('')
    setPrecoUnitario('')
  }

  function calcularSubtotal(material) {
    if (material.quantidade === '' || material.precoUnitario === '') {
      return null
    }

    return Number(material.quantidade) * Number(material.precoUnitario)
  }

  function materialIncompleto(material) {
  return (
    material.quantidade === '' ||
    material.precoUnitario === '' ||
    !Number.isFinite(Number(material.quantidade)) ||
    !Number.isFinite(Number(material.precoUnitario)) ||
    Number(material.quantidade) <= 0 ||
    Number(material.precoUnitario) < 0
  )
}

const totalMateriais = materiaisCalculo.reduce((total, material) => {
  const subtotal = calcularSubtotal(material)

  return subtotal === null ? total : total + subtotal
}, 0)

const existeMaterialIncompleto = materiaisCalculo.some(materialIncompleto)



const totalDespesas = despesas.reduce((total, despesa) => {
  const quantidade = Number(despesa.quantidade)
  const precoUnitario = Number(despesa.precoUnitario)

  if (
    despesa.quantidade === '' ||
    despesa.precoUnitario === '' ||
    !Number.isFinite(quantidade) ||
    !Number.isFinite(precoUnitario) ||
    quantidade < 0 ||
    precoUnitario < 0
  ) {
    return total
  }

  return total + quantidade * precoUnitario
}, 0)

const existeDespesaIncompleta = despesas.some((despesa) => {
  const quantidade = Number(despesa.quantidade)
  const precoUnitario = Number(despesa.precoUnitario)

  return (
    despesa.quantidade === '' ||
    despesa.precoUnitario === '' ||
    !Number.isFinite(quantidade) ||
    !Number.isFinite(precoUnitario) ||
    quantidade < 0 ||
    precoUnitario < 0
  )
})


function calcularServico() {
  const margemInformada = Number(margem)
  const custoTotal = totalMateriais + totalDespesas

  if (
    margem === '' ||
    !Number.isFinite(margemInformada) ||
    margemInformada < 1 ||
    margemInformada >= 100
  ) {
    alert('Informe uma margem entre 1% e 99%.')
    return
  }

  if (existeMaterialIncompleto || existeDespesaIncompleta) {
    alert('Preencha corretamente todos os materiais e despesas.')
    return
  }

  if (custoTotal <= 0) {
    alert('O custo total precisa ser maior que zero.')
    return
  }

  const valorCalculado =
    custoTotal / (1 - margemInformada / 100)

  const lucroBruto = valorCalculado - custoTotal

  setResultado({
    totalMateriais,
    totalDespesas,
    custoTotal,
    margem: margemInformada,
    valorCalculado,
    lucroBruto,
  })
}

  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return (
    <section className="opcoes">
      <h2>Calcular serviço</h2>

      <div className="botao-opcao">
        <span className="icone-opcao">❄</span>
        <span className="texto-opcao">
          <strong>{servicoSelecionado.nome}</strong>
          <small>
            Margem padrão: {servicoSelecionado.margemPadrao}%
          </small>
        </span>
      </div>

      <h3>Materiais do serviço</h3>

      {materiaisCalculo.length === 0 && (
        <p>Este serviço ainda não possui materiais cadastrados.</p>
      )}

      {materiaisCalculo.map((material) => {
        const subtotal = calcularSubtotal(material)

        return (
          <div className="material-item" key={material.id}>
            <div>
              <strong>{material.nome}</strong>
              <small>{material.unidade}</small>
            </div>

            <label>
              Quantidade
              <input
                type="number"
                min="0"
                step="any"
                value={material.quantidade}
                onChange={(event) =>
                  onAtualizarMaterial(
                    material.id,
                    'quantidade',
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Preço unitário (R$)
              <input
                type="number"
                min="0"
                step="0.01"
                value={material.precoUnitario}
                onChange={(event) =>
                  onAtualizarMaterial(
                    material.id,
                    'precoUnitario',
                    event.target.value
                  )
                }
              />
            </label>

            <small>
              Subtotal:{' '}
              {subtotal === null ? 'Aguardando valores' : formatarMoeda(subtotal)}
            </small>

            {material.tipo === 'extra' && (
              <button
                type="button"
                className="botao-remover"
                onClick={() => onRemoverMaterial(material.id)}
              >
                Remover material
              </button>
            )}
          </div>
        )
      })}

    <div className="material-item">
      <strong>Total dos materiais</strong>
      <strong>{formatarMoeda(totalMateriais)}</strong>
    </div>
    
    {existeMaterialIncompleto && materiaisCalculo.length > 0 && (
      <p className="texto-ajuda">
      Preencha corretamente a quantidade e o preço de todos os materiais.
      </p>
    )}
    

  <div className="campo-margem">
    <label htmlFor="margemCalculo">
      Margem de lucro (%)
    </label>

    <input
      id="margemCalculo"
      type="number"
      min="1"
      max="99"
      step="0.01"
      value={margem}
      onChange={(event) => {
        setMargem(event.target.value)
        setResultado(null)
      }}
      />

      <small>
        Margem padrão cadastrada: {servicoSelecionado.margemPadrao}%
      </small>
    </div>

    
      <h3>Adicionar material extra</h3>

      <form className="formulario" onSubmit={adicionarMaterialExtra}>
        <label>
          Nome do material
          <input
            type="text"
            value={nomeMaterial}
            onChange={(event) => setNomeMaterial(event.target.value)}
            placeholder="Ex.: Canaleta"
          />
        </label>

        <label>
          Unidade
          <select
            value={unidadeMaterial}
            onChange={(event) => setUnidadeMaterial(event.target.value)}
          >
            {unidades.map((unidade) => (
              <option key={unidade} value={unidade}>
                {unidade}
              </option>
            ))}
          </select>
        </label>

        {unidadeMaterial === 'Outra' && (
          <label>
            Qual unidade?
            <input
              type="text"
              value={outraUnidade}
              onChange={(event) => setOutraUnidade(event.target.value)}
              placeholder="Ex.: par"
            />
          </label>
        )}

        <label>
          Quantidade
          <input
            type="number"
            min="0"
            step="any"
            value={quantidade}
            onChange={(event) => setQuantidade(event.target.value)}
            placeholder="Ex.: 2"
          />
        </label>

        <label>
          Preço unitário (R$)
          <input
            type="number"
            min="0"
            step="0.01"
            value={precoUnitario}
            onChange={(event) => setPrecoUnitario(event.target.value)}
            placeholder="Ex.: 15,00"
          />
        </label>

        <button className="botao-principal" type="submit">
          Adicionar material
        </button>
      </form>

      
     
  <h3>Despesas</h3>

  {despesas.length === 0 && (
    <p>Nenhuma despesa cadastrada para este serviço.</p>
  )}

  {despesas.map((despesa) => {
    const quantidadeValida =
      despesa.quantidade !== '' &&
      Number.isFinite(Number(despesa.quantidade)) &&
      Number(despesa.quantidade) > 0

    const precoValido =
      despesa.precoUnitario !== '' &&
      Number.isFinite(Number(despesa.precoUnitario)) &&
      Number(despesa.precoUnitario) >= 0

    const totalIndividual =
      quantidadeValida && precoValido
        ? Number(despesa.quantidade) *
          Number(despesa.precoUnitario)
        : 0

    return (
      <div className="material-item" key={despesa.id}>
        <div>
          <strong>{despesa.descricao}</strong>
          <small>
            {despesa.origem === 'extra'
              ? 'Despesa adicional'
              : 'Despesa cadastrada'}
          </small>
        </div>

        <label>
          Quantidade ({despesa.unidade})
          <input
            type="number"
            min="0"
            step="0.01"
            value={despesa.quantidade}
            onChange={(event) =>
              atualizarDespesa(
                despesa.id,
                'quantidade',
                event.target.value
              )
            }
          />
        </label>

        <label>
          Preço unitário (R$)
          <input
            type="number"
            min="0"
            step="0.01"
            value={despesa.precoUnitario}
            onChange={(event) =>
              atualizarDespesa(
                despesa.id,
                'precoUnitario',
                event.target.value
              )
            }
          />
        </label>

        <strong>
          Total: {formatarMoeda(totalIndividual)}
        </strong>

        <button
          type="button"
          className="botao-remover"
          onClick={() => removerDespesa(despesa.id)}
        >
          Remover
        </button>
      </div>
    )
   })}

    <div className="material-item">
      <strong>Total das despesas</strong>
      <strong>{formatarMoeda(totalDespesas)}</strong>
    </div>

    {existeDespesaIncompleta && (
      <p className="texto-ajuda">
      Preencha a quantidade e o preço unitário de todas as despesas utilizadas.
     </p>
    )}

    <h3>Adicionar despesa extra</h3>

    <form
     className="formulario"
     onSubmit={(event) => {
      event.preventDefault()
      adicionarDespesaExtra()
      }}
    >
    <label htmlFor="tipoDespesa">Tipo de despesa</label>

    <select
      id="tipoDespesa"
      value={tipoDespesa}
      onChange={(event) => setTipoDespesa(event.target.value)}
    >
      <option value="Deslocamento">Deslocamento</option>
      <option value="Alimentação">Alimentação</option>
      <option value="Ajudante">Ajudante</option>
      <option value="Outras despesas">Outras despesas</option>
    </select>

    {tipoDespesa === 'Outras despesas' && (
      <>
        <label htmlFor="descricaoDespesa">Descrição</label>
        <input
          id="descricaoDespesa"
          type="text"
          value={descricaoDespesa}
          onChange={(event) =>
            setDescricaoDespesa(event.target.value)
          }
          placeholder="Ex.: Estacionamento"
        />
      </>
    )}

    <label htmlFor="unidadeDespesa">Unidade</label>

    <select
      id="unidadeDespesa"
      value={unidadeDespesa}
      onChange={(event) => {
        setUnidadeDespesa(event.target.value)
        setOutraUnidadeDespesa('')
      }}
      required
    >
      <option value="">Selecione uma unidade</option>

      {unidadesDespesas.map((unidade) => (
        <option key={unidade} value={unidade}>
          {unidade}
        </option>
      ))}
    </select>

    {unidadeDespesa === 'Outra' && (
      <>
        <label htmlFor="outraUnidadeDespesa">
          Informe a unidade
        </label>
        <input
          id="outraUnidadeDespesa"
          type="text"
          value={outraUnidadeDespesa}
          onChange={(event) =>
            setOutraUnidadeDespesa(event.target.value)
          }
          placeholder="Ex.: viagem"
          required
        />
      </>
    )}

    <label htmlFor="valorDespesaExtra">
      Preço unitário (R$)
    </label>

    <input
      id="valorDespesaExtra"
      type="number"
      min="0"
      step="0.01"
      value={valorDespesa}
      onChange={(event) =>
        setValorDespesa(event.target.value)
      }
      placeholder="Ex.: 25,00"
      required
    />

    <button className="botao-principal" type="submit">
      Adicionar despesa
   </button>
    
</form>

<div className="acoes-calculo">
  <button
    type="button"
    className="botao-salvar"
    onClick={calcularServico}
  >
    {resultado ? 'Recalcular serviço' : 'Calcular serviço'}
  </button>

  <button
    type="button"
    className="botao-opcao"
    onClick={onVoltar}
  >
    Voltar ao início
  </button>
</div>

{resultado && (
  <div className="resultado-calculo">
    <h3>Resultado do serviço</h3>

    <div className="material-item">
      <span>Total dos materiais</span>
      <strong>{formatarMoeda(resultado.totalMateriais)}</strong>
    </div>

    <div className="material-item">
      <span>Total das despesas</span>
      <strong>{formatarMoeda(resultado.totalDespesas)}</strong>
    </div>

    <div className="material-item">
      <span>Custo total</span>
      <strong>{formatarMoeda(resultado.custoTotal)}</strong>
    </div>

    <div className="material-item">
      <span>Margem aplicada</span>
      <strong>{resultado.margem}%</strong>
    </div>

    <div className="material-item">
      <span>Lucro bruto estimado</span>
      <strong>{formatarMoeda(resultado.lucroBruto)}</strong>
    </div>

    <div className="valor-calculado">
      <small>
        Valor calculado com a margem informada ({resultado.margem}%)
      </small>

      <strong>{formatarMoeda(resultado.valorCalculado)}</strong>
    </div>

    <p className="texto-ajuda">
      Impostos e custos não cadastrados não estão incluídos neste cálculo.
    </p>
  </div>
)}

</section>
  )
}
