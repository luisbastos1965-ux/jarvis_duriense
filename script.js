// A BASE DE CONHECIMENTO LOCAL
const brain = [
    {
        keywords: ['wi-fi', 'wifi', 'internet', 'rede', 'password', 'senha'],
        response: "A password da nossa rede Wi-Fi é: Paraiso2026. A rede chama-se Quinta do Paraíso Hóspedes."
    },
    {
        keywords: ['pequeno-almoço', 'pequeno almoço', 'café da manhã', 'comer de manhã'],
        response: "O nosso pequeno-almoço regional é servido no terraço do restaurante entre as 8h00 e as 10h30 da manhã."
    },
    {
        keywords: ['receção', 'recepção', 'falar com alguém', 'emergência', 'ajuda'],
        response: "A nossa receção está disponível 24 horas. Pode dirigir-se ao edifício principal ou ligar o número 9 diretamente do telefone do seu quarto."
    },
    {
        keywords: ['farmácia', 'remédio', 'medicamento', 'dor de cabeça', 'hospital'],
        response: "A farmácia mais próxima fica no centro de Vila Nova de Foz Côa, a cerca de 15 minutos de carro. Em caso de necessidade urgente, temos um kit de primeiros socorros na receção."
    },
    {
        keywords: ['restaurante', 'jantar', 'almoço', 'fome', 'comida'],
        response: "O nosso restaurante de autor está aberto das 12h30 às 15h00 para almoço, e das 19h30 às 22h30 para jantar. Recomendamos marcação antecipada."
    },
    {
        keywords: ['atividades', 'vinho', 'prova', 'adega', 'passeio', 'barco'],
        response: "Temos provas de vinho diárias às 15h, passeios de barco no rio Douro e passeios de jipe pelas vinhas. Qual a atividade que gostaria de reservar?"
    },
    {
        keywords: ['piscina', 'toalha', 'nadar', 'spa', 'massagem'],
        response: "A piscina exterior está aberta até às 20 horas. Para o nosso Spa de Vinoterapia, recomendamos que fale com a receção para agendar o seu tratamento."
    },
    {
        keywords: ['check-out', 'sair', 'partida', 'horas de saída'],
        response: "O check-out deve ser efetuado até às 12 horas. Se necessitar de um late check-out, por favor consulte a disponibilidade junto da nossa equipa."
    }
];

const respostaPadrao = "Compreendo. Para essa questão muito específica, sugiro que contacte a nossa receção carregando no botão abaixo, a nossa equipa terá todo o gosto em ajudar.";

// ELEMENTOS DA UI
const orb = document.getElementById('orb');
const uiElements = document.getElementById('ui-elements');
const responseText = document.getElementById('ai-response');
const inputField = document.getElementById('user-input');
const btnSend = document.getElementById('btn-send');
const btnMic = document.getElementById('btn-mic');
const btnTopics = document.getElementById('btn-topics');
const topicsList = document.getElementById('topics-list');

// ----------------------------------------------------
// SISTEMA DE 5 SEGUNDOS (UI ESCONDIDA)
// ----------------------------------------------------
let inactivityTimer;

function startTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        uiElements.classList.add('hidden');
        topicsList.classList.add('hidden');
    }, 5000);
}

function stopTimer() {
    clearTimeout(inactivityTimer);
}

// Qualquer interação com a app reinicia o temporizador
document.body.addEventListener('click', startTimer);
document.body.addEventListener('touchstart', startTimer);

// Se o utilizador estiver a escrever, não fechamos a interface
inputField.addEventListener('focus', stopTimer);
inputField.addEventListener('blur', startTimer);
inputField.addEventListener('input', startTimer);

// Clique na Orbe revela a UI
orb.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede que o clique na orbe ative o timer geral instantaneamente
    uiElements.classList.remove('hidden');
    responseText.innerText = "Olá. Bem-vindo à Quinta do Paraíso. Sou o seu assistente pessoal. Em que posso ajudar?";
    startTimer();
});

// Botão de Tópicos Rápidos (Expande/Recolhe)
btnTopics.addEventListener('click', () => {
    topicsList.classList.toggle('hidden');
    startTimer();
});

// Inicia com a app pronta mas escondida no timer (apenas orbe visível se passarem 5s)
startTimer();


// ----------------------------------------------------
// LÓGICA DA INTELIGÊNCIA ARTIFICIAL
// ----------------------------------------------------
function processarPergunta(pergunta) {
    const pNormalizada = pergunta.toLowerCase();
    let respostaEncontrada = respostaPadrao;

    for (let i = 0; i < brain.length; i++) {
        const match = brain[i].keywords.some(kw => pNormalizada.includes(kw));
        if (match) {
            respostaEncontrada = brain[i].response;
            break;
        }
    }

    exibirEFalar(respostaEncontrada);
}

function exibirEFalar(texto) {
    responseText.classList.remove('typing');
    responseText.innerText = `"${texto}"`;
    inputField.value = '';

    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        let utter = new SpeechSynthesisUtterance(texto);
        utter.lang = 'pt-PT';
        
        let voices = window.speechSynthesis.getVoices();
        let v = voices.find(vo => vo.lang === 'pt-PT' && (vo.name.includes('Female') || vo.name.includes('Raquel') || vo.name.includes('Joana')));
        if(!v) v = voices.find(vo => vo.lang.includes('pt'));
        if(v) utter.voice = v;
        
        window.speechSynthesis.speak(utter);
    }
    startTimer(); // Após falar, recomeça os 5 segundos
}

btnSend.addEventListener('click', () => {
    if (inputField.value.trim() !== '') {
        responseText.classList.add('typing');
        responseText.innerText = "A processar...";
        setTimeout(() => processarPergunta(inputField.value), 600);
    }
});

inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btnSend.click();
});

window.askDirect = function(keyword) {
    responseText.classList.add('typing');
    responseText.innerText = "A consultar dados...";
    setTimeout(() => processarPergunta(keyword), 400);
    startTimer();
};

// ----------------------------------------------------
// RECONHECIMENTO DE VOZ
// ----------------------------------------------------
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-PT';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
        stopTimer(); // Não esconder enquanto o cliente fala
        btnMic.classList.add('recording');
        orb.classList.add('listening');
        inputField.placeholder = "A ouvir...";
    };

    recognition.onresult = (event) => {
        const transcricao = event.results[0][0].transcript;
        inputField.value = transcricao;
        btnSend.click();
    };

    recognition.onspeechend = () => {
        btnMic.classList.remove('recording');
        orb.classList.remove('listening');
        inputField.placeholder = "Escreva ou fale connosco...";
        startTimer();
    };

    recognition.onerror = () => {
        btnMic.classList.remove('recording');
        orb.classList.remove('listening');
        inputField.placeholder = "Não percebi. Tente escrever.";
        startTimer();
    };

    btnMic.addEventListener('click', () => {
        window.speechSynthesis.cancel();
        recognition.start();
    });
} else {
    btnMic.style.display = 'none';
}

if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}
