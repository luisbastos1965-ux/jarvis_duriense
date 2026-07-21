// O SINTETIZADOR DE EFEITOS SONOROS
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
window.holdOsc = null;
window.holdGain = null;

function playSound(type) {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    
    if(type === 'activate') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.05);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.3);
    } else if(type === 'deactivate') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.3);
    } else if(type === 'holding_start') {
        window.holdOsc = audioCtx.createOscillator();
        window.holdGain = audioCtx.createGain();
        window.holdOsc.connect(window.holdGain);
        window.holdGain.connect(audioCtx.destination);
        
        window.holdOsc.type = 'sine';
        window.holdOsc.frequency.setValueAtTime(300, audioCtx.currentTime);
        window.holdOsc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.8);
        
        window.holdGain.gain.setValueAtTime(0, audioCtx.currentTime);
        window.holdGain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.4);
        
        window.holdOsc.start(audioCtx.currentTime);
    } else if(type === 'holding_stop') {
        if(window.holdGain && window.holdOsc) {
            window.holdGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);
            window.holdOsc.stop(audioCtx.currentTime + 0.2);
            window.holdGain = null;
            window.holdOsc = null;
        }
    }
}

// GESTÃO DE MÚSICA DE FUNDO
const bgmGarrafeira = new Audio('garrafeira.mp3');
bgmGarrafeira.loop = true;
const bgmAcademia = new Audio('academia.mp3');
bgmAcademia.loop = true;

// ==============================================================================
// GESTÃO DOS TUTORIAIS (PWA E PRIMEIRA VIAGEM)
// ==============================================================================
window.addEventListener('DOMContentLoaded', () => {
    // Verifica se a App está a correr em Standalone (PWA Instalada)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    
    if (!isStandalone) {
        // Bloqueia no browser e exige instalação
        document.getElementById('install-overlay').style.display = 'flex';
        
        // Verifica sistema operativo para dar as instruções certas
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if(isIOS) {
            document.getElementById('tut-ios').style.display = 'block';
        } else {
            document.getElementById('tut-android').style.display = 'block';
        }
    } else {
        // App está instalada. Verifica se é a primeira vez
        const tutSeen = localStorage.getItem('qp_tut_seen');
        if (!tutSeen) {
            document.getElementById('welcome-tutorial-overlay').style.display = 'flex';
        } else {
            startTimer();
        }
    }
});

window.startAppTutorial = function() {
    localStorage.setItem('qp_tut_seen', 'true');
    document.getElementById('welcome-tutorial-overlay').style.display = 'none';
    startTimer();
};

