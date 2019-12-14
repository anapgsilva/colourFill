import React, {Component} from 'react';
import axios from 'axios';


class ResultsPage extends Component {

  constructor(props) {
    super();
    this.state = {
      query: null,
      pictures: null
    }
  }

  componentDidMount() {
    const {query} = this.props.match.params;
    this.setState({query});

    //do DB request for query
    axios.get()
    //get the array of pics

    //save pics and display on page

  }

  render() {
    return (
      <div>
        Results for {this.props.match.params.query}
      </div>
    )
  }

}

export default ResultsPage;
