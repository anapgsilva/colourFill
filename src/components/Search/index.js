import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const Search = (props) => {

  const [query, setQuery] = useState("frozen");

  const findPictures = () => {
    props.history.push(`/search/${query}`)
  }

  return (
    <div className="search">
      <h1>Search for pictures</h1>
      <Form onSubmit={findPictures}>
        <label>
          <input type="search" placeholder="Choose a picture theme" value={query} onChange={e => setQuery(e.target.value)} required/>
        </label>

        <Button type="submit" value="search">
          Get Pictures
        </Button>
      </Form>
    </div>
  )
}


export default withRouter(Search);
