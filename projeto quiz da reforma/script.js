// Banco de Dados com 8 Questões do Projeto
const questionsData = [
    {
        id: 1,
        category: "Educação & Leitura",
        skillCategory: 1,
        question: "Qual foi um dos principais impactos da Reforma Religiosa na área da educação e da leitura?",
        options: [
            "A proibição da fundação de escolas populares na Europa.",
            "O estímulo à alfabetização e à criação de escolas para que todos pudessem ler os textos sagrados.",
            "A exigência de que todos os livros fossem escritos exclusivamente em latim.",
            "A eliminação de qualquer tipo de ensino nos locais religiosos."
        ],
        correct: 1,
        explanation: "Para permitir que os fieis tivessem acesso direto aos textos religiosos nas línguas populares, a Reforma impulsionou a alfabetização e a criação de escolas públicas."
    },
    {
        id: 2,
        category: "Cuidado Crítico",
        skillCategory: 2,
        question: "Ao analisar a relação entre a Reforma Religiosa e o mundo atual, que cuidado de análise é indispensável?",
        options: [
            "Afirmar que a democracia e os direitos humanos atuais nasceram inteiramente na Reforma.",
            "Ignorar o passado por considerar que ele não se conecta com o presente.",
            "Evitar atribuir qualquer fenômeno atual como consequência direta e exclusiva da Reforma.",
            "Considerar que a tecnologia moderna foi inventada no século XVI."
        ],
        correct: 2,
        explanation: "É preciso cautela para não cometer simplificações. A sociedade moderna foi moldada por múltiplos processos ao longo de séculos (como o Iluminismo e revoluções sociopolíticas)."
    },
    {
        id: 3,
        category: "Liberdade de Consciência",
        skillCategory: 3,
        question: "De que maneira a reflexão sobre o 'livre exame' influenciou os debates sobre o indivíduo?",
        options: [
            "Incentivou a autonomia de reflexão e a responsabilidade pessoal de interpretação.",
            "Aboliu o direito de escolha individual nos países protestantes.",
            "Proibiu o diálogo entre pessoas de crenças variadas.",
            "Obrigou a aceitação passiva de determinações sem questionamento."
        ],
        correct: 0,
        explanation: "O princípio do livre exame defendeu o direito do indivíduo de interpretar os textos por si mesmo, semente importante para o debate contemporâneo sobre a consciência pessoal."
    },
    {
        id: 4,
        category: "Circulação de Ideias",
        skillCategory: 1,
        question: "Qual recurso tecnológico da época foi essencial para a difusão célere dos textos reformadores?",
        options: [
            "O surgimento da internet e dos computadores.",
            "A invenção e expansão da imprensa de tipos móveis por Gutenberg.",
            "O envio exclusivo de cópias manuscritas individuais.",
            "A criação dos meios digitais de comunicação."
        ],
        correct: 1,
        explanation: "A imprensa de Gutenberg permitiu a reprodução rápida de Bíblias e panfletos nas línguas vernáculas, revolucionando a circulação de ideias no século XVI."
    },
    {
        id: 5,
        category: "Línguas Nacionais",
        skillCategory: 1,
        question: "Como a tradução dos escritos religiosos para o alemão e o inglês influenciou a cultura dos países europeus?",
        options: [
            "Causou o esquecimento completo dos idiomas locais.",
            "Unificou as línguas nacionais e fortaleceu a literatura em idioma popular.",
            "Diminuiu o número de publicações de livros na época.",
            "Tornou o latim a única língua oficial de todos os governos."
        ],
        correct: 1,
        explanation: "Ao traduzir os textos para o idioma do povo, os reformadores padronizaram e fortaleceram os idiomas nacionais, expandindo a cultura e a literatura popular."
    },
    {
        id: 6,
        category: "Diversidade Religiosa",
        skillCategory: 3,
        question: "Qual foi uma consequência de longo prazo da Reforma em relação às tradições cristãs?",
        options: [
            "A unificação de todas as igrejas da Europa sob um único líder.",
            "O surgimento da pluralidade de denominações e tradições no cristianismo.",
            "O encerramento completo de discussões sobre religião na sociedade.",
            "A obrigatoriedade de uma só crença para todo o planeta."
        ],
        correct: 1,
        explanation: "A Reforma fragmentou a unidade religiosa ocidental, dando origem à diversidade de igrejas e tradições protestantes conhecidas no mundo contemporâneo."
    },
    {
        id: 7,
        category: "Consciência & Ética",
        skillCategory: 3,
        question: "Como o debate sobre autoridade e consciência individual na Reforma ressoa na ética contemporânea?",
        options: [
            "Defendendo que regras éticas não precisam ser respeitadas por ninguém.",
            "Inspirando o respeito à liberdade de pensamento, de crença e de expressão.",
            "Garantindo que apenas um grupo tenha direito de manifestar suas opiniões.",
            "Eliminando a responsabilidade individual sobre os próprios atos."
        ],
        correct: 1,
        explanation: "A valorização da consciência individual dialoga com as garantias modernas de liberdade de crença, pensamento e convicção pessoal na sociedade plural."
    },
    {
        id: 8,
        category: "Cuidado Crítico",
        skillCategory: 2,
        question: "Qual destas frases descreve com exatidão a relação entre a Reforma Religiosa e o mundo atual?",
        options: [
            "A Reforma criou diretamente o mundo digital e a tecnologia de informação.",
            "A Reforma não possui qualquer tipo de ligação com a cultura contemporânea.",
            "A Reforma plantou ideias sobre educação e liberdade que foram transformadas ao longo do tempo.",
            "A Reforma impediu o avanço da ciência e das universidades na Europa."
        ],
        correct: 2,
        explanation: "A Reforma plantou sementes sobre o direito à leitura e à consciência individual, que continuaram se transformando junto com outros movimentos culturais até o presente."
    }
];