// ==============================================================================
// O "SUPER CÉREBRO" 
// ==============================================================================
const langData = {
    pt: {
        morning: "Bom dia.", afternoon: "Boa tarde.", evening: "Boa noite.",
        welcome: "Bem-vindo à Quinta do Paraíso. Sou a sua Inteligência Artificial pessoal. Em que posso ajudar?",
        shortGreeting: "Estou a ouvir. Qual é a sua questão?",
        placeholder: "Escreva ou fale connosco...",
        listening: "A ouvir a sua voz...",
        processing: "A analisar dados...",
        notUnderstood: "Não consegui processar. Pode reformular?",
        topicsBtn: "Tópicos Rápidos ⚡",
        catStay: "Alojamento", catExp: "Experiências", catHelp: "Assistência",
        chips: { wifi: "🔑 Wi-Fi", breakfast: "☕ Pequeno-almoço", reception: "🛎️ Receção", restaurant: "🍽️ Restaurante", activities: "🍇 Atividades", pool: "🏊 Piscina", checkout: "📅 Check-out", pharmacy: "💊 Farmácia", spa: "🧖‍♀️ Spa", transport: "🚕 Transportes" },
        defaultResp: "A minha base de dados não encontrou uma resposta exata. Sugiro que contacte a nossa receção através dos tópicos rápidos.",
        voiceLang: "pt-PT",
        brain: [
            { k: ['criador', 'criadora', 'quem te criou', 'projeto', 'pap', 'sara reis', 'quem és tu'], r: "Eu sou o Cérebro Digital da Quinta do Paraíso. Fui desenvolvida pela Sara Reis, no âmbito da sua Prova de Aptidão Profissional. Um projeto feito com muita dedicação e tecnologia." },
            { k: ['calor', 'sol', 'quente', 'temperatura', 'verão', 'pôr do sol', 'clima'], r: "Com o magnífico calor do Douro, a minha lógica sugere um mergulho na nossa piscina panorâmica acompanhado de um copo de Tavedo Rosé bem fresco." },
            { k: ['chuva', 'chover', 'frio', 'inverno', 'mau tempo'], r: "Para dias de chuva, sugerimos uma prova de vinhos abrigada na nossa adega secular, seguida de uma sessão relaxante no Spa de Vinoterapia." },
            { k: ['cansaço', 'cansado', 'relaxar', 'massagem', 'stress', 'spa', 'dor', 'sauna', 'jacuzzi', 'bem-estar'], r: "O nosso Spa de Vinoterapia utiliza as propriedades antioxidantes das nossas uvas para um relaxamento profundo. Solicite a nossa carta de tratamentos na receção." },
            { k: ['restaurante', 'jantar', 'almoço', 'fome', 'comida', 'menu', 'pratos'], r: "O nosso restaurante de fusão está à sua disposição. O almoço é das 12h30 às 15h00 e o jantar das 19h30 às 22h30. Aconselhamos reserva." },
            { k: ['vegan', 'vegetariano', 'glúten', 'alergia', 'dieta', 'intolerância'], r: "A nossa cozinha é totalmente adaptável. O Chef prepara refeições sem glúten, vegan ou ajustadas a alergias. Basta informar-nos." },
            { k: ['crianças', 'filhos', 'bebé', 'berço', 'brincar', 'jogar', 'infantil'], r: "Disponibilizamos berços e camas extra. As crianças adoram a 'Academia da Vinha' no nosso site, e o Chef prepara menus infantis especiais." },
            { k: ['atrações', 'visitar', 'foz côa', 'museu', 'redondezas', 'passear'], r: "Recomendo o Parque Arqueológico do Vale do Côa, os miradouros locais e as Aldeias Vinhateiras. O Concierge pode desenhar um mapa personalizado." },
            { k: ['wi-fi', 'wifi', 'internet', 'rede', 'password', 'senha'], r: "A password da nossa rede Wi-Fi de alta velocidade é: Paraiso2026. Ligue-se à rede 'Quinta do Paraíso Hóspedes'." },
            { k: ['pequeno-almoço', 'café da manhã', 'pequeno almoço'], r: "O pequeno-almoço com produtos regionais é servido no terraço com vista para o rio, todas as manhãs entre as 8h00 e as 10h30." },
            { k: ['receção', 'recepção', 'emergência', 'ajuda', 'urgente', 'problema', 'regras'], r: "A nossa receção e segurança funcionam 24 horas por dia. Dirija-se ao edifício principal ou marque 9 no seu telefone." },
            { k: ['farmácia', 'remédio', 'medicamento', 'hospital', 'doente'], r: "A farmácia e o hospital mais próximos ficam no centro de Foz Côa, a 15 minutos de carro. Dispomos de kit de primeiros socorros na receção." },
            { k: ['atividades', 'barco', 'jipe', 'caminhada', 'trilhos', 'bicicleta', 'cruzeiro'], r: "Explore a região através dos nossos passeios de jipe, cruzeiros no Barco Rabelo, ou trilhos a pé. Fale com a receção para agendar." },
            { k: ['vinho', 'prova', 'adega', 'degustação', 'enólogo', 'castas', 'vindimas', 'porto'], r: "Produzimos vinhos DOC e Vinho do Porto. Temos visitas à adega e provas comentadas diariamente às 15h00." },
            { k: ['piscina', 'nadar', 'mergulho'], r: "A nossa piscina panorâmica exterior está aberta até às 20 horas. Tem toalhas exclusivas no seu quarto." },
            { k: ['check-out', 'check in', 'check-in', 'sair', 'partida', 'horas', 'pagar', 'fatura'], r: "O check-in faz-se a partir das 15h e o check-out até às 12h. Para faturas ou pedir late check-out, a receção está disponível." },
            { k: ['sustentabilidade', 'ecológico', 'ambiente', 'solar', 'verde', 'natureza'], r: "A Quinta orgulha-se de usar energia 100% solar e proteger a fauna local. A nossa agricultura respeita o ecossistema do Douro." },
            { k: ['história', 'família', 'origem', 'antigo', 'fundação'], r: "As raízes desta quinta estendem-se por 12 gerações. Os socalcos que vê foram moldados à mão pelos nossos antepassados." },
            { k: ['animais', 'cão', 'gato', 'pet', 'pet-friendly', 'animal'], r: "Somos orgulhosamente pet-friendly! O seu companheiro de quatro patas tem à sua espera comedouros e uma cama confortável." },
            { k: ['quarto', 'limpeza', 'toalhas', 'housekeeping', 'sujo', 'televisão', 'ar condicionado', 'lavandaria'], r: "O Housekeeping limpa de manhã. Temos lavandaria e serviço de quartos 24h; marque 9 para qualquer pedido." },
            { k: ['transporte', 'táxi', 'transfer', 'aeroporto', 'comboio', 'pinhão', 'estacionamento', 'carro'], r: "Temos parque gratuito com postos elétricos. Se precisar de táxi ou transfer para o aeroporto ou estação, a receção tratará de tudo." },
            { k: ['eventos', 'casamento', 'romântico', 'lua de mel', 'piquenique', 'reunião', 'aniversário'], r: "Preparamos momentos inesquecíveis: piqueniques românticos, aniversários ou eventos privados. O Concierge fará um plano à medida." },
            { k: ['comprar', 'loja', 'garrafa', 'levar vinho', 'encomendar'], r: "Pode adquirir os nossos vinhos e azeite na nossa loja física. Também efetuamos envios internacionais para sua casa." },
            { k: ['obrigado', 'obrigada', 'agradeço', 'valeu', 'excelente'], r: "De nada! É um enorme privilégio ter-vos na Quinta do Paraíso. Estou sempre aqui se precisarem." }
        ]
    }
};

