import React from "react";
import {Page, Text, View, Document, StyleSheet, Image, Link, Font} from '@react-pdf/renderer';

const BORDER_COLOR = 'white'
const BORDER_STYLE = 'solid'
const COLDESCRIPTION_WIDTH = 40
const COLN_WIDTH = (100 - COLDESCRIPTION_WIDTH) / 3
const BACKGROUND_COLOR = '#84A5E0';

Font.register({
  family: 'SourceSansPro', fonts: [
    {src: 'https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3aPw.ttf'}, // font-style: normal, font-weight: normal
    {src: 'https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rAkA.ttf', fontWeight: 600},
  ]
});
const styles = StyleSheet.create({
  body: {
    padding: 50,
    fontFamily: 'SourceSansPro',
    fontSize: 12
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    margin: '3vh 0'
  },
  object: {
    fontWeight: 600
  },
  objectHead: {
    marginRight: '1vh',
    fontWeight: 600

  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: '8vh'
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  tableColHeaderDescription: {
    width: COLDESCRIPTION_WIDTH + '%',
    backgroundColor: BACKGROUND_COLOR,
    textAlign: 'center',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: 'white',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColHeader: {
    width: COLN_WIDTH + "%",
    backgroundColor: BACKGROUND_COLOR,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: 'white',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColDescription: {
    width: COLDESCRIPTION_WIDTH + '%',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCellHeader: {
    margin: '5 2 5 0',
    fontSize: 12,
    fontWeight: 600
  },
  tableCellHeaderNum: {
    margin: '5 2 5 0',
    fontSize: 12,
    fontWeight: 600,
    textAlign: 'right'
  },
  tableCell: {
    margin: '5 2 5 0',
    fontSize: 10
  },
  tableCellNum: {
    margin: '5 2 5 0',
    fontSize: 10,
    textAlign: 'right'
  },
  tableCellTTC: {
    margin: '5 2 5 0',
    fontSize: 10,
    textAlign: 'right',
    fontWeight: 600
  },
  TableCellResult: {
    margin: '5 2 5 0',
    fontSize: 10,
    textAlign: 'right',
    backgroundColor: BACKGROUND_COLOR
  }
})

class LayoutPdf extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Document>
        <Page size="A4" style={styles.body}>
          <View style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}>
            <View style={{
              backgroundColor: 'black'
            }}>
              <Image src={"../../../static/assets/icon/logo.svg"}
                     alt={'logo_myAlfred'}
                     style={{
                       height: 64
                     }}/>
            </View>
            <View>
              <View style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left'
              }}>
                <View>
                  <Text>
                    MY-ALFRED
                  </Text>
                </View>
                <View>
                  <Text>
                    42 Rampe Bouvreuil
                  </Text>
                </View>
                <View>
                  <Text>
                    76000 ROUEN
                  </Text>
                </View>
                <View>
                  <Text>
                    France
                  </Text>
                </View>
                <View>
                  <Text>
                    RCS : 850 148 867
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.title}>Récépissé vendeur n° 2021-0000380519</Text>
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View>
              <Text style={styles.objectHead}>Objet :</Text>
            </View>
            <View>
              <Text>Commande #BC2000000184</Text>
            </View>
          </View>

          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '3vh'

          }}>
            <View style={{
              display: 'flex',
              flexDirection: 'row'
            }}>
              <View>
                <Text style={styles.objectHead}>Pour : </Text>
              </View>
              <View style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <View>
                  <Text>My Alfred</Text>
                </View>
                <View>
                  <Text>42 Rampe Bouvreuil</Text>
                </View>
                <View>
                  <Text>76000</Text>
                </View>
                <View>
                  <Text>ROUEN</Text>
                </View>
                <View>
                  <Text>France</Text>
                </View>
              </View>
            </View>
            <View style={{
              display: 'flex',
              flexDirection: 'row'
            }}>
              <View>
                <Text style={styles.object}>De : </Text>
              </View>
              <View>
                <Text>Ouadie El khabbaz</Text>
              </View>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={{
                  margin: '5 2 5 0',
                  fontSize: 12,
                  fontWeight: 600,
                  textAlign: 'center'
                }}>#</Text>
              </View>
              <View style={styles.tableColHeaderDescription}>
                <Text style={styles.tableCellHeader}>Description</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeaderNum}>Quantité</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeaderNum}>Total</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>1</Text>
              </View>
              <View style={styles.tableColDescription}>
                <Text style={styles.tableCell}>Je vais scaper(extraire) les données des annonces sur LEBONCOIN</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellNum}>1</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellNum}>4,00 €</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>2</Text>
              </View>
              <View style={styles.tableColDescription}>
                <Text style={styles.tableCell}>Extractions Niveau 2</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellNum}>1</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellNum}>15,00 €</Text>
              </View>
            </View>
            <View style={styles.resultRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellTTC}>TOTAL TTC</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.TableCellResult}>19,00 €</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View>
                <Text style={styles.object}>Date du récépissé : </Text>
              </View>
              <View>
                <Text>12 octobre 2020</Text>
              </View>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View>
                <Text style={styles.object}>Date de paiement : </Text>
              </View>
              <View>
                <Text>12 octobre 2020</Text>
              </View>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View>
                <Text style={styles.object}>Méthode de paiement : </Text>
              </View>
              <View>
                <Text>Carte bancaire</Text>
              </View>
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View>
              <Text style={styles.object}>Référence de transaction : </Text>
            </View>
            <View>
              <Text>1187856478</Text>
            </View>
          </View>
          <View style={{
            marginTop: '7vh',
            paddingTop: '1vh',
            borderTop: '1 solid black'
          }}>
            <Text>
              Ceci n'est pas une facture.Pour toute question concernant ce récépissé, veuillez voundre sur <Link
              src={'https://www.my-alfred.io/contact'}>notre FAQ.</Link></Text>
          </View>
        </Page>
      </Document>
    )
  }
}

export default (LayoutPdf);

