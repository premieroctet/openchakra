import { generateCode, formatCode } from '../../utils/code'

const PROJECTS=['fumoir']

describe('Code generation', () => {

  it('should generate proper code', async () => {
    return Promise.all(PROJECTS.map(p => {
      return Promise.all([import(`./${p}.json`), import(`./${p}_model.json`)])
        .then(([project, models])=> {
          console.log(project)
          /**
          Object.keys(project.pages).map(pageId => {
            return generateCode(pageId, project.pages, models)
          })
          */
        })
      }))
  })

})
