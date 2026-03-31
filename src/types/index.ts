export interface Service {
  id: string
  name: string
  price: number
  duration: string
  icon: string
  description: string
  featured?: boolean
  premium?: boolean
}

export interface GalleryItem {
  id: string
  file: string
  alt: string
  category: 'cortes' | 'barbas' | 'ambiente' | 'todos'
}

export interface Testimonial {
  id: string
  name: string
  text: string
  rating: number
  service?: string
}

export interface Stat {
  label: string
  value: number
  suffix: string
  link?: string
  prefix?: string
}

export interface BusinessHours {
  [key: string]: {
    label: string
    open: string
    close: string
    active: boolean
  }
}

export interface SpaceRoom {
  id: string
  label: string
  description: string
  image: string
  badge?: string
}

export interface Client {
  id: string
  name: string
  phone: string
  preference: string
  notes: string
  lastVisit: string
  createdAt: string
}
