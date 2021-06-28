import React from 'react'

function Assets(props) {

  function myFunction() {
    console.log('bonjour')
  }


  return(
    <>
      <img src={props.src} alt={'coucou'} title={'coucou'} onError={myFunction}/>
    </>
  )
}

export default Assets
