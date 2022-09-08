import config from '../../env.json'
import axios from 'axios'

export const copyFile = ({ contents, filePath }) => {
  const body = { contents, projectName: config.projectName, filePath }
  return axios.post(`${config.targetDomain}/myAlfred/api/studio/file`, body)
}

export const install = () => {
  const body = { projectName: config.projectName }
  return axios.post(`${config.targetDomain}/myAlfred/api/studio/install`, body)
}

export const build = () => {
  const body = { projectName: config.projectName }
  return axios.post(`${config.targetDomain}/myAlfred/api/studio/build`, body)
}
