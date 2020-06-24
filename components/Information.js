import React from 'react';
import Dialog from '@material-ui/core/Dialog';

class Information extends React.Component {

  /**
  props:
   - open : true/false
   - onClose : callback when closing
   - text : text or html
   - type : 'info' or 'warning'
  */
  render() {
    const type=this.props.type ? this.props.type : 'info'
    return (
      <Dialog maxWidth={'xs'} aria-labelledby="simple-dialog-title" open={this.props.open} onClose={this.props.onClose}>
        <div style={{ padding: '15px', display: 'flex'}} >
        <img src={`/static/assets/img/${type}.svg`} width={32} />
        <div style={{ 'padding-left': '15px'}} dangerouslySetInnerHTML={{ __html:  this.props.text }}>
        </div>
        </div>
      </Dialog>
    )
  }

}

module.exports={Information}
