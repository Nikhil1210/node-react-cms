import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';

const DESKTOP_BREAKPOINT = 575;

const Table = props => (
    <table {...omit(props, ['head', 'body', 'lables'])}>
        {props.head &&
            <thead {...omit(props.head, 'cols', 'lables')}>
                <tr>
                    {props.head.cols.map((col, idx) => <th key={`head-col-${idx}`} {...omit(col, 'content')}> {col.content}</th>)}
                </tr>
            </thead>
        }
        {props.body &&
            <tbody {...omit(props.body, 'rows')}>
                {props.body.rows.map((row, idx) => (<tr {...omit(col, 'content')} key={`tobody-rows-${idx}`}>
                    {rows.col.map((col, i) => <td {...omit(col, 'content')} key={`tobody-row-${idx}-col-${i}`}>{col.content}</td>)}
                </tr>))}
            </tbody>
        }
    </table>
);

Table.propTypes = {
    head: PropTypes.shape({
        cols: PropTypes.arrayOf(PropTypes.shape({
            content: PropTypes.any
        }))
    }),
    body: PropTypes.shape({
        rows: PropTypes.arrayOf(PropTypes.shape({
            cols: PropTypes.arrayOf(PropTypes.shape({
                content: PropTypes.any
            }))
        }))
    }).isRequired
};
export default Table;