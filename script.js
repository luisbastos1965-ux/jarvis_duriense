// O SINTETIZADOR DE EFEITOS SONOROS
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if(type === 'activate') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.05);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.3);
    } else if(type === 'deactivate') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.3);
    }
}

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
            { k: ['criador', 'criadora', 'quem te criou', 'projeto', 'pap', 'sara reis', 'quem és tu'], r: "Eu sou o Cérebro Digital da Quinta do Paraíso. Fui desenvolvida pela Sara Reis, no âmbito da sua Prova de Aptidão Profissional." },
            { k: ['calor', 'sol', 'quente', 'temperatura', 'verão', 'pôr do sol', 'clima'], r: "Com o magnífico calor do Douro, a minha lógica sugere um mergulho na piscina panorâmica com um copo de Tavedo Rosé bem fresco." },
            { k: ['chuva', 'chover', 'frio', 'inverno', 'mau tempo'], r: "Para dias de chuva, sugerimos uma prova na nossa adega secular, seguida do nosso Spa de Vinoterapia." },
            { k: ['cansaço', 'cansado', 'relaxar', 'massagem', 'stress', 'spa', 'dor', 'sauna', 'jacuzzi', 'bem-estar'], r: "O Spa de Vinoterapia utiliza as propriedades antioxidantes das nossas uvas. Solicite a carta de tratamentos na receção." },
            { k: ['restaurante', 'jantar', 'almoço', 'fome', 'comida', 'menu', 'pratos'], r: "O almoço é das 12h30 às 15h00 e o jantar das 19h30 às 22h30. Aconselhamos reserva." },
            { k: ['vegan', 'vegetariano', 'glúten', 'alergia', 'dieta', 'intolerância'], r: "A nossa cozinha adapta-se sem problema. O Chef prepara opções sem glúten ou vegan. Basta informar-nos." },
            { k: ['crianças', 'filhos', 'bebé', 'berço', 'brincar', 'jogar', 'infantil'], r: "Disponibilizamos berços e camas extra. O Chef prepara menus infantis especiais." },
            { k: ['wi-fi', 'wifi', 'internet', 'rede', 'password', 'senha'], r: "A password da nossa rede Wi-Fi é: Paraiso2026. Ligue-se à rede 'Quinta do Paraíso Hóspedes'." },
            { k: ['pequeno-almoço', 'café da manhã'], r: "O pequeno-almoço é servido no terraço com vista para o rio, entre as 8h00 e as 10h30." },
            { k: ['receção', 'recepção', 'emergência', 'ajuda', 'urgente', 'problema', 'regras'], r: "A nossa receção e segurança funcionam 24 horas. Marque 9 no seu telefone do quarto." },
            { k: ['farmácia', 'remédio', 'medicamento', 'hospital', 'doente'], r: "A farmácia e o hospital ficam em Foz Côa (15 mins). Dispomos de kit de primeiros socorros na receção." },
            { k: ['atividades', 'barco', 'jipe', 'caminhada', 'trilhos', 'bicicleta'], r: "Temos passeios de jipe, cruzeiros no Barco Rabelo ou trilhos a pé. Fale com a receção." },
            { k: ['vinho', 'prova', 'adega', 'degustação', 'enólogo', 'castas', 'porto'], r: "Produzimos vinhos DOC e Vinho do Porto. Temos visitas à adega e provas comentadas diariamente às 15h00." },
            { k: ['piscina', 'nadar', 'mergulho'], r: "A piscina panorâmica exterior está aberta até às 20 horas. Tem toalhas exclusivas no quarto." },
            { k: ['check-out', 'check in', 'check-in', 'sair', 'partida', 'horas', 'fatura'], r: "O check-in é a partir das 15h e o check-out até às 12h. A receção está disponível para faturas." },
            { k: ['sustentabilidade', 'ecológico', 'ambiente', 'solar', 'verde', 'natureza'], r: "Usamos energia 100% solar e protegemos a fauna local. A nossa agricultura respeita o ecossistema." },
            { k: ['animais', 'cão', 'gato', 'pet', 'pet-friendly', 'animal'], r: "Somos pet-friendly! O seu companheiro de quatro patas tem à sua espera comedouros e cama confortável." },
            { k: ['quarto', 'limpeza', 'toalhas', 'housekeeping', 'sujo', 'televisão', 'lavandaria'], r: "O Housekeeping limpa de manhã. Temos serviço de quartos 24h; marque 9 para qualquer pedido." },
            { k: ['transporte', 'táxi', 'transfer', 'aeroporto', 'comboio', 'carro'], r: "Temos parque gratuito com postos elétricos. A receção trata de transfers e táxis." },
            { k: ['eventos', 'casamento', 'romântico', 'lua de mel', 'piquenique', 'aniversário'], r: "Preparamos piqueniques românticos ou aniversários. O nosso Concierge fará um plano à medida." },
            { k: ['comprar', 'loja', 'garrafa', 'levar vinho', 'encomendar'], r: "Pode adquirir os nossos vinhos na loja física. Também efetuamos envios internacionais." },
            { k: ['obrigado', 'obrigada', 'agradeço', 'excelente'], r: "De nada! É um enorme privilégio ter-vos na Quinta do Paraíso. Estou sempre aqui se precisarem." }
        ]
    },
    // Removi as restantes línguas do "cérebro" por limite de espaço aqui (podes reintegrar se quiseres, o motor está pronto)
    en: { placeholder: "Type or speak...", listening: "Listening...", processing: "Processing...", notUnderstood: "Can you rephrase?", topicsBtn: "Quick Topics ⚡", catStay: "Stay", catExp: "Experiences", catHelp: "Help", chips: { wifi: "🔑 Wi-Fi", breakfast: "☕ Breakfast", reception: "🛎️ Reception", restaurant: "🍽️ Restaurant", activities: "🍇 Activities", pool: "🏊 Pool", checkout: "📅 Check-out", pharmacy: "💊 Pharmacy", spa: "🧖‍♀️ Spa", transport: "🚕 Transport" }, defaultResp: "Please contact reception.", voiceLang: "en-GB", brain: [] },
    es: { placeholder: "Escribe o habla...", listening: "Escuchando...", processing: "Procesando...", notUnderstood: "¿Puedes reformular?", topicsBtn: "Temas Rápidos ⚡", catStay: "Alojamiento", catExp: "Experiencias", catHelp: "Asistencia", chips: { wifi: "🔑 Wi-Fi", breakfast: "☕ Desayuno", reception: "🛎️ Recepción", restaurant: "🍽️ Restaurante", activities: "🍇 Actividades", pool: "🏊 Piscina", checkout: "📅 Salida", pharmacy: "💊 Farmacia", spa: "🧖‍♀️ Spa", transport: "🚕 Transporte" }, defaultResp: "Por favor contacta recepción.", voiceLang: "es-ES", brain: [] },
    fr: { placeholder: "Écrivez ou parlez...", listening: "J'écoute...", processing: "Analyse...", notUnderstood: "Pouvez-vous reformuler?", topicsBtn: "Sujets Rapides ⚡", catStay: "Hébergement", catExp: "Expériences", catHelp: "Assistance", chips: { wifi: "🔑 Wi-Fi", breakfast: "☕ Petit-déj", reception: "🛎️ Réception", restaurant: "🍽️ Restaurant", activities: "🍇 Activités", pool: "🏊 Piscine", checkout: "📅 Départ", pharmacy: "💊 Pharmacie", spa: "🧖‍♀️ Spa", transport: "🚕 Transport" }, defaultResp: "Veuillez contacter la réception.", voiceLang: "fr-FR", brain: [] },
    de: { placeholder: "Tippen oder sprechen...", listening: "Höre...", processing: "Analysiere...", notUnderstood: "Bitte umformulieren?", topicsBtn: "Schnelle Themen ⚡", catStay: "Unterkunft", catExp: "Erlebnisse", catHelp: "Hilfe", chips: { wifi: "🔑 WLAN", breakfast: "☕ Frühstück", reception: "🛎️ Rezeption", restaurant: "🍽️ Restaurant", activities: "🍇 Aktivitäten", pool: "🏊 Pool", checkout: "📅 Check-out", pharmacy: "💊 Apotheke", spa: "🧖‍♀️ Spa", transport: "🚕 Transport" }, defaultResp: "Bitte kontaktieren Sie die Rezeption.", voiceLang: "de-DE", brain: [] }
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

