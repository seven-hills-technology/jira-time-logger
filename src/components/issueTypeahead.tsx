import React from 'react';
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import _ from "lodash";

import { jiraIssueIndexService } from '../services/jiraIssueIndexService';
import { WrappedFieldProps } from 'redux-form';
import { RedisJiraIssue } from '../models/redisJiraIssue';

interface OwnProps {
    jiraIssues: RedisJiraIssue[];
}

interface TypeaheadOption {
    id: string; 
    label: string; 
    score: number; 
    jiraIssue: RedisJiraIssue
}

export default class IssueTypeahead extends React.Component<WrappedFieldProps & OwnProps> {
    state = {
        typeaheadOptions: [] as TypeaheadOption[],
        selectedTypeaheadOptions: [] as TypeaheadOption[]
    };

    onSearch(searchText: string) {
        const searchResults: {ref: string, score: number}[] = jiraIssueIndexService.search(searchText);
        const searchResultsByKey = new Map<string, {ref: string, score: number}>(searchResults.map(x => [x.ref, x]) as any);
        const newTypeaheadOptions = _(this.props.jiraIssues)
            .filter(x => searchResultsByKey.has(x.key))
            .map(x => ({id: x.key, label: `[${x.project}] ${x.key} - ${x.summary}`, score: searchResultsByKey.get(x.key).score, jiraIssue: x}))
            .orderBy(["score"], ["desc"])
            .value();
        this.setState({
            ...this.state,
            typeaheadOptions: newTypeaheadOptions
        });
    }

    onChange(selected: TypeaheadOption[]) {
        this.setState({
            ...this.state,
            selectedTypeaheadOptions: selected
        })
        const selectedTypeaheadOption = selected[0] || null;
        this.props.input.onChange(selectedTypeaheadOption);
        this.props.input.value = selectedTypeaheadOption;
    }

    componentDidUpdate() {
        const currentValue = this.state.selectedTypeaheadOptions[0] || null;
        const newValue = this.props.input.value != null && this.props.input.value !== "" ? this.props.input.value : null;

        const differentValues = (currentValue == null) !== (newValue == null) || (currentValue != null && newValue != null && currentValue.id !== newValue.id);
        console.log("currentValue:", currentValue, "newValue:", newValue, "differentValues:", differentValues);
        if (differentValues) {
            this.setState({
                ...this.state,
                selectedTypeaheadOptions: newValue != null ? [newValue] : []
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                    <AsyncTypeahead options={this.state.typeaheadOptions} 
                                    selected={this.state.selectedTypeaheadOptions}
                                    autoFocus={true}
                                    isLoading={false}
                                    onSearch={this.onSearch.bind(this)}
                                    onChange={this.onChange.bind(this)}
                                    filterBy={() => true}></AsyncTypeahead>
            </React.Fragment>
        )
    }
}