// Estado do Aplicativo
let currentQuestionIndex = 0;
let selectedAnswers = new Array(questionsData.length).fill(null);
let timerInterval = null;
let secondsElapsed = 0;

// Efeitos de Áudio Sintetizados via Web Audio API
function playAudioFeedback(type) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'correct') {
            osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
            osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'incorrect') {
            osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
            osc.frequency.setValueAtTime(174.61, ctx.currentTime + 0.15); // F3
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        }
    } catch (e) {
        // AudioContext pode ser bloqueado sem interação prévia
    }
}

// Alternador de Abas (Quiz / Guia)
function switchTab(tab) {
    const startBtn = document.getElementById('tab-start-btn');
    const summaryBtn = document.getElementById('tab-summary-btn');
    const startScreen = document.getElementById('start-screen');
    const summaryScreen = document.getElementById('summary-screen');

    if (tab === 'start') {
        startBtn.className = "flex-1 py-3 font-serif font-bold text-sm sm:text-base text-amberGold-700 border-b-2 border-amberGold-600 transition-all flex items-center justify-center gap-2";
        summaryBtn.className = "flex-1 py-3 font-serif font-bold text-sm sm:text-base text-parchment-800/60 hover:text-parchment-900 border-b-2 border-transparent transition-all flex items-center justify-center gap-2";
        startScreen.classList.remove('hidden');
        summaryScreen.classList.add('hidden');
    } else {
        summaryBtn.className = "flex-1 py-3 font-serif font-bold text-sm sm:text-base text-amberGold-700 border-b-2 border-amberGold-600 transition-all flex items-center justify-center gap-2";
        startBtn.className = "flex-1 py-3 font-serif font-bold text-sm sm:text-base text-parchment-800/60 hover:text-parchment-900 border-b-2 border-transparent transition-all flex items-center justify-center gap-2";
        summaryScreen.classList.remove('hidden');
        startScreen.classList.add('hidden');
    }
}

// Iniciar Quiz
function startQuiz() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('summary-screen').classList.add('hidden');
    document.getElementById('navigation-tabs').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');

    currentQuestionIndex = 0;
    selectedAnswers.fill(null);
    secondsElapsed = 0;
    
    startTimer();
    renderQuestion();
}

