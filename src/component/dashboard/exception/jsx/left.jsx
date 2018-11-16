import React from 'react';
import assign from 'object-assign';
import PropTypes from 'prop-types';
import { Tree } from 'shineout';
import styles from '../style.css';
import { changeValue, getExceptionRate, staffAttendanceInit } from '../action';
import moment from 'moment';

export default class LeftTree extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      cityTree, dispatch, clickedId, TabValue,
    } = this.props;


    return (
      <div className={styles.left}>
        <Tree
          data={cityTree}
          keygen="id"
          defaultExpanded={['0']}
          renderItem={v => (<span className={clickedId === v.id ? styles.leftItem : null}>{v.areaName}</span>)}
          line={false}
          onClick={(node, id) => {
            if (id.split('.').length === 2) {
              return null;
            }
            if (id.split('.').length === 4 && node.person !== true) {
              return null;
            }
            dispatch(changeValue('clickedId', id));
            dispatch(changeValue('node', node));
            if (TabValue === 0) {
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
            }
            if (TabValue === 1) {
              return dispatch(staffAttendanceInit(assign({}, this.props, {
                node,
                clickedId: id,
              })));
            }
          }}
        />
      </div>
    );
  }
}
