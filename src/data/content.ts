import type { Service, GalleryItem, Testimonial, Stat, BusinessHours, SpaceRoom } from '@/types'

export const BUSINESS = {
  name: 'BARBEZA BARBEARIA',
  slogan: 'ExperiÃªncia Masculina',
  tagline: 'Corte, barba e atendimento diferenciado',
  address: 'Av. Selim JosÃ© de Sales, BethÃ¢nia',
  city: 'Ipatinga â€” MG',
  fullAddress: 'Avenida Selim JosÃ© de Sales, BethÃ¢nia, Ipatinga - MG',
  phone: '(31) 9831-3831',
  whatsapp: '5531983143831',
  instagram: 'barbezabarbearia',
  instagramUrl: 'https://www.instagram.com/barbezabarbearia',
  inbarberUrl: 'https://chat.inbarberapp.com/AGENDABARBEZA',
  googleMapsUrl: 'https://maps.google.com/maps?q=Avenida+Selim+Jose+de+Sales+Bethania+Ipatinga+MG&output=embed',
  googleMapsLink: 'https://maps.google.com/?q=Avenida+Selim+Jose+de+Sales+Bethania+Ipatinga+MG',
} as const

export const SERVICES: Service[] = [
  {
    id: 'corte',
    name: 'Corte',
    price: 50,
    duration: '45 min',
    icon: 'Scissors',
    description: 'Corte masculino personalizado com tÃ©cnica e precisÃ£o. Lavagem e finalizaÃ§Ã£o incluÃ­das.',
  },
  {
    id: 'barba',
    name: 'Barba',
    price: 30,
    duration: '30 min',
    icon: 'Smile',
    description: 'Modelagem e aparagem de barba com navalha e produtos premium. Toalha quente e hidrataÃ§Ã£o.',
  },
  {
    id: 'combo',
    name: 'Combo',
    price: 70,
    duration: '1h 15min',
    icon: 'Sparkles',
    description: 'Corte + Barba completos. A experiÃªncia masculina completa com desconto especial.',
    featured: true,
  },
  {
    id: 'noivo',
    name: 'Making Of do Noivo',
    price: 150,
    duration: '2h',
    icon: 'Crown',
    description: 'PreparaÃ§Ã£o completa para o grande dia. Corte, barba, hidrataÃ§Ã£o e tratamento premium.',
    premium: true,
  },
]

export const HOURS: BusinessHours = {
  monday: { label: 'Segunda-feira', open: '09:00', close: '19:00', active: true },
  tuesday: { label: 'TerÃ§a-feira', open: '09:00', close: '19:00', active: true },
  wednesday: { label: 'Quarta-feira', open: '09:00', close: '19:00', active: true },
  thursday: { label: 'Quinta-feira', open: '09:00', close: '19:00', active: true },
  friday: { label: 'Sexta-feira', open: '09:00', close: '20:00', active: true },
  saturday: { label: 'SÃ¡bado', open: '08:00', close: '18:00', active: true },
  sunday: { label: 'Domingo', open: '', close: '', active: false },
}

export const GALLERY: GalleryItem[] = [
  { id: '1', file: '/assets/images/gallery-01.jpg', alt: 'Corte masculino degradÃª', category: 'cortes' },
  { id: '2', file: '/assets/images/gallery-02.jpg', alt: 'Barba modelada com navalha', category: 'barbas' },
  { id: '3', file: '/assets/images/gallery-03.jpg', alt: 'Interior da barbearia', category: 'ambiente' },
  { id: '4', file: '/assets/images/gallery-04.jpg', alt: 'Corte social clÃ¡ssico', category: 'cortes' },
  { id: '5', file: '/assets/images/gallery-05.jpg', alt: 'Cadeiras de barbeiro', category: 'ambiente' },
  { id: '6', file: '/assets/images/gallery-06.jpg', alt: 'Barba completa e styled', category: 'barbas' },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rafael Mendes',
    text: 'Melhor barbearia de Ipatinga! Atendimento impecÃ¡vel, ambiente incrÃ­vel e o corte ficou perfeito. NÃ£o troco por nada.',
    rating: 5,
    service: 'Combo',
  },
  {
    id: '2',
    name: 'Lucas Ferreira',
    text: 'Fiz o Making Of do Noivo e saÃ­ de lÃ¡ me sentindo o cara mais bem cuidado do mundo. Recomendo 100%!',
    rating: 5,
    service: 'Making Of do Noivo',
  },
  {
    id: '3',
    name: 'Bruno Alves',
    text: 'Frequento toda semana. O cuidado com cada detalhe Ã© o que diferencia a Barbeza. Ambiente top demais.',
    rating: 5,
    service: 'Corte + Barba',
  },
  {
    id: '4',
    name: 'Diego Costa',
    text: 'Profissionalismo e qualidade acima da mÃ©dia. A barba ficou impecÃ¡vel, melhor da cidade.',
    rating: 5,
    service: 'Barba',
  },
]

export const STATS: Stat[] = [
  { label: 'Seguidores', value: 1199, suffix: '+', prefix: '' },
  { label: 'Clientes Atendidos', value: 500, suffix: '+', prefix: '' },
  { label: 'AvaliaÃ§Ã£o', value: 5, suffix: '.0', prefix: 'â˜… ' },
  { label: 'Anos de ExperiÃªncia', value: 3, suffix: '+', prefix: '' },
]

export const SPACE_ROOMS: SpaceRoom[] = [
  {
    id: 'area-corte',
    label: 'Ãrea de Corte',
    description: 'EstaÃ§Ãµes de trabalho premium com cadeiras de barbeiro tradicionais e iluminaÃ§Ã£o profissional para cada detalhe do seu estilo.',
    image: '/assets/renders/render-01.jpg',
    badge: 'NOVO ESPAÃ‡O',
  },
  {
    id: 'recepcao',
    label: 'RecepÃ§Ã£o',
    description: 'Ambiente acolhedor onde a experiÃªncia comeÃ§a. Design sofisticado em tons escuros e dourados que define o padrÃ£o Barbeza.',
    image: '/assets/renders/render-02.jpg',
    badge: 'EM BREVE',
  },
  {
    id: 'sala-vip',
    label: 'Sala VIP',
    description: 'EspaÃ§o exclusivo para atendimentos especiais como o Making Of do Noivo. Privacidade e luxo para o seu momento.',
    image: '/assets/renders/render-03.jpg',
    badge: 'EXCLUSIVO',
  },
]


