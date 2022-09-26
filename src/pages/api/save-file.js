import fs from 'fs'

export default function handler(req, res) {
    console.log(req.body);
    try {
        fs.writeFileSync('../../components/comp.oc.tsx', req.body.codeBody, (err) => {
          if (err) throw err;
          else{
             console.log("The file is updated with the given data")
          }
       });
      } catch (err) {
        console.log(err);
      }
  }
  // ../../../../../../remote/tu2k22-chakra/chakra-samples/dummy-login-form/dummy-login-form.oc.tsx