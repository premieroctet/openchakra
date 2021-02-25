/*
 Cas 1 : Résa d'un particulier = Un récépissé avec montant de la presta + une facture avec frais de service
 Cas 2 : Résa CESU = Récépissé (avec TVA) + facture frais de service
 Cas 3 : Résa microentrepreneur = Deux factures (presta + TVA) + facture frais de service

 Calcul frais de service : montant /1.2  (20%)
*/

import React from "react";
import {Page, Text, View, Document, StyleSheet, Image, Link, Font} from '@react-pdf/renderer';
import moment from 'moment';
import {moneyFormat} from '../../../utils/converters';

moment.locale('fr');
const BORDER_COLOR = 'white'
const BORDER_STYLE = 'solid'
const COLDESCRIPTION_WIDTH = 40
const COLN_WIDTH = (100 - COLDESCRIPTION_WIDTH) / 3
const BACKGROUND_COLOR = '#CCDCFB';

const resBooking = require("./result.json")


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
  footer: {
    textAlign: 'center',
    paddingTop: '1vh',
    borderTop: '1 solid grey',
    bottom: -130
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
  infos: {
    marginTop: '7vh',
    paddingTop: '1vh',
    borderTop: '1 solid black'
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
    super(props)
    this.state = {
      bookingId: '',
      client: '',
      clientAddress: '',
      clientZipCode: '',
      clientCity: '',
      clientCountry: '',
      alfred: '',
      documentDate: null,
      datePayment: null,
      paymentMethod: '',
      paymentId: '',
      prestations: {
        id: '',
        value: '',
        price: '',
        name: ''
      },
      amount: '',
      fees: '',
      isIndividual: true,
      isCesu: false,
      isContractor: false
    };
  }


  componentDidMount() {
    let dateNow = moment().format('L');

    this.setState({
      bookingId: resBooking.BookingObj.reference,
      client: resBooking.BookingObj.user.full_name,
      clientAddress: resBooking.BookingObj.user.billing_address.address,
      clientZipCode: resBooking.BookingObj.user.billing_address.zip_code,
      clientCity: resBooking.BookingObj.user.billing_address.city,
      clientCountry: resBooking.BookingObj.user.billing_address.country,
      alfred: resBooking.BookingObj.alfred.full_name,
      documentDate: dateNow,
      datePayment: '',
      paymentMethod: 'Carte bancaire',
      paymentId: resBooking.BookingObj.id,
      prestations: {
        id: resBooking.BookingObj.prestations._id,
        value: resBooking.BookingObj.prestations[0].value,
        price: moneyFormat(resBooking.BookingObj.prestations[0].price),
        name: resBooking.BookingObj.prestations[0].name
      },
      amount: moneyFormat(resBooking.BookingObj.amount),
      fees: resBooking.BookingObj.fees,
    });
    if (resBooking.BookingObj.cesu_amount > 0) {
      this.setState({
        isIndividual: false,
        isCesu: true
      })
    }
  }

  render() {
    const {
      bookingId, client, clientAddress, clientZipCode, clientCity, clientCountry,
      alfred, documentDate, paymentId, paymentMethod, prestations, amount, fees, isIndividual,
      isCesu, isContractor
    } = this.state
    return (
      <Document>
        <Page pageNumber={1} size="A4" style={styles.body}>
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

            <Text style={styles.title}>{isContractor ? 'Facture' :
              'Récépissé'} vendeur n° 2021-0000380519</Text>
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View>
              <Text style={styles.objectHead}>Objet :</Text>
            </View>
            <View>
              <Text>Réservation {bookingId}</Text>
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
                  <Text>{client}</Text>
                </View>
                <View>
                  <Text>{clientAddress}</Text>
                </View>
                <View>
                  <Text>{clientZipCode}</Text>
                </View>
                <View>
                  <Text>{clientCity}</Text>
                </View>
                <View>
                  <Text>{clientCountry}</Text>
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
                <Text>{alfred}</Text>
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
                <Text style={styles.tableCell}>{prestations.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellNum}>{prestations.value}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellNum}>{amount} €</Text>
              </View>
            </View>
            <View style={styles.resultRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellTTC}>TOTAL TTC</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.TableCellResult}>{amount} €</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View>
                <Text style={styles.object}>Date {isContractor ? 'de la facture'
                  : 'du récépissé'} : </Text>
              </View>
              <View>
                <Text>{documentDate}</Text>
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
                <Text>{paymentMethod}</Text>
              </View>
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View>
              <Text style={styles.object}>Référence de transaction : </Text>
            </View>
            <View>
              <Text>{paymentId}</Text>
            </View>
          </View>
          <View style={styles.infos}>
            <Text>
              {isContractor ? 'Pour toute question concernant cette facture' :
                'Ceci n\'est pas une facture. Pour toute question concernant ce récépissé'
              }, veuillez <Link
              src={'https://www.my-alfred.io/contact'}>nous contacter.</Link></Text>
          </View>
          {/*Footer*/}
          <View fixed style={styles.footer}>
            <Text>Page 1</Text>
          </View>
        </Page>
      </Document>
    )
  }
}

export default (LayoutPdf);