let currentLang = localStorage.getItem('qpLang') || 'pt';
let inactivityTimer;
let isSpeaking = false; 
let hasGreeted = false; 
let voicesLoaded = false;

const body = document.body;
const orb = document.getElementById('orb');
const responseText = document.getElementById('ai-response');
const inputField = document.getElementById('user-input');
const btnSend = document.getElementById('btn-send');
const btnMic = document.getElementById('btn-mic');
const btnTopics = document.getElementById('btn-topics');
const topicsList = document.getElementById('topics-list');
const langSelect = document.getElementById('lang-select');

langSelect.value = currentLang;
updateLanguageUI();

langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('qpLang', currentLang);
    updateLanguageUI();
});

function updateLanguageUI() {
    const d = langData[currentLang];
    if(d) {
        inputField.placeholder = d.placeholder;
        btnTopics.innerText = d.topicsBtn;
        document.getElementById('cat-stay').innerText = d.catStay;
        document.getElementById('cat-exp').innerText = d.catExp;
        document.getElementById('cat-help').innerText = d.catHelp;
        document.getElementById('chip-wifi').innerHTML = d.chips.wifi;
        document.getElementById('chip-breakfast').innerHTML = d.chips.breakfast;
        document.getElementById('chip-reception').innerHTML = d.chips.reception;
        document.getElementById('chip-restaurant').innerHTML = d.chips.restaurant;
        document.getElementById('chip-activities').innerHTML = d.chips.activities;
        document.getElementById('chip-pool').innerHTML = d.chips.pool;
        document.getElementById('chip-checkout').innerHTML = d.chips.checkout;
        document.getElementById('chip-pharmacy').innerHTML = d.chips.pharmacy;
        document.getElementById('chip-spa').innerHTML = d.chips.spa;
        document.getElementById('chip-transport').innerHTML = d.chips.transport;
    }
}

