import elasticlunr from "elasticlunr"

class JiraIssueIndexService {
    index: any;

    constructor() {
        this.index = elasticlunr(function() {
            this.addField("key");
            this.addField("project");
            this.addField("summary");
            this.setRef("id");
        });
        console.log(this.index);
    }

    addToIndex(doc: {id: string, key: string, project: string, summary: string}) {
        this.index.addDoc(doc);
    }

    search(text: string) {
        return this.index.search(text, {
            expand: true
        });
    }
}

export const jiraIssueIndexService = new JiraIssueIndexService();