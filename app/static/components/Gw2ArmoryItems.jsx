import React, { PropTypes } from 'react';
class Gw2ArmoryItems extends React.Component {
  shouldComponentUpdate () {
    // We don't want the embed to be blown away by re-renders.
    return false;
  }

  componentDidMount () {
    const script = document.createElement('script');
    script.src = 'https://gw2armory.com/gw2aEmbeds.js';
    document.body.appendChild(script);
  }

  render () {
    return <div data-armory-embed="items" data-armory-ids={this.props.value} />;
  }
}

export default Gw2ArmoryItems;