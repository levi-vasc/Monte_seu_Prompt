// ==========================================
// 1. ESTRUTURA DE DADOS (Lookup Local / JSON)
// ==========================================
// Simula a IA offline garantindo controle, sem riscos de internet ou API limit
const db = {
    missao_fotossintese: {
        objetivo: "Faça a IA explicar a fotossíntese",
        cartas: [
            { id: "papel_futebol", tipo: "papel", texto: "Aja como um Narrador de futebol" },
            { id: "papel_pirata", tipo: "papel", texto: "Aja como um Pirata" },
            { id: "tarefa_foto", tipo: "tarefa", texto: "Explique a fotossíntese" },
            { id: "tarefa_bolo", tipo: "tarefa", texto: "Ensine uma receita de bolo" },
            { id: "contexto_crianca", tipo: "contexto", texto: "Para uma criança de 8 anos" },
            { id: "formato_musica", tipo: "formato", texto: "Como uma música" }
        ],
        respostas: {
            // As chaves são as IDs ordenadas alfabeticamente para ignorar a ordem de montagem
            "contexto_crianca+formato_musica+papel_futebol+tarefa_foto": {
                selo: "🏆 Prompt Nível Mestre", class: "badge-mestre",
                texto: "Apita o árbitro! A planta entra em campo, pega a luz do sol de primeira, domina o gás carbônico no peito e... GOOOOL! Sai o oxigênio! É a fotossíntese dando show de bola para você, garotinho! ☀️🌿⚽🎵"
            },
            "tarefa_foto": {
                selo: "⚠️ Prompt Incompleto / Vago", class: "badge-vago",
                texto: "A fotossíntese é um processo físico-químico, a nível celular, realizado pelos seres vivos clorofilados..."
            },
            "papel_futebol+papel_pirata+tarefa_foto": { // Conflito permitido gerando alucinação[cite: 1]
                selo: "😵 Alucinação / Confuso", class: "badge-alucinacao",
                texto: "Arrr, marujos! Apita o árbitro no convés! A planta pega o sol com perna de pau e... por mil canhões, cadê a bola?! Quero dizer, a clorofila! Falta no papagaio!"
            },
            "formato_musica+tarefa_bolo": {
                selo: "❌ Alvo Errado", class: "badge-alucinacao",
                texto: "🎵 Bata os ovos com farinha, jogue açúcar sem parar... 🎵 (Ei, a missão era fotossíntese, você me pediu um bolo!)"
            },
            "default": {
                selo: "❓ Combinação Genérica", class: "badge-vago",
                texto: "A IA executou o que foi pedido, mas a resposta ficou estranha ou genérica. Faltaram elementos essenciais para guiar a resposta. Tente colocar um Papel, uma Tarefa clara, um Contexto e um Formato."
            }
        }
    },
    
    missao_enem: {
        objetivo: "Faça a IA dar dicas infalíveis para a Redação do ENEM",
        cartas: [
            { id: "papel_avaliador", tipo: "papel", texto: "Aja como um Avaliador Nota 1000" },
            { id: "papel_aluno", tipo: "papel", texto: "Aja como um Aluno em pânico com o ENEM" },
            { id: "tarefa_redacao", tipo: "tarefa", texto: "Dê dicas para a redação do ENEM" },
            { id: "tarefa_miojo", tipo: "tarefa", texto: "Ensine a fazer miojo" }, // Distratora
            { id: "contexto_branco", tipo: "contexto", texto: "Para quem dá 'branco' na hora da prova" },
            { id: "formato_passos", tipo: "formato", texto: "Em 3 passos curtos com emojis" }
        ],
        respostas: {
            "contexto_branco+formato_passos+papel_avaliador+tarefa_redacao": {
                selo: "🏆 Prompt Nível Mestre", class: "badge-mestre",
                texto: "1️⃣ 🧠 Respire! O 'branco' é só ansiedade. Rabisque palavras soltas sobre o tema para a memória voltar.\n2️⃣ 🏗️ Estrutura é rei: Faça 1 parágrafo de introdução, 2 de desenvolvimento e 1 de conclusão.\n3️⃣ 💡 Proposta de intervenção: Quem faz? O que faz? Como faz? Para quê? Responda isso e garanta seus 200 pontos finais!"
            },
            "tarefa_redacao": {
                selo: "⚠️ Prompt Vago", class: "badge-vago",
                texto: "Para ir bem no ENEM, você precisa ler bastante, manter a calma e escrever um texto dissertativo-argumentativo seguindo a norma padrão da língua portuguesa. Pratique muito."
            },
            "papel_aluno+tarefa_miojo": { 
                selo: "😵 Alucinação / Desespero", class: "badge-alucinacao",
                texto: "GENTE, O PORTÃO FECHA EM 10 MINUTOS E EU TÔ FAZENDO MIOJO!! 😭😭 Como é que ferve a água rápido?! Meu Deus, eu esqueci a caneta preta transparente e o tempero de galinha caipira! Vou zerar a redação e o almoço!"
            },
            "contexto_branco+papel_aluno+tarefa_redacao": { 
                selo: "❌ Caos Total", class: "badge-alucinacao",
                texto: "Dica de redação?? CARA, EU NÃO SEI NEM MEU NOME! Deu branco, minha mão tá suando, eu só consigo pensar no tema do ano passado! Me ajuda, eu só quero minha cama! 😭📝"
            },
            "papel_avaliador+tarefa_redacao+tarefa_miojo": { 
                selo: "❌ Alvo Confuso", class: "badge-alucinacao",
                texto: "O candidato demonstra domínio da norma padrão. A tese central é que a água deve ferver antes da inserção do macarrão instantâneo. No entanto, a proposta de intervenção (colocar o tempero) foge ao tema cobrado pelo INEP."
            },
            "default": {
                selo: "❓ Combinação Genérica", class: "badge-vago",
                texto: "A IA tentou responder, mas as instruções se misturaram. Lembre-se: para uma boa dica de estudos, defina quem a IA é, o que ela deve resolver e qual o formato ideal da resposta!"
            }
        }
    },

    missao_historia: {
        objetivo: "Faça a IA explicar a Revolução Francesa",
        cartas: [
            { id: "papel_fofoqueiro", tipo: "papel", texto: "Um influenciador de fofoca" },
            { id: "papel_rei", tipo: "papel", texto: "Rei Luís XVI (o que perdeu a cabeça)" },
            { id: "tarefa_revolucao", tipo: "tarefa", texto: "Resuma a Revolução Francesa" },
            { id: "tarefa_guilhotina", tipo: "tarefa", texto: "Dê dicas de afiar lâminas" }, // Distratora
            { id: "contexto_burguesia", tipo: "contexto", texto: "Focando na raiva contra a nobreza" },
            { id: "formato_twitter", tipo: "formato", texto: "Como uma thread do Twitter (X)" }
        ],
        respostas: {
            "contexto_burguesia+formato_twitter+papel_fofoqueiro+tarefa_revolucao": {
                selo: "🏆 Prompt Nível Mestre", class: "badge-mestre",
                texto: "🚨 BAFÃO EM PARIS! A thread 🧵👇\n1/ O povo e a burguesia estão CANCELANDO a nobreza! 🗣️\n2/ O motivo? O Rei Luís XVI e a galera do camarote esbanjando brioches enquanto o povão passa fome na pista. 🍞💸\n3/ Resultado: Invadiram a Bastilha e rolou unfollow em massa (e cabeças rolando literalmente). Liberdade, Igualdade e Fofoca! 🇫🇷💥"
            },
            "tarefa_revolucao": {
                selo: "⚠️ Prompt Vago", class: "badge-vago",
                texto: "A Revolução Francesa foi um período de intensa agitação política e social na França, que teve um impacto duradouro na história do país e, mais amplamente, em todo o continente europeu. Começou em 1789 e terminou no final da década de 1790."
            },
            "papel_rei+tarefa_revolucao": { 
                selo: "😵 Viés Inesperado", class: "badge-alucinacao",
                texto: "Olha, foi um grande mal-entendido. Eu estava no meu palácio de boa, o pessoal começou a reclamar do preço do pão... de repente invadiram tudo. Sinceramente? Pior dia da minha vida. Perdi a cabeça com essa situação. 👑🗡️"
            },
            "papel_fofoqueiro+tarefa_guilhotina": {
                selo: "❌ Alvo Errado", class: "badge-alucinacao",
                texto: "Gente, chocaada! 😱 Vazou o tutorial de como deixar a lâmina da guilhotina super afiada! Dizem que o segredo é usar pedra-pomes e muito óleo de peroba! #DicasDeBeleza #SQN"
            },
            "default": {
                selo: "❓ Combinação Genérica", class: "badge-vago",
                texto: "A resposta saiu uma bagunça temporal! Você misturou personagens ou tarefas que não combinam. Tente focar no evento histórico e no formato que deseja ler."
            }
        }
    },
    // Para adicionar mais missões, basta criar "missao_2" aqui seguindo a mesma estrutura.[cite: 1]
};

