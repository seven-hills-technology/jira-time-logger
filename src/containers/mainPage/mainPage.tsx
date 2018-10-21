import React from 'react';
import { State } from '../../store/state';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

interface OwnProps {

}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapActionToProps>;

export class MainPage extends React.Component<OwnProps & StateProps & DispatchProps> {

    render() {
        return (
            <div>
                <p>Welcome!</p>
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {
    };
}

function mapActionToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapActionToProps)(MainPage);