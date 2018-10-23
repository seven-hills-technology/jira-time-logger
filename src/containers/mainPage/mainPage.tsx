import React from 'react';
import { State } from '../../store/state';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as _ from "lodash";
import moment from "moment";

import { loadAllJiraIssues, saveWorklog } from '../../actions/jiraActions';
import MainPageForm from './mainPageForm';

interface OwnProps {
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapActionToProps>;

export class MainPage extends React.Component<OwnProps & StateProps & DispatchProps> {
    state = {typeaheadOptions: [] as {id: string, label: string}[]};

    async componentDidMount() {
        await this.props.actions.loadAllJiraIssues();
    }

    async onSubmit(values: any) {
        if (values.date != null && values.hours != null && values.comment != null) {
            const issueKey = values.issue && values.issue.id || null;
            await this.props.actions.saveWorklog(issueKey, moment(values.date).toDate(), values.hours, values.comment);
        }
    }

    render() {
        return (
            <div className="container">
                <MainPageForm initialValues={this.props.initialValues}
                              jiraIssues={this.props.jiraIssues}
                              onSubmit={this.onSubmit.bind(this)}></MainPageForm>
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        initialValues: {date: moment().format("YYYY-MM-DD")},
        jiraIssues: state.jira && state.jira.jiraIssues || []
    };
}

function mapActionToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators({loadAllJiraIssues, saveWorklog}, dispatch)
    };
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapActionToProps)(MainPage);