// Inicializa a UI
langSelect.value = currentLang;
updateLanguageUI();

langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('qpLang', currentLang);
    updateLanguageUI();
});

function updateLanguageUI() {
    const d = langData[currentLang];
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
}

function cancelPress(e) {
    clearTimeout(pressTimer);
    orb.classList.remove('holding');
}

orb.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if(isLongPress) return; // Aborta o click normal se for Long Press
    
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

startTimer();

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
    
    setTimeout(() => {
        processarPergunta(keyword);
    }, 400);
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
// MENUS SECRETOS E MOBILE APPS
// ==============================================================================
const mobileWines = [
    { id: 'w7', type: "Vinho do Porto", name: "Quinta do Paraíso Vintage", price: "85.00€", img: "Vinho7.png", link: "https://burmester.pt/vinhos/vintage-2018-quinta-do-arnozelo/", desc: "Produção extremamente limitada para os verdadeiros apreciadores. Notas de flor de laranjeira, cassis e frutos do bosque. A joia da nossa coroa." },
    { id: 'w1', type: "Rosé", name: "Tavedo Rosé", price: "18.00€", img: "Vinho1.png", link: "https://burmester.pt/vinhos/tavedo-rose/", desc: "De cor suave e apetecível, demonstra uma frescura imediata. Frutos vermelhos imiscuem-se com nuances mentoladas." },
    { id: 'w2', type: "Branco", name: "Branco Clássico", price: "22.50€", img: "Vinho2.png", link: "https://burmester.pt/vinhos/burmester-branco/", desc: "Aroma elegante e frutado. A elegância do nariz é pautada pela frescura das notas cítricas envoltas em ervas frescas." },
    { id: 'w3', type: "Branco Reserva", name: "Casa Branco", price: "35.00€", img: "Vinho3.png", link: "https://burmester.pt/vinhos/casa-burmester-branco/", desc: "Reserva de grande elegância, cativa pela fruta amarela e ervas frescas. Vibrante, cheio no corpo e pleno de garra." },
    { id: 'w4', type: "Tinto Reserva", name: "Touriga Nacional", price: "45.00€", img: "Vinho4.png", link: "https://burmester.pt/vinhos/casa-burmester-touriga-nacional-2018/", desc: "Concentrado e pleno de frescura, apresenta delicadas notas florais envolvidas pela exuberância de fruta preta." },
    { id: 'w5', type: "Tinto", name: "Casa Tinto", price: "28.00€", img: "Vinho5.png", link: "https://burmester.pt/vinhos/casa-burmester-tinto/", desc: "Nariz profundo onde a fruta preta sobressai num fundo de especiarias. Textura elegante, aveludada e final longo." },
    { id: 'w6', type: "Vinho do Porto", name: "Tawny Clássico", price: "32.00€", img: "Vinho6.png", link: "https://burmester.pt/vinhos/burmester-tawny-port/", desc: "Brilhante cor castanha-aloirada. Nariz repleto de fruta madura com sedutoras nuances abaunilhadas." }
];

