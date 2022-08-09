import React from 'react'
import UserAvatar from '../../components/Avatar/UserAvatar'

import Card from '../../components/Card/Card'

const CardTest = () => {

  const PICTURE_PATH={picture: 'https://www.science-et-vie.com/wp-content/uploads/scienceetvie/2015/06/Peut-on-vraiment-produire-des-nombres-au-hasard.jpg'}
  return (
    <div style={{width: '100%', display: 'flex', flex: 'auto'}}>
      <Card title={'titre'}/>
      <Card title={'titre'} {...PICTURE_PATH}/>
      <Card title={'titre'} {...PICTURE_PATH} user={{avatar_letters: 'SA'}} description={'Lorem ipsum dolor sit amet, consectetuer adipiscin'} rating={true}/>
      <Card title={'titre'} user={{picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Reddot-small.svg/480px-Reddot-small.svg.png'}}/>
    </div>
  )
}

export default CardTest
