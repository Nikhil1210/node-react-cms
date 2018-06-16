import React from 'react';
import PropTypes from 'prop-types';
import { indexOf } from 'lodash';
import PageVisited from './PageVisited';
import PageNotVisited from './PageNotVisited';
import PageActive from './PageActive';
import NavSeparator from './NavSeparator';

export default class NavigationController extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { visited: [], pathname: '/' };
    }

    componentWillMount() {
        this.props.history.listen((location) => {
            this.changeLocation(location.pathname);
        });
    }
    changeLocation(pathname) {
        if (indexOf(this.state.visited, pathname) === -1) {
            this.setState({ visited: [this.state.pathname, ...this.state.visited], pathname });
        } else {
            this.setState({ pathname });
        }
    }
    render() {
        const { visited, pathname } = this.state;
        return (
            <div className="navigation-bar d-flex justify-content-center col no-gutters">
                {
                    this.props.controls.map((cont, idx) => {
                        if (cont.next) {
                            if (pathname && cont.path === pathname) {
                                if (idx > 0) {
                                    return (
                                        <React.Fragment key={`${idx + 1}`}>
                                            <NavSeparator separatorClass="nav-separator-success" />
                                            <PageActive containerValue={idx + 1} containerText={cont.text} />
                                        </React.Fragment>
                                    );
                                }
                                return (<PageActive containerValue={idx + 1} key={`${idx + 1}`} containerText={cont.text} />);
                            } else if (indexOf(visited, cont.path) !== -1) {
                                if (idx > 0) {
                                    return (
                                        <React.Fragment key={`${idx + 1}`}>
                                            <NavSeparator separatorClass="nav-separator-success" />
                                            <PageVisited containerText={cont.text} />
                                        </React.Fragment>
                                    );
                                }
                                return (<PageVisited key={`${idx + 1}`} containerText={cont.text} />);
                            }
                            if (idx > 0) {
                                return (
                                    <React.Fragment key={`${idx + 1}`}>
                                        <NavSeparator separatorClass="nav-separator-success" />
                                        <PageNotVisited containerValue={idx + 1} containerText={cont.text} />
                                    </React.Fragment>
                                );
                            }
                            return (<PageNotVisited key={`${idx + 1}`} containerText={cont.text} containerValue={idx + 1} />);
                        }
                        return null;
                    })
                }
            </div>
        )
    }
}

NavigationController.PropTypes={
    controls: PropTypes.arrayOf(PropTypes.object).isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
}