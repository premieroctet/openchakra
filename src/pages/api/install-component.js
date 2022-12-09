import shell from 'shelljs'
import fs from 'fs'
import { convertToPascal } from '~components/editor/Editor'
import { generateICPreview } from '../../utils/code'
import {
  getInstalledComponents
} from '~core/selectors/customComponents'
import { useSelector } from 'react-redux'


export default async function handler(req, res) {
  const componentPath = req.body.path
  const installedComponents = req.body.installed
  console.log(installedComponents, "djhsbhj")
  const component = req.body.path?.split('.').slice(-1)[0]

  try {
    // 1. Bit Install component
    shell.exec(`bit install ${req.body.path}`)

    // 2.1 Generate preview code
    const componentName = convertToPascal(component)

    const previewCode = await generateICPreview(componentName, componentPath) 
    console.log(previewCode)

    // 2.2 Write the generated file
    fs.writeFileSync(
      `src/installed-components/${componentName}Preview.ic.tsx`,
      previewCode,
    )

    // 2.3 Write to installedList.json file
    // let obj = {componentName: componentPath}
    // let installedList = fs.readFileSync("src/installed-components/installedList.json","utf-8");
    // console.log(obj, installedList, "sdhjb")
    // let currList = []
    // if(installedList.length == 0){
    //   currList.push(obj)
    // }
    // else{
    //   currList = JSON.parse(installedList);
    //   currList.push(obj);
    // }
    // installedList = JSON.stringify(currList);
    // console.log(currList, installedList, "sdhjb")
    // fs.writeFileSync("src/installed-components/installedList.json",installedList,"utf-8");

    // const installedComponents = useSelector(getInstalledComponents)
    // console.log(installedComponents, "skjnn")

    fs.writeFileSync("src/installed-components/installedList.json",JSON.stringify(installedComponents));

    res.status(200).json(componentName)
  } catch (err) {
    console.log(err)
    res.status(400).json({ err })
  }
}