if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => { voicesLoaded = true; };
}
function warmUpSpeech() {
    if ('speechSynthesis' in window) {
        let msg = new SpeechSynthesisUtterance('');
        msg.volume = 0; 
        window.speechSynthesis.speak(msg);
        document.body.removeEventListener('click', warmUpSpeech);
        document.body.removeEventListener('touchstart', warmUpSpeech);
    }
}
document.body.addEventListener('click', warmUpSpeech);
document.body.addEventListener('touchstart', warmUpSpeech);

function startTimer() {
    clearTimeout(inactivityTimer);
    if (isSpeaking) return; 
    
    inactivityTimer = setTimeout(() => {
        if (!body.classList.contains('idle')) {
            playSound('deactivate');
            body.classList.add('idle');
            topicsList.classList.add('hidden');
        }
    }, 5000);
}

function stopTimer() {
    clearTimeout(inactivityTimer);
}

document.body.addEventListener('click', startTimer);
document.body.addEventListener('touchstart', startTimer);
inputField.addEventListener('focus', stopTimer);
inputField.addEventListener('blur', startTimer);
inputField.addEventListener('input', startTimer);

// ==============================================================================
// LÓGICA DO EASTER EGG (LONG PRESS)
// ==============================================================================
let pressTimer;
let isLongPress = false;

orb.addEventListener('touchstart', startPress, {passive: true});
orb.addEventListener('touchend', endPress);
orb.addEventListener('mousedown', startPress);
orb.addEventListener('mouseup', endPress);
orb.addEventListener('mouseleave', cancelPress);

function startPress(e) {
    isLongPress = false;
    orb.classList.add('holding');
    playSound('holding_start');
    pressTimer = setTimeout(() => {
        isLongPress = true;
        orb.classList.remove('holding');
        if(body.classList.contains('idle')) {
            if(navigator.vibrate) navigator.vibrate(100);
            openSecretMenu();
        }
    }, 800);
}

function endPress(e) {
    clearTimeout(pressTimer);
    orb.classList.remove('holding');
    playSound('holding_stop');
}

function cancelPress(e) {
    clearTimeout(pressTimer);
    orb.classList.remove('holding');
    playSound('holding_stop');
}

orb.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if(isLongPress) return; 
    
    const wasIdle = body.classList.contains('idle');
    body.classList.remove('idle');
    
    if (wasIdle) {
        playSound('activate');
        if (navigator.vibrate) navigator.vibrate(50);
        
        const d = langData[currentLang];
        if (!hasGreeted) {
            const h = new Date().getHours();
            let saudacaoTempo = d.morning;
            if (h >= 12 && h < 20) saudacaoTempo = d.afternoon;
            else if (h >= 20 || h < 6) saudacaoTempo = d.evening;
            
            const msg = saudacaoTempo + " " + d.welcome;
            hasGreeted = true; 
            exibirEFalar(msg);
        } else {
            exibirEFalar(d.shortGreeting);
        }
    } else {
        startTimer();
    }
});

btnTopics.addEventListener('click', () => {
    topicsList.classList.toggle('hidden');
    startTimer();
});

