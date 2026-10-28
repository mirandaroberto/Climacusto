
export default function Inicio({ onCalcular, onMeusServicos }) {
  return (
    <>
      <section className="opcoes">
        <button
          className="botao-opcao"
          type="button"
          onClick={onCalcular}
        >
          <span className="icone-opcao">🧮</span>
          <span className="texto-opcao">
            <strong>Calcular serviço</strong>
            <small>Calcule os custos do seu próximo serviço.</small>
          </span>
          <span className="seta">›</span>
        </button>

        <button
          className="botao-opcao"
          type="button"
          onClick={onMeusServicos}
        >
          <span className="icone-opcao">📋</span>
          <span className="texto-opcao">
            <strong>Meus serviços</strong>
            <small>Gerencie serviços e materiais cadastrados.</small>
          </span>
          <span className="seta">›</span>
        </button>
      </section>

      <footer className="rodape">
        Organize seus custos. Tenha clareza nos seus cálculos.
      </footer>
    </>
  )
}