function openSecretMenu() {
    stopTimer();
    document.getElementById('secret-menu').classList.add('active');
}

function closeOverlays() {
    document.querySelectorAll('.full-screen-overlay').forEach(el => el.classList.remove('active'));
    startTimer();
}

// ----------------------------------------------------
// GARRAFEIRA MOBILE
// ----------------------------------------------------
function openGarrafeira() {
    const container = document.getElementById('mobile-wines-container');
    container.innerHTML = ''; // Clear previous

    mobileWines.forEach(w => {
        container.innerHTML += `
            <div class="m-wine-card" onclick="this.classList.toggle('flipped')">
                <div class="m-wine-inner">
                    <div class="m-wine-front" ${w.id === 'w7' ? 'style="border-color:var(--accent-color);"' : ''}>
                        <div class="m-wine-type">${w.type}</div>
                        <h4 class="m-wine-name">${w.name}</h4>
                        <div class="m-wine-price">${w.price}</div>
                        <img src="${w.img}" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=${w.id}'">
                        <p style="font-size:0.8rem; color:#888;">Toque para ver mais</p>
                    </div>
                    <div class="m-wine-back" ${w.id === 'w7' ? 'style="border-color:var(--accent-color);"' : ''}>
                        <h4 class="m-wine-name" style="margin-bottom:10px;">${w.name}</h4>
                        <p class="m-wine-desc">${w.desc}</p>
                        <button class="m-btn-buy" onclick="event.stopPropagation(); window.open('${w.link}', '_blank')">Comprar Online</button>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('screen-garrafeira').classList.add('active');
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

function openAcademia() {
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
    container.innerHTML = '';
    
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
                container.innerHTML = '<h3 style="color:#4CAF50; margin-top:80px;">Colheita Perfeita!</h3>';
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
        alert('Falhou a zona dourada. Tente novamente!');
        startMobileEstagio();
    }
}

window.resetMobileVindima = function() {
    clearMobileIntervals();
    mColheitaScore = 0; mLagarScore = 0; mFermProgress = 0; mTempPos = 10; mTimingPos = 0;
    
    // Resets UI
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
    
    document.querySelectorAll('.m-stage').forEach(el => el.classList.remove('active'));
    document.getElementById('m-vindima-1').classList.add('active');
}
