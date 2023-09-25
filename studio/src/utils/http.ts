import zlib from 'zlib'
import axios from 'axios'

export const copyFile = ({ contents, filePath }) => {
  const zippedContents=zlib.deflateSync(contents).toString('base64')
  const body = { contents:zippedContents, projectName: process.env.NEXT_PUBLIC_PROJECT_FOLDERNAME, filePath }
  return axios.post(`${process.env.NEXT_PUBLIC_PROJECT_TARGETDOMAIN}/myAlfred/api/studio/file`, body)
}

export const install = () => {
  const body = { projectName: process.env.NEXT_PUBLIC_PROJECT_FOLDERNAME }
  return axios.post(`${process.env.NEXT_PUBLIC_PROJECT_TARGETDOMAIN}/myAlfred/api/studio/install`, body)
}

export const build = () => {
  const body = { projectName: process.env.NEXT_PUBLIC_PROJECT_FOLDERNAME }
  return axios.post(`${process.env.NEXT_PUBLIC_PROJECT_TARGETDOMAIN}/myAlfred/api/studio/build`, body)
}

export const start = () => {
  const body = { projectName: process.env.NEXT_PUBLIC_PROJECT_FOLDERNAME }
  return axios.post(`${process.env.NEXT_PUBLIC_PROJECT_TARGETDOMAIN}/myAlfred/api/studio/start`, body)
}

export const clean = (fileNames:string[]) => {
  const body = { projectName: process.env.NEXT_PUBLIC_PROJECT_FOLDERNAME , fileNames}
  return axios.post(`${process.env.NEXT_PUBLIC_PROJECT_TARGETDOMAIN}/myAlfred/api/studio/clean`, body)
}
