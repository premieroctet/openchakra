import React from 'react';
import Avatar from '@material-ui/core/Avatar';

class UserAvatar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    const {user, className} = this.props;
    console.log(user.kyc_errors);

    if (user) {
      const picture = user.picture===undefined || user.picture==='' ? null : user.picture;
      return picture?
           <Avatar alt="photo de profil" src={"/"+user.picture} className={className} />
           :
           <Avatar alt="photo de profil" className={className}>{user.avatar_letters}</Avatar>
    }
    else {
      return <Avatar alt="photo de profil" src='/static/basicavatar.png' className={className} />
    }
  }
}

export default UserAvatar;
