// A BASE DE CONHECIMENTO LOCAL (O Cérebro da Quinta)
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
        keywords: ['vinho', 'prova', 'adega', 'comprar vinho'],
        response: "As provas de vinho guiadas pela nossa Sommelier ocorrem todos os dias às 15 horas. Pode também pedir a nossa carta de vinhos no restaurante ou através do serviço de quartos."
    },
    {
        keywords: ['piscina', 'toalha', 'nadar', 'spa', 'massagem'],
        response: "A piscina exterior está aberta até às 20 horas. As toalhas encontram-se disponíveis no seu quarto. Para o Spa de Vinoterapia, recomendamos a marcação prévia na receção."
    },
    {
        keywords: ['check-out', 'sair', 'partida', 'horas de saída'],
        response: "O check-out deve ser efetuado até às 12 horas. Se necessitar de um late check-out, por favor consulte a disponibilidade junto da nossa equipa."
    }
];

const respostaPadrao = "Compreendo. Para questões muito específicas, sugiro que contacte a nossa equipa da receção, que terá todo o gosto em prestar um acompanhamento personalizado.";

// Elementos da UI
const orb = document.getElementById('orb');
const responseText = document.getElementById('ai-response');
const inputField = document.getElementById('user-input');
const btnSend = document.getElementById('btn-send');
const btnMic = document.getElementById('btn-mic');

// Função principal de processamento de texto
function processarPergunta(pergunta) {
    const pNormalizada = pergunta.toLowerCase();
    let respostaEncontrada = respostaPadrao;

    // Procura no "Cérebro" a melhor correspondência
    for (let i = 0; i < brain.length; i++) {
        const match = brain[i].keywords.some(kw => pNormalizada.includes(kw));
        if (match) {
            respostaEncontrada = brain[i].response;
            break; // Para no primeiro que encontrar
        }
    }

    exibirEFalar(respostaEncontrada);
}

// Anima a UI e Sintetiza a Voz
function exibirEFalar(texto) {
    responseText.classList.remove('typing');
    responseText.innerText = `"${texto}"`;
    inputField.value = '';

    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Pára falas anteriores
        let utter = new SpeechSynthesisUtterance(texto);
        utter.lang = 'pt-PT';
        utter.pitch = 1.0;
        utter.rate = 1.0;
        
        let voices = window.speechSynthesis.getVoices();
        let v = voices.find(vo => vo.lang === 'pt-PT' && (vo.name.includes('Female') || vo.name.includes('Raquel') || vo.name.includes('Joana')));
        if(!v) v = voices.find(vo => vo.lang.includes('pt'));
        if(v) utter.voice = v;
        
        window.speechSynthesis.speak(utter);
    }
}

// Interação por Texto
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

// Interação por Chips (Atalhos rápidos)
window.askDirect = function(keyword) {
    responseText.classList.add('typing');
    responseText.innerText = "A consultar dados da quinta...";
    setTimeout(() => processarPergunta(keyword), 400);
};

// RECONHECIMENTO DE VOZ (O Ouvido do Jarvis)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-PT';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
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
    };

    recognition.onerror = () => {
        btnMic.classList.remove('recording');
        orb.classList.remove('listening');
        inputField.placeholder = "Não percebi. Tente escrever.";
    };

    btnMic.addEventListener('click', () => {
        window.speechSynthesis.cancel();
        recognition.start();
    });
} else {
    btnMic.style.display = 'none'; // Esconde o microfone se o browser não suportar
}

// Carregar vozes do sistema
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}