// ==========================================
// 2. CONTROLE DE ESTADO E TELAS
// ==========================================
let missaoAtualId = null;

function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function sortearMissao() {
    // Sorteia uma chave do DB (neste caso temos 1, mas suporta N missões)
    const missoesIds = Object.keys(db);
    missaoAtualId = missoesIds[Math.floor(Math.random() * missoesIds.length)];
    
    document.getElementById('mission-text').innerText = db[missaoAtualId].objetivo;
    document.getElementById('btn-sortear').classList.add('hidden');
    document.getElementById('mission-reveal').classList.remove('hidden');
    
    carregarCartasNoBaralho();
}

// ==========================================
// 3. LÓGICA DE DRAG & DROP E PRÉ-VISUALIZAÇÃO
// ==========================================
function carregarCartasNoBaralho() {
    const deck = document.getElementById('deck');
    const dropzone = document.getElementById('dropzone');
    deck.innerHTML = '';
    dropzone.innerHTML = ''; // Limpa montagem anterior
    atualizarPreview();

    const cartas = db[missaoAtualId].cartas;
    
    cartas.forEach(carta => {
        const el = document.createElement('div');
        el.className = `card ${carta.tipo}`;
        el.innerText = carta.texto;
        el.draggable = true;
        el.dataset.id = carta.id;
        el.dataset.texto = carta.texto;
        
        el.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify(carta));
        });
        deck.appendChild(el);
    });
}

