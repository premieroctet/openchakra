import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Edit from '@material-ui/icons/EditOutlined';
import Delete from '@material-ui/icons/DeleteOutlined';
import { Document,Page } from 'react-pdf'
import styles from './DocumentEditorStyle'
import axios from 'axios'

class DocumentEditor extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      pageNumber:1,
    }
  }

  componentDidMount() {
  }

  render(){

    const {db_document, uploaded_file, onChange, onDelete, classes, disabled, ext, confirmed, title}=this.props

    if (uploaded_file) {
      console.log(uploaded_file)
    }

    console.log(`extension : ${ext}`)
    return (
        uploaded_file ?
        <Grid container style={{marginTop: 20,alignItems:"center"}}>
          <Grid
            item xs={6}
            style={{height:115,border:'0.2px solid lightgrey',display:"flex",justifyContent:"center",
            backgroundImage:`url('${uploaded_file}')`,
            backgroundPosition:"center",backgroundSize:"cover"}}
          />
          <Grid item xs={3}>
            <label style={{display: 'inline-block',marginTop:15,textAlign:"center"}} className="forminputs">
              <Edit style={{cursor:"pointer"}}/>
              <input  id="file" style={{width: 0.1, height: 0.1, opacity: 0, overflow: 'hidden'}} name="myCardR" type="file"
              onChange={onChange}
              className="form-control" accept=".jpg,.jpeg,.png,.pdf"
              />
            </label>
            <Delete style={{cursor:"pointer"}} color={"secondary"} onClick={onDelete}/>
          </Grid>
        </Grid>
          :
          db_document ?
            <Grid item>
              <Grid container style={{alignItems:"center", flexWrap: 'nowrap'}}>
                <Grid item>
                  <Grid container style={{border:'1px solid lightgrey',marginTop:20,alignItems:"center", justifyContent: 'center'}}>
                    <Grid item>
                    {ext ==='pdf' ?
                      <Document file={`../${db_document}`} onLoadSuccess={this.onDocumentLoadSuccess} >
                        <Page pageNumber={this.state.pageNumber} width={200} />
                      </Document>
                      :
                      <img src={`../${db_document}`} alt={'recto'} width={200}/>
                    }
                    </Grid>
                    <Grid item className={classes.contentIcones}>
                      <label className={classes.forminputs}>
                        <Edit color={'primary'} style={{cursor:"pointer"}}/>
                        <input id="file" style={{width: 0.1, height: 0.1, opacity: 0, overflow: 'hidden'}} name="myCardR" type="file"
                        onChange={onChange}
                        className="form-control" accept=".jpg,.jpeg,.png,.pdf"
                        />
                      </label>
                      <Delete style={{cursor:"pointer"}} color={"secondary"} onClick={onDelete}/>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  {confirmed ?
                    <img src={'/static/Confiance et vérification active.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/>
                    :
                    <img src={'/static/Confiance et vérification.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/>
                  }
                </Grid>
              </Grid>
            </Grid>
          :
          <Grid item xs={6} className={classes.containerRecto}>
            <label style={{display: 'inline-block',marginTop:15,textAlign:"center"}} className="forminputs">
              <p style={{cursor:"pointer",color:'darkgrey',fontSize: '0.9rem'}}>{title}</p>
              <input disabled={disabled} id="file" style={{width: 0.1, height: 0.1, opacity: 0, overflow: 'hidden'}} name="myCardR" type="file"
              onChange={onChange}
              className="form-control" accept=".jpg,.jpeg,.png,.pdf"
              />
            </label>
          </Grid>
      )
  }

}

//export default withStyles(styles, { withTheme: true }) (UserAvatar);
export default withStyles(styles)(DocumentEditor);