function processarPergunta(keywordOrPhrase) {
    const d = langData[currentLang];
    const pNormalizada = keywordOrPhrase.toLowerCase();
    let respostaEncontrada = d.defaultResp;

    if (d.brain) {
        for (let i = 0; i < d.brain.length; i++) {
            const match = d.brain[i].k.some(kw => pNormalizada.includes(kw));
            if (match) {
                respostaEncontrada = d.brain[i].r;
                break;
            }
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
        utter.lang = langData[currentLang].voiceLang;
        
        let voices = window.speechSynthesis.getVoices();
        let v = voices.find(vo => vo.lang.includes(utter.lang.split('-')[0]) && (vo.name.includes('Female') || vo.name.includes('Raquel') || vo.name.includes('Joana')));
        if(!v) v = voices.find(vo => vo.lang.includes(utter.lang.split('-')[0]));
        if(v) utter.voice = v;
        
        utter.onstart = () => { isSpeaking = true; stopTimer(); orb.classList.add('listening'); };
        utter.onend = () => { isSpeaking = false; orb.classList.remove('listening'); startTimer(); };
        utter.onerror = () => { isSpeaking = false; orb.classList.remove('listening'); startTimer(); };

        window.speechSynthesis.speak(utter);
    } else {
        startTimer();
    }
}

btnSend.addEventListener('click', () => {
    if (inputField.value.trim() !== '') {
        responseText.classList.add('typing');
        responseText.innerText = langData[currentLang].processing;
        stopTimer(); 
        setTimeout(() => processarPergunta(inputField.value), 600);
    }
});

inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btnSend.click();
});

window.askDirect = function(keyword) {
    responseText.classList.add('typing');
    responseText.innerText = langData[currentLang].processing;
    stopTimer();
    topicsList.classList.add('hidden'); 
    setTimeout(() => { processarPergunta(keyword); }, 400);
};

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
        stopTimer(); 
        btnMic.classList.add('recording');
        orb.classList.add('listening');
        inputField.placeholder = langData[currentLang].listening;
    };

    recognition.onresult = (event) => {
        const transcricao = event.results[0][0].transcript;
        inputField.value = transcricao;
        btnSend.click();
    };

    recognition.onspeechend = () => {
        btnMic.classList.remove('recording');
        orb.classList.remove('listening');
        inputField.placeholder = langData[currentLang].placeholder;
        startTimer();
    };

    recognition.onerror = () => {
        btnMic.classList.remove('recording');
        orb.classList.remove('listening');
        inputField.placeholder = langData[currentLang].notUnderstood;
        startTimer();
    };

    btnMic.addEventListener('click', () => {
        window.speechSynthesis.cancel();
        if(navigator.vibrate) navigator.vibrate(50);
        recognition.lang = langData[currentLang].voiceLang;
        recognition.start();
    });
} else {
    btnMic.style.display = 'none';
}

