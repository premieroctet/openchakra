import CustomButton from '../../components/CustomButton/CustomButton';
import DialogReject from '../../components/BookingDetail/DialogReject'
import DialogBase from '../../components/Dialog/DialogBase'
import React from 'react'

class DialogBaseTest extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      base: false,
      reject: false,
    }
  }

  close = st => {
    this.setState({[st]: false})
  }

  open = st => {
    this.setState({[st]: true})
  }

  onRefuse = reason => {
    alert(`Raison:${reason}`)
    this.close('reject')
  }

  render() {
    const {base, reject}=this.state
    const buttons=[
      {label: 'Annuler', onClick: () => this.close('base')},
      {label: 'Ok', onClick: () => this.close('base')},
    ]
    return (
      <>
        <CustomButton onClick={() => this.open('base')}>Dialogue base</CustomButton>
        <CustomButton onClick={() => this.open('reject')}>Dialogue refus réservation</CustomButton>
        <DialogBase title={'Test de dialogue de base'}
          buttons={buttons}
          open={base}
        >
          <h1>{'Le contenu'}</h1>
          <h2>{'Le contenu'}</h2>
        </DialogBase>
        <DialogReject open={reject} onRefuse={this.onRefuse} onClose={() => this.close('reject')}/>
      </>
    )
  }
}

export default DialogBaseTest
