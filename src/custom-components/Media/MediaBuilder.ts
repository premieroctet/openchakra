import Composer from '~core/models/composer/composer'

import { BuilderFn } from '../../core/models/composer/builder'

export const buildMedia: BuilderFn = parent => {
  const composer = new Composer()

  const nodeId = composer.addNode({
    type: 'Media',
    parent,
  })

  const mediaContainer = composer.addNode({ type: 'Grid', parent: nodeId })
  composer.addNode({ type: 'Avatar', parent: mediaContainer })
  composer.addNode({ type: 'Text', parent: nodeId })
  composer.addNode({ type: 'Text', parent: nodeId })

  const components = composer.getComponents()

  return {
    components,
    root: nodeId,
    parent,
  }
}
