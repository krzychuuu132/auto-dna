import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/atoms/Button';

const Root = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button>
          <span>dziala!</span>
        </Button>
      </header>
    </div>
  );
};

Root.propTypes = {};

export default Root;