// ==============================================================================
// MENUS SECRETOS E LÓGICAS MOBILE APP
// ==============================================================================
const mobileWines = [
    { id: 'w7', type: "Vinho do Porto", name: "Quinta do Paraíso Vintage", price: "85.00€", img: "Vinho7.png", link: "https://burmester.pt/vinhos/vintage-2018-quinta-do-arnozelo/", short: "Cor vermelho opaco. Notas de flor de laranjeira, cassis e frutos do bosque.", long: "O Vintage da Quinta do Arnozelo 2019 é elegante, floral, fresco. De cor vermelho opaco com laivos violetas, este Vintage marca por uma expressão aromática bastante floral e pelas notas de fruta tropical, onde se destacam as notas de flor de laranjeira, cassis, rosmaninho, frutos do bosque et ameixas. Com taninos bem marcados, tensos e musculados." },
    { id: 'w1', type: "Rosé", name: "Tavedo Rosé", price: "18.00€", img: "Vinho1.png", link: "https://burmester.pt/vinhos/tavedo-rose/", short: "Frescura imediata. Frutos vermelhos imiscuem-se com nuances mentoladas.", long: "De cor suave e apetecível, este rosé demonstra uma frescura imediata no nariz. As notas de frutos vermelhos de acidez elevada como groselha e framboesa imiscuem-se com nuances mentoladas. Na boca é equilibrado e guloso, conseguindo manter esse registo no tempo. Ideal para acompanhar sushi, pratos de peixe e saladas." },
    { id: 'w2', type: "Branco", name: "Branco Clássico", price: "22.50€", img: "Vinho2.png", link: "https://burmester.pt/vinhos/burmester-branco/", short: "Elegância pautada pela frescura das notas cítricas envoltas em ervas frescas.", long: "De aroma elegante e frutado, este é um vinho que nos suscita desde logo a curiosidade. A elegância do nariz é pautada pela frescura das notas cítricas envoltas num conjunto de ervas frescas. Envolvente na prova de boca, este é um vinho que se revela guloso e fresco." },
    { id: 'w3', type: "Branco Reserva", name: "Casa Branco", price: "35.00€", img: "Vinho3.png", link: "https://burmester.pt/vinhos/casa-burmester-branco/", short: "Cativa pela fruta amarela e ervas frescas. Vibrante, cheio no corpo.", long: "Um Reserva de grande elegância e carácter, que cativa pelas notas a fruta amarela e ervas aromáticas frescas. Vibrante na frescura, cheio no corpo, pleno de garra, revela ligeiras notas fumadas que realçam a sua complexidade. Um vinho bem estruturado com um final longo e muito refrescante." },
    { id: 'w4', type: "Tinto Reserva", name: "Touriga Nacional", price: "45.00€", img: "Vinho4.png", link: "https://burmester.pt/vinhos/casa-burmester-touriga-nacional-2018/", short: "Apresenta delicadas notas florais envolvidas pela exuberância de fruta preta.", long: "Concentrado e pleno de frescura, apresenta delicadas notas florais envolvidas pela exuberância de fruta preta. Um conjunto elegante, marcado pelos taninos maduros e redondos, demonstrando um excelente volume em boca que se prolonga no tempo. Um vinho que cativa pela persistência e cremosidade." },
    { id: 'w5', type: "Tinto", name: "Casa Tinto", price: "28.00€", img: "Vinho5.png", link: "https://burmester.pt/vinhos/casa-burmester-tinto/", short: "A fruta preta sobressai num fundo de especiarias. Textura aveludada.", long: "Nariz profundo e denso, onde a fruta preta sobressai num fundo de leves notas de especiarias. Barrica muito fina e bem integrada, fazendo sobressair a frescura do bouquet. Boca estruturada revelando uma textura elegante e aveludada com a fruta bem presente. Termina longo e recheado de pormenores sedutores." },
    { id: 'w6', type: "Vinho do Porto", name: "Tawny Clássico", price: "32.00€", img: "Vinho6.png", link: "https://burmester.pt/vinhos/burmester-tawny-port/", short: "Cor castanha-aloirada. Fruta madura com sedutoras nuances abaunilhadas.", long: "Castas tradicionais do Douro. Brilhante cor castanha-aloirada. Nariz repleto de fruta madura com sedutoras nuances abaunilhadas. No palato mostra uma apetitosa frescura e um pronunciado caráter frutado. Aveludado, redondo e de notável envolvência." }
];

function openSecretMenu() {
    stopTimer();
    document.getElementById('secret-menu').classList.add('active');
}

function closeOverlays() {
    document.querySelectorAll('.full-screen-overlay').forEach(el => el.classList.remove('active'));
    bgmGarrafeira.pause(); bgmGarrafeira.currentTime = 0;
    bgmAcademia.pause(); bgmAcademia.currentTime = 0;
    startTimer();
}

window.flipMobileWineCard = function(card) {
    document.querySelectorAll('.m-wine-card').forEach(c => {
        if(c !== card) c.classList.remove('flipped');
    });
    card.classList.toggle('flipped');
}

