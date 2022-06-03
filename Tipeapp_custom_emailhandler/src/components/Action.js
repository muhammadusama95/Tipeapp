import React from 'react';
import ResetPassword from './ResetPassword';

const Action = (props) => {
  const mode = props.location.query.mode;
  const actionCode = props.location.query.oobCode;
  switch (mode) {
    case 'resetPassword':
      return <ResetPassword actionCode={actionCode} />;
    default:
      return (
        <div className="Action">
          <h1>Error encountered</h1>
          <p>The selected page mode is invalid.</p>
        </div>
      );
  }
}
export default Action;
