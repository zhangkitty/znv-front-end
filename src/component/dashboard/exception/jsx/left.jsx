import React from 'react';
import assign from 'object-assign';
import PropTypes from 'prop-types';
import { Tree } from 'shineout';
import styles from '../style.css';
import { changeValue, getExceptionRate } from '../action';
import moment from 'moment';

export default class LeftTree extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cityTree, dispatch, clickedId } = this.props;
    const transfrom = data => data.map(v => assign({}, v, {
      id: `${v.level}.${v.areaCode}`,
      children: transfrom(v.cityList),
    }));

    const data = [{
      areaName: '全国',
      id: '0',
      children: transfrom(cityTree),
    }];
    return (
      <div className={styles.left}>
        <Tree
          data={data}
          keygen="id"
          defaultExpanded={['0']}
          renderItem={v => (<span className={clickedId === v.id ? styles.leftItem : null}>{v.areaName}</span>)}
          line={false}
          onClick={(node, id) => {
            if (id.split('.').length === 2) {
              return null;
            }
            dispatch(changeValue('clickedId', id));
            dispatch(changeValue('node', node));
            return dispatch(getExceptionRate(assign({}, this.props, {
              node,
              clickedId: id,
              onlineRate: assign({}, this.props.onlineRate, {
                trend: assign({}, this.props.onlineRate.trend, {
                  dateValue: [
                    moment().subtract(30, 'days').toDate(),
                    moment().toDate(),
                  ],
                }),
                detailData: assign({}, this.props.onlineRate.detailData, {
                  choosedData: moment().format('YYYY-MM-DD'),
                }),
              }),
            })));
          }}
        />
      </div>
    );
  }
}
