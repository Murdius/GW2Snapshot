import React, { PropTypes } from 'react';
class Gw2ArmoryItems extends React.Component {
  shouldComponentUpdate () {
    // We don't want the embed to be blown away by re-renders.
    return false;
  }

  componentDidMount () {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/armory-embeds@^0.x.x/armory-embeds.js';
    document.body.appendChild(script);
  }

  render () {
    return <div data-armory-embed="items" data-armory-ids={this.props.value} />;
  }
}

export default Gw2ArmoryItems;