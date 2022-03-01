const { BLADE_SHAPES, FIX_TYPES } = require('../../utils/feurst_consts');
const React=require('react')
const {Page, Text, View, Document, StyleSheet, Image}=require('@react-pdf/renderer')
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

class Quotation extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {data}=this.props

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
              <Text>{data.name}</Text>
              <Text>{data.company}</Text>
              <Text>{data.email}</Text>
              <Text>{data.phone}</Text>
            </View>
          </View>
          <Text style={styles.title}>Préconisation - Configuration de vos équipements Feurst</Text>
          <View style={styles.summary}>
            <View style={styles.summaryBlock}>
              <Text>Récapitulatif de votre demande:</Text>
              <Text><span style={styles.lightText}>Votre machine: </span>{data.type}-{data.mark} {data.model}</Text>
              <Text><span style={styles.lightText}>Votre terrain: </span>{data.ground}</Text>
              <Text><span style={styles.lightText}>Votre godet/lame: </span>{BLADE_SHAPES[data.bladeShape]} - L : {data.bucketWidth && `${data.bucketWidth}mm` || 'inconnue'}</Text>
            </View>
            <View style={styles.summaryBlock}>
              <Text>Votre équipement:</Text>
              <Text>Boucliers inter-dents: {FIX_TYPES[data.teethShieldFixType]}</Text>
              <Text>Boucliers de flancs: {FIX_TYPES[data.borderShieldFixType]}</Text>
            </View>
          </View>
          <View style={styles.contents}>
            {Object.entries(data.accessories).map(entry => {
              const [group, items]=entry
              return (
                <>
                  <View style={styles.group} wrap={false}>
                    <View style={styles.groupHeader}>
                      <Text>{group}</Text>
                      <Image style={styles.illustration} src={ILLUS[group]}/>
                    </View>
                    <View style={styles.groupBody}>
                      {items.map((v, index) => (
                        <>
                          {items.length>1 && <Text style={styles.optionTitle}>option {index+1}</Text>}
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
