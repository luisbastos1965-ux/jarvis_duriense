// O SINTETIZADOR DE EFEITOS SONOROS (Nativo do Browser)
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
// O "CÉREBRO" DA IA: Associações Cognitivas e Multilingue (5 Línguas)
// ==============================================================================
const langData = {
    pt: {
        morning: "Bom dia.", afternoon: "Boa tarde.", evening: "Boa noite.",
        welcome: "Bem-vindo à Quinta do Paraíso. Sou o seu assistente de inteligência artificial. Em que posso ajudar?",
        shortGreeting: "Estou a ouvir. Qual é a sua questão?",
        placeholder: "Escreva ou fale connosco...",
        listening: "A ouvir a sua voz...",
        processing: "A cruzar dados da Quinta...",
        notUnderstood: "Não consegui processar o pedido. Pode reformular?",
        topicsBtn: "Tópicos Rápidos ⚡",
        catStay: "Alojamento", catExp: "Experiências", catHelp: "Assistência",
        chips: { wifi: "🔑 Wi-Fi", breakfast: "☕ Pequeno-almoço", reception: "🛎️ Receção", restaurant: "🍽️ Restaurante", activities: "🍇 Atividades", pool: "🏊 Piscina", checkout: "📅 Check-out", pharmacy: "💊 Farmácia" },
        defaultResp: "A minha base de dados não encontrou uma resposta exata para isso. Sugiro que contacte a nossa receção através do ícone nos tópicos rápidos. Eles resolverão imediatamente.",
        voiceLang: "pt-PT",
        brain: [
            { k: ['tempo', 'clima', 'calor', 'sol', 'temperatura', 'graus', 'frio', 'chover'], r: "Nesta altura do ano o Douro costuma ser ensolarado, rondando os 29 graus à tarde. Com este calor, a minha lógica sugere um mergulho na nossa piscina panorâmica com um copo de Tavedo Rosé bem fresco." },
            { k: ['cansaço', 'cansado', 'relaxar', 'massagem', 'stress', 'spa', 'dor nas costas'], r: "Deteto que procura descanso. O nosso Spa de Vinoterapia utiliza as propriedades antioxidantes das nossas próprias uvas para um relaxamento profundo. Recomendo vivamente agendar uma sessão de 60 minutos." },
            { k: ['restaurante', 'jantar', 'almoço', 'fome', 'comida', 'menu', 'pratos'], r: "O nosso restaurante de fusão está à sua disposição. Se decidir provar o nosso famoso Polvo à Lagareiro, os meus algoritmos sugerem que o acompanhe com o nosso Vinho Branco Reserva. É uma harmonização perfeita." },
            { k: ['crianças', 'filhos', 'bebé', 'brincar', 'jogar', 'infantil'], r: "A nossa Quinta é um refúgio familiar. As crianças adoram o jogo digital 'Academia da Vinha' disponível na nossa plataforma, e o Chef pode preparar menus infantis personalizados no restaurante." },
            { k: ['atrações', 'visitar', 'foz côa', 'museu', 'redondezas', 'passear', 'ver'], r: "Estamos numa região de Património Mundial. Recomendo vivamente uma visita ao Parque Arqueológico do Vale do Côa, seguido de um passeio no nosso Barco Rabelo privado ao pôr do sol." },
            { k: ['wi-fi', 'wifi', 'internet', 'rede', 'password', 'senha'], r: "A password da nossa rede Wi-Fi de alta velocidade é: Paraiso2026. Selecione a rede 'Quinta do Paraíso Hóspedes'." },
            { k: ['pequeno-almoço', 'café da manhã', 'comer de manhã', 'pequeno almoço'], r: "O nosso pequeno-almoço com produtos regionais e compotas caseiras é servido no terraço com vista para o rio, entre as 8h00 e as 10h30." },
            { k: ['receção', 'recepção', 'emergência', 'ajuda', 'urgente', 'problema'], r: "A receção está operacional 24 horas por dia para garantir o seu conforto. Pode dirigir-se ao edifício principal ou marcar o número 9 no telefone do seu quarto." },
            { k: ['farmácia', 'remédio', 'medicamento', 'hospital', 'doente'], r: "A farmácia mais próxima fica no centro de Foz Côa, a 15 minutos de carro. Se for algo ligeiro, dispomos de um kit de primeiros socorros na nossa receção." },
            { k: ['atividades', 'vinho', 'prova', 'barco', 'jipe', 'vindima', 'adega'], r: "As experiências são o coração do Douro. Pode participar nas provas de vinho guiadas às 15 horas, ou reservar um passeio de jipe pelos nossos socalcos mais altos." },
            { k: ['piscina', 'toalha', 'nadar', 'mergulho'], r: "A piscina panorâmica exterior está aberta até às 20 horas. Tem toalhas exclusivas disponíveis no seu quarto para esse fim." },
            { k: ['check-out', 'sair', 'partida', 'horas', 'ir embora', 'pagar'], r: "O check-out deve ser realizado até às 12 horas. Se o seu voo ou viagem for mais tarde, contacte a receção para verificarmos a possibilidade de um late check-out." },
            { k: ['sustentabilidade', 'ecológico', 'ambiente', 'solar', 'verde', 'natureza'], r: "É um ótimo tópico. A Quinta do Paraíso orgulha-se de usar energia 100% solar, práticas agrícolas sustentáveis e gestão inteligente de água para preservar este ecossistema mágico." },
            { k: ['história', 'família', 'origem', 'antigo', 'fundação'], r: "As raízes desta quinta estendem-se por 12 gerações. Os socalcos que vê pela janela foram moldados à mão pelos nossos antepassados, uma tradição que a atual gestão faz questão de honrar." },
            { k: ['animais', 'cão', 'gato', 'pet', 'pet-friendly', 'animal'], r: "Claro que sim. Somos um alojamento pet-friendly de luxo. O seu companheiro de quatro patas tem à espera comedouros e uma cama confortável no seu refúgio." },
            { k: ['vegan', 'vegetariano', 'glúten', 'alergia', 'dieta', 'celíaco'], r: "A nossa cozinha é totalmente adaptável. O Chef tem imenso gosto em preparar refeições sem glúten, vegan ou ajustadas a qualquer alergia. Basta informar-nos com uma pequena antecedência." },
            { k: ['quarto', 'limpeza', 'toalhas extra', 'serviço de quartos', 'housekeeping', 'sujo'], r: "A nossa equipa de Housekeeping realiza a limpeza diária durante a manhã. O serviço de quartos funciona 24 horas; basta ligar para a receção se desejar toalhas extra ou uma refeição na sua suite." },
            { k: ['transporte', 'táxi', 'transfer', 'aeroporto', 'comboio', 'pinhão'], r: "Tratamos de toda a sua logística. Podemos organizar um transfer privado em veículo de luxo para o Aeroporto do Porto ou para a belíssima Estação de Comboios do Pinhão." },
            { k: ['comprar', 'loja', 'garrafa', 'levar vinho', 'encomendar'], r: "Produzimos 7 referências de vinho exclusivas. Pode adquirir as suas garrafas favoritas na nossa garrafeira física ou, se preferir, tratamos do envio internacional diretamente para a sua casa." }
        ]
    },
    en: {
        morning: "Good morning.", afternoon: "Good afternoon.", evening: "Good evening.",
        welcome: "Welcome to Quinta do Paraíso. I am your artificial intelligence assistant. How may I help you?",
        shortGreeting: "I'm listening. What is your question?",
        placeholder: "Type or speak to us...",
        listening: "Listening to your voice...",
        processing: "Crossing estate data...",
        notUnderstood: "I couldn't process that. Could you rephrase?",
        topicsBtn: "Quick Topics ⚡",
        catStay: "Accommodation", catExp: "Experiences", catHelp: "Assistance",
        chips: { wifi: "🔑 Wi-Fi", breakfast: "☕ Breakfast", reception: "🛎️ Reception", restaurant: "🍽️ Restaurant", activities: "🍇 Activities", pool: "🏊 Pool", checkout: "📅 Check-out", pharmacy: "💊 Pharmacy" },
        defaultResp: "My database didn't find an exact match for that. I suggest contacting our reception through the quick topics. They will resolve it immediately.",
        voiceLang: "en-GB",
        brain: [
            { k: ['weather', 'climate', 'hot', 'sun', 'temperature', 'cold', 'rain'], r: "At this time of year, the Douro is usually sunny, around 29 degrees in the afternoon. With this heat, my logic suggests a dip in our panoramic pool with a chilled glass of Tavedo Rosé." },
            { k: ['tired', 'fatigue', 'relax', 'massage', 'stress', 'spa', 'back pain'], r: "I detect you are looking for rest. Our Vinotherapy Spa uses the antioxidant properties of our own grapes for deep relaxation. I highly recommend booking a 60-minute session." },
            { k: ['restaurant', 'dinner', 'lunch', 'hungry', 'food', 'menu', 'dishes'], r: "Our fusion restaurant is at your disposal. If you decide to try our famous Lagareiro Octopus, my algorithms suggest pairing it with our White Reserve Wine. It's a perfect match." },
            { k: ['kids', 'children', 'baby', 'play', 'games'], r: "Our Estate is a family haven. Children love the digital 'Vineyard Academy' game on our platform, and the Chef can prepare custom kids' menus in the restaurant." },
            { k: ['attractions', 'visit', 'foz côa', 'museum', 'surroundings', 'tour', 'see'], r: "We are in a World Heritage region. I highly recommend visiting the Côa Valley Archaeological Park, followed by a sunset tour on our private Rabelo Boat." },
            { k: ['wi-fi', 'wifi', 'internet', 'network', 'password'], r: "The password for our high-speed Wi-Fi is: Paraiso2026. Please select the 'Quinta do Paraíso Hóspedes' network." },
            { k: ['breakfast', 'morning', 'eat'], r: "Our breakfast featuring regional products and homemade jams is served on the river-view terrace between 8:00 AM and 10:30 AM." },
            { k: ['reception', 'emergency', 'help', 'urgent', 'problem'], r: "Reception is operational 24/7 to ensure your comfort. You can go to the main building or dial 9 on your room phone." },
            { k: ['pharmacy', 'medicine', 'hospital', 'sick'], r: "The nearest pharmacy is in the center of Foz Côa, a 15-minute drive away. For minor issues, we have a first-aid kit at reception." },
            { k: ['activities', 'wine', 'tasting', 'boat', 'jeep', 'harvest', 'cellar'], r: "Experiences are the heart of the Douro. You can join guided wine tastings at 3:00 PM or book a jeep tour through our highest terraces." },
            { k: ['pool', 'towel', 'swim', 'dive'], r: "The outdoor panoramic pool is open until 8:00 PM. Exclusive pool towels are available in your room." },
            { k: ['check-out', 'leave', 'departure', 'time', 'pay'], r: "Check-out must be completed by 12:00 PM. If your flight is later, please contact reception to check late check-out availability." },
            { k: ['sustainability', 'eco', 'environment', 'solar', 'green', 'nature'], r: "Great topic. Quinta do Paraíso is proud to use 100% solar energy, sustainable farming practices, and smart water management to preserve this magical ecosystem." },
            { k: ['history', 'family', 'origin', 'old', 'foundation'], r: "The roots of this estate span 12 generations. The terraces you see out your window were shaped by hand by our ancestors, a tradition we proudly honor." },
            { k: ['pets', 'dog', 'cat', 'animal', 'pet-friendly'], r: "Absolutely. We are a luxury pet-friendly accommodation. Bowls and a comfortable bed await your four-legged companion in your room." },
            { k: ['vegan', 'vegetarian', 'gluten', 'allergy', 'diet', 'celiac'], r: "Our kitchen is fully adaptable. The Chef is happy to prepare gluten-free, vegan meals, or adjust for any allergies. Just let us know in advance." },
            { k: ['room', 'cleaning', 'extra towels', 'room service', 'housekeeping', 'dirty'], r: "Our Housekeeping team cleans daily in the morning. Room service operates 24/7; just call reception if you need extra towels or a meal in your suite." },
            { k: ['transport', 'taxi', 'transfer', 'airport', 'train', 'pinhão'], r: "We handle all your logistics. We can arrange a private luxury transfer to Porto Airport or to the beautiful Pinhão Train Station." },
            { k: ['buy', 'shop', 'bottle', 'take wine', 'order'], r: "We produce 7 exclusive wine references. You can buy your favorite bottles in our physical cellar or, if you prefer, we can arrange international shipping directly to your home." }
        ]
    },
    es: {
        morning: "Buenos días.", afternoon: "Buenas tardes.", evening: "Buenas noches.",
        welcome: "Bienvenido a Quinta do Paraíso. Soy tu asistente de inteligencia artificial. ¿En qué te puedo ayudar?",
        shortGreeting: "Te escucho. ¿Cuál es tu pregunta?",
        placeholder: "Escribe o habla con nosotros...",
        listening: "Escuchando tu voz...",
        processing: "Cruzando datos de la Quinta...",
        notUnderstood: "No he podido procesar la petición. ¿Puedes reformular?",
        topicsBtn: "Temas Rápidos ⚡",
        catStay: "Alojamiento", catExp: "Experiencias", catHelp: "Asistencia",
        chips: { wifi: "🔑 Wi-Fi", breakfast: "☕ Desayuno", reception: "🛎️ Recepción", restaurant: "🍽️ Restaurante", activities: "🍇 Actividades", pool: "🏊 Piscina", checkout: "📅 Salida", pharmacy: "💊 Farmacia" },
        defaultResp: "Mi base de datos no encontró una respuesta exacta. Sugiero contactar con recepción a través de los temas rápidos. Lo resolverán de inmediato.",
        voiceLang: "es-ES",
        brain: [
            { k: ['tiempo', 'clima', 'calor', 'sol', 'temperatura', 'grados', 'frío', 'llover'], r: "En esta época del año el Duero suele ser soleado, rondando los 29 grados por la tarde. Con este calor, mi lógica sugiere un chapuzón en nuestra piscina panorámica con una copa de Tavedo Rosé bien fría." },
            { k: ['cansancio', 'cansado', 'relajar', 'masaje', 'estrés', 'spa', 'dolor de espalda'], r: "Detecto que buscas descanso. Nuestro Spa de Vinoterapia utiliza las propiedades antioxidantes de nuestras uvas para una relajación profunda. Recomiendo reservar una sesión de 60 minutos." },
            { k: ['restaurante', 'cena', 'comida', 'hambre', 'almuerzo', 'menú', 'platos'], r: "Nuestro restaurante fusión está a tu disposición. Si decides probar nuestro famoso Pulpo a la Lagareiro, mis algoritmos sugieren acompañarlo con nuestro Vino Blanco Reserva. Es un maridaje perfecto." },
            { k: ['niños', 'hijos', 'bebé', 'jugar', 'infantil'], r: "Nuestra Quinta es un refugio familiar. A los niños les encanta el juego digital 'Academia de la Viña' de nuestra plataforma, y el Chef puede preparar menús infantiles a medida." },
            { k: ['atracciones', 'visitar', 'foz côa', 'museo', 'alrededores', 'pasear', 'ver'], r: "Estamos en una región Patrimonio de la Humanidad. Recomiendo encarecidamente visitar el Parque Arqueológico del Valle del Côa, seguido de un paseo al atardecer en nuestro Barco Rabelo privado." },
            { k: ['wi-fi', 'wifi', 'internet', 'red', 'contraseña', 'clave'], r: "La contraseña de nuestro Wi-Fi de alta velocidad es: Paraiso2026. Selecciona la red 'Quinta do Paraíso Hóspedes'." },
            { k: ['desayuno', 'mañana', 'comer'], r: "Nuestro desayuno con productos regionales y mermeladas caseras se sirve en la terraza con vistas al río, entre las 8:00 y las 10:30." },
            { k: ['recepción', 'recepcion', 'emergencia', 'ayuda', 'urgente', 'problema'], r: "La recepción está operativa las 24 horas. Puedes dirigirte al edificio principal o marcar el número 9 en el teléfono de tu habitación." },
            { k: ['farmacia', 'medicina', 'hospital', 'enfermo'], r: "La farmacia más cercana está en el centro de Foz Côa, a 15 minutos en coche. Para casos leves, disponemos de un botiquín en recepción." },
            { k: ['actividades', 'vino', 'cata', 'barco', 'jeep', 'vendimia', 'bodega'], r: "Las experiencias son el corazón del Duero. Puedes unirte a las catas guiadas a las 15 horas, o reservar un paseo en jeep por nuestros bancales más altos." },
            { k: ['piscina', 'toalla', 'nadar', 'baño'], r: "La piscina panorámica exterior está abierta hasta las 20 horas. Tienes toallas exclusivas disponibles en tu habitación." },
            { k: ['check-out', 'salida', 'irse', 'hora', 'pagar'], r: "El check-out debe realizarse antes de las 12 horas. Si tu vuelo es más tarde, contacta con recepción para comprobar la posibilidad de un late check-out." },
            { k: ['sostenibilidad', 'ecológico', 'ambiente', 'solar', 'verde', 'naturaleza'], r: "Excelente tema. Quinta do Paraíso se enorgullece de usar energía 100% solar, prácticas agrícolas sostenibles y gestión inteligente del agua para preservar este ecosistema." },
            { k: ['historia', 'familia', 'origen', 'antiguo', 'fundación'], r: "Las raíces de esta finca se extienden por 12 generaciones. Los bancales que ves por la ventana fueron moldeados a mano por nuestros antepasados." },
            { k: ['mascotas', 'perro', 'gato', 'animal', 'pet-friendly'], r: "Por supuesto. Somos un alojamiento de lujo pet-friendly. Comederos y una cama cómoda esperan a tu compañero de cuatro patas en tu habitación." },
            { k: ['vegano', 'vegetariano', 'gluten', 'alergia', 'dieta', 'celíaco'], r: "Nuestra cocina es totalmente adaptable. El Chef prepara con gusto comidas sin gluten, veganas o ajustadas a alergias. Solo infórmanos con antelación." },
            { k: ['habitación', 'limpieza', 'toallas extra', 'servicio de habitaciones', 'housekeeping', 'sucio'], r: "Nuestro equipo de Housekeeping limpia a diario por la mañana. El servicio de habitaciones es 24h; llama a recepción si necesitas toallas extra o cenar en tu suite." },
            { k: ['transporte', 'taxi', 'transfer', 'aeropuerto', 'tren', 'pinhão'], r: "Nos encargamos de tu logística. Podemos organizar un transfer privado de lujo al Aeropuerto de Oporto o a la preciosa Estación de Pinhão." },
            { k: ['comprar', 'tienda', 'botella', 'llevar vino', 'pedir'], r: "Producimos 7 referencias de vino exclusivas. Puedes comprarlas en nuestra bodega o, si lo prefieres, gestionamos el envío internacional directo a tu casa." }
        ]
    },
    fr: {
        morning: "Bonjour.", afternoon: "Bon après-midi.", evening: "Bonsoir.",
        welcome: "Bienvenue à Quinta do Paraíso. Je suis votre assistant virtuel. Comment puis-je vous aider?",
        shortGreeting: "Je vous écoute. Quelle est votre question?",
        placeholder: "Écrivez ou parlez...",
        listening: "J'écoute votre voix...",
        processing: "Analyse des données...",
        notUnderstood: "Je n'ai pas pu traiter la demande. Pouvez-vous reformuler?",
        topicsBtn: "Sujets Rapides ⚡",
        catStay: "Hébergement", catExp: "Expériences", catHelp: "Assistance",
        chips: { wifi: "🔑 Wi-Fi", breakfast: "☕ Petit-déjeuner", reception: "🛎️ Réception", restaurant: "🍽️ Restaurant", activities: "🍇 Activités", pool: "🏊 Piscine", checkout: "📅 Départ", pharmacy: "💊 Pharmacie" },
        defaultResp: "Ma base de données n'a pas trouvé de réponse exacte. Je suggère de contacter notre réception via les sujets rapides. Ils résoudront cela immédiatement.",
        voiceLang: "fr-FR",
        brain: [
            { k: ['météo', 'climat', 'chaud', 'soleil', 'température', 'froid', 'pleuvoir'], r: "À cette époque de l'année, le Douro est ensoleillé, autour de 29 degrés. Avec cette chaleur, ma logique suggère une baignade dans notre piscine panoramique avec un verre de Tavedo Rosé bien frais." },
            { k: ['fatigue', 'fatigué', 'relaxer', 'massage', 'stress', 'spa', 'mal de dos'], r: "Je détecte que vous cherchez du repos. Notre Spa de Vinothérapie utilise les antioxydants de nos raisins pour une relaxation profonde. Je recommande une séance de 60 minutes." },
            { k: ['restaurant', 'dîner', 'déjeuner', 'faim', 'nourriture', 'menu', 'plats'], r: "Notre restaurant fusion est à votre disposition. Si vous goûtez notre fameux Poulpe à la Lagareiro, mes algorithmes suggèrent de l'accompagner de notre Vin Blanc Réserve. Un accord parfait." },
            { k: ['enfants', 'bébé', 'jouer', 'jeux'], r: "Notre domaine est familial. Les enfants adorent le jeu numérique 'Académie de la Vigne', et le Chef peut préparer des menus enfants personnalisés." },
            { k: ['attractions', 'visiter', 'foz côa', 'musée', 'environs', 'promenade', 'voir'], r: "Nous sommes dans une région du Patrimoine Mondial. Je recommande la visite du Parc Archéologique de la Vallée du Côa, suivie d'une balade au coucher du soleil sur notre bateau privé." },
            { k: ['wi-fi', 'wifi', 'internet', 'réseau', 'mot de passe'], r: "Le mot de passe de notre Wi-Fi haut débit est : Paraiso2026. Sélectionnez le réseau 'Quinta do Paraíso Hóspedes'." },
            { k: ['petit-déjeuner', 'matin', 'manger'], r: "Notre petit-déjeuner avec des produits régionaux et des confitures maison est servi sur la terrasse avec vue sur le fleuve, entre 8h00 et 10h30." },
            { k: ['réception', 'urgence', 'aide', 'urgent', 'problème'], r: "La réception est opérationnelle 24h/24. Vous pouvez vous rendre au bâtiment principal ou composer le 9 sur le téléphone de votre chambre." },
            { k: ['pharmacie', 'médicament', 'hôpital', 'malade'], r: "La pharmacie la plus proche est à Foz Côa, à 15 minutes en voiture. Pour les petits soucis, nous avons une trousse de secours à la réception." },
            { k: ['activités', 'vin', 'dégustation', 'bateau', 'jeep', 'vendange', 'cave'], r: "Les expériences sont le cœur du Douro. Vous pouvez participer aux dégustations à 15 heures, ou réserver un tour en jeep sur nos plus hautes terrasses." },
            { k: ['piscine', 'serviette', 'nager', 'plonger'], r: "La piscine panoramique extérieure est ouverte jusqu'à 20h. Des serviettes exclusives sont disponibles dans votre chambre." },
            { k: ['check-out', 'départ', 'partir', 'heure', 'payer'], r: "Le check-out doit être effectué avant 12h00. Si votre vol est plus tard, contactez la réception pour un éventuel départ tardif." },
            { k: ['durabilité', 'éco', 'environnement', 'solaire', 'vert', 'nature'], r: "Un excellent sujet. Nous sommes fiers d'utiliser une énergie 100% solaire, des pratiques agricoles durables et une gestion de l'eau intelligente." },
            { k: ['histoire', 'famille', 'origine', 'ancien', 'fondation'], r: "Les racines de ce domaine s'étendent sur 12 générations. Les terrasses que vous voyez ont été façonnées à la main par nos ancêtres." },
            { k: ['animaux', 'chien', 'chat', 'animal', 'pet-friendly'], r: "Absolument. Nous sommes un établissement de luxe pet-friendly. Des gamelles et un lit douillet attendent votre compagnon dans la chambre." },
            { k: ['végan', 'végétarien', 'gluten', 'allergie', 'régime'], r: "Notre cuisine est totalement adaptable. Le Chef prépare des repas sans gluten, végans ou adaptés aux allergies. Informez-nous simplement à l'avance." },
            { k: ['chambre', 'nettoyage', 'serviettes supplémentaires', 'room service', 'housekeeping', 'sale'], r: "Notre équipe fait le ménage tous les matins. Le room service fonctionne 24h/24 ; appelez la réception pour des serviettes supplémentaires ou un repas." },
            { k: ['transport', 'taxi', 'transfert', 'aéroport', 'train', 'pinhão'], r: "Nous gérons votre logistique. Nous pouvons organiser un transfert privé de luxe vers l'aéroport de Porto ou la gare de Pinhão." },
            { k: ['acheter', 'boutique', 'bouteille', 'vin à emporter', 'commander'], r: "Nous produisons 7 références exclusives. Vous pouvez acheter vos bouteilles dans notre cave ou nous pouvons organiser une expédition internationale." }
        ]
    },
    de: {
        morning: "Guten Morgen.", afternoon: "Guten Tag.", evening: "Guten Abend.",
        welcome: "Willkommen in Quinta do Paraíso. Ich bin Ihr KI-Assistent. Wie kann ich Ihnen helfen?",
        shortGreeting: "Ich höre. Was ist Ihre Frage?",
        placeholder: "Tippen oder sprechen Sie...",
        listening: "Höre auf Ihre Stimme...",
        processing: "Analysiere Daten...",
        notUnderstood: "Ich konnte das nicht verarbeiten. Können Sie das umformulieren?",
        topicsBtn: "Schnelle Themen ⚡",
        catStay: "Unterkunft", catExp: "Erlebnisse", catHelp: "Hilfe",
        chips: { wifi: "🔑 WLAN", breakfast: "☕ Frühstück", reception: "🛎️ Rezeption", restaurant: "🍽️ Restaurant", activities: "🍇 Aktivitäten", pool: "🏊 Pool", checkout: "📅 Check-out", pharmacy: "💊 Apotheke" },
        defaultResp: "Meine Datenbank hat dafür keine genaue Übereinstimmung gefunden. Bitte kontaktieren Sie die Rezeption über die schnellen Themen.",
        voiceLang: "de-DE",
        brain: [
            { k: ['wetter', 'klima', 'heiß', 'sonne', 'temperatur', 'kalt', 'regen'], r: "Zu dieser Jahreszeit ist der Douro normalerweise sonnig, etwa 29 Grad am Nachmittag. Bei dieser Hitze empfehle ich ein Bad in unserem Panoramapool mit einem kühlen Glas Tavedo Rosé." },
            { k: ['müde', 'erschöpfung', 'entspannen', 'massage', 'stress', 'spa', 'rückenschmerzen'], r: "Ich erkenne, dass Sie Ruhe suchen. Unser Vinotherapie-Spa nutzt die Antioxidantien unserer Trauben für tiefe Entspannung. Ich empfehle eine 60-minütige Sitzung." },
            { k: ['restaurant', 'abendessen', 'mittagessen', 'hunger', 'essen', 'menü', 'gerichte'], r: "Unser Fusionsrestaurant steht Ihnen zur Verfügung. Wenn Sie unseren berühmten Lagareiro Oktopus probieren, empfehle ich unseren Weißwein Reserva dazu. Eine perfekte Kombination." },
            { k: ['kinder', 'baby', 'spielen', 'spiele'], r: "Unser Weingut ist ein Familienparadies. Kinder lieben das digitale Spiel 'Wein-Akademie', und der Koch kann spezielle Kindermenüs zubereiten." },
            { k: ['sehenswürdigkeiten', 'besuchen', 'foz côa', 'museum', 'umgebung', 'tour', 'sehen'], r: "Wir befinden uns in einer Weltkulturerbe-Region. Ich empfehle den Archäologischen Park Côa-Tal, gefolgt von einer Bootstour zum Sonnenuntergang." },
            { k: ['wlan', 'wifi', 'internet', 'netzwerk', 'passwort'], r: "Das Passwort für unser High-Speed-WLAN lautet: Paraiso2026. Bitte wählen Sie das Netzwerk 'Quinta do Paraíso Hóspedes'." },
            { k: ['frühstück', 'morgen', 'essen'], r: "Unser Frühstück mit regionalen Produkten und hausgemachten Marmeladen wird zwischen 8:00 und 10:30 Uhr auf der Terrasse serviert." },
            { k: ['rezeption', 'notfall', 'hilfe', 'dringend', 'problem'], r: "Die Rezeption ist rund um die Uhr besetzt. Gehen Sie zum Hauptgebäude oder wählen Sie die 9 auf Ihrem Zimmertelefon." },
            { k: ['apotheke', 'medizin', 'krankenhaus', 'krank'], r: "Die nächste Apotheke ist in Foz Côa, 15 Autominuten entfernt. Für kleinere Probleme haben wir einen Erste-Hilfe-Kasten an der Rezeption." },
            { k: ['aktivitäten', 'wein', 'weinprobe', 'boot', 'jeep', 'ernte', 'weinkeller'], r: "Erlebnisse sind das Herz des Douro. Nehmen Sie um 15:00 Uhr an Weinproben teil oder buchen Sie eine Jeep-Tour durch die Weinberge." },
            { k: ['pool', 'handtuch', 'schwimmen', 'tauchen'], r: "Der Panoramapool ist bis 20:00 Uhr geöffnet. Exklusive Poolhandtücher liegen in Ihrem Zimmer bereit." },
            { k: ['check-out', 'abreise', 'verlassen', 'zeit', 'bezahlen'], r: "Der Check-out muss bis 12:00 Uhr erfolgen. Wenn Ihr Flug später geht, fragen Sie an der Rezeption nach einem Late Check-out." },
            { k: ['nachhaltigkeit', 'öko', 'umwelt', 'solar', 'grün', 'natur'], r: "Wir nutzen 100% Solarenergie, nachhaltige Landwirtschaft und intelligentes Wassermanagement, um dieses magische Ökosystem zu erhalten." },
            { k: ['geschichte', 'familie', 'ursprung', 'alt', 'gründung'], r: "Die Wurzeln dieses Anwesens reichen 12 Generationen zurück. Die Terrassen, die Sie sehen, wurden von unseren Vorfahren von Hand geformt." },
            { k: ['haustiere', 'hund', 'katze', 'tier', 'haustierfreundlich'], r: "Absolut. Wir sind haustierfreundlich. Näpfe und ein bequemes Bett warten in Ihrem Zimmer auf Ihren vierbeinigen Begleiter." },
            { k: ['vegan', 'vegetarisch', 'gluten', 'allergie', 'diät', 'zöliakie'], r: "Unsere Küche ist sehr flexibel. Der Küchenchef bereitet gerne glutenfreie oder vegane Gerichte zu. Geben Sie uns einfach im Voraus Bescheid." },
            { k: ['zimmer', 'reinigung', 'zusätzliche handtücher', 'zimmerservice', 'housekeeping', 'schmutzig'], r: "Unser Housekeeping-Team reinigt täglich am Vormittag. Der Zimmerservice arbeitet 24/7; rufen Sie die Rezeption an, wenn Sie etwas benötigen." },
            { k: ['transport', 'taxi', 'transfer', 'flughafen', 'zug', 'pinhão'], r: "Wir kümmern uns um Ihre Logistik. Wir können einen privaten Luxustransfer zum Flughafen Porto oder zum Bahnhof Pinhão organisieren." },
            { k: ['kaufen', 'geschäft', 'flasche', 'wein mitnehmen', 'bestellen'], r: "Wir produzieren 7 exklusive Weine. Sie können diese in unserem Weinkeller kaufen oder wir organisieren den internationalen Versand zu Ihnen nach Hause." }
        ]
    }
};

