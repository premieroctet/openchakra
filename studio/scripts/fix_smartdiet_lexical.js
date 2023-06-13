const fs=require('fs')
const project=require(process.argv[2])
const outputFile=`${process.argv[2]}.fix`

Object.values(project.pages)
  .forEach(page => {
    Object.values(page.components)
      .filter(comp => comp.type=='Lexical' || /^<p /.test(comp.props.value))
      .forEach(comp => {
        console.log(comp.type, comp.props.value)
        comp.props.value=""
      })
  })

fs.writeFileSync(outputFile, JSON.stringify(project, null, 2))
console.log(`Saved fixed of ${process.argv[2]} to ${outputFile}`)
