const React=require('react')
const {Page, Text, View, Document, StyleSheet, Image, Font}=require('@react-pdf/renderer')
const moment=require('moment')
import pdfStyle from '../../static/css/components/Quotation/Quotation'
const styles = StyleSheet.create(pdfStyle())
moment.locale('fr')

const LOGO='static/assets/icon/feurst/logo.png'
const DENT='static/assets/icon/feurst/dent.png'
const ADAPTEUR='static/assets/icon/feurst/adapteur.png'
const BOUCLIER_FLANC='static/assets/icon/feurst/bouclier_flanc.png'
const BOUCLIER_INTERDENTS='static/assets/icon/feurst/bouclier_interdent.png'
const BOUCLIER_TALON='static/assets/icon/feurst/bouclier_talon.png'

const ILLUS={
  'Porte-dents': ADAPTEUR,
  'Boucliers inter-dents': BOUCLIER_INTERDENTS,
  'Bouclier flanc': BOUCLIER_FLANC,
  'Bouclier talon': BOUCLIER_TALON,
  'Dents': DENT,
}

Font.register(
  {
    family: 'SourceSansPro', fonts: [
      {src: 'https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3aPw.ttf'},
      {src: 'https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rAkA.ttf', fontWeight: 600},
    ],
  },
)


class Quotation extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {infos, precos}=this.props

    return (
      <Document>
        <Page pageNumber={'1'} size="A4" style={styles.body}>
          <View style={styles.logo}>
            <Image src={LOGO} />
          </View>
          <View style={styles.addresses}>
            <View style={styles.address}>
              <Text>Boulevard de la Boissonnette</Text>
              <Text>42110 FEURS</Text>
              <Text>RCS: 388 420 556</Text>
              <Text>04 XX XX XX XX</Text>
            </View>
            <View style={styles.address}>
              <Text>{infos.name}</Text>
              <Text>{infos.company}</Text>
              <Text>{infos.email}</Text>
              <Text>{infos.phone}</Text>
            </View>
          </View>
          <Text style={styles.title}>Préconisation - Configuration de vos équipements Feurst</Text>
          <View style={styles.summary}>
            <View style={styles.summaryBlock}>
              <Text>Récapitulatif de votre demande:</Text>
              <Text><span style={styles.lightText}>Votre machine: </span>{precos.type}-{precos.mark} {precos.model}</Text>
              <Text><span style={styles.lightText}>Votre terrain: </span>{precos.ground}</Text>
              <Text><span style={styles.lightText}>Votre godet/lame: </span>{precos.bladeShape} - L : {precos.bucketSize && `${precos.bucketSize}mm` || 'inconnue'}</Text>
            </View>
            <View style={styles.summaryBlock}>
              <Text>Votre équipement:</Text>
              <Text>Boucliers inter-dents: {infos.teethShieldFixType}</Text>
              <Text>Boucliers de flancs: {infos.borderShieldFixType}</Text>
            </View>
          </View>
          <View style={styles.contents}>
            {Object.entries(precos.accessories).map(entry => {
              const [group, data]=entry
              return (
                <>
                  <View style={styles.group} wrap={false}>
                    <View style={styles.groupHeader}>
                      <Text>{group}</Text>
                      <Image style={styles.illustration} src={ILLUS[group]}/>
                    </View>
                    <View style={styles.groupBody}>
                      {data.map((v, index) => (
                        <>
                          {data.length>1 && <Text style={styles.optionTitle}>option {index+1}</Text>}
                          {Object.entries(v).map(entry => {
                            const [type, refQty]=entry
                            return (
                              <Text style={styles.optionBody}>{refQty[1]} X {type} {refQty[0]}</Text>
                            )
                          })}
                        </>
                      ))
                      }
                    </View>
                  </View>
                </>
              )
            })}
          </View>
          <View fixed style={styles.footer}>
            <Text render={({pageNumber, totalPages}) =>
              `${pageNumber}/${totalPages}`}/>
          </View>
        </Page>
      </Document>
    )
  }
}

module.exports=Quotation
