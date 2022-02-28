const Quotation = require('../../components/Feurst/Quotation')
import React from 'react'
const {PDFViewer} = require('@react-pdf/renderer')
import NoSSR from 'react-no-ssr'

const PRECOS={'type': 'excavatrice', 'mark': 'CATERPILLAR', 'model': '374D L', 'power': 355, 'weight': 75.5,
  'bladeThickness': 70, 'ground': 'GRAVIER', 'fixType': 'PIN', 'hardness': 'STANDARD', 'family': 'TKN13',
  'teeth_ref': ['TKN13 PE', 'TKN13 PR', 'TKN13 DPE'], 'teeth_count': 5,
  'accessories': {
    'Porte-dents': [
      {'ADAPTEUR': ['TKN13 1570 A10', 5],
        "CHAPEAU D'USURE": ['TKN13 PA', 5],
        'CLAVETTE': ['TKN13 CL', 5],
        'FOURREAU': ['TKN13 SB', 5]},
      {'ADAPTEUR': ['TKN13 1570 STD', 5],
        'CLAVETTE': ['TKN13 CL', 5],
        'FOURREAU': ['TKN13 SB', 5]}],
    'Boucliers inter-dents': [
      {'BOUCLIER A CLAVETER CENTRE': ['TKSH EXC 245-70 C', 4],
        'BOUCLIER A CLAVETER DROIT': ['TKSH EXC 250-70 R', 1],
        'BOUCLIER A CLAVETER GAUCHE': ['TKSH EXC 250-70 L', 1],
        'CLE BOUCLIER': ['TK SH OD', 1]},
      {'BOUCLIER A CLAVETER CENTRE': ['TKSH EXC 280-70 C', 4],
        'BOUCLIER A CLAVETER DROIT': ['TKSH EXC 280-70 R', 1],
        'BOUCLIER A CLAVETER GAUCHE': ['TKSH EXC 280-70 L', 1],
        'CLE BOUCLIER': ['TK SH OD', 1]},
      {'BOUCLIER A CLAVETER CENTRE': ['TKSH EXC 320-70 C', 4],
        'BOUCLIER A CLAVETER DROIT': ['TKSH EXC 320-70 R', 1],
        'BOUCLIER A CLAVETER GAUCHE': ['TKSH EXC 320-70 L', 1],
        'CLE BOUCLIER': ['TK SH OD', 1]},
    ],
    'Bouclier flanc': [{'BOUCLIER DE FLANC A CLAVETER': ['1U0740', 1]}, {'BOUCLIER DE FLANC': ['TK WH 50', 1]}],
    'Bouclier talon': [{'BOUCLIER DE TALON DE GODET': ['PTG 200', 1]}, {'BOUCLIER DE TALON DE GODET': ['PTG 250', 1]}],
    'Dents': [{'Dent': ['TKN13 PE', 5]}, {'Dent': ['TKN13 PR', 5]}, {'Dent': ['TKN13 DPE', 5]}]}}

const INFOS={
  name: 'Gérard Poin', company: 'Colas', email: 'gerard.poin@colas.fr.com.net', phone: '0621436587',
  type: 'excavatrice', mark: 'CATERPILLAR', model: '374D L', ground: 'GRAVIER', bucketSize: 2000,
  fixType: 'SOLD', bladeShape: 'delta',
}

function QuotationTest() {

  return (
    <NoSSR>
      <PDFViewer style={{width: '100%', height: '800px'}} zoom='80%'>
        <Quotation precos={PRECOS} infos={INFOS}/>
      </PDFViewer>
    </NoSSR>
  )
}

module.exports=QuotationTest
