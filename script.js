// DICIONÁRIO MULTILINGUE E CÉREBRO
const langData = {
    pt: {
        morning: "Bom dia.", afternoon: "Boa tarde.", evening: "Boa noite.",
        welcome: "Bem-vindo à Quinta do Paraíso. Sou o seu assistente pessoal. Em que posso ajudar?",
        placeholder: "Escreva ou fale connosco...",
        listening: "A ouvir...",
        processing: "A consultar dados...",
        notUnderstood: "Não percebi. Tente novamente.",
        topicsBtn: "Tópicos Rápidos ⚡",
        chips: { wifi: "🔑 Wi-Fi", breakfast: "☕ Pequeno-almoço", reception: "🛎️ Receção", restaurant: "🍽️ Restaurante", activities: "🍇 Atividades", pool: "🏊 Piscina", checkout: "📅 Check-out", pharmacy: "💊 Farmácia" },
        defaultResp: "Para essa questão específica, sugiro contactar a receção através do ícone nos tópicos rápidos. Teremos todo o gosto em ajudar.",
        voiceLang: "pt-PT",
        brain: [
            { k: ['wi-fi', 'wifi', 'internet', 'rede', 'password'], r: "A password do Wi-Fi é: Paraiso2026. A rede é 'Quinta do Paraíso Hóspedes'." },
            { k: ['pequeno-almoço', 'café da manhã', 'comer'], r: "O pequeno-almoço regional é servido no terraço entre as 8h00 e as 10h30." },
            { k: ['receção', 'recepção', 'emergência', 'ajuda'], r: "A receção está disponível 24 horas. Marque o número 9 no telefone do quarto." },
            { k: ['farmácia', 'remédio', 'medicamento', 'hospital'], r: "A farmácia mais próxima fica no centro de Foz Côa (15 min). Temos kit de primeiros socorros na receção." },
            { k: ['restaurante', 'jantar', 'almoço', 'fome'], r: "O restaurante abre das 12h30 às 15h00, e das 19h30 às 22h30. Aconselhamos reserva." },
            { k: ['atividades', 'vinho', 'prova', 'barco'], r: "Temos provas de vinho às 15h, passeios de barco e jipe. Fale com a receção para reservar." },
            { k: ['piscina', 'toalha', 'spa', 'massagem'], r: "A piscina funciona até às 20h. As toalhas estão no quarto. Para o Spa, solicite marcação." },
            { k: ['check-out', 'sair', 'partida', 'horas'], r: "O check-out deve ser feito até às 12 horas. Contacte-nos se precisar de late check-out." }
        ]
    },
    en: {
        morning: "Good morning.", afternoon: "Good afternoon.", evening: "Good evening.",
        welcome: "Welcome to Quinta do Paraíso. I am your personal assistant. How can I help you?",
        placeholder: "Type or speak to us...",
        listening: "Listening...",
        processing: "Consulting data...",
        notUnderstood: "I didn't catch that. Please try again.",
        topicsBtn: "Quick Topics ⚡",
        chips: { wifi: "🔑 Wi-Fi", breakfast: "☕ Breakfast", reception: "🛎️ Reception", restaurant: "🍽️ Restaurant", activities: "🍇 Activities", pool: "🏊 Pool", checkout: "📅 Check-out", pharmacy: "💊 Pharmacy" },
        defaultResp: "For that specific question, I suggest contacting reception via the quick topics. We'll be happy to assist.",
        voiceLang: "en-GB",
        brain: [
            { k: ['wi-fi', 'wifi', 'internet', 'network', 'password'], r: "The Wi-Fi password is: Paraiso2026. Network name is 'Quinta do Paraíso Hóspedes'." },
            { k: ['breakfast', 'morning', 'eat'], r: "Our regional breakfast is served on the terrace between 8:00 AM and 10:30 AM." },
            { k: ['reception', 'emergency', 'help'], r: "Reception is open 24/7. Dial 9 from your room phone." },
            { k: ['pharmacy', 'medicine', 'hospital', 'doctor'], r: "The nearest pharmacy is in Foz Côa (15 min drive). We have a first aid kit at reception." },
            { k: ['restaurant', 'dinner', 'lunch', 'food'], r: "The restaurant is open from 12:30 PM to 3:00 PM, and 7:30 PM to 10:30 PM. Booking recommended." },
            { k: ['activities', 'wine', 'tasting', 'boat'], r: "We have wine tastings at 3:00 PM, boat and jeep tours. Contact reception to book." },
            { k: ['pool', 'towel', 'spa', 'massage'], r: "The pool is open until 8:00 PM. Towels are in your room. Please book Spa treatments in advance." },
            { k: ['check-out', 'leave', 'departure', 'time'], r: "Check-out is at 12:00 PM. Contact us if you need a late check-out." }
        ]
    },
    es: {
        morning: "Buenos días.", afternoon: "Buenas tardes.", evening: "Buenas noches.",
        welcome: "Bienvenido a Quinta do Paraíso. Soy tu asistente personal. ¿En qué puedo ayudarte?",
        placeholder: "Escribe o habla con nosotros...",
        listening: "Escuchando...",
        processing: "Consultando datos...",
        notUnderstood: "No entendí. Inténtalo de nuevo.",
        topicsBtn: "Temas Rápidos ⚡",
        chips: { wifi: "🔑 Wi-Fi", breakfast: "☕ Desayuno", reception: "🛎️ Recepción", restaurant: "🍽️ Restaurante", activities: "🍇 Actividades", pool: "🏊 Piscina", checkout: "📅 Salida", pharmacy: "💊 Farmacia" },
        defaultResp: "Para esa pregunta, sugiero contactar con recepción a través de los temas rápidos. Estaremos encantados de ayudar.",
        voiceLang: "es-ES",
        brain: [
            { k: ['wi-fi', 'wifi', 'internet', 'red', 'contraseña'], r: "La contraseña del Wi-Fi es: Paraiso2026. Red: 'Quinta do Paraíso Hóspedes'." },
            { k: ['desayuno', 'mañana', 'comer'], r: "El desayuno se sirve en la terraza de 8:00 a 10:30." },
            { k: ['recepción', 'recepcion', 'emergencia', 'ayuda'], r: "La recepción está abierta las 24 horas. Marca el 9 en el teléfono de tu habitación." },
            { k: ['farmacia', 'medicina', 'hospital', 'médico'], r: "La farmacia más cercana está en Foz Côa (15 min). Hay botiquín en recepción." },
            { k: ['restaurante', 'cena', 'comida', 'almuerzo'], r: "El restaurante abre de 12:30 a 15:00 y de 19:30 a 22:30. Sugerimos reservar." },
            { k: ['actividades', 'vino', 'cata', 'barco'], r: "Tenemos catas a las 15:00, paseos en barco y jeep. Contacta con recepción." },
            { k: ['piscina', 'toalla', 'spa', 'masaje'], r: "La piscina abre hasta las 20:00. Toallas en la habitación. Spa con reserva previa." },
            { k: ['check-out', 'salida', 'salir', 'hora'], r: "El check-out es hasta las 12:00. Contacta si necesitas salida tardía." }
        ]
    },
    fr: {
        morning: "Bonjour.", afternoon: "Bon après-midi.", evening: "Bonsoir.",
        welcome: "Bienvenue à Quinta do Paraíso. Je suis votre assistant. Comment puis-je aider?",
        placeholder: "Écrivez ou parlez...",
        listening: "À l'écoute...",
        processing: "Consultation des données...",
        notUnderstood: "Je n'ai pas compris. Veuillez réessayer.",
        topicsBtn: "Sujets Rapides ⚡",
        chips: { wifi: "🔑 Wi-Fi", breakfast: "☕ Petit-déjeuner", reception: "🛎️ Réception", restaurant: "🍽️ Restaurant", activities: "🍇 Activités", pool: "🏊 Piscine", checkout: "📅 Départ", pharmacy: "💊 Pharmacie" },
        defaultResp: "Pour cette question, je suggère de contacter la réception. Nous serons ravis d'aider.",
        voiceLang: "fr-FR",
        brain: [
            { k: ['wi-fi', 'wifi', 'internet', 'réseau', 'mot de passe'], r: "Le mot de passe Wi-Fi est: Paraiso2026. Réseau: 'Quinta do Paraíso Hóspedes'." },
            { k: ['petit-déjeuner', 'matin', 'manger'], r: "Le petit-déjeuner est servi sur la terrasse de 8h00 à 10h30." },
            { k: ['réception', 'urgence', 'aide'], r: "La réception est ouverte 24h/24. Composez le 9 sur le téléphone de la chambre." },
            { k: ['pharmacie', 'médicament', 'hôpital', 'médecin'], r: "La pharmacie est à Foz Côa (15 min). Trousse de secours à la réception." },
            { k: ['restaurant', 'dîner', 'déjeuner', 'manger'], r: "Restaurant ouvert de 12h30 à 15h00 et 19h30 à 22h30. Réservation conseillée." },
            { k: ['activités', 'vin', 'dégustation', 'bateau'], r: "Dégustations à 15h, tours en bateau et jeep. Contactez la réception." },
            { k: ['piscina', 'serviette', 'spa', 'massage'], r: "Piscine ouverte jusqu'à 20h. Serviettes en chambre. Spa sur réservation." },
            { k: ['check-out', 'départ', 'partir', 'heure'], r: "Le check-out est à 12h00. Contactez-nous pour un départ tardif." }
        ]
    },
    de: {
        morning: "Guten Morgen.", afternoon: "Guten Tag.", evening: "Guten Abend.",
        welcome: "Willkommen in Quinta do Paraíso. Wie kann ich helfen?",
        placeholder: "Tippen oder sprechen...",
        listening: "Zuhören...",
        processing: "Daten werden abgerufen...",
        notUnderstood: "Ich habe das nicht verstanden. Bitte versuchen Sie es erneut.",
        topicsBtn: "Schnelle Themen ⚡",
        chips: { wifi: "🔑 WLAN", breakfast: "☕ Frühstück", reception: "🛎️ Rezeption", restaurant: "🍽️ Restaurant", activities: "🍇 Aktivitäten", pool: "🏊 Pool", checkout: "📅 Check-out", pharmacy: "💊 Apotheke" },
        defaultResp: "Bitte kontaktieren Sie für diese Frage die Rezeption. Wir helfen gerne.",
        voiceLang: "de-DE",
        brain: [
            { k: ['wlan', 'wifi', 'internet', 'netzwerk', 'passwort'], r: "Das WLAN-Passwort lautet: Paraiso2026. Netzwerk: 'Quinta do Paraíso Hóspedes'." },
            { k: ['frühstück', 'morgen', 'essen'], r: "Das Frühstück wird von 8:00 bis 10:30 Uhr auf der Terrasse serviert." },
            { k: ['rezeption', 'notfall', 'hilfe'], r: "Die Rezeption ist rund um die Uhr besetzt. Wählen Sie die 9 auf Ihrem Zimmertelefon." },
            { k: ['apotheke', 'medizin', 'krankenhaus', 'arzt'], r: "Die nächste Apotheke ist in Foz Côa (15 Min). Erste-Hilfe-Kasten an der Rezeption." },
            { k: ['restaurant', 'abendessen', 'mittagessen', 'hunger'], r: "Das Restaurant ist von 12:30 bis 15:00 Uhr und von 19:30 bis 22:30 Uhr geöffnet." },
            { k: ['aktivitäten', 'wein', 'weinprobe', 'boot'], r: "Weinproben um 15:00 Uhr, Boots- und Jeep-Touren. Bitte an der Rezeption buchen." },
            { k: ['pool', 'handtuch', 'spa', 'massage'], r: "Pool bis 20:00 Uhr geöffnet. Handtücher auf dem Zimmer. Spa nach Vereinbarung." },
            { k: ['check-out', 'abreise', 'verlassen', 'zeit'], r: "Der Check-out ist bis 12:00 Uhr. Kontaktieren Sie uns für einen späten Check-out." }
        ]
    }
};

