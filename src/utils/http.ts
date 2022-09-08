import config from '../../env.json'
import axios from 'axios'

const options = {
  user: config.targetUser,
  host: config.targetDomain,
  key: config.privKeyPath,
}

export const copyFile = ({ contents, projectName, filePath }) => {
  const body = { contents, projectName, filePath }
  return axios.post(`${config.targetDomain}/myAlfred/api/studio/file`, body)
}

export const install = ({ projectName }) => {
  const body = { projectName }
  return axios.post(`${config.targetDomain}/myAlfred/api/studio/install`, body)
}

export const build = ({ projectName }) => {
  const body = { projectName }
  return axios.post(`${config.targetDomain}/myAlfred/api/studio/build`, body)
}
