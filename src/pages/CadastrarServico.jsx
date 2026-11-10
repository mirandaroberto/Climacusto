
export default function CadastrarServico({
  nomeServico,
  setNomeServico,
  nomeMaterial,
  setNomeMaterial,
  unidadeMaterial,
  setUnidadeMaterial,
  outraUnidade,
  setOutraUnidade,
  precoMaterial,
  setPrecoMaterial,
  margem,
  setMargem,
  unidades,
  materiais,
  onAdicionarMaterial,
  onRemoverMaterial,
  despesas,
  tipoDespesa,
  setTipoDespesa,
  descricaoDespesa,
  setDescricaoDespesa,
  valorDespesa,
  setValorDespesa,
  unidadeDespesa,
  setUnidadeDespesa,
  unidadesDespesas,
  outraUnidadeDespesa,
  setOutraUnidadeDespesa,
  onAdicionarDespesa,
  onRemoverDespesa,
  onSalvar,
  onCancelar,
}) {

  return (
    <section className="opcoes">
      <h2>Cadastrar novo serviço</h2>

      <p>
        Informe os dados do serviço e os materiais
        que você costuma utilizar.
      </p>

      <form className="formulario" onSubmit={onSalvar}>
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
          onClick={onAdicionarMaterial}
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
                  onClick={() => onRemoverMaterial(material.id)}
                  aria-label={`Remover ${material.nome}`}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}

 
        <h3>Despesas</h3>

        <p className="texto-ajuda">
          Cadastre as despesas que costumam fazer parte deste serviço.
          Você poderá alterar ou remover os valores durante cada cálculo.
        </p>

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
            <label htmlFor="descricaoDespesa">Descrição da despesa</label>
            <input
              id="descricaoDespesa"
              type="text"
              value={descricaoDespesa}
              onChange={(event) => setDescricaoDespesa(event.target.value)}
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
        placeholder="Ex.: viagem, serviço"
      />
    </>
)}

        <label htmlFor="valorDespesa">Valor de referência (R$)</label>
        <input
          id="valorDespesa"
          type="number"
          min="0"
          step="0.01"
          value={valorDespesa}
          onChange={(event) => setValorDespesa(event.target.value)}
          placeholder="Opcional"
        />

        <button
          className="botao-opcao botao-principal"
          type="button"
          onClick={onAdicionarDespesa}
        >
          <span className="texto-opcao">
            <strong>＋ Adicionar despesa</strong>
          </span>
        </button>

        {despesas.length > 0 && (
          <div className="lista-materiais">
            <h3>Despesas adicionadas</h3>

            {despesas.map((despesa) => (
              <div className="material-item" key={despesa.id}>
                <div>
                  <strong>{despesa.descricao}</strong>
                  <small>
                    {despesa.unidade} — R$ {Number(despesa.precoUnitario).toFixed(2)} por {despesa.unidade}
                  </small>
                </div>

                <button
                  className="botao-remover"
                  type="button"
                  onClick={() => onRemoverDespesa(despesa.id)}
                  aria-label={`Remover ${despesa.descricao}`}
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
          onClick={onCancelar}
        >
          <span className="texto-opcao">
            <strong>Cancelar cadastro</strong>
          </span>
        </button>
      </form>
    </section>
  )
}