let currentLang = localStorage.getItem('qpLang') || 'pt';
let inactivityTimer;
let isSpeaking = false; 

// Elementos da UI
const body = document.body;
const orb = document.getElementById('orb');
const responseText = document.getElementById('ai-response');
const inputField = document.getElementById('user-input');
const btnSend = document.getElementById('btn-send');
const btnMic = document.getElementById('btn-mic');
const btnTopics = document.getElementById('btn-topics');
const topicsList = document.getElementById('topics-list');
const langSelect = document.getElementById('lang-select');

// Inicializa a UI na língua guardada
langSelect.value = currentLang;
updateLanguageUI();

langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('qpLang', currentLang); // Guarda a preferência
    updateLanguageUI();
});

function updateLanguageUI() {
    const d = langData[currentLang];
    inputField.placeholder = d.placeholder;
    btnTopics.innerText = d.topicsBtn;
    
    document.getElementById('chip-wifi').innerHTML = d.chips.wifi;
    document.getElementById('chip-breakfast').innerHTML = d.chips.breakfast;
    document.getElementById('chip-reception').innerHTML = d.chips.reception;
    document.getElementById('chip-restaurant').innerHTML = d.chips.restaurant;
    document.getElementById('chip-activities').innerHTML = d.chips.activities;
    document.getElementById('chip-pool').innerHTML = d.chips.pool;
    document.getElementById('chip-checkout').innerHTML = d.chips.checkout;
    document.getElementById('chip-pharmacy').innerHTML = d.chips.pharmacy;
}