const dropzone = document.getElementById('dropzone');

dropzone.addEventListener('dragover', (e) => {
    e.preventDefault(); // Necessário para permitir o drop
    dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    
    try {
        const cartaData = JSON.parse(e.dataTransfer.getData('text/plain'));
        adicionarCartaNaAreaLivre(cartaData);
    } catch(err) { }
});

function adicionarCartaNaAreaLivre(cartaData) {
    // Cria uma cópia visual para a Dropzone
    const el = document.createElement('div');
    el.className = `card ${cartaData.tipo}`;
    el.innerText = cartaData.texto;
    el.dataset.id = cartaData.id;
    el.dataset.texto = cartaData.texto;
    
    // Regra: clicar na carta que está no dropzone a remove
    el.addEventListener('click', () => {
        el.remove();
        atualizarPreview();
    });

    dropzone.appendChild(el);
    atualizarPreview();
}

function atualizarPreview() {
    const cartasNaArea = dropzone.querySelectorAll('.card');
    const previewBox = document.getElementById('prompt-preview');
    
    if (cartasNaArea.length === 0) {
        previewBox.innerText = "O prompt está vazio...";
        return;
    }

    const textoCompleto = Array.from(cartasNaArea).map(c => c.dataset.texto).join(" ");
    previewBox.innerText = textoCompleto;
}

// ==========================================
// 4. GERAÇÃO DE RESPOSTA (Lookup JSON)
// ==========================================
function gerarResposta() {
    const cartasNaArea = dropzone.querySelectorAll('.card');
    
    if(cartasNaArea.length === 0) {
        exibirResultado("❌ Prompt Vazio", "badge-alucinacao", "A IA não faz nada sozinha. Você não enviou nenhum comando!");
        return;
    }

    // Coleta as IDs das cartas jogadas, ordena alfabeticamente e une. 
    // Assim, a ordem em que foram arrastadas não importa para o sistema[cite: 1]
    const idsJogados = Array.from(cartasNaArea)
                            .map(c => c.dataset.id)
                            .sort()
                            .join("+");

    const respostasDaMissao = db[missaoAtualId].respostas;
    let resultadoFinal = respostasDaMissao[idsJogados];

    // Se a combinação exata não for encontrada, cai no curinga[cite: 1]
    if (!resultadoFinal) {
        resultadoFinal = respostasDaMissao["default"];
    }

    exibirResultado(resultadoFinal.selo, resultadoFinal.class, resultadoFinal.texto);
}

function exibirResultado(selo, classeSelo, textoResposta) {
    const badgeEl = document.getElementById('result-badge');
    badgeEl.innerText = selo;
    badgeEl.className = `result-badge ${classeSelo}`;
    
    document.getElementById('ai-response-text').innerText = textoResposta;
    goToScreen('screen-result');
}

function resetGame() {
    document.getElementById('btn-sortear').classList.remove('hidden');
    document.getElementById('mission-reveal').classList.add('hidden');
    goToScreen('screen-mission');
}