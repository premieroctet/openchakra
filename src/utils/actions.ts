export const ACTIONS={
  'create': {
    label: 'Créer nouvelle donnée',
    options:{
      model: ({models}) => models.map(m => ({key:m, value: m})),
    }
  },
  'login': {
    label: 'Connexion',
    options:{
      source: ({components}) => components.map(c => ({key: c.id, value: c.id})),
    }
  },
  'openPage': {
    label: 'Ouvrir une page',
    options: {
      page: ({pages}) => pages.map(p => ({key: p.pageId, value: p.pageName})),
    }
  },
  'levelUp': {
    label: "Monter",
    options: {
      data: ({components}) => components.map(p => ({key: p.pageId, value: p.pageName})),
      parent: ({components}) => components.map(p => ({key: p.pageId, value: p.pageName})),
    }
  },
  'levelDown': {
    label: "Descendre",
    options: {
      data: ({components}) => components.map(p => ({key: p.pageId, value: p.pageName})),
      parent: ({components}) => components.map(p => ({key: p.pageId, value: p.pageName})),
    }
  },
  'previous': {
    label: "Précédent",
    options: {
      data: ({components}) => components.map(p => ({key: p.pageId, value: p.pageName})),
    }
  },
  'next': {
    label: "Suivant",
    options: {
      data: ({components}) => components.map(p => ({key: p.pageId, value: p.pageName})),
    }
  },
  'publishProgram': {
    label: "Rendre programme disponible",
    options: {
      data: ({components}) => components.map(p => ({key: p.pageId, value: p.pageName})),
    }
  },
  'delete': {
    label: 'Supprimer',
    options: {
      data: ({components}) => components.map(p => ({key: p.pageId, value: p.pageName})),
    }
  },
  'gotoSession': {
    label: 'Retour à la session',
    options: {
      data: ({components}) => components.map(p => ({key: p.pageId, value: p.pageName})),
    }
  }
}

export const allowsActions = (component:IComponent) => {
  return ['Button', 'IconButton'].includes(component.type)
}