window.openGarrafeira = function() {
    bgmGarrafeira.play().catch(e=>console.log("Audio play impedido:", e));
    
    const container = document.getElementById('mobile-wines-container');
    container.innerHTML = ''; 

    mobileWines.forEach(w => {
        container.innerHTML += `
            <div class="m-wine-card" id="card-${w.id}" onclick="flipMobileWineCard(this)">
                <div class="m-wine-inner">
                    <div class="m-wine-front" ${w.id === 'w7' ? 'style="border-color:var(--accent-color);"' : ''}>
                        <div class="m-wine-type">${w.type}</div>
                        <h4 class="m-wine-name">${w.name}</h4>
                        <div class="m-wine-price">${w.price}</div>
                        <img src="${w.img}" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=${w.id}'">
                        <p style="font-size:0.8rem; color:#888; margin-top: auto; padding-top: 10px;">Toque para virar</p>
                    </div>
                    <div class="m-wine-back" ${w.id === 'w7' ? 'style="border-color:var(--accent-color);"' : ''}>
                        <h4 class="m-wine-name">${w.name}</h4>
                        <p class="m-wine-desc">${w.short}</p>
                        <div class="m-actions-wrap">
                            <button class="m-btn-buy" style="background:transparent; border:1px solid var(--accent-color); color:var(--accent-color);" onclick="event.stopPropagation(); showMobileWineDetail('${w.id}')">Informações</button>
                            <button class="m-btn-buy" onclick="event.stopPropagation(); window.open('${w.link}', '_blank')">Comprar Online</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('screen-garrafeira').classList.add('active');
}

window.showMobileWineDetail = function(id) {
    const w = mobileWines.find(wine => wine.id === id);
    if(!w) return;
    document.getElementById('m-wd-type').innerText = w.type;
    document.getElementById('m-wd-title').innerText = w.name;
    document.getElementById('m-wd-price').innerText = w.price;
    document.getElementById('m-wd-desc').innerText = w.long;
    document.getElementById('m-wd-img').src = w.img;
    document.getElementById('m-wd-buy').onclick = () => window.open(w.link, '_blank');
    
    document.getElementById('mobile-wine-detail').classList.add('active');
}

window.closeMobileWineDetail = function() {
    document.getElementById('mobile-wine-detail').classList.remove('active');
}

// ----------------------------------------------------
// ACADEMIA MOBILE
// ----------------------------------------------------
let mGameIntervals = [];
let mColheitaScore = 0;
let mLagarScore = 0;
let mFermProgress = 0;
let mTempPos = 10;
let mTimingPos = 0;
let mTimingDir = 1;

function clearMobileIntervals() {
    mGameIntervals.forEach(clearInterval);
    mGameIntervals = [];
}

window.openAcademia = function() {
    bgmAcademia.play().catch(e=>console.log("Audio play impedido:", e));
    resetMobileVindima();
    document.getElementById('screen-academia').classList.add('active');
}

window.advanceMobileVindima = function(stage) {
    clearMobileIntervals();
    document.querySelectorAll('.m-stage').forEach(el => el.classList.remove('active'));
    document.getElementById('m-vindima-' + stage).classList.add('active');
}

window.startMobileColheita = function() {
    document.getElementById('m-btn-start-1').style.display = 'none';
    mColheitaScore = 0;
    let container = document.getElementById('m-vine-container');
    
    let spawnGrape = setInterval(() => {
        let grape = document.createElement('span');
        grape.className = 'm-grape';
        grape.innerText = '🍇';
        grape.style.left = (Math.random() * 70 + 10) + '%';
        grape.style.top = (Math.random() * 60 + 10) + '%';
        
        grape.onclick = function() {
            if(navigator.vibrate) navigator.vibrate(20);
            this.remove();
            mColheitaScore++;
            document.getElementById('m-colheita-bar').style.width = (mColheitaScore * 20) + '%';
            if(mColheitaScore >= 5) {
                clearMobileIntervals();
                document.getElementById('m-btn-next-1').style.display = 'block';
            }
        };
        container.appendChild(grape);
        setTimeout(() => { if(container.contains(grape)) grape.remove(); }, 1200);
    }, 700);
    mGameIntervals.push(spawnGrape);
}

window.clickMobileLagar = function(e) {
    if(mLagarScore >= 20) return;
    if(navigator.vibrate) navigator.vibrate(20);
    mLagarScore++;
    document.getElementById('m-lagar-bar').style.width = (mLagarScore * 5) + '%';
    
    if(mLagarScore >= 20) {
        document.getElementById('m-btn-next-2').style.display = 'block';
    }
}

window.startMobileFermentation = function() {
    document.getElementById('m-btn-start-3').style.display = 'none';
    document.getElementById('m-btn-cool').style.display = 'block';
    mTempPos = 10; mFermProgress = 0;
    
    let fermInt = setInterval(() => {
        mTempPos += 4; 
        if(mTempPos > 100) mTempPos = 100;
        document.getElementById('m-temp-pointer').style.left = mTempPos + '%';
        
        if(mTempPos >= 40 && mTempPos <= 60) {
            mFermProgress += 5;
            document.getElementById('m-ferment-bar').style.width = mFermProgress + '%';
        } else if(mTempPos > 80) {
            mFermProgress -= 2; 
            if(mFermProgress < 0) mFermProgress = 0;
            document.getElementById('m-ferment-bar').style.width = mFermProgress + '%';
        }

        if(mFermProgress >= 100) {
            clearMobileIntervals();
            document.getElementById('m-btn-cool').style.display = 'none';
            document.getElementById('m-btn-next-3').style.display = 'block';
        }
    }, 150);
    mGameIntervals.push(fermInt);
}

window.coolMobileDown = function() {
    mTempPos -= 20;
    if(mTempPos < 0) mTempPos = 0;
    document.getElementById('m-temp-pointer').style.left = mTempPos + '%';
}

window.startMobileEstagio = function() {
    document.getElementById('m-btn-start-4').style.display = 'none';
    document.getElementById('m-btn-stop-4').style.display = 'block';
    mTimingPos = 0;
    
    let timeInt = setInterval(() => {
        mTimingPos += 4 * mTimingDir;
        if(mTimingPos >= 100 || mTimingPos <= 0) mTimingDir *= -1;
        document.getElementById('m-timing-cursor').style.left = mTimingPos + '%';
    }, 30);
    mGameIntervals.push(timeInt);
}

window.stopMobileEstagio = function() {
    clearMobileIntervals();
    if(mTimingPos >= 40 && mTimingPos <= 60) {
        if(navigator.vibrate) navigator.vibrate([50, 50, 50]);
        document.getElementById('m-btn-stop-4').style.display = 'none';
        document.getElementById('m-btn-next-4').style.display = 'block';
    } else {
        if(navigator.vibrate) navigator.vibrate(200);
        document.getElementById('m-game-over').classList.add('active');
    }
}

window.hideGameOverAndReset = function() {
    document.getElementById('m-game-over').classList.remove('active');
    resetMobileVindima();
}

window.resetMobileVindima = function() {
    clearMobileIntervals();
    mColheitaScore = 0; mLagarScore = 0; mFermProgress = 0; mTempPos = 10; mTimingPos = 0;
    
    document.getElementById('m-colheita-bar').style.width = '0%';
    document.getElementById('m-lagar-bar').style.width = '0%';
    document.getElementById('m-ferment-bar').style.width = '0%';
    
    document.getElementById('m-btn-start-1').style.display = 'block';
    document.getElementById('m-btn-next-1').style.display = 'none';
    
    document.getElementById('m-btn-next-2').style.display = 'none';
    
    document.getElementById('m-btn-start-3').style.display = 'block';
    document.getElementById('m-btn-cool').style.display = 'none';
    document.getElementById('m-btn-next-3').style.display = 'none';
    
    document.getElementById('m-btn-start-4').style.display = 'block';
    document.getElementById('m-btn-stop-4').style.display = 'none';
    document.getElementById('m-btn-next-4').style.display = 'none';
    
    document.getElementById('m-vine-container').innerHTML = '';
    
    document.querySelectorAll('.m-stage').forEach(el => el.classList.remove('active'));
    document.getElementById('m-vindima-1').classList.add('active');
}
