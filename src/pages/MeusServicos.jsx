
export default function MeusServicos({
  servicos,
  onCadastrar,
  onVoltar,
}) {
  return (
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
