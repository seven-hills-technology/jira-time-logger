import React from 'react';
import { State } from '../../store/state';
import { connect } from 'react-redux';
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { bindActionCreators, Dispatch } from 'redux';
import * as _ from "lodash";

import { jiraIssueIndexService } from '../../services/jiraIssueIndexService';
import { loadAllJiraProjects, loadAllJiraIssues } from '../../actions/jiraActions';

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

    onSearch(searchText: string) {
        const searchResults: {ref: string, score: number}[] = jiraIssueIndexService.search(searchText);
        const searchResultsByKey = new Map<string, {ref: string, score: number}>(searchResults.map(x => [x.ref, x]) as any);
        const newTypeaheadOptions = _(this.props.jiraIssues)
            .filter(x => searchResultsByKey.has(x.key))
            .map(x => ({id: x.key, label: `[${x.fields.project.name}] ${x.key} - ${x.fields.summary}`, score: searchResultsByKey.get(x.key).score}))
            .orderBy(["score"], ["desc"])
            .value();
        this.setState({typeaheadOptions: newTypeaheadOptions});
    }

    render() {
        return (
            <div>
                <AsyncTypeahead options={this.state.typeaheadOptions} 
                                isLoading={false}
                                onSearch={this.onSearch.bind(this)}
                                filterBy={() => true}></AsyncTypeahead>
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