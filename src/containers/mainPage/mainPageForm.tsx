import React from 'react';
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import _ from "lodash";

import { jiraIssueIndexService } from '../../services/jiraIssueIndexService';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { JiraIssue } from '../../models/jiraIssue';

interface OwnProps {
    jiraIssues: JiraIssue[];
    onSubmit: (values: any) => void;
}

export class MainPageForm extends React.Component<OwnProps & InjectedFormProps<{}, OwnProps>> {
    state = {typeaheadOptions: [] as {id: string, label: string}[]};

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
            <form onSubmit={this.props.handleSubmit(this.props.onSubmit.bind(this))}>
                <FormGroup>
                    <ControlLabel>Issue</ControlLabel>
                    <AsyncTypeahead options={this.state.typeaheadOptions} 
                                    autoFocus={true}
                                    isLoading={false}
                                    onSearch={this.onSearch.bind(this)}
                                    filterBy={() => true}></AsyncTypeahead>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Date</ControlLabel>
                    <Field name="date" component="input" className="form-control" type="date" /> 
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Hours</ControlLabel>
                    <Field name="hours" component="input" className="form-control" /> 
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                    <Field name="description" component="textarea" className="form-control" /> 
                </FormGroup>
                <div>
                    <Button className="btn btn-primary" type="submit">Submit</Button>
                </div>
            </form>
        );
    }
}

export default reduxForm<{}, OwnProps>({ form: "mainPageForm", enableReinitialize: true })(MainPageForm);