// ----------------------------------------------------
// SISTEMA DE ESTADO (IDLE / ACTIVE)
// ----------------------------------------------------
function startTimer() {
    clearTimeout(inactivityTimer);
    if (isSpeaking) return; 
    
    inactivityTimer = setTimeout(() => {
        body.classList.add('idle');
        topicsList.classList.add('hidden');
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

// ACORDAR A ORBE
orb.addEventListener('click', (e) => {
    e.stopPropagation(); 
    
    const wasIdle = body.classList.contains('idle');
    body.classList.remove('idle');
    
    if (wasIdle) {
        // Feedback Háptico (Vibração leve)
        if (navigator.vibrate) navigator.vibrate(50);
        
        // Saudação por hora
        const d = langData[currentLang];
        const h = new Date().getHours();
        let saudacaoTempo = d.morning;
        if (h >= 12 && h < 20) saudacaoTempo = d.afternoon;
        else if (h >= 20) saudacaoTempo = d.evening;
        
        const msg = saudacaoTempo + " " + d.welcome;
        exibirEFalar(msg);
    } else {
        startTimer();
    }
});

btnTopics.addEventListener('click', () => {
    topicsList.classList.toggle('hidden');
    startTimer();
});

// Começa com a app escondida
startTimer();


// ----------------------------------------------------
// LÓGICA DO CÉREBRO
// ----------------------------------------------------
function processarPergunta(keywordOrPhrase) {
    const d = langData[currentLang];
    const pNormalizada = keywordOrPhrase.toLowerCase();
    let respostaEncontrada = d.defaultResp;

    for (let i = 0; i < d.brain.length; i++) {
        const match = d.brain[i].k.some(kw => pNormalizada.includes(kw));
        if (match) {
            respostaEncontrada = d.brain[i].r;
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
        utter.lang = langData[currentLang].voiceLang;
        
        let voices = window.speechSynthesis.getVoices();
        let v = voices.find(vo => vo.lang.includes(utter.lang.split('-')[0]) && (vo.name.includes('Female') || vo.name.includes('Raquel') || vo.name.includes('Joana')));
        if(!v) v = voices.find(vo => vo.lang.includes(utter.lang.split('-')[0]));
        if(v) utter.voice = v;
        
        // Mantém a app acordada enquanto fala
        utter.onstart = () => { isSpeaking = true; stopTimer(); };
        utter.onend = () => { isSpeaking = false; startTimer(); };
        utter.onerror = () => { isSpeaking = false; startTimer(); };

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

window.askDirect = function(type) {
    responseText.classList.add('typing');
    responseText.innerText = langData[currentLang].processing;
    stopTimer();
    topicsList.classList.add('hidden'); // Fecha gaveta de tópicos
    
    setTimeout(() => {
        let searchTerm = '';
        const dict = langData[currentLang];
        if(type === 'wifi') searchTerm = dict.brain[0].k[0];
        if(type === 'breakfast') searchTerm = dict.brain[1].k[0];
        if(type === 'reception') searchTerm = dict.brain[2].k[0];
        if(type === 'pharmacy') searchTerm = dict.brain[3].k[0];
        if(type === 'restaurant') searchTerm = dict.brain[4].k[0];
        if(type === 'activities') searchTerm = dict.brain[5].k[0];
        if(type === 'pool') searchTerm = dict.brain[6].k[0];
        if(type === 'checkout') searchTerm = dict.brain[7].k[0];
        
        processarPergunta(searchTerm);
    }, 400);
};

// ----------------------------------------------------
// RECONHECIMENTO DE VOZ
// ----------------------------------------------------
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

if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}
