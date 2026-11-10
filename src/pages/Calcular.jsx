
export default function Calcular({
  servicos,
  onSelecionarServico,
  onCadastrar,
  onVoltar,
}) {
  return (
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
            onClick={() => onSelecionarServico(servico)}
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

{servicos.length === 0 && (
  <button
    className="botao-opcao botao-principal"
    type="button"
    onClick={onCadastrar}
  >
    <span className="texto-opcao">
      <strong>＋ Cadastrar novo serviço</strong>
    </span>
    <span className="seta">›</span>
  </button>
)}

<button className="botao-opcao" type="button" onClick={onVoltar}>
  <span className="texto-opcao">
    <strong>Voltar ao início</strong>
  </span>
  <span className="seta">‹</span>
</button>
    </section>
  )
}
