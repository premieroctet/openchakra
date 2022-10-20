type IActions={
  [key:string]: {
    label:string,
    options:{
      [key: string]: any
    }
  }
}
export const ACTIONS:IActions={
  'create': {
    label: 'Create new data',
    options:{
      model: ({models}) => models.map(m => ({key:m.name, label: m.name})),
    },
    next: ['openPage'],
  },
  'login': {
    label: 'Login',
    options:{
      source: ({components}) => components.map(c => ({key: c.id, label: c.id})),
    },
    next: ['openPage'],
  },
  'openPage': {
    label: 'Open page',
    options: {
      page: ({pages}) => Object.values(pages).map(p => ({key: p.pageId, label: p.pageName})),
      open : () => [{key: true, label: 'In new page'}, {key: false, label: 'In same page'}]
    }
  },
  'levelUp': {
    label: "Move item up",
    options: {
    }
  },
  'levelDown': {
    label: "Move item down",
    options: {
    }
  },
  'previous': {
    label: "Previous",
    options: {
      //data: ({components}) => components.map(p => ({key: p.id, label: p.id})),
    },
    next: ['openPage'],
  },
  'next': {
    label: "Next",
    options: {
      //data: ({components}) => components.map(p => ({key: p.id, label: p.id})),
    },
    next: ['openPage'],
  },
  'publishProgram': {
    label: "Publish",
    options: {
      //data: ({components}) => components.map(p => ({key: p.id, label: p.id})),
    }
  },
  'delete': {
    label: 'Delete',
    options: {
      //data: ({components}) => components.map(p => ({key: p.id, label: p.id})),
    }
  },
  'gotoSession': {
    label: 'Get session',
    options: {
      //data: ({components}) => components.map(p => ({key: p.id, label: p.id})),
    },
    next: ['openPage'],
  },
  addChild :{
    label: 'Add child',
    options: {
      child: ({components}) => components.map(p => ({key: p.id, label: `${p.type}/${p.id}`})),
    }
  }
}

export const allowsActions = (component:IComponent) => {
  return ['Button', 'IconButton'].includes(component.type)
}
