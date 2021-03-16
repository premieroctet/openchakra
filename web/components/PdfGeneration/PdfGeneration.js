import React from "react";
import {Page, Text, View, Document, StyleSheet, Image, Link, Font} from '@react-pdf/renderer';
import {moneyFormat} from '../../utils/converters';
import moment from "moment";
import pdfStyle from '../../static/css/components/pdf/pdf';

const styles = StyleSheet.create(pdfStyle())

moment.locale('fr');


Font.register({
  family: 'SourceSansPro', fonts: [
    {src: 'https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3aPw.ttf'}, // font-style: normal, font-weight: normal
    {src: 'https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rAkA.ttf', fontWeight: 600},
  ]
});


class LayoutPdf extends React.Component {
  constructor(props) {
    super(props)
    this.child = React.createRef();
    this.state = {
      numPages: null,
      setNumPages: null,
    }
  }


  render() {
    const {bookingObj, is_pro} = this.props;
    const {numPages, setNumPages} = this.state;
    return (
      <Document
        onLoadSuccess={({numPages}) => setNumPages(numPages)}
      >
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map(page =>
            <Page pageNumber={page} size="A4" style={styles.body}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row'
                }}
              >
                <View>
                  <Image src={"https://www.my-alfred.io/static/assets/icon/logo.svg"}
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
                        RCS :
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.title}>{is_pro ? 'Facture' :
                  'Récépissé'} vendeur n° {bookingObj.receipt_number}</Text>
              </View>

              <View style={{display: 'flex', flexDirection: 'row'}}>
                <View>
                  <Text style={styles.objectHead}>Objet :</Text>
                </View>
                <View>
                  <Text>Réservation {bookingObj.reference}</Text>
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
                      <Text>{bookingObj.user.full_name}</Text>
                    </View>
                    <View>
                      <Text>{bookingObj.user.address}</Text>
                    </View>
                    <View>
                      <Text>{bookingObj.user.zip_code}</Text>
                    </View>
                    <View>
                      <Text>{bookingObj.user.city}</Text>
                    </View>
                    <View>
                      <Text>{bookingObj.user.country}</Text>
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
                    <Text>{bookingObj.alfred.full_name}</Text>
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
                {
                  Object.keys(bookingObj.prestations).map(p => {
                    return (
                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{Number(p) + 1}</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                          <Text style={styles.tableCell}>{bookingObj.prestations[p].name}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellNum}>{bookingObj.prestations[p].value}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellNum}>{(moneyFormat(
                            (Number(bookingObj.prestations[p].price)) *
                            bookingObj.prestations[p].value))} €
                          </Text>
                        </View>
                      </View>
                    )
                  })
                }
                {
                  is_pro ?
                    <View style={styles.resultRow}>
                      <View>
                        <Text style={styles.tableCellTTC}>TVA</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.TableCellResult}>{moneyFormat(bookingObj.vat)} €</Text>
                      </View>
                    </View> :
                    bookingObj.cesu_amount > 0 ?
                      <View style={styles.resultRow}>
                        <View>
                          <Text style={styles.tableCellTTC}>Cesu</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.TableCellResult}>{moneyFormat(bookingObj.cesu_amount)} €</Text>
                        </View>
                      </View> : null
                }
                <View style={styles.resultRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCellTTC}>TOTAL TTC</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.TableCellResult}>{moneyFormat(bookingObj.amount - bookingObj.fees)} €</Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View>
                    <Text style={styles.object}>Date {is_pro ? 'de la facture'
                      : 'du récépissé'} : </Text>
                  </View>
                  <View>
                    <Text>{moment(bookingObj.end_date).format('DD/MM/YYYY')}</Text>
                  </View>
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View>
                    <Text style={styles.object}>Date de paiement : </Text>
                  </View>
                  <View>
                    <Text>{moment(bookingObj.date).format('DD/MM/YYYY')}</Text>
                  </View>
                </View>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <View>
                  <Text style={styles.object}>Référence de transaction : </Text>
                </View>
                <View>
                  <Text>{bookingObj.id}</Text>
                </View>
              </View>
              <View style={styles.infos}>
                <Text>
                  {is_pro ? 'Pour toute question concernant cette facture' :
                    'Ceci n\'est pas une facture. Pour toute question concernant ce récépissé'
                  }, veuillez <Link
                  src={'https://www.my-alfred.io/contact'}>nous contacter.</Link></Text>
              </View>
              {/*Footer*/}
              <View fixed style={styles.footer}>
                <Text>Page {page}</Text>
              </View>
            </Page>
          )}
      </Document>
    )
  }
}

export default (LayoutPdf);