// Temporizador
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        secondsElapsed++;
        const mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
        const secs = (secondsElapsed % 60).toString().padStart(2, '0');
        document.getElementById('timer-display').textContent = `${mins}:${secs}`;
    }, 1000);
}

// Renderizar Pergunta Atual
function renderQuestion() {
    const q = questionsData[currentQuestionIndex];
    
    document.getElementById('question-tracker').textContent = `Pergunta ${currentQuestionIndex + 1} de ${questionsData.length}`;
    document.getElementById('question-category').textContent = q.category;
    document.getElementById('question-text').textContent = q.question;
    
    const progressPercent = ((currentQuestionIndex + 1) / questionsData.length) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;

    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    const feedbackBox = document.getElementById('feedback-box');
    feedbackBox.className = "hidden p-3.5 rounded-2xl border text-xs leading-relaxed fade-in";
    feedbackBox.innerHTML = '';

    const nextBtn = document.getElementById('next-btn');
    nextBtn.disabled = true;
    nextBtn.className = "px-6 py-2.5 bg-slate-300 text-slate-500 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 cursor-not-allowed";

    q.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-3.5 rounded-xl border border-parchment-300 bg-parchment-100 hover:bg-parchment-200 text-parchment-900 font-medium text-xs sm:text-sm transition-all flex items-start gap-3 shadow-sm";
        btn.onclick = () => selectOption(idx);
        
        const letter = String.fromCharCode(65 + idx);
        btn.innerHTML = `
            <span class="w-6 h-6 rounded-lg bg-parchment-200 text-amberGold-800 font-serif font-bold text-xs flex items-center justify-center shrink-0 border border-parchment-300">${letter}</span>
            <span class="mt-0.5">${optText}</span>
        `;
        container.appendChild(btn);
    });
}

// Selecionar Resposta
function selectOption(optionIndex) {
    if (selectedAnswers[currentQuestionIndex] !== null) return;

    selectedAnswers[currentQuestionIndex] = optionIndex;
    const q = questionsData[currentQuestionIndex];
    const isCorrect = optionIndex === q.correct;

    playAudioFeedback(isCorrect ? 'correct' : 'incorrect');

    const buttons = document.getElementById('options-container').children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = null;
        if (i === q.correct) {
            buttons[i].className = "w-full text-left p-3.5 rounded-xl border-2 border-emerald-600 bg-emerald-50 text-emerald-950 font-medium text-xs sm:text-sm flex items-start gap-3 shadow-sm";
        } else if (i === optionIndex && !isCorrect) {
            buttons[i].className = "w-full text-left p-3.5 rounded-xl border-2 border-rose-500 bg-rose-50 text-rose-950 font-medium text-xs sm:text-sm flex items-start gap-3 shadow-sm";
        } else {
            buttons[i].className = "w-full text-left p-3.5 rounded-xl border border-parchment-200 bg-parchment-100 opacity-60 text-parchment-800 font-medium text-xs sm:text-sm flex items-start gap-3";
        }
    }

    const feedbackBox = document.getElementById('feedback-box');
    feedbackBox.classList.remove('hidden');
    if (isCorrect) {
        feedbackBox.className = "p-3.5 rounded-xl border border-emerald-300 bg-emerald-50/90 text-emerald-900 text-xs leading-relaxed fade-in";
        feedbackBox.innerHTML = `
            <div class="font-bold font-serif mb-1 text-emerald-900 flex items-center gap-1.5 text-sm">
                <i class="fa-solid fa-circle-check text-emerald-600"></i> Resposta Correta!
            </div>
            <p>${q.explanation}</p>
        `;
    } else {
        feedbackBox.className = "p-3.5 rounded-xl border border-rose-300 bg-rose-50/90 text-rose-900 text-xs leading-relaxed fade-in";
        feedbackBox.innerHTML = `
            <div class="font-bold font-serif mb-1 text-rose-900 flex items-center gap-1.5 text-sm">
                <i class="fa-solid fa-circle-xmark text-rose-600"></i> Resposta Incorreta
            </div>
            <p>${q.explanation}</p>
        `;
    }

    const nextBtn = document.getElementById('next-btn');
    nextBtn.disabled = false;
    nextBtn.className = "px-6 py-2.5 bg-amberGold-600 hover:bg-amberGold-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 shadow cursor-pointer";
}

