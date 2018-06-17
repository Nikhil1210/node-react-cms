import React from 'react';
import PropTypes from 'prop-types';
import { omit, isEmpty } from 'lodash';

class TableMobile extends React.PureComponent {
    state = { index: 0 };
    handlePrev = e => {
        e.preventDefault();
        if (this.state.index > 0) {
            this.setState({ index: this.state.index - 1 });
        }
    };
    handleNext = e => {
        e.preventDefault();
        if (this.state.index < this.props.body.rows.length - 1) {
            this.setState({ index: this.state.index + 1 })
        }
    }
    render() {
        const props = this.props;
        return (
            <React.Fragment>
                <table {...omit(this.props, ['head', 'body', 'lables'])}>
                    {props.head &&
                        <thead>
                            <tr>
                                <th {...omit(props.lables[0], 'content')} style={{ textAlign: 'left !important' }}>{props.lables[0].content}</th>
                                <th {...omit(props.lables[1], 'content')} style={{ textAlign: 'left !important' }}>{props.lables[1].content}</th>
                            </tr>
                        </thead>
                    }
                    {props.body && !isEmpty(props.body.rows) &&
                    <tbody {...omit(props.body, 'rows')}>
                    {props.error &&
                        <td {...omit(props.body.rows[this.state.index].cols[0], ['content', 'colSpan'])} colSpan={2}> {props.body.rows[this.state.index].cols[0].content}</td>
                    }
                    {!props.error && props.head.cols.map((row,idx)=>(<tr {...omit(row,'content')} key={`tbody-rows-${idx}`}>
                    <td {...omit(row,'content')} style={{textAlign:'left !important'}}>{row.content}</td>
                    <td {...omit(props.body.rows[this.state.index].cols[idx], 'content')} style={{textAlign:'right !important'}}>{props.body.rows[this.state.index].cols[idx].content}</td>
                    </tr>))}
                    </tbody>
                    }
                </table>
                    {!props.error && props.body && !isEmpty(props.body.rows) &&
                        <div className="table-page row no-gutters">
                        <div className="col text-center py-2"><a onClick={this.handlePrev} tabIndex="1">{props.nav.prev} </a></div>
                        <div className="col text-center py-2">{this.state.index+1}<span>{props.nav.of}</span>{this.props.body.rows.length}</div>
                        <div className="col text-center py-2"><a onClick={this.handleNext} tabIndex="1">{props.nav.next} </a></div>
                        </div>
                    }
                </React.Fragment>
                )
            }
}

TableMobile.propTypes={
    head: PropTypes.shape({
        cols: PropTypes.arrayOf(PropTypes.shape({
            content:PropTypes.any
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

export default TableMobile;