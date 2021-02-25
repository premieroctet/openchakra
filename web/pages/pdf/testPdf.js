import LayoutPdf from "../../hoc/Layout/Pdf/LayoutPdf";
import React from "react";
import {PDFDownloadLink} from "@react-pdf/renderer";
import NoSSR from 'react-no-ssr';
import Grid from "@material-ui/core/Grid";


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
        {
        loading ? "Chargement en cours..." :
          <Grid onClick={this.setLoading}>
            <PDFDownloadLink
              document={<LayoutPdf/>}
              fileName="facture.pdf">
              Télécharger ma facture
            </PDFDownloadLink>
          </Grid>
      }
      </NoSSR>
    );
  }
}

export default TestPdf