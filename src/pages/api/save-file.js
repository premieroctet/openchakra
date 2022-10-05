import fs from 'fs'

export default function handler(req, res) {
    console.log(req.body);
    console.log(process.cwd());
    const fileName = req.body.path.split('/').slice(-1)[0]
    let fileArray = fileName.split('-')
    fileArray.forEach((word) => {word = `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`})
    const pascalName = fileArray.join('').slice(0, -8)
    try {
        fs.writeFileSync(`../../../../../../${req.body.path.slice(0, -4)}tsx`, req.body.codeBody, (err) => {
          if (err) throw err;
          else{
             console.log("The file is updated with the given data")
          }
       });
        fs.writeFileSync(`../../../../../../${req.body.path}`, JSON.stringify(req.body.jsonBody), (err) => {
          if (err) throw err;
          else{
            console.log("The file is updated with the given data")
          }
      });
        fs.writeFileSync(`../../../../../../.oc/previews/${pascalName}Preview.oc.tsx`, req.body.previewBody, (err) => {
          if (err) throw err;
          else{
            console.log("The file is updated with the given data")
          }
      });
        fs.writeFileSync(`../../../../../../.oc/panels/${pascalName}Panel.oc.tsx`, req.body.panelBody, (err) => {
          if (err) throw err;
          else{
            console.log("The file is updated with the given data")
          }
      });
      } catch (err) {
        console.log(err);
      }
  }
