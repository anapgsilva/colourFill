import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const Search = (props) => {

  const [query, setQuery] = useState("");

  const findPictures = () => {
    props.history.push(`/search/${query}`)
  }

  return (
    <div className="search">
      <h5>Search For A Themed Picture</h5>
      <Form onSubmit={findPictures}>
        <label>
          <input type="search" placeholder="Choose a picture theme" value={query} onChange={e => setQuery(e.target.value)} required/>
        </label>
        <label>
        <Button type="submit" value="search">
          Get Pictures
        </Button>
        </label>
      </Form>
    </div>
  )
}


export default withRouter(Search);
