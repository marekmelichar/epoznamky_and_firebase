import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import IconNotes from '../icons/IconNotes';

class Logo extends Component {
  render() {
    return(
      <Link className="logo" to="/">
        <h3 className="heading"><span className="head">epoznamky.cz</span><span className="icon"><IconNotes fill="#2DB5CF" /></span></h3>
      </Link>
    );
  }
}

export default Logo;
