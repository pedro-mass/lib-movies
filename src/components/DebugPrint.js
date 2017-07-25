import styles from './DebugPrint.css';
import React from 'react';

export default class DebugPrint extends React.PureComponent {
  constructor(props) {
    super(props);
    // autoBind(this);
    this.state = {
      show: false
    };
  }

  toggle = () => {
    this.setState({
      show: !this.state.show
    });
  };

  render() {
    return (
      <div style={styles.root}>
        <div style={styles.header} onClick={this.toggle}>
          <strong>Debug</strong>
        </div>
        {this.state.show
          ? <pre style={styles.pre}>
              {JSON.stringify(this.props.data, null, 2)}
            </pre>
          : null}
      </div>
    );
  }
}
