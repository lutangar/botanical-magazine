import React, { PropTypes, Component } from 'react';

class App extends Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
