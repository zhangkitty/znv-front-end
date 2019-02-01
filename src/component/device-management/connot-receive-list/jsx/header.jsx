import React from 'react';


const tmp = (props) => {
  console.log(1);
  return (
    <div className={styles.all}>
          <span className={styles.one} />
          <a download href="/rqs-dftc/exception/downloaddevicelist?checkStatus=2">
          <Button
            className={styles.two}
            style={{ width: 80 }}
            type="primary">下载清单
          </Button>
          </a>
        </div>
  );
};

export default tmp;
