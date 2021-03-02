import LayoutPdf from "../../hoc/Layout/Pdf/LayoutPdf";
import React from "react";
import {PDFDownloadLink} from "@react-pdf/renderer";
import NoSSR from 'react-no-ssr';
import Grid from "@material-ui/core/Grid";
import PdfGeneration from "../../components/PdfGeneration/PdfGeneration";

class TestPdf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  setLoading = () => {
    this.setState({loading: true})

  }

  render() {
    const {loading} = this.state;
    return (
      // <LayoutPdf/>
      <NoSSR>
        <Grid style={{
          textAlign: 'center',
          fontSize: '35px'
        }}>
          {
            loading ? "Chargement en cours..." :
              <Grid onClick={this.setLoading}
              >
                <PDFDownloadLink
                  document={<PdfGeneration/>}
                  fileName="facture.pdf"
                  style={{
                    textDecoration: 'none',
                    color: '#CCDCFB'
                  }}
                >
                  Télécharger ma facture
                </PDFDownloadLink>
              </Grid>
          }
        </Grid>
      </NoSSR>
    );
  }
}

export default TestPdf