// Próxima Pergunta ou Encerrar
function nextQuestion() {
    if (currentQuestionIndex < questionsData.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        finishQuiz();
    }
}

// Encerrar e Gerar Relatório
function finishQuiz() {
    clearInterval(timerInterval);
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');

    let correctCount = 0;
    let skillScores = { 1: { total: 0, correct: 0 }, 2: { total: 0, correct: 0 }, 3: { total: 0, correct: 0 } };

    questionsData.forEach((q, idx) => {
        const userAns = selectedAnswers[idx];
        const isCorrect = userAns === q.correct;
        
        skillScores[q.skillCategory].total++;
        if (isCorrect) {
            correctCount++;
            skillScores[q.skillCategory].correct++;
        }
    });

    const percentage = Math.round((correctCount / questionsData.length) * 100);
    const grade = ((correctCount / questionsData.length) * 10).toFixed(1);

    document.getElementById('score-grade').textContent = grade;
    document.getElementById('score-count').textContent = `${correctCount} / ${questionsData.length}`;
    document.getElementById('score-percentage').textContent = `${percentage}% de acerto`;

    const mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
    const secs = (secondsElapsed % 60).toString().padStart(2, '0');
    document.getElementById('final-time').textContent = `${mins}:${secs}`;

    const rankEl = document.getElementById('student-rank');
    if (grade >= 9.0) {
        rankEl.textContent = 'Especialista de Ensino Religioso';
        rankEl.className = 'text-xs sm:text-sm font-bold text-emerald-700 mt-1 block font-serif';
    } else if (grade >= 7.0) {
        rankEl.textContent = 'Pesquisador do Pluralismo';
        rankEl.className = 'text-xs sm:text-sm font-bold text-amberGold-800 mt-1 block font-serif';
    } else if (grade >= 5.0) {
        rankEl.textContent = 'Estudante da Disciplina';
        rankEl.className = 'text-xs sm:text-sm font-bold text-amberGold-700 mt-1 block font-serif';
    } else {
        rankEl.textContent = 'Necessita de Revisão';
        rankEl.className = 'text-xs sm:text-sm font-bold text-rose-700 mt-1 block font-serif';
    }

    for (let i = 1; i <= 3; i++) {
        const catData = skillScores[i];
        const pct = catData.total > 0 ? Math.round((catData.correct / catData.total) * 100) : 0;
        document.getElementById(`skill-${i}-score`).textContent = `${pct}%`;
        document.getElementById(`skill-${i}-bar`).style.width = `${pct}%`;
    }

    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = '';

    questionsData.forEach((q, idx) => {
        const userAns = selectedAnswers[idx];
        const isCorrect = userAns === q.correct;
        
        const item = document.createElement('div');
        item.className = `p-3 rounded-xl border ${isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'} print-border`;
        
        item.innerHTML = `
            <div class="flex items-start justify-between gap-2 mb-1">
                <span class="font-bold text-parchment-900">${idx + 1}. ${q.question}</span>
                <span class="px-2 py-0.5 rounded font-bold text-[10px] shrink-0 ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                    ${isCorrect ? 'Correto' : 'Incorreto'}
                </span>
            </div>
            <p class="text-parchment-800 text-[11px] mb-1">
                <strong>Sua resposta:</strong> ${userAns !== null ? q.options[userAns] : 'Não respondida'}
            </p>
            ${!isCorrect ? `<p class="text-emerald-900 font-medium text-[11px] mb-1"><strong>Gabarito oficial:</strong> ${q.options[q.correct]}</p>` : ''}
            <p class="text-parchment-800 text-[10px] italic bg-parchment-100 p-2 rounded mt-1 border border-parchment-200">
                ${q.explanation}
            </p>
        `;
        reviewContainer.appendChild(item);
    });
}

// Imprimir / PDF
function printReport() {
    window.print();
}

// Reiniciar Quiz
function restartQuiz() {
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('navigation-tabs').classList.remove('hidden');
    switchTab('start');
}