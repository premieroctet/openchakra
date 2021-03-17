import React from "react";
import {Page, Text, View, Document, StyleSheet, Image, Link, Font} from '@react-pdf/renderer';
import {moneyFormat} from '../../utils/converters';
import moment from "moment";
import pdfStyle from '../../static/css/components/BillingGeneration/BillingGeneration';

const styles = StyleSheet.create(pdfStyle())
moment.locale('fr');

Font.register({
  family: 'SourceSansPro', fonts: [
    {src: 'https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3aPw.ttf'},
    {src: 'https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rAkA.ttf', fontWeight: 600},
  ]
});


class BillingGeneration extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {bookingObj, is_pro} = this.props;
    return (
      <Document>
        <Page pageNumber={"1"} size="A4" style={styles.body}>
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
              'Récépissé'} vendeur n° {moment().format('Y M') + bookingObj.receipt_number}</Text>
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
              is_pro || bookingObj.cesu_amount > 0 ?
                <View style={styles.resultRow}>
                  <View>
                    <Text
                      style={styles.tableCellTTC}>{is_pro ? 'TVA' : bookingObj.cesu_amount > 0 ? 'Cesu' : null}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text
                      style={styles.TableCellResult}>{moneyFormat(
                      is_pro ? bookingObj.vat : bookingObj.cesu_amount > 0 ? bookingObj.cesu_amount : null
                    )} €</Text>
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
            <Text>Page {"1"}</Text>
          </View>
        </Page>
        <Page>

        </Page>
      </Document>
    )
  }
}

export default (BillingGeneration);

