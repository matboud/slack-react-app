import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import Channels from './Channels';
import UserPanel from './UserPanel';
import DirectMessages from './DirectMessages';
import Starred from './Starred';

class SidePanel extends Component {
   render() {
      const { currentUser, primaryColor } = this.props;

      return (
         <Menu
            size='large'
            fixed='left'
            inverted
            vertical
            style={{ background: primaryColor, fontSize: '1.2rem' }}
         >
            <UserPanel primaryColor={primaryColor} currentUser={currentUser} />
            <Starred currentUser={currentUser} />
            <Channels currentUser={currentUser} />
            <DirectMessages currentUser={currentUser} />
         </Menu>
      )
   }
}

export default SidePanel;
