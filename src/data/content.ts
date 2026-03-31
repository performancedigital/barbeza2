import type { Service, GalleryItem, Testimonial, Stat, BusinessHours, SpaceRoom } from '@/types'

export const BUSINESS = {
  name: 'BARBEZA BARBEARIA',
  slogan: 'Experiência Masculina',
  tagline: 'Corte, barba e atendimento diferenciado',
  address: 'Av. Selim José de Sales, Bethânia',
  city: 'Ipatinga — MG',
  fullAddress: 'Avenida Selim José de Sales, Bethânia, Ipatinga - MG',
  phone: '(31) 9831-3831',
  whatsapp: '5531983143831',
  instagram: 'barbezabarbearia',
  instagramUrl: 'https://www.instagram.com/barbezabarbearia',
  inbarberUrl: 'https://chat.inbarberapp.com/AGENDABARBEZA',
  googleMapsUrl: 'https://maps.google.com/maps?q=Avenida+Selim+Jose+de+Sales+Bethania+Ipatinga+MG&output=embed',
  googleMapsLink: 'https://maps.google.com/?q=Avenida+Selim+Jose+de+Sales+Bethania+Ipatinga+MG',
} as const

export const SERVICES: Service[] = [
  { id: 'corte',  name: 'Corte',              price: 50,  duration: '45 min',   icon: 'Scissors', description: 'Corte masculino personalizado com técnica e precisão. Lavagem e finalização incluídas.' },
  { id: 'barba',  name: 'Barba',              price: 30,  duration: '30 min',   icon: 'Smile',    description: 'Modelagem e aparagem de barba com navalha e produtos premium. Toalha quente e hidratação.' },
  { id: 'combo',  name: 'Combo',              price: 70,  duration: '1h 15min', icon: 'Sparkles', description: 'Corte + Barba completos. A experiência masculina completa com desconto especial.', featured: true },
  { id: 'noivo',  name: 'Making Of do Noivo', price: 150, duration: '2h',       icon: 'Crown',    description: 'Preparação completa para o grande dia. Corte, barba, hidratação e tratamento premium.', premium: true },
]

export const HOURS: BusinessHours = {
  monday:    { label: 'Segunda-feira', open: '09:00', close: '19:00', active: true  },
  tuesday:   { label: 'Terça-feira',   open: '09:00', close: '19:00', active: true  },
  wednesday: { label: 'Quarta-feira',  open: '09:00', close: '19:00', active: true  },
  thursday:  { label: 'Quinta-feira',  open: '09:00', close: '19:00', active: true  },
  friday:    { label: 'Sexta-feira',   open: '09:00', close: '20:00', active: true  },
  saturday:  { label: 'Sábado',        open: '08:00', close: '18:00', active: true  },
  sunday:    { label: 'Domingo',       open: '',      close: '',      active: false },
}

export const GALLERY: GalleryItem[] = [
  { id: '1', file: '/assets/images/gallery-01.jpg', alt: 'Corte masculino degrê',     category: 'cortes'   },
  { id: '2', file: '/assets/images/gallery-02.jpg', alt: 'Barba modelada com navalha',  category: 'barbas'   },
  { id: '3', file: '/assets/images/gallery-03.jpg', alt: 'Interior da barbearia',       category: 'ambiente' },
  { id: '4', file: '/assets/images/gallery-04.jpg', alt: 'Corte social clássico',      category: 'cortes'   },
  { id: '5', file: '/assets/images/gallery-05.jpg', alt: 'Cadeiras de barbeiro',        category: 'ambiente' },
  { id: '6', file: '/assets/images/gallery-06.jpg', alt: 'Barba completa e estilizada', category: 'barbas'   },
]

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Rafael Mendes',  text: 'Melhor barbearia de Ipatinga! Atendimento impecável, ambiente incrível e o corte ficou perfeito. Não troco por nada.', rating: 5, service: 'Combo' },
  { id: '2', name: 'Lucas Ferreira', text: 'Fiz o Making Of do Noivo e saí de lá me sentindo o cara mais bem cuidado do mundo. Recomendo 100%!', rating: 5, service: 'Making Of do Noivo' },
  { id: '3', name: 'Bruno Alves',    text: 'Frequento toda semana. O cuidado com cada detalhe é o que diferencia a Barbeza. Ambiente top demais.', rating: 5, service: 'Corte + Barba' },
  { id: '4', name: 'Diego Costa',    text: 'Profissionalismo e qualidade acima da média. A barba ficou impecável, melhor da cidade.', rating: 5, service: 'Barba' },
]

export const STATS: Stat[] = [
  { label: 'Seguidores',          value: 1199, suffix: '+',  prefix: ''   },
  { label: 'Clientes Atendidos',  value: 500,  suffix: '+',  prefix: ''   },
  { label: 'Avaliação',           value: 5,    suffix: '.0', prefix: '★ ' },
  { label: 'Anos de Experiência', value: 3,    suffix: '+',  prefix: ''   },
]

export const SPACE_ROOMS: SpaceRoom[] = [
  { id: 'area-corte', label: 'Área de Corte', description: 'Estações de trabalho premium com cadeiras de barbeiro tradicionais e iluminação profissional para cada detalhe do seu estilo.', image: '/assets/renders/render-01.jpg', badge: 'NOVO ESPAÇO'  },
  { id: 'recepcao',   label: 'Recepção',        description: 'Ambiente acolhedor onde a experiência começa. Design sofisticado em tons escuros e dourados que define o padrão Barbeza.',      image: '/assets/renders/render-02.jpg', badge: 'EM BREVE'     },
  { id: 'sala-vip',   label: 'Sala VIP',         description: 'Espaço exclusivo para atendimentos especiais como o Making Of do Noivo. Privacidade e luxo para o seu momento.',                image: '/assets/renders/render-03.jpg', badge: 'EXCLUSIVO'    },
]