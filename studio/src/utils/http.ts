import zlib from 'zlib'
import config from '../../env.json'
import axios from 'axios'

export const copyFile = ({ contents, filePath }) => {
  const zippedContents=zlib.deflateSync(contents).toString('base64')
  const body = { contents:zippedContents, projectName: config.projectName, filePath }
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

export const start = () => {
  const body = { projectName: config.projectName }
  return axios.post(`${config.targetDomain}/myAlfred/api/studio/start`, body)
}

export const clean = (fileNames:string[]) => {
  const body = { projectName: config.projectName , fileNames}
  return axios.post(`${config.targetDomain}/myAlfred/api/studio/clean`, body)
}
