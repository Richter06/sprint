export const colorways = [
  { id: 'stone', name: 'Stone', hex: '#d8d4cb', filter: 'none' },
  { id: 'black', name: 'Black', hex: '#282a2b', filter: 'grayscale(1) brightness(.58)' },
  { id: 'sage', name: 'Sage', hex: '#a0aa96', filter: 'sepia(.22) hue-rotate(35deg) saturate(.65)' },
  { id: 'terra', name: 'Terra', hex: '#bf7657', filter: 'sepia(.3) saturate(1.25) hue-rotate(326deg)' },
]

export const products = [
  { id: 'velocity-001', name: 'Velocity 001', category: 'Lifestyle', price: 599.9, tag: 'Novo lançamento', color: 'Stone', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=85', colors: ['#d8d4cb', '#282a2b', '#a0aa96', '#bf7657'], description: 'Leve no passo, preciso no desenho. Uma silhueta contemporânea feita para acompanhar o ritmo de todos os dias.' },
  { id: 'court-02', name: 'Court 02', category: 'Casual', price: 429.9, tag: 'Essencial', color: 'Red / White', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85', colors: ['#d8d4cb', '#282a2b', '#bf7657'], description: 'Uma leitura limpa do tênis de quadra, com linhas clássicas e presença discreta.' },
  { id: 'pace-runner', name: 'Pace Runner', category: 'Running', price: 489.9, oldPrice: 549.9, tag: '−11%', color: 'Grey', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1000&q=85', colors: ['#d8d4cb', '#282a2b', '#a0aa96'], description: 'Conforto para o movimento diário, com construção leve e visual esportivo.' },
  { id: 'form-low', name: 'Form Low', category: 'Clássicos', price: 379.9, tag: null, color: 'Cream', image: 'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=1000&q=85', colors: ['#d8d4cb', '#282a2b'], description: 'Um clássico sem esforço. Fácil de combinar, confortável de usar, pronto para repetir.' },
  { id: 'trail-01', name: 'Trail 01', category: 'Outdoor', price: 529.9, tag: 'Versátil', color: 'Sand', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=85', colors: ['#d8d4cb', '#282a2b', '#a0aa96'], description: 'Texturas robustas e conforto para sair do caminho habitual.' },
  { id: 'everyday-knit', name: 'Everyday Knit', category: 'Lifestyle', price: 459.9, tag: null, color: 'Charcoal', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=85', colors: ['#d8d4cb', '#282a2b', '#bf7657'], description: 'Uma combinação equilibrada de textura, flexibilidade e design urbano.' },
  { id: 'studio-03', name: 'Studio 03', category: 'Casual', price: 399.9, tag: null, color: 'Stone', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=85', colors: ['#d8d4cb', '#282a2b', '#bf7657'], description: 'Perfil baixo e proporções atemporais para acompanhar qualquer plano.' },
  { id: 'tempo-pro', name: 'Tempo Pro', category: 'Running', price: 649.9, tag: 'Performance', color: 'Graphite', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=85', colors: ['#d8d4cb', '#282a2b', '#a0aa96'], description: 'Uma silhueta dinâmica com foco em leveza e movimento contínuo.' },
]

export const categories = [
  { name: 'Running', number: '01', description: 'Feitos para seguir em frente', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80' },
  { name: 'Lifestyle', number: '02', description: 'O ritmo da cidade', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80' },
  { name: 'Casual', number: '03', description: 'Todo dia, do seu jeito', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80' },
  { name: 'Outdoor', number: '04', description: 'Mais longe do habitual', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80' },
]
