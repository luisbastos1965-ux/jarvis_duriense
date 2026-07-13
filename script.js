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
// O "SUPER CÉREBRO": Associações Cognitivas e Multilingue (21 Nós x 5 Línguas)
// ==============================================================================
const langData = {
    pt: {
        morning: "Bom dia.", afternoon: "Boa tarde.", evening: "Boa noite.",
        welcome: "Bem-vindo à Quinta do Paraíso. Sou a sua Inteligência Artificial pessoal. Em que posso ajudar?",
        shortGreeting: "Estou a ouvir. Qual é a sua questão?",
        placeholder: "Escreva ou fale connosco...",
        listening: "A ouvir a sua voz...",
        processing: "A analisar milhares de dados da Quinta...",
        notUnderstood: "Não consegui processar o pedido. Pode reformular?",
        topicsBtn: "Tópicos Rápidos ⚡",
        catStay: "Alojamento", catExp: "Experiências", catHelp: "Assistência",
        chips: { wifi: "🔑 Wi-Fi", breakfast: "☕ Pequeno-almoço", reception: "🛎️ Receção", restaurant: "🍽️ Restaurante", activities: "🍇 Atividades", pool: "🏊 Piscina", checkout: "📅 Check-out", pharmacy: "💊 Farmácia" },
        defaultResp: "A minha base de dados atual não tem uma resposta exata. Sugiro que contacte a nossa receção ou ligue para o número 9 a partir do seu quarto. Resolverão a questão de imediato.",
        voiceLang: "pt-PT",
        brain: [
            // 1. Clima e Sugestões (Chuva vs Calor)
            { k: ['calor', 'sol', 'quente', 'temperatura', 'verão', 'pôr do sol', 'clima'], r: "Com o magnífico calor do Douro, a minha lógica sugere um mergulho na nossa piscina panorâmica acompanhado de um copo de Tavedo Rosé bem fresco servido no bar." },
            { k: ['chuva', 'chover', 'frio', 'inverno', 'mau tempo'], r: "Para dias de chuva, a experiência não para. Sugerimos uma prova de vinhos abrigada na nossa adega secular, seguida de uma sessão relaxante e quente no Spa de Vinoterapia." },
            // 2. Bem-estar (Spa, Cansaço, Massagens)
            { k: ['cansaço', 'cansado', 'relaxar', 'massagem', 'stress', 'spa', 'dor', 'sauna', 'jacuzzi', 'bem-estar', 'yoga', 'ginásio'], r: "O nosso Spa de Vinoterapia utiliza as propriedades antioxidantes das nossas uvas para um relaxamento profundo. Dispomos de massagens, sauna e jacuzzi. Solicite a nossa carta de tratamentos na receção." },
            // 3. Restaurante, Bares e Alimentação
            { k: ['restaurante', 'jantar', 'almoço', 'fome', 'comida', 'menu', 'pratos', 'bar', 'cocktail', 'snack', 'brunch'], r: "O nosso restaurante de fusão e o bar estão à sua disposição. O almoço é das 12h30 às 15h00 e o jantar das 19h30 às 22h30. Se pedir o Polvo à Lagareiro, os meus algoritmos sugerem a harmonização com o Branco Reserva." },
            // 4. Restrições Alimentares
            { k: ['vegan', 'vegetariano', 'glúten', 'alergia', 'dieta', 'celíaco', 'intolerância'], r: "A nossa cozinha é totalmente adaptável. O Chef tem imenso gosto em preparar refeições sem glúten, vegan ou ajustadas a qualquer alergia ou intolerância alimentar. Basta informar-nos." },
            // 5. Família, Crianças e Bebés
            { k: ['crianças', 'filhos', 'bebé', 'berço', 'brincar', 'jogar', 'infantil', 'cama extra'], r: "A Quinta é um refúgio para todas as idades. Disponibilizamos berços e camas extra a pedido. As crianças adoram a 'Academia da Vinha' no nosso site, e o Chef prepara menus infantis." },
            // 6. Atrações Locais e Roteiros
            { k: ['atrações', 'visitar', 'foz côa', 'museu', 'redondezas', 'passear', 'roteiro', 'aldeias', 'miradouros', 'o que fazer'], r: "Estamos numa região riquíssima. Recomendo o Parque Arqueológico do Vale do Côa, os miradouros locais e as Aldeias Vinhateiras. Para um roteiro de meio dia, o Concierge pode desenhar um mapa personalizado." },
            // 7. Wi-Fi e Tecnologias
            { k: ['wi-fi', 'wifi', 'internet', 'rede', 'password', 'senha'], r: "A password da nossa rede Wi-Fi de alta velocidade é: Paraiso2026. Por favor, ligue-se à rede 'Quinta do Paraíso Hóspedes'." },
            // 8. Pequeno-almoço
            { k: ['pequeno-almoço', 'café da manhã', 'pequeno almoço'], r: "O nosso pequeno-almoço repleto de produtos regionais é servido no terraço com vista para o rio, todas as manhãs entre as 8h00 e as 10h30." },
            // 9. Receção, Segurança e Emergências
            { k: ['receção', 'recepção', 'emergência', 'ajuda', 'urgente', 'problema', 'segurança', 'perdido', 'regras'], r: "A nossa receção e segurança funcionam 24/7. Dispomos de kit de primeiros socorros e perdidos e achados. Dirija-se ao edifício principal ou marque 9 no seu telefone." },
            // 10. Saúde (Farmácia e Hospitais)
            { k: ['farmácia', 'remédio', 'medicamento', 'hospital', 'médico', 'centro de saúde', 'doente'], r: "A farmácia, centro de saúde e hospital mais próximos ficam no centro de Foz Côa, a cerca de 15 minutos de carro. Contacte a receção se precisar de assistência imediata." },
            // 11. Atividades e Tours (Barco, Jipe, Caminhadas)
            { k: ['atividades', 'barco', 'jipe', 'caminhada', 'trilhos', 'bicicleta', 'cruzeiro', 'comboio'], r: "Pode explorar a região através dos nossos passeios de jipe pelas vinhas altas, cruzeiros no Barco Rabelo privado, ou trilhos a pé pela propriedade. Fale com a receção para agendar." },
            // 12. Vinhos, Provas e Adega
            { k: ['vinho', 'prova', 'adega', 'degustação', 'enólogo', 'castas', 'vindimas', 'barricas', 'porto', 'produção'], r: "Produzimos vinhos DOC e Vinho do Porto premiados. Temos visitas guiadas à adega e provas comentadas diariamente às 15h00. É uma viagem pelo método de vinificação, desde a barrica até ao copo." },
            // 13. Piscina
            { k: ['piscina', 'nadar', 'mergulho'], r: "A nossa piscina panorâmica exterior está aberta até às 20 horas. Tem à sua disposição toalhas de piscina exclusivas no seu quarto." },
            // 14. Check-in, Check-out e Pagamentos
            { k: ['check-out', 'check in', 'check-in', 'sair', 'partida', 'horas', 'pagar', 'pagamentos', 'fatura', 'cancelamento', 'reserva'], r: "O check-in faz-se a partir das 15h e o check-out até às 12h. Aceitamos todos os cartões, MBWay e numerário. Para alterar reservas, faturação ou pedir um late check-out, a receção está disponível." },
            // 15. Sustentabilidade e Agricultura Bio
            { k: ['sustentabilidade', 'ecológico', 'ambiente', 'solar', 'verde', 'natureza', 'biológica', 'flora', 'fauna', 'oliveiras'], r: "A Quinta orgulha-se de usar energia 100% solar, proteger a fauna local e gerir a água de forma eficiente. A nossa agricultura respeita as oliveiras centenárias e os socalcos naturais do Douro." },
            // 16. História e Património
            { k: ['história', 'família', 'origem', 'antigo', 'fundação'], r: "As raízes desta quinta estendem-se por 12 gerações. Os socalcos de xisto que vê foram moldados à mão pelos nossos antepassados para plantar vinha." },
            // 17. Animais de Estimação
            { k: ['animais', 'cão', 'gato', 'pet', 'pet-friendly', 'animal'], r: "Somos orgulhosamente pet-friendly! O seu companheiro de quatro patas é muito bem-vindo e tem à sua espera comedouros e uma cama confortável." },
            // 18. Quartos, Limpeza e Comodidades
            { k: ['quarto', 'limpeza', 'toalhas', 'serviço de quartos', 'housekeeping', 'sujo', 'televisão', 'tv', 'ar condicionado', 'lavandaria', 'vistas'], r: "Todos os quartos têm vista, smart TV e ar condicionado. O Housekeeping limpa de manhã. Temos lavandaria e serviço de quartos 24h; marque 9 para qualquer pedido." },
            // 19. Transportes, Estacionamento e Logística
            { k: ['transporte', 'táxi', 'transfer', 'aeroporto', 'comboio', 'pinhão', 'estacionamento', 'carro', 'combustível', 'tvde'], r: "Temos parque gratuito com postos de carregamento elétrico. Se precisar de táxi ou transfer privado para o aeroporto ou estação do Pinhão, a receção tratará de tudo." },
            // 20. Eventos, Romantismo e Piqueniques
            { k: ['eventos', 'casamento', 'romântico', 'lua de mel', 'piquenique', 'reunião', 'aniversário', 'workshop'], r: "Preparamos momentos inesquecíveis: piqueniques românticos nas vinhas, celebrações de aniversários ou pequenos eventos privados. O nosso Concierge fará um plano à sua medida." },
            // 21. Loja e Compras
            { k: ['comprar', 'loja', 'garrafa', 'levar vinho', 'encomendar', 'souvenirs', 'cabazes'], r: "Pode adquirir os nossos vinhos, azeite biológico e cabazes regionais na nossa loja física. Também efetuamos envios internacionais para que a experiência continue em sua casa." },
            // 22. Agradecimentos
            { k: ['obrigado', 'obrigada', 'agradeço', 'valeu', 'excelente'], r: "De nada! É um enorme privilégio ter-vos na Quinta do Paraíso. Estou sempre aqui se precisarem de mais alguma coisa." }
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
        defaultResp: "My database didn't find an exact match. I suggest contacting our reception through the quick topics. They will resolve it immediately.",
        voiceLang: "en-GB",
        brain: [
            { k: ['weather', 'climate', 'hot', 'sun', 'temperature', 'cold', 'rain', 'raining', 'summer', 'winter'], r: "The Douro can get quite warm and sunny. I suggest a dip in our panoramic pool with a chilled glass of Rosé. If it rains, our indoor wine cellar and Spa are perfect retreats." },
            { k: ['tired', 'fatigue', 'relax', 'massage', 'stress', 'spa', 'pain', 'sauna', 'gym', 'wellness'], r: "Our Vinotherapy Spa uses the antioxidant properties of our grapes for deep relaxation. We offer massages, a sauna, and jacuzzi. Please ask reception for the menu." },
            { k: ['restaurant', 'dinner', 'lunch', 'hungry', 'food', 'menu', 'dishes', 'bar', 'cocktail', 'snack'], r: "Our fusion restaurant and bar are at your disposal. Lunch is 12:30-15:00 and dinner 19:30-22:30. My algorithms highly recommend pairing the Octopus with our White Reserve." },
            { k: ['vegan', 'vegetarian', 'gluten', 'allergy', 'diet', 'celiac', 'intolerance'], r: "Our Chef is happy to prepare gluten-free, vegan meals, or adjust for any food allergies or intolerances. Please let us know in advance." },
            { k: ['kids', 'children', 'baby', 'play', 'games', 'crib', 'extra bed'], r: "We are a family haven. We provide cribs and extra beds. Children love the 'Vineyard Academy' digital game, and the Chef can prepare custom kids' menus." },
            { k: ['attractions', 'visit', 'foz côa', 'museum', 'surroundings', 'tour', 'see', 'itinerary', 'viewpoint'], r: "We are in a World Heritage region. Visit the Côa Valley Archaeological Park and the local viewpoints. Reception can craft a custom half-day itinerary." },
            { k: ['wi-fi', 'wifi', 'internet', 'network', 'password'], r: "The password for our high-speed Wi-Fi is: Paraiso2026. Please connect to 'Quinta do Paraíso Hóspedes'." },
            { k: ['breakfast', 'morning', 'eat'], r: "Our breakfast featuring regional products is served on the river-view terrace every morning between 8:00 AM and 10:30 AM." },
            { k: ['reception', 'emergency', 'help', 'urgent', 'problem', 'safety', 'lost', 'rules'], r: "Reception and security operate 24/7. We have a first-aid kit and lost & found. Dial 9 on your room phone for immediate assistance." },
            { k: ['pharmacy', 'medicine', 'hospital', 'sick', 'doctor', 'health'], r: "The nearest pharmacy and hospital are in Foz Côa, a 15-minute drive away. For minor issues, we have a first-aid kit at reception." },
            { k: ['activities', 'boat', 'jeep', 'walk', 'trail', 'bicycle', 'cruise', 'train'], r: "Explore the region through our jeep tours, private Rabelo Boat cruises, or walking trails through the vineyards. Contact reception to book." },
            { k: ['wine', 'tasting', 'cellar', 'harvest', 'barrel', 'port', 'production', 'winemaker'], r: "We produce award-winning DOC and Port wines. We host guided cellar tours and tastings daily at 3:00 PM. It's a journey from the barrel to the glass." },
            { k: ['pool', 'swim', 'dive'], r: "The outdoor panoramic pool is open until 8:00 PM. Exclusive pool towels are available in your room." },
            { k: ['check-out', 'check in', 'check-in', 'leave', 'departure', 'time', 'pay', 'invoice', 'reservation', 'cancel'], r: "Check-in is at 3:00 PM and check-out by 12:00 PM. We accept all cards and cash. For invoices or late check-out, please contact reception." },
            { k: ['sustainability', 'eco', 'environment', 'solar', 'green', 'nature', 'flora', 'organic'], r: "We use 100% solar energy and practice sustainable farming, protecting local flora and fauna to preserve this magical ecosystem." },
            { k: ['history', 'family', 'origin', 'old', 'foundation'], r: "This estate's roots span 12 generations. The schist terraces you see outside were shaped by hand by our ancestors." },
            { k: ['pets', 'dog', 'cat', 'animal', 'pet-friendly'], r: "We are proudly pet-friendly! Your four-legged companion is very welcome. We provide bowls and a comfortable bed." },
            { k: ['room', 'cleaning', 'towels', 'room service', 'housekeeping', 'dirty', 'tv', 'ac', 'laundry'], r: "All rooms feature river views, AC, and a smart TV. Housekeeping cleans in the morning. Dial 9 for 24/7 room service or laundry." },
            { k: ['transport', 'taxi', 'transfer', 'airport', 'train', 'parking', 'car', 'fuel'], r: "We have free parking with EV chargers. If you need a taxi or a private transfer to the airport or train station, reception will arrange it." },
            { k: ['events', 'wedding', 'romantic', 'honeymoon', 'picnic', 'meeting', 'birthday', 'workshop'], r: "We craft unforgettable moments: romantic vineyard picnics, private events, or birthdays. Our Concierge will plan everything for you." },
            { k: ['buy', 'shop', 'bottle', 'take wine', 'order', 'souvenir', 'hamper'], r: "You can buy our wines, organic olive oil, and regional hampers in our shop. We also handle international shipping to your home." },
            { k: ['thank', 'thanks', 'excellent', 'great'], r: "You're very welcome! It's an honor to have you at Quinta do Paraíso. Let me know if you need anything else." }
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
        defaultResp: "Mi base de datos no encontró una respuesta. Sugiero contactar con recepción a través de los temas rápidos. Lo resolverán de inmediato.",
        voiceLang: "es-ES",
        brain: [
            { k: ['tiempo', 'clima', 'calor', 'sol', 'temperatura', 'frío', 'llover', 'lluvia', 'verano'], r: "Si hace calor, mi lógica sugiere un chapuzón en nuestra piscina con una copa de Tavedo Rosé. Si llueve, nuestra bodega y Spa son los refugios perfectos." },
            { k: ['cansancio', 'cansado', 'relajar', 'masaje', 'estrés', 'spa', 'dolor', 'sauna', 'gimnasio', 'bienestar'], r: "Nuestro Spa de Vinoterapia utiliza antioxidantes de nuestras uvas para la relajación profunda. Tenemos masajes, sauna y jacuzzi. Pide el menú en recepción." },
            { k: ['restaurante', 'cena', 'comida', 'hambre', 'almuerzo', 'menú', 'platos', 'bar', 'snack'], r: "El restaurante y bar están a tu disposición. Almuerzo de 12:30 a 15:00 y cena de 19:30 a 22:30. Sugiero el Pulpo a la Lagareiro con nuestro Blanco Reserva." },
            { k: ['vegano', 'vegetariano', 'gluten', 'alergia', 'dieta', 'celíaco', 'intolerancia'], r: "Nuestra cocina es totalmente adaptable. El Chef prepara comidas sin gluten o veganas, y se ajusta a alergias. Solo avísanos con antelación." },
            { k: ['niños', 'hijos', 'bebé', 'jugar', 'cuna', 'infantil', 'cama extra'], r: "Somos un refugio familiar. Disponemos de cunas y camas supletorias. A los niños les encanta el juego 'Academia de la Viña', y hay menús infantiles." },
            { k: ['atracciones', 'visitar', 'foz côa', 'museo', 'alrededores', 'pasear', 'ver', 'ruta'], r: "Estamos en una región Patrimonio de la Humanidad. Recomiendo el Parque Arqueológico del Valle del Côa y un paseo al atardecer en nuestro Barco Rabelo." },
            { k: ['wi-fi', 'wifi', 'internet', 'red', 'contraseña', 'clave'], r: "La contraseña de nuestro Wi-Fi de alta velocidad es: Paraiso2026. Selecciona la red 'Quinta do Paraíso Hóspedes'." },
            { k: ['desayuno', 'mañana', 'comer'], r: "Nuestro desayuno con productos regionales se sirve en la terraza con vistas al río, entre las 8:00 y las 10:30." },
            { k: ['recepción', 'recepcion', 'emergencia', 'ayuda', 'urgente', 'problema', 'seguridad', 'perdido'], r: "La recepción opera 24/7. Tenemos botiquín y objetos perdidos. Puedes ir al edificio principal o marcar el número 9 en tu habitación." },
            { k: ['farmacia', 'medicina', 'hospital', 'enfermo', 'médico', 'salud'], r: "La farmacia y el hospital están en Foz Côa, a 15 minutos en coche. Para casos leves, hay un botiquín en recepción." },
            { k: ['actividades', 'barco', 'jeep', 'caminata', 'bici', 'crucero', 'tren'], r: "Explora la región en jeep, en barco rabelo privado o caminando por los viñedos. Contacta con recepción para reservar." },
            { k: ['vino', 'cata', 'bodega', 'vendimia', 'barrica', 'producción', 'oporto', 'enólogo'], r: "Producimos vinos premiados. Tenemos visitas guiadas y catas en la bodega diariamente a las 15h00. Un viaje desde la barrica a la copa." },
            { k: ['piscina', 'toalla', 'nadar', 'baño'], r: "La piscina panorámica exterior está abierta hasta las 20 horas. Hay toallas exclusivas en tu habitación." },
            { k: ['check-out', 'check in', 'salida', 'irse', 'hora', 'pagar', 'factura', 'reserva'], r: "El check-in es a las 15h y el check-out a las 12h. Aceptamos todos los pagos. Contacta con recepción para facturas o late check-out." },
            { k: ['sostenibilidad', 'ecológico', 'ambiente', 'solar', 'verde', 'naturaleza', 'bio'], r: "Usamos energía 100% solar, agricultura sostenible y gestión del agua para proteger este mágico ecosistema del Duero." },
            { k: ['historia', 'familia', 'origen', 'antiguo', 'fundación'], r: "Las raíces de esta finca abarcan 12 generaciones. Los bancales que ves fueron moldeados a mano por nuestros antepasados." },
            { k: ['mascotas', 'perro', 'gato', 'animal', 'pet-friendly'], r: "¡Somos un alojamiento pet-friendly! Proveemos comederos y una cama muy cómoda para tu mascota en tu habitación." },
            { k: ['habitación', 'limpieza', 'toallas', 'servicio de habitaciones', 'housekeeping', 'sucio', 'tv', 'aire'], r: "Nuestras habitaciones tienen TV, aire acondicionado y limpieza matutina. Llama al 9 para lavandería o servicio de habitaciones 24h." },
            { k: ['transporte', 'taxi', 'transfer', 'aeropuerto', 'tren', 'parking', 'coche'], r: "Tenemos parking gratuito con cargador para VE. Organizamos transfers de lujo al aeropuerto o a la estación de Pinhão. Pregunta en recepción." },
            { k: ['eventos', 'boda', 'romántico', 'picnic', 'reunión', 'cumpleaños'], r: "Preparamos picnics románticos, cumpleaños y eventos privados. Nuestro Concierge planificará todo a tu medida." },
            { k: ['comprar', 'tienda', 'botella', 'llevar vino', 'pedir', 'souvenir'], r: "Puedes adquirir nuestros vinos, aceite y cestas regionales en la tienda. También ofrecemos envío internacional." },
            { k: ['gracias', 'gracia', 'genial', 'excelente'], r: "¡De nada! Es un honor teneros en Quinta do Paraíso. Avísame si necesitas algo más." }
        ]
    },
    fr: {
        morning: "Bonjour.", afternoon: "Bon après-midi.", evening: "Bonsoir.",
        welcome: "Bienvenue à Quinta do Paraíso. Je suis votre assistant IA. Comment puis-je vous aider?",
        shortGreeting: "Je vous écoute. Quelle est votre question?",
        placeholder: "Écrivez ou parlez...",
        listening: "J'écoute votre voix...",
        processing: "Analyse des données...",
        notUnderstood: "Je n'ai pas pu traiter la demande. Pouvez-vous reformuler?",
        topicsBtn: "Sujets Rapides ⚡",
        catStay: "Hébergement", catExp: "Expériences", catHelp: "Assistance",
        chips: { wifi: "🔑 Wi-Fi", breakfast: "☕ Petit-déjeuner", reception: "🛎️ Réception", restaurant: "🍽️ Restaurant", activities: "🍇 Activités", pool: "🏊 Piscine", checkout: "📅 Départ", pharmacy: "💊 Pharmacie" },
        defaultResp: "Ma base de données n'a pas trouvé de réponse exacte. Je suggère de contacter notre réception via les sujets rapides.",
        voiceLang: "fr-FR",
        brain: [
            { k: ['météo', 'climat', 'chaud', 'soleil', 'température', 'froid', 'pleuvoir', 'pluie', 'été'], r: "S'il fait chaud, profitez de notre piscine avec un verre de Rosé. S'il pleut, notre cave et notre Spa sont d'excellents refuges." },
            { k: ['fatigue', 'fatigué', 'relaxer', 'massage', 'stress', 'spa', 'douleur', 'sauna', 'bien-être'], r: "Notre Spa de Vinothérapie offre une relaxation profonde. Nous avons des massages, sauna et jacuzzi. Demandez la carte à la réception." },
            { k: ['restaurant', 'dîner', 'déjeuner', 'faim', 'nourriture', 'menu', 'plats', 'bar'], r: "Le restaurant et le bar sont ouverts (12h30-15h00 et 19h30-22h30). Je recommande d'accompagner le Poulpe avec notre Vin Blanc Réserve." },
            { k: ['végan', 'végétarien', 'gluten', 'allergie', 'régime', 'intolérance'], r: "Notre Chef prépare des repas sans gluten, végans ou adaptés aux allergies. Informez-nous à l'avance." },
            { k: ['enfants', 'bébé', 'jouer', 'jeux', 'berceau', 'lit'], r: "La Quinta est un domaine familial. Nous fournissons des lits bébé. Les enfants adorent le jeu 'Académie de la Vigne' et les menus enfants." },
            { k: ['attractions', 'visiter', 'foz côa', 'musée', 'environs', 'promenade', 'voir'], r: "Visitez le Parc Archéologique de la Vallée du Côa et faites une balade sur notre bateau privé. La réception peut créer un itinéraire." },
            { k: ['wi-fi', 'wifi', 'internet', 'réseau', 'mot de passe'], r: "Le mot de passe Wi-Fi est : Paraiso2026. Sélectionnez le réseau 'Quinta do Paraíso Hóspedes'." },
            { k: ['petit-déjeuner', 'matin', 'manger'], r: "Le petit-déjeuner régional est servi sur la terrasse avec vue, entre 8h00 et 10h30." },
            { k: ['réception', 'urgence', 'aide', 'urgent', 'problème', 'sécurité'], r: "La réception et la sécurité fonctionnent 24h/24. Trousse de secours disponible. Composez le 9 sur le téléphone de la chambre." },
            { k: ['pharmacie', 'médicament', 'hôpital', 'malade', 'médecin'], r: "La pharmacie et l'hôpital sont à Foz Côa (15 min). Nous avons une trousse de premiers secours à la réception." },
            { k: ['activités', 'bateau', 'jeep', 'randonnée', 'vélo', 'croisière'], r: "Découvrez la région en jeep, en bateau privé ou à pied. Contactez la réception pour réserver." },
            { k: ['vin', 'dégustation', 'cave', 'vendange', 'production', 'œnologue', 'porto'], r: "Nous produisons du vin DOC et du Porto. Dégustations guidées à la cave tous les jours à 15h. C'est un voyage inoubliable." },
            { k: ['piscine', 'serviette', 'nager', 'plonger'], r: "La piscine panoramique est ouverte jusqu'à 20h. Des serviettes exclusives sont dans votre chambre." },
            { k: ['check-out', 'départ', 'partir', 'heure', 'payer', 'facture', 'check-in'], r: "Le check-in est à 15h, le check-out à 12h00. Nous acceptons tous les paiements. Demandez à la réception pour un départ tardif." },
            { k: ['durabilité', 'éco', 'environnement', 'solaire', 'vert', 'nature', 'bio'], r: "Nous utilisons 100% d'énergie solaire et une agriculture durable pour protéger l'écosystème du Douro." },
            { k: ['histoire', 'famille', 'origine', 'ancien', 'fondation'], r: "Les racines du domaine couvrent 12 générations. Les terrasses ont été façonnées à la main par nos ancêtres." },
            { k: ['animaux', 'chien', 'chat', 'animal', 'pet-friendly'], r: "Nous sommes un établissement pet-friendly. Des gamelles et un lit confortable attendent votre animal." },
            { k: ['chambre', 'nettoyage', 'serviettes', 'room service', 'housekeeping', 'sale', 'télé'], r: "Ménage le matin. Nos chambres ont TV et clim. Appelez le 9 pour le room service 24h/24 ou la blanchisserie." },
            { k: ['transport', 'taxi', 'transfert', 'aéroport', 'train', 'parking', 'voiture'], r: "Parking gratuit avec chargeur électrique. Nous organisons des transferts privés vers l'aéroport ou la gare. Demandez à la réception." },
            { k: ['événements', 'mariage', 'romantique', 'pique-nique', 'réunion', 'anniversaire'], r: "Nous organisons des pique-niques dans les vignes et des événements privés sur mesure. Parlez à notre Concierge." },
            { k: ['acheter', 'boutique', 'bouteille', 'commander', 'souvenir'], r: "Achetez nos vins et huiles d'olive dans notre boutique. Nous proposons également des expéditions internationales." },
            { k: ['merci', 'super', 'excellent', 'parfait'], r: "De rien ! C'est un privilège de vous accueillir. Je suis toujours là si besoin." }
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
            { k: ['wetter', 'klima', 'heiß', 'sonne', 'temperatur', 'kalt', 'regen', 'regnen', 'sommer'], r: "Bei Hitze empfehle ich ein Bad in unserem Panoramapool mit einem kühlen Glas Rosé. Bei Regen sind unser Weinkeller und das Spa perfekte Rückzugsorte." },
            { k: ['müde', 'erschöpfung', 'entspannen', 'massage', 'stress', 'spa', 'schmerz', 'sauna', 'wellness'], r: "Unser Vinotherapie-Spa nutzt Antioxidantien der Trauben für tiefe Entspannung. Wir haben Massagen, Sauna und Jacuzzi." },
            { k: ['restaurant', 'abendessen', 'mittagessen', 'hunger', 'essen', 'menü', 'gerichte', 'bar'], r: "Das Restaurant ist von 12:30-15:00 und 19:30-22:30 Uhr geöffnet. Ich empfehle den Oktopus mit unserem Weißwein Reserva." },
            { k: ['vegan', 'vegetarisch', 'gluten', 'allergie', 'diät', 'zöliakie'], r: "Unser Küchenchef bereitet gerne glutenfreie oder vegane Gerichte zu. Geben Sie uns einfach im Voraus Bescheid." },
            { k: ['kinder', 'baby', 'spielen', 'spiele', 'kinderbett'], r: "Wir sind familienfreundlich und stellen Kinderbetten bereit. Kinder lieben unser digitales Spiel, und es gibt Kindermenüs." },
            { k: ['sehenswürdigkeiten', 'besuchen', 'foz côa', 'museum', 'umgebung', 'tour', 'sehen'], r: "Besuchen Sie den Archäologischen Park Côa-Tal und machen Sie eine private Bootstour. Die Rezeption plant gerne eine Route für Sie." },
            { k: ['wlan', 'wifi', 'internet', 'netzwerk', 'passwort'], r: "Das WLAN-Passwort lautet: Paraiso2026. Netzwerk: 'Quinta do Paraíso Hóspedes'." },
            { k: ['frühstück', 'morgen', 'essen'], r: "Unser Frühstück mit regionalen Produkten wird von 8:00 bis 10:30 Uhr auf der Flussterrasse serviert." },
            { k: ['rezeption', 'notfall', 'hilfe', 'dringend', 'problem', 'sicherheit'], r: "Die Rezeption ist rund um die Uhr besetzt. Wählen Sie die 9 auf Ihrem Zimmertelefon für sofortige Hilfe." },
            { k: ['apotheke', 'medizin', 'krankenhaus', 'krank', 'arzt'], r: "Die nächste Apotheke ist in Foz Côa (15 Min). Ein Erste-Hilfe-Kasten befindet sich an der Rezeption." },
            { k: ['aktivitäten', 'boot', 'jeep', 'wandern', 'fahrrad', 'kreuzfahrt'], r: "Erkunden Sie die Region bei Jeep-Touren, privaten Bootsfahrten oder auf Wanderwegen. Buchen Sie an der Rezeption." },
            { k: ['wein', 'weinprobe', 'weinkeller', 'ernte', 'produktion', 'porto'], r: "Wir produzieren prämierte Weine. Nehmen Sie täglich um 15:00 Uhr an einer geführten Kellertour und Weinprobe teil." },
            { k: ['pool', 'handtuch', 'schwimmen', 'tauchen'], r: "Der Panoramapool ist bis 20:00 Uhr geöffnet. Exklusive Handtücher liegen in Ihrem Zimmer bereit." },
            { k: ['check-out', 'check-in', 'abreise', 'verlassen', 'zeit', 'bezahlen', 'rechnung'], r: "Check-in ab 15:00 Uhr, Check-out bis 12:00 Uhr. Kontaktieren Sie die Rezeption für einen Late Check-out." },
            { k: ['nachhaltigkeit', 'öko', 'umwelt', 'solar', 'grün', 'natur', 'bio'], r: "Wir nutzen 100% Solarenergie und nachhaltige Landwirtschaft zum Schutz des Douro-Ökosystems." },
            { k: ['geschichte', 'familie', 'ursprung', 'alt', 'gründung'], r: "Die Wurzeln dieses Anwesens reichen 12 Generationen zurück. Die Terrassen wurden von unseren Vorfahren von Hand geformt." },
            { k: ['haustiere', 'hund', 'katze', 'tier', 'haustierfreundlich'], r: "Wir sind haustierfreundlich! Näpfe und ein bequemes Bett warten in Ihrem Zimmer auf Ihren Begleiter." },
            { k: ['zimmer', 'reinigung', 'handtücher', 'zimmerservice', 'housekeeping', 'schmutzig', 'klima'], r: "Housekeeping reinigt morgens. Die Zimmer haben Klimaanlage und Smart-TV. Wählen Sie die 9 für 24/7 Zimmerservice." },
            { k: ['transport', 'taxi', 'transfer', 'flughafen', 'zug', 'pinhão', 'parken', 'auto'], r: "Kostenlose Parkplätze mit E-Ladestation. Wir organisieren gerne Transfers zum Flughafen oder Bahnhof." },
            { k: ['events', 'hochzeit', 'romantisch', 'picknick', 'meeting', 'geburtstag'], r: "Wir planen romantische Picknicks oder private Events. Unser Concierge kümmert sich um alles." },
            { k: ['kaufen', 'geschäft', 'flasche', 'wein mitnehmen', 'bestellen', 'souvenir'], r: "Kaufen Sie unsere Weine und Olivenöl im Shop. Wir bieten auch internationalen Versand an." },
            { k: ['danke', 'super', 'hervorragend', 'perfekt'], r: "Gern geschehen! Es ist eine Ehre, Sie als Gast zu haben. Sagen Sie Bescheid, wenn Sie noch etwas brauchen." }
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
        if(type === 'wifi') searchTerm = dict.brain[7].k[0]; 
        if(type === 'breakfast') searchTerm = dict.brain[8].k[0]; 
        if(type === 'reception') searchTerm = dict.brain[9].k[0]; 
        if(type === 'restaurant') searchTerm = dict.brain[3].k[0]; 
        if(type === 'activities') searchTerm = dict.brain[11].k[0]; 
        if(type === 'pool') searchTerm = dict.brain[13].k[0]; 
        if(type === 'checkout') searchTerm = dict.brain[14].k[0]; 
        if(type === 'pharmacy') searchTerm = dict.brain[10].k[0]; 
        
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
