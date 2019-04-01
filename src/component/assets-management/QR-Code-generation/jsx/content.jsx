import React from 'react';
import * as QrCode from 'qrcode.react';


const content = (props) => {
  console.log(1);
  const { dataSource } = props;
  return (

    <div style={{
 marginTop: 20, display: 'flex', width: '100%', flexWrap: 'wrap',
}}
    >

      {
        dataSource.map(v => (
          <div style={{ margin: 10 }}>
            <QrCode value={v} size={120} />
          </div>

        ))
      }
    </div>

  );
};

export default content;
