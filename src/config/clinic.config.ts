import type { ClinicConfig, Photo, Treatment } from './schema.ts'

const photo = (name: string, alt: string): Photo => ({ src: '/images/' + name + '.webp', alt })
const lounge = photo('recepcao', 'Conceito visual de recepção com pedra natural, madeira e poltronas claras')
const chair = photo('consultorio', 'Conceito visual de consultório com cadeira odontológica e luz natural')
const equipment = photo('equipamentos', 'Imagem conceitual de equipamentos odontológicos em detalhe')
const corridor = photo('interior', 'Conceito visual de corredor interno com painéis de madeira')
const hero = photo('hero', 'Retrato ilustrativo de uma mulher sorrindo naturalmente')
const treatment = (id: string, title: string, summary: string, details: string, icon: Treatment['icon'], image: Photo): Treatment => ({ id, title, summary, details, icon, image })

export const clinicConfig = {
  name: 'AXYRON ODONTOLOGIA', brand: 'AXYRON', brandLine: 'ODONTOLOGIA', logo: '', favicon: '/brand.svg',
  slogan: 'Seu sorriso merece uma experiência extraordinária.',
  preset: 'Emerald Luxury', colors: {}, fonts: { heading: 'Newsreader', body: 'Manrope' }, motion: 'full', demo: true,
  contact: { whatsapp: '', phone: '', email: '', instagram: '', address: '', city: '', region: '', postalCode: '', country: 'BR', hours: [], maps: '', embed: '' },
  sections: { marquee: true, about: true, treatments: true, experience: true, gallery: true, team: true, reviews: true, faq: true, contact: true },
  photos: { hero, heroMobile: '/images/hero-mobile.webp', about: lounge, detail: chair, credit: 'Imagens conceituais para a demonstração.',
    gallery: [{ ...lounge, title: 'Recepção' }, { ...chair, title: 'Consultórios' }, { ...photo('sala', 'Conceito visual de sala de atendimento odontológico'), title: 'Sala de atendimento' }, { ...equipment, title: 'Equipamentos' }, { ...corridor, title: 'Ambiente interno' }] },
  copy: {
    heroTag: 'ODONTOLOGIA CONTEMPORÂNEA',
    heroEmphasis: 'uma experiência extraordinária.',
    heroDescription: 'Odontologia moderna, cuidado humanizado e atenção aos detalhes em cada etapa do seu atendimento.',
    aboutTitle: 'Mais do que cuidar de dentes. Cuidamos de pessoas.',
    aboutIntro: 'O cuidado começa pela escuta. Conhecer sua história, entender suas dúvidas e respeitar o seu tempo faz parte do atendimento.',
    aboutBody: 'Da primeira conversa ao acompanhamento, você recebe orientações claras em um ambiente pensado para que possa se sentir à vontade.',
    treatmentTitle: 'Cuidado para cada sorriso.',
    treatmentIntro: 'Conheça as opções de cuidado para sua saúde bucal. A avaliação é o primeiro passo para entender quais delas fazem sentido para você.',
    experienceTitle: 'O cuidado está nos detalhes.',
    experienceIntro: 'Uma consulta é também um espaço para conversar, fazer perguntas e participar das decisões sobre seu cuidado.',
    galleryTitle: 'Um espaço para se sentir à vontade.',
    galleryIntro: 'Materiais naturais, luz suave e ambientes pensados para acolher.',
    bookingTitle: 'Vamos conversar sobre o seu sorriso?',
    bookingIntro: 'Preencha seus dados para preparar uma mensagem. A clínica confirma a disponibilidade em conversa pelo WhatsApp.',
    privacy: 'Usamos os dados preenchidos para preparar sua mensagem neste navegador. O site não registra esses dados. Ao continuar, o WhatsApp receberá o texto para exibição e você poderá revisá-lo antes de enviar. A conversa segue as políticas do WhatsApp e da clínica. Evite incluir informações clínicas na mensagem inicial.',
    specialties: ['Implantodontia', 'Estética dental', 'Ortodontia', 'Clareamento', 'Prevenção', 'Reabilitação oral'],
    benefits: [
      { title: 'Atendimento humanizado', description: 'Escuta e diálogo desde a primeira conversa.' },
      { title: 'Planejamento individualizado', description: 'As opções de cuidado são discutidas a partir da sua avaliação.' },
      { title: 'Ambiente acolhedor', description: 'Espaços pensados para uma visita mais tranquila.' },
      { title: 'Tecnologia aplicada ao atendimento', description: 'Recursos usados conforme a indicação para cada caso.' },
      { title: 'Atenção ao conforto', description: 'Tempo para perguntas, pausas e ajustes durante o atendimento.' },
      { title: 'Orientação em todas as etapas', description: 'Informações sobre o plano, os procedimentos e os próximos passos.' },
    ],
  },
  treatments: [
    treatment('implantodontia', 'Implantodontia', 'Planejamento para repor dentes perdidos.', 'A avaliação considera a saúde bucal e a estrutura óssea para discutir opções de reabilitação, etapas e acompanhamento.', 'scan', photo('implantes', 'Representação ilustrativa de coroa e componente de implante odontológico')),
    treatment('ortodontia', 'Ortodontia', 'Cuidado com o alinhamento dos dentes e a mordida.', 'O planejamento ortodôntico parte da avaliação da posição dos dentes e da mordida para orientar a escolha do aparelho e o acompanhamento.', 'align', photo('alinhador', 'Alinhador ortodôntico transparente sobre fundo verde')),
    treatment('clareamento', 'Clareamento dental', 'Opções para clarear os dentes com orientação profissional.', 'Na consulta, são avaliadas a causa da alteração de cor, a sensibilidade e as opções indicadas para o seu caso.', 'sparkles', photo('estetica', 'Retrato conceitual de um sorriso natural')),
    treatment('lentes', 'Lentes de contato dental', 'Avaliação estética da forma e da proporção dos dentes.', 'A indicação de facetas requer avaliação da estrutura dentária, da mordida e dos objetivos do paciente. A consulta permite discutir alternativas e manutenção.', 'layers', photo('ceramica', 'Seleção de amostras de cor de cerâmica odontológica')),
    treatment('proteses', 'Prótese dentária', 'Soluções para reabilitar a mastigação e o sorriso.', 'O tipo de prótese depende das condições da boca e dos objetivos do cuidado. A avaliação orienta a discussão de materiais e manutenção.', 'layers', photo('implantes', 'Ilustração de coroa odontológica em cerâmica')),
    treatment('prevencao', 'Limpeza e prevenção', 'Higiene profissional e orientação para o dia a dia.', 'A consulta permite avaliar a saúde gengival, remover depósitos quando indicado e orientar a rotina de higiene.', 'shield', photo('prevencao', 'Espelho e instrumentos odontológicos em tecido verde')),
    treatment('endodontia', 'Endodontia', 'Avaliação e cuidado da parte interna do dente.', 'A avaliação identifica se há indicação de tratamento dos canais e ajuda a planejar os cuidados posteriores.', 'heart', equipment),
    treatment('avaliacao', 'Avaliação odontológica', 'Uma conversa sobre a sua saúde bucal e suas dúvidas.', 'Na consulta inicial, o profissional escuta suas prioridades, avalia sua saúde bucal e explica as opções pertinentes.', 'scan', lounge),
  ],
  team: [], reviews: [],
  faq: [
    { question: 'Como solicitar uma avaliação?', answer: 'Preencha o formulário de atendimento e escolha avaliação odontológica. Revise a mensagem no WhatsApp antes de enviar.' },
    { question: 'Quais tratamentos são oferecidos?', answer: 'A seção Tratamentos apresenta as áreas de cuidado. A consulta é o momento de discutir indicações para cada caso.' },
    { question: 'Como funciona o atendimento?', answer: 'O primeiro contato é usado para verificar disponibilidade. Na consulta, você pode explicar suas prioridades e tirar dúvidas sobre os próximos passos.' },
    { question: 'Onde a clínica está localizada?', answer: 'Consulte os dados de endereço na seção Contato quando estiverem disponíveis.' },
    { question: 'Quais são os horários de funcionamento?', answer: 'Consulte os horários informados na seção Contato e confirme a disponibilidade antes de se deslocar.' },
    { question: 'Como entrar em contato?', answer: 'Use o formulário de agendamento ou os canais disponíveis na seção Contato.' },
  ],
  seo: { title: 'AXYRON Odontologia | Odontologia contemporânea', description: 'Conheça a proposta de cuidado da AXYRON Odontologia e prepare uma solicitação de avaliação.', domain: '', shareImage: '/images/hero.webp', noindex: true },
  signature: { label: 'Desenvolvido por AXYRON', url: '' }, registration: '',
} satisfies ClinicConfig
