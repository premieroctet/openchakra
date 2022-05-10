const React=require('react')
const {Page, Text, View, Document, StyleSheet, Image}=require('@react-pdf/renderer')
const moment=require('moment')
const {PDFStyle} = require('../../static/css/components/Quotation/Quotation')

const styles = StyleSheet.create(PDFStyle())
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
              <Text>+33 4 77 27 40 63</Text>
            </View>
            <View style={styles.address}>
              <Text>{data.firstname} {data.name}</Text>
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
              <Text><span style={styles.lightText}>Votre godet/lame: </span>{data.bladeShape} - L : {data.bucketWidth && `${data.bucketWidth}mm` || 'inconnue'}</Text>
            </View>
            <View style={styles.summaryBlock}>
              <Text>Votre équipement:</Text>
              <Text><span style={styles.lightText}>Boucliers inter-dents: </span>{data.teethShieldFixType}</Text>
              <Text><span style={styles.lightText}>Boucliers de flancs: </span>{data.borderShieldFixType}</Text>
            </View>
          </View>
          <View style={styles.contents}>
            {Object.entries(data.accessories).map(entry => {
              const [group, items]=entry
              if (items.length==0) {
                return null
              }
              return (
                <>
                  <View style={styles.group} wrap={false}>
                    <View style={styles.groupHeader}>
                      <Text>{group}</Text>
                      <Image style={styles.illustration} src={ILLUS[group]}/>
                    </View>
                    <View style={styles.groupBody}>
                      {items.map((v, index) => {
                        let title='option'
                        if (items.length>1) {
                          title=`${title} ${index+1}`
                        }
                        if (Object.keys(v).includes("CHAPEAU D'USURE")) {
                          title=`${title} avec chapeau d'usure`
                        }
                        return (
                          <>
                            {title && <Text style={styles.optionTitle}>{title}</Text>}
                            {Object.entries(v).map(entry => {
                              const [type, refQty]=entry
                              return (
                                <Text style={styles.optionBody}>{refQty[1]} X {type} {refQty[0]}</Text>
                              )
                            })}
                          </>
                        )
                      })
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
