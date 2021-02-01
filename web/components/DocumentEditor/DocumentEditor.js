import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Edit from '@material-ui/icons/EditOutlined';
import Delete from '@material-ui/icons/DeleteOutlined';
import {Document, Page} from 'react-pdf';
import styles from './DocumentEditorStyle';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

class DocumentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      uploaded_type: null,
      document_type: null,
    };
  }

  componentDidMount() {
  }

  render() {

    const {db_document, uploaded_file, onChange, onDelete, classes, disabled, ext, ext_upload, confirmed, title} = this.props;

    const doc=uploaded_file ? uploaded_file : db_document ? `/${db_document}` : null
    const extension = uploaded_file ? ext_upload : ext

    return (
        doc ?
          <Grid item>
            <Grid container style={{alignItems: 'center', flexWrap: 'nowrap'}}>
              <Grid item>
                <Grid container style={{
                  border: '1px solid lightgrey',
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Grid item>
                    {extension === 'pdf' ?
                      <Document file={doc} onLoadSuccess={this.onDocumentLoadSuccess}>
                        <Page pageNumber={this.state.pageNumber} width={200}/>
                      </Document>
                      :
                      <img src={doc} alt={'recto'} width={200}/>
                    }
                  </Grid>
                  <Grid item className={classes.contentIcones}>
                    <input
                      id="icon-button-file"
                      style={{display: 'none'}}
                      name="myCardR"
                      type="file"
                      onChange={onChange}
                      accept=".jpg,.jpeg,.png,.pdf"
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton aria-label="update" component="span">
                        <EditIcon/>
                      </IconButton>
                    </label>
                    <IconButton aria-label="delete" onClick={onDelete}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                {confirmed ?
                  <img src={'/static/Confiance et vérification active.svg'} alt={'check'} width={28}
                       style={{marginLeft: 5}}/>
                  :
                  <img src={'/static/Confiance et vérification.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/>
                }
              </Grid>
            </Grid>
          </Grid>
          :
          <Grid item xs={12} className={classes.containerRecto}>
            <label style={{display: 'inline-block', marginTop: 15, textAlign: 'center'}} className="forminputs">
              <p style={{cursor: 'pointer', color: 'darkgrey', fontSize: '0.9rem'}}>{title}</p>
              <input disabled={disabled} id="file" style={{width: 0.1, height: 0.1, opacity: 0, overflow: 'hidden'}}
                     name="myCardR" type="file"
                     onChange={onChange}
                     className="form-control" accept=".jpg,.jpeg,.png,.pdf"
              />
            </label>
          </Grid>
    );
  }

}

export default withStyles(styles)(DocumentEditor);
