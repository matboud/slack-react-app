import React, { Component } from 'react';
import { Segment, Accordion, Header, Icon } from 'semantic-ui-react';

class MetalPanel extends Component {
   state = {
      privateChannel: this.props.isPrivateChannel,
      activeIndex: 0,
   }

   setActiveIndex = (event, titleProps) => {
      const {index} = titleProps;
      const {activeIndex} = this.setState;
      const newIndex = activeIndex === index ? -1 : index;
      this.setState({activeIndex: newIndex});
   }


   render() {
      const { activeIndex, privateChannel } = this.state;

      if(privateChannel) return null
      return (
         <Segment>
            <Header
               as="h5"
               attached="top"
            >
               About # Channel
            </Header>
            <Accordion
               styled
               attached="true"
            >
               <Accordion.Title
                  active={activeIndex === 0}
                  index={0}
                  onClick={this.setActiveIndex}
               >
                  <Icon name="dropdown"/>
                  <Icon name="info" />
                  Channel Details
               </Accordion.Title>
               <Accordion.Content active={activeIndex === 0}>
                  Details
               </Accordion.Content>


               <Accordion.Title
                  active={activeIndex === 1}
                  index={1}
                  onClick={this.setActiveIndex}
               >
                  <Icon name="dropdown"/>
                  <Icon name="user circle" />
                  Top Posters
               </Accordion.Title>
               <Accordion.Content active={activeIndex === 1}>
                  Posters
               </Accordion.Content>


               <Accordion.Title
                  active={activeIndex === 2}
                  index={2}
                  onClick={this.setActiveIndex}
               >
                  <Icon name="dropdown"/>
                  <Icon name="pencil alternate" />
                  Created By
               </Accordion.Title>
               <Accordion.Content active={activeIndex === 2}>
                  creator
               </Accordion.Content>
            </Accordion>
         </Segment>
      )
   }
}

export default MetalPanel;
