import React from 'react';
import { State } from '../../store/state';
import { connect } from 'react-redux';
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { bindActionCreators, Dispatch } from 'redux';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import * as _ from "lodash";

import { jiraIssueIndexService } from '../../services/jiraIssueIndexService';
import { loadAllJiraProjects, loadAllJiraIssues } from '../../actions/jiraActions';
import { Field } from 'redux-form';
import MainPageForm from './mainPageForm';

interface OwnProps {
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapActionToProps>;

export class MainPage extends React.Component<OwnProps & StateProps & DispatchProps> {
    state = {typeaheadOptions: [] as {id: string, label: string}[]};

    async componentDidMount() {
        await this.props.actions.loadAllJiraProjects();
        await this.props.actions.loadAllJiraIssues();
    }

    async onSubmit(values: any) {
        console.log(values);
    }

    render() {
        return (
            <div className="container">
                <MainPageForm jiraIssues={this.props.jiraIssues}
                              onSubmit={this.onSubmit.bind(this)}></MainPageForm>
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        jiraIssues: state.jira && state.jira.jiraIssues || []
    };
}

function mapActionToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators({loadAllJiraProjects, loadAllJiraIssues}, dispatch)
    };
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapActionToProps)(MainPage);