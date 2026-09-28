/**
 * quiz.js
 * =======
 * Lógica do quiz. Não precisa editar este arquivo.
 * Para mudar perguntas → edite js/questions.js
 * Para mudar estilos   → edite css/style.css
 * Para mudar o número de WhatsApp → edite o href do #whatsapp-btn em index.html
 */

const Quiz = (() => {

  let current = "baby-status";
  let answered = 0;
  let selectedAnswers = {};
  const total = 6;
  const letters = ['A', 'B', 'C', 'D', 'E'];

  /* ── Inicia o quiz ── */
  function start() {
    current = "baby-status";
    answered = 0;
    selectedAnswers = {};
    _hide('intro-section');
    _show('quiz-section');
    _render();
  }

  /* ── Reinicia do zero ── */
  function restart() {
    _hide('result-section');
    start();
  }

  /* ── Renderiza a pergunta atual ── */
  function _render() {
    const q = QUESTIONS.find(question => question.id === current);

    // Progresso
    document.getElementById('q-counter').textContent =
      `Pergunta ${answered + 1} de ${total}`;
    document.getElementById('progress-fill').style.width =
      `${(answered / total) * 100}%`;

    // Conteúdo
    document.getElementById('q-category').textContent = q.category;
    document.getElementById('q-text').textContent     = q.text;

    // Opções
    const list = document.getElementById('options-list');
    list.innerHTML = '';

    q.options.forEach((opt, i) => {
      const li  = document.createElement('li');
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span class="opt-letter">${letters[i]}</span><span>${opt}</span>`;
      btn.addEventListener('click', () => _select(btn, i));
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  /* ── Usuário escolhe uma opção ── */
  function _select(btn, optionIndex) {
    // Desativa todos os botões para evitar duplo clique
    document.querySelectorAll('.option-btn').forEach(b => {
      b.style.pointerEvents = 'none';
    });

    btn.style.borderColor  = 'var(--rose-deep)';
    btn.style.background   = '#F9ECEC';
    btn.querySelector('.opt-letter').style.background  = 'var(--rose-deep)';
    btn.querySelector('.opt-letter').style.color       = '#fff';
    btn.querySelector('.opt-letter').style.borderColor = 'var(--rose-deep)';

    // Avança após breve delay visual
    setTimeout(() => {
      answered++;
      const question = QUESTIONS.find(item => item.id === current);
      selectedAnswers[question.id] = question.options[optionIndex];

      if (
        selectedAnswers['baby-age'] === "Há mais de 30 dias" &&
        selectedAnswers.employment === "Nunca trabalhei" &&
        selectedAnswers.inss === "Nunca contribuí para o INSS"
      ) {
        _showResult(true);
        return;
      }

      current = Array.isArray(question.next)
        ? question.next[optionIndex]
        : question.next;

      if (current) {
        _render();
      } else {
        _showResult();
      }
    }, 400);
  }

  /* ── Exibe o resultado final ── */
  function _showResult(outOfScope = false) {
    // Barra cheia
    document.getElementById('progress-fill').style.width = '100%';

    _hide('quiz-section');
    _show('result-section');
    document.getElementById('eligible-result').style.display = outOfScope ? 'none' : 'block';
    document.getElementById('out-of-scope-result').style.display = outOfScope ? 'block' : 'none';
    document.querySelector('.result-badge').textContent = outOfScope ? '♡' : '🎉';

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!outOfScope) _launchConfetti();
  }

  /* ── Confetti decorativo ── */
  function _launchConfetti() {
    const colors = ['#F2D8D8', '#C97C7C', '#C9A96E', '#B8C9B8', '#A35555', '#fff'];
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.style.cssText = `
          position: fixed;
          top: -10px;
          left: ${Math.random() * 100}vw;
          width: 8px;
          height: 8px;
          border-radius: 2px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          pointer-events: none;
          z-index: 9999;
          animation: confettiFall ${1.5 + Math.random() * 2}s linear ${Math.random() * 0.4}s forwards;
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 4000);
      }, i * 30);
    }

    // Injeta keyframe se ainda não existir
    if (!document.getElementById('confetti-style')) {
      const s = document.createElement('style');
      s.id = 'confetti-style';
      s.textContent = `
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `;
      document.head.appendChild(s);
    }
  }

  /* ── Helpers ── */
  function _show(id) { document.getElementById(id).style.display = 'block'; }
  function _hide(id) { document.getElementById(id).style.display = 'none';  }

  // Expõe apenas o necessário para o HTML
  return { start, restart };

})();
