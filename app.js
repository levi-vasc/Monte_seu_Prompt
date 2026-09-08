// ==========================================
// 1. ESTRUTURA DE DADOS (Lookup Local / JSON)
// ==========================================
// Simula a IA offline garantindo controle, sem riscos de internet ou API limit
const db = {
    
    // MISSÃO 1: BIOLOGIA (Foco em Especificidade e Adequação de Público)
    missao_fotossintese: {
        objetivo: "Faça a IA explicar a fotossíntese para uma criança do Ensino Fundamental.",
        cartas: [
            { id: "papel_prof_fundamental", tipo: "papel", texto: "Aja como um Professor de Ciências" },
            { id: "papel_pesquisador", tipo: "papel", texto: "Aja como um Professor universitário" }, // Distratora (Tom inadequado)
            { id: "tarefa_fotossintese", tipo: "tarefa", texto: "Explique o processo da fotossíntese" },
            { id: "tarefa_biologia", tipo: "tarefa", texto: "Explique os conceitos gerais da biologia" }, // Distratora (Muito ampla)
            { id: "contexto_analogias", tipo: "contexto", texto: "Usando vocabulário simples e analogias" },
            { id: "formato_paragrafo", tipo: "formato", texto: "Em um parágrafo curto" }
        ],
        respostas: {
            "contexto_analogias+formato_paragrafo+papel_prof_fundamental+tarefa_fotossintese": {
                selo: "✅ Prompt Preciso", class: "badge-mestre",
                texto: "A fotossíntese é como se a planta tivesse uma 'cozinha' nas suas folhas. Ela usa a luz do sol, a água da chuva e o ar que respiramos para preparar o seu próprio alimento. Como bônus, enquanto cozinha, ela libera oxigênio limpinho para nós respirarmos!"
            },
            "papel_prof_fundamental+tarefa_biologia": {
                selo: "⚠️ Fuga ao Tema (Muito Amplo)", class: "badge-vago",
                texto: "A biologia é a ciência que estuda a vida. Ela engloba os animais, as plantas, os fungos e as bactérias. Estudamos como os corpos funcionam, como os seres vivos se reproduzem e como interagem com o meio ambiente..."
            },
            "contexto_analogias+formato_paragrafo+papel_pesquisador+tarefa_fotossintese": { 
                selo: "❌ Conflito de Tom", class: "badge-alucinacao",
                texto: "Embora me peçam para usar analogias simples, devo ressaltar que a fotossíntese envolve o Ciclo de Calvin-Benson. É como se o ATP e o NADPH fossem 'moedas energéticas' utilizadas para a fixação do carbono na enzima RuBisCO, um processo complexo demais para simplificações excessivas."
            },
            "formato_paragrafo+papel_pesquisador+tarefa_fotossintese": {
                selo: "❌ Inadequado ao Público", class: "badge-alucinacao",
                texto: "A fotossíntese é um processo físico-químico mediado por pigmentos fotossintetizantes, como a clorofila, que convertem energia luminosa em energia química, resultando na síntese de compostos orgânicos a partir de dióxido de carbono e água, com liberação de O2 como subproduto."
            },
            "default": {
                selo: "❓ Prompt Incompleto", class: "badge-vago",
                texto: "A resposta gerada foi genérica ou imprecisa. Lembre-se: para obter uma resposta altamente eficaz, você precisa alinhar o Papel (quem ensina), a Tarefa (o que ensinar), o Contexto e o Formato (como ensinar)."
            }
        }
    },

    // MISSÃO 2: REDAÇÃO ENEM (Foco em Estrutura vs. Conteúdo)
    missao_enem: {
        objetivo: "Faça a IA ensinar a ESTRUTURA de uma redação do ENEM.",
        cartas: [
            { id: "papel_corretor", tipo: "papel", texto: "Aja como um Professor de Redação" },
            { id: "papel_jornalista", tipo: "papel", texto: "Aja como um Jornalista" }, // Distratora (Estilo de texto errado)
            { id: "tarefa_estrutura", tipo: "tarefa", texto: "Ensine a estrutura do texto dissertativo" },
            { id: "tarefa_escrever", tipo: "tarefa", texto: "Escreva uma redação sobre meio ambiente" }, // Distratora (Fará a IA fazer o texto em vez de ensinar)
            { id: "contexto_competencias", tipo: "contexto", texto: "Focando nas 5 competências avaliativas" },
            { id: "formato_topicos", tipo: "formato", texto: "Em tópicos organizados" }
        ],
        respostas: {
            "contexto_competencias+formato_topicos+papel_corretor+tarefa_estrutura": {
                selo: "✅ Prompt Preciso", class: "badge-mestre",
                texto: "• Introdução: Apresente o tema e sua tese (posicionamento).\n• Desenvolvimento 1 e 2: Use repertório sociocultural (Competência 2) e argumente com coerência (Competência 3 e 4).\n• Conclusão: Crie uma Proposta de Intervenção completa (Quem faz, o que faz, como faz, para quê e detalhamento - Competência 5)."
            },
            "papel_corretor+tarefa_escrever": { 
                selo: "❌ Erro de Tarefa", class: "badge-alucinacao",
                texto: "A preservação ambiental é um desafio contemporâneo. Historicamente, desde a Revolução Industrial, a degradação dos biomas tem se agravado... (Nota: A IA apenas escreveu um texto genérico, falhando em ensinar a estrutura solicitada na missão)."
            },
            "papel_jornalista+tarefa_estrutura": { 
                selo: "❌ Inadequação de Gênero Textual", class: "badge-alucinacao",
                texto: "Para estruturar um bom texto, você precisa capturar a atenção do leitor na primeira linha! Use frases de efeito, mostre sua indignação sobre o tema e termine com uma reflexão filosófica aberta. (Nota: O ENEM penaliza textos jornalísticos/subjetivos)."
            },
            "formato_topicos+papel_corretor+tarefa_escrever": {
                selo: "⚠️ Formato Incompatível", class: "badge-vago",
                texto: "• O meio ambiente está sendo destruído.\n• Precisamos de mais leis rigorosas.\n• O governo deve investir em educação ambiental.\n(Nota: A IA tentou escrever uma redação em formato de tópicos (bullet points), o que zeraria a prova do ENEM)."
            },
            "default": {
                selo: "❓ Prompt Incompleto", class: "badge-vago",
                texto: "As instruções dadas à IA foram conflitantes. Para receber orientação técnica sobre o ENEM, é crucial que o Papel seja de um especialista na prova e que a Tarefa peça claramente a *estrutura*, e não o texto pronto."
            }
        }
    },

    // MISSÃO 3: HISTÓRIA (Foco em Recorte Histórico e Formato)
    missao_historia: {
        objetivo: "Faça a IA resumir as CAUSAS da Revolução Francesa para uma revisão rápida.",
        cartas: [
            { id: "papel_prof_cursinho", tipo: "papel", texto: "Aja como umProfessor de História de Cursinho" },
            { id: "papel_historiador", tipo: "papel", texto: "Aja como um Historiador Especialista" }, // Distratora (Gera excesso de detalhes)
            { id: "tarefa_causas", tipo: "tarefa", texto: "Resuma as causas principais da Revolução" },
            { id: "tarefa_cronologia", tipo: "tarefa", texto: "Detalhe a cronologia completa da Revolução" }, // Distratora (Foco errado)
            { id: "contexto_economia", tipo: "contexto", texto: "Priorizando a desigualdade e a economia" },
            { id: "formato_lista", tipo: "formato", texto: "Em uma lista de marcadores objetivos" }
        ],
        respostas: {
            "contexto_economia+formato_lista+papel_prof_cursinho+tarefa_causas": {
                selo: "✅ Prompt Preciso", class: "badge-mestre",
                texto: "• Sociedade Estamental: O Clero e a Nobreza não pagavam impostos, sobrecarregando o Terceiro Estado (burguesia e povo).\n• Crise Econômica: Safras ruins geraram fome, aliadas aos altos gastos da Corte de Versalhes.\n• Iluminismo: As ideias de Liberdade e Igualdade inspiraram a burguesia a questionar o absolutismo monárquico."
            },
            "papel_prof_cursinho+tarefa_cronologia": {
                selo: "⚠️ Erro de Recorte Temático", class: "badge-vago",
                texto: "1789: Convocação dos Estados Gerais; Queda da Bastilha. 1791: Primeira Constituição. 1792: Proclamação da República. 1793: Execução do Rei Luís XVI e início do Período do Terror... (Nota: A IA focou em datas, omitindo o porquê a revolução aconteceu)."
            },
            "formato_lista+papel_historiador+tarefa_causas": { 
                selo: "❌ Excesso de Informação", class: "badge-alucinacao",
                texto: "• O impacto do preço do trigo na província de Dauphiné em março de 1788.\n• A correspondência privada entre o ministro Necker e banqueiros suíços.\n• O descontentamento dos sapateiros do bairro de Saint-Antoine frente aos novos impostos municipais.\n(Nota: Muito específico e inútil para uma revisão rápida de prova)."
            },
            "contexto_economia+papel_historiador+tarefa_cronologia": {
                selo: "❌ Prolixo / Inútil para Revisão", class: "badge-alucinacao",
                texto: "Ao analisarmos o dia 14 de julho de 1789 sob a ótica econômica, devemos observar os registros alfandegários das barreiras de Paris. O preço do pão atingiu 14 sous. Nos dias seguintes, a contabilidade das padarias locais demonstra um colapso no poder de compra... (Nota: Texto acadêmico denso, péssimo para revisão rápida)."
            },
            "default": {
                selo: "❓ Prompt Incompleto", class: "badge-vago",
                texto: "Para uma revisão rápida e eficiente, você precisa alinhar a objetividade do formato (lista), a didática de quem ensina (professor) e a precisão da tarefa (causas, não a história inteira). Tente reorganizar suas escolhas."
            }
        }
    },

    missao_fisica: {
        objetivo: "Faça a IA explicar o que é um Buraco Negro",
        cartas: [
            { id: "papel_astronauta", tipo: "papel", texto: "Um astronauta desesperado" },
            { id: "papel_cientista", tipo: "papel", texto: "Um físico teórico chato" },
            { id: "tarefa_buraco", tipo: "tarefa", texto: "Explique o que é um buraco negro" },
            { id: "tarefa_pneu", tipo: "tarefa", texto: "Ensine a trocar um pneu furado" }, // Distratora
            { id: "contexto_sugado", tipo: "contexto", texto: "Enquanto é puxado pela gravidade" },
            { id: "formato_maiusculas", tipo: "formato", texto: "Gritando em CAIXA ALTA" }
        ],
        respostas: {
            "contexto_sugado+formato_maiusculas+papel_astronauta+tarefa_buraco": {
                selo: "🏆 Prompt Nível Mestre", class: "badge-mestre",
                texto: "SOCORRO!! UM BURACO NEGRO É UMA REGIÃO DO ESPAÇO ONDE A GRAVIDADE É TÃO FORTE QUE NEM A LUZ ESCAPA!! A ESTRELA COLAPSOU E AGORA EU TÔ SENDO ESTICADO COMO UM ESPAGUETE!! AAAAAAH, MINHAS PERNAS JÁ PASSARAM DO HORIZONTE DE EVENTOS!! 🌌🚀😱"
            },
            "tarefa_buraco": {
                selo: "⚠️ Prompt Vago", class: "badge-vago",
                texto: "Um buraco negro é uma região do espaço-tempo em que o campo gravitacional é tão intenso que nada pode escapar de dentro dele. A fronteira dessa região é chamada de horizonte de eventos."
            },
            "papel_cientista+contexto_sugado+tarefa_buraco": { 
                selo: "😵 Inconsistência", class: "badge-alucinacao",
                texto: "Bem, conforme a relatividade geral, estou atravessando a singularidade e... francamente, a dilatação temporal é fascinante. Embora meu corpo esteja sendo desintegrado, devo notar que a equação de Schwarzschild se comprova impecável. Que incômodo científico..."
            },
            "papel_astronauta+tarefa_pneu+formato_maiusculas": {
                selo: "❌ Alucinação Espacial", class: "badge-alucinacao",
                texto: "HOUSTON, TEMOS UM PROBLEMA! O PNEU DO ROVER FUROU EM MARTE! PEGUEM O MACACO HIDRÁULICO, RETIREM AS PORCAS E... ESPERA, NÃO TEM GRAVIDADE DIREITO AQUI! O PNEU TÁ FLUTUANDO! 🛸🔧"
            },
            "default": {
                selo: "❓ Combinação Genérica", class: "badge-vago",
                texto: "Comando não reconhecido pela nave. Parece que você pediu para um físico trocar um pneu no espaço ou algo assim. Tente arrastar as cartas certas para a missão de astronomia!"
            }
        }
    }
    // Para adicionar mais missões, basta criar "missao_x" aqui seguindo a mesma estrutura.
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