import lodash from 'lodash'

type IActions = {
  [key: string]: {
    label: string
    options: {
      [key: string]: any
    }
    next?: string[]
  }
}

export const pagesList= ({pages}) => {
  return lodash(pages)
    .values()
    .orderBy(p => p.pageName.toLowerCase())
    .map(p => ({ key: p.pageId, label: p.pageName }))
    .value()
}

export const ACTIONS: IActions = {
  create: {
    label: 'Create new data',
    options: {
      model: ({ models }) => Object.values(models).map(m => ({ key: m.name, label: m.name })),
      job: ({ components }) =>
        components
          .filter(comp => comp.type=='Flex')
          .map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
      mission: ({ components }) =>
        components
          .filter(comp => comp.type=='Flex')
          .map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
      quotation: ({ components }) =>
        components
          .filter(comp => comp.type=='Flex')
          .map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
      group: ({ components }) =>
        components
          .filter(comp => comp.type=='Flex')
          .map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
      parent: ({ components }) =>
        components
          .filter(comp => comp.type=='Flex')
          .map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
      content: ({ components }) =>
        components
          .filter(comp => comp.type=='Flex')
          .map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
      recipe: ({ components }) =>
        components
          .filter(comp => comp.type=='Flex')
          .map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
      ...Object.fromEntries(lodash.range(24).map((idx:number) => {
      return [
        `component_${idx}`,
        ({ components }) => components
          .filter(comp => (comp.props?.dataSource || comp.props?.model) && comp.props?.attribute)
          .map(comp => ({ key: comp.id, label: `${comp.type}/${comp.id}` }))

      ]})),
    },
    next: ['openPage'],
  },
  login: {
    label: 'Login',
    options: {
      email: ({ components }) =>
        components.map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
      password: ({ components }) =>
        components.map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
    },
    next: ['openPage'],
  },
  openPage: {
    label: 'Open page',
    options: {
      page: ({ pages }) => pagesList({pages}),
      open: () => [
        { key: true, label: 'In new page' },
        { key: false, label: 'In same page' },
      ],
    },
  },
  levelUp: {
    label: 'Move item up',
    options: {},
  },
  levelDown: {
    label: 'Move item down',
    options: {},
  },
  previous: {
    label: 'Previous',
    options: {
      //data: ({components}) => components.map(p => ({key: p.id, label: p.id})),
    },
    next: ['openPage'],
  },
  next: {
    label: 'Next',
    options: {
      //data: ({components}) => components.map(p => ({key: p.id, label: p.id})),
    },
    next: ['openPage'],
  },
  delete: {
    label: 'Delete',
    options: {
      //data: ({components}) => components.map(p => ({key: p.id, label: p.id})),
    },
  },
  gotoSession: {
    label: 'Get session',
    options: {
      //data: ({components}) => components.map(p => ({key: p.id, label: p.id})),
    },
    next: ['openPage'],
  },
  addChild: {
    label: 'Add child',
    options: {
      child: ({ components }) =>
        components.map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
    },
    required:['child']
  },
  sendMessage: {
    label: 'Send Message',
    options: {
      destinee: ({ components }) =>
        components.map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
      contents: ({ components }) =>
        components.map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
      attachment: ({ components }) =>
        components
          .filter(c => c.type=='UploadFile')
          .map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
    },
    required:['contents']
  },
  createPost: {
    label: 'Create post',
    options: {
      contents: ({ components }) =>
        components.map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
      media: ({ components }) =>
        components
          .filter(c => c.type=='UploadFile')
          .map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
    },
  },
  setOrderItem: {
    label: 'Set to order',
    options: {
      quantity: ({ components }) =>
        components
          .filter(c => c.type == 'Input')
          .map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
    },
  },
  removeOrderItem: {
    label: 'Remove from order',
    options: [],
  },
  inviteGuest: {
    label: 'Invite to event',
    options: {
      email: ({ components }) =>
        components
          .filter(c => c.type == 'Input')
          .map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
      phone: ({ components }) =>
        components
          .filter(c => c.type == 'Input')
          .map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
    },
    required: ['email']
  },
  save: {
    label: 'Save/create',
    options: {
      model: ({ models }) => Object.values(models).map(m => ({ key: m.name, label: m.name })),
      ...Object.fromEntries(lodash.range(32).map((idx:number) => {
      return [
        `component_${idx}`,
        ({ components }) => components
          .filter(comp => (comp.props?.dataSource || comp.props?.model) && comp.props?.attribute)
          .map(comp => ({ key: comp.id, label: `${comp.type}/${comp.id}` }))

      ]})),
    },
    next: ['openPage'],
  },
  // Mettre un warning si les composants ne sont pas dans le même flex
  registerToEvent: {
    label: 'Register to event',
    options: {},
    next: ['openPage'],
  },
  // Mettre un warning si les composants ne sont pas dans le même flex
  unregisterFromEvent: {
    label: 'Unregister from event',
    options: {},
    next: ['openPage'],
  },
  // FUMOIR
  // Mettre un warning si les composants ne sont pas dans le même flex
  payEvent: {
    label: 'Pay event',
    options: {
      redirect: ({ pages }) =>
        Object.values(pages).map(p => ({ key: p.pageId, label: p.pageName })),
      color: ({ pages }) => {
        const colors=lodash(pages).values()
          .map(page => page.components).map(components => Object.values(components)).flatten()
          .map(component => ['color', 'backgroundColor', 'focusBorderColor'].map(color => component.props[color])).flatten()
          .filter(color => !!color && /^#/.test(color))
          .map(color => color.toLowerCase())
          .uniq().sort()
          .map(color => ({key: color, label: color}))
          .value()
        return colors
      }
    },
  },
  payOrder: {
    label: 'Pay order',
    options: {
      redirect: ({ pages }) =>
        Object.values(pages).map(p => ({ key: p.pageId, label: p.pageName })),
      color: ({ pages }) => {
        const colors=lodash(pages).values()
        .map(page => page.components).map(components => Object.values(components)).flatten()
        .map(component => ['color', 'backgroundColor', 'focusBorderColor'].map(color => component.props[color])).flatten()
        .filter(color => !!color && /^#/.test(color))
        .map(color => color.toLowerCase())
        .uniq().sort()
        .map(color => ({key: color, label: color}))
        .value()
        return colors
      }
    },
  },
  cashOrder: {
    label: 'Cash order',
    options: {
      guest: ({ components }) => components
        .filter(comp => comp.type=='Select')
        .map(comp => ({ key: comp.id, label: `${comp.type}/${comp.id}` })),
      amount: ({ components }) => components
        .filter(comp => comp.type=='Input')
        .map(comp => ({ key: comp.id, label: `${comp.type}/${comp.id}` })),
      mode: () => [{ key: 'CASH', label: `Espèces` },{ key: 'CARD', label: `Carte bancaire` }],
    },
    next: ['openPage'],
    required:['amount', 'mode']
  },
  // FUMOIR
  // Mettre un warning si les composants ne sont pas dans le même flex
  previous: {
    label: 'Previous',
    options: {},
  },
  // Register new User
  register: {
    label: 'Register new account',
    options: {
      ...Object.fromEntries(lodash.range(15).map((idx:number) => {
      return [
        `component_${idx}`,
        ({ components }) => components
          .filter(comp => (comp.props?.dataSource||comp.props?.model) && comp.props?.attribute)
          .map(comp => ({ key: comp.id, label: `${comp.type}/${comp.id}` }))

      ]})),
    },
    next: ['openPage'],
  },
  // Register new User
  registerAndLogin: {
    label: 'Register new account+login',
    options: {
      ...Object.fromEntries(lodash.range(15).map((idx:number) => {
      return [
        `component_${idx}`,
        ({ components }) => components
          .filter(comp => (comp.props?.dataSource||comp.props?.model) && comp.props?.attribute)
          .map(comp => ({ key: comp.id, label: `${comp.type}/${comp.id}` }))

      ]})),
    },
    next: ['openPage'],
  },
  logout: {
    label: 'Logout',
    options: {},
  },
  openWithingsSetup: {
    label: 'Open withings setup',
    options: {},
  },
  openWithingsSettings: {
    label: 'Open withings settings',
    options: {},
  },
  forgotPassword: {
    label: 'Forgot password',
    options: {
      email: ({ components }) =>
        components
          .filter(c => c.type == 'Input')
          .map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
    },
    next: ['openPage'],
    required:['email']
  },
  getCigarReview: {
    label: 'Get cigar review',
    options: {},
    next: ['openPage'],
  },
  changePassword: {
    label: 'Change password',
    options: {
      password: ({ components }) =>
        components
          .filter(c => c.type == 'Input')
          .map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
      password2: ({ components }) =>
        components
          .filter(c => c.type == 'Input')
          .map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
    },
    next: ['openPage'],
    required:['password', 'password2']
  },
  savePagePDF: {
    label: 'Save page as PDF',
    options:{}
  },

  deactivateAccount: {
    label: 'Deactivate account',
    options: {
      reason: ({ components }) =>
        components
          .map(p => ({ key: p.id, label: `${p.type}/${p.id}` })),
    },
    next: ['openPage', 'logout'],
  },

  createRecommandation: {
    label: 'Create recommandation',
    options: {
      ...Object.fromEntries(lodash.range(15).map((idx:number) => {
      return [
        `component_${idx}`,
        ({ components }) => components
          .filter(comp => (comp.props?.dataSource || comp.props?.model) && comp.props?.attribute)
          .map(comp => ({ key: comp.id, label: `${comp.type}/${comp.id}` }))

      ]})),
    },
    next: ['openPage'],
  },
  alle_create_quotation: {
    label: 'AE Créer devis',
    options: {},
    next: ['openPage'],
  },
  alle_refuse_mission: {
    label: 'AE Refuser mission',
    options: {},
    next: ['openPage'],
  },
  alle_cancel_mission: {
    label: 'AE Anuler mission',
    options: {},
    next: ['openPage'],
  },
  alle_send_quotation: {
    label: 'AE Envoyer le devis',
    options: {},
    next: ['openPage'],
  },
  alle_accept_quotation: {
    label: 'AE Accepter le devis',
    options: {},
    next: ['openPage'],
  },
  alle_refuse_quotation: {
    label: 'AE Refuser le devis',
    options: {},
    next: ['openPage'],
  },
  alle_show_quotation: {
    label: 'AE Voir le devis',
    options: {},
    next: ['openPage'],
  },
  alle_edit_quotation: {
    label: 'AE Modifier le devis',
    options: {},
    next: ['openPage'],
  },
  alle_finish_mission: {
    label: 'AE Terminer mission',
    options: {},
    next: ['openPage'],
  },
  alle_store_bill: {
    label: 'AE Déposer la facture',
    options: {},
    next: ['openPage'],
  },
  alle_show_bill: {
    label: 'AE Voir la facture',
    options: {},
    next: ['openPage'],
  },
  alle_accept_bill: {
    label: 'AE Accepter la facture',
    options: {},
    next: ['openPage'],
  },
  alle_refuse_bill: {
    label: 'AE Refuser la facture',
    options: {},
    next: ['openPage'],
  },
  alle_leave_comment: {
    label: 'AE Laisser un commentaire',
    options: {},
    next: ['openPage'],
  },
  alle_send_bill: {
    label: 'AE Envoyer la facture',
    options: {},
    next: ['openPage'],
  },
  smartdiet_join_group: {
    label: 'SM Joindre le groupe',
    options: {},
    next: ['openPage'],
  },
  smartdiet_leave_group: {
    label: 'SM Quitter le groupe',
    options: {},
    next: ['openPage'],
  },
  smartdiet_skip_event: {
    label: 'SM Zapper evt',
    options: {},
    next: ['openPage'],
  },
  smartdiet_join_event: {
    label: 'SM Joindre evt',
    options: {},
    next: ['openPage'],
  },
  smartdiet_pass_event: {
    label: 'SM Réussi evt',
    options: {},
    next: ['openPage'],
  },
  smartdiet_start_event: {
    label: 'SM Connexion evt',
    options: {},
    next: ['openPage'],
  },
  alle_ask_contact: {
    label: 'AE Ask contact',
    options: {
      ...Object.fromEntries(lodash.range(15).map((idx:number) => {
      return [
        `component_${idx}`,
        ({ components }) => components
          .filter(comp => (comp.props?.dataSource || comp.props?.model) && comp.props?.attribute)
          .map(comp => ({ key: comp.id, label: `${comp.type}/${comp.id}` }))

      ]})),
    },
    next: ['openPage'],
  },
  hasChildren: {
    label: 'Has children',
    options: {
      children: ({ attributes }) => Object.keys(attributes || {}).map(att => ({ key: att, label: att }))
    },
    next: ['openPage'],
  },

}

export const allowsActions = (component: IComponent) => {
  return ['Button', 'IconButton', 'Flex'].includes(component.type)
}
