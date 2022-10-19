import Composer from '~core/models/composer/composer'

import { BuilderFn } from '~core/models/composer/builder'

export const buildCard: BuilderFn = parent => {
  const composer = new Composer()

  const nodeId = composer.addNode({
    type: 'Card',
    parent,
  })

  const cardContainer = composer.addNode({ type: 'Grid', parent: nodeId })
  composer.addNode({ type: 'Avatar', parent: cardContainer })
  composer.addNode({ type: 'Text', parent: nodeId })
  composer.addNode({ type: 'Text', parent: nodeId })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}

export const buildUploadFile: BuilderFn = parent => {
  const composer = new Composer()

  const nodeId = composer.addNode({
    type: 'UploadFile',
    parent,
  })

  composer.addNode({ type: 'Input', parent: nodeId, props: {type: 'file'} })
  composer.addNode({ type: 'Button', parent: nodeId, props: {type: 'submit'} })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}