let currentLang = localStorage.getItem('qpLang') || 'pt';
let inactivityTimer;
let isSpeaking = false; 
let hasGreeted = false; 

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
}

// ----------------------------------------------------
// SISTEMA DE ESTADO E SONS
// ----------------------------------------------------
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

// ACORDAR A ORBE
orb.addEventListener('click', (e) => {
    e.stopPropagation(); 
    
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


// ----------------------------------------------------
// LÓGICA DO CÉREBRO E PROCESSAMENTO
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
    topicsList.classList.add('hidden'); 
    
    setTimeout(() => {
        let searchTerm = '';
        const dict = langData[currentLang];
        // Mapeamento dos botões rápidos para a base de conhecimento
        if(type === 'wifi') searchTerm = dict.brain[5].k[0];
        if(type === 'breakfast') searchTerm = dict.brain[6].k[0];
        if(type === 'reception') searchTerm = dict.brain[7].k[0];
        if(type === 'pharmacy') searchTerm = dict.brain[8].k[0];
        if(type === 'restaurant') searchTerm = dict.brain[2].k[0];
        if(type === 'activities') searchTerm = dict.brain[9].k[0];
        if(type === 'pool') searchTerm = dict.brain[10].k[0];
        if(type === 'checkout') searchTerm = dict.brain[11].k[0];
        
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

if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}
