import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const ConfigureServer = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>{props.serverId}</h1>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfigureServer);
