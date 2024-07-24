import React from 'react';
// the ProduceContext is used to get the curr product context (stores the ID of the curr Jira issue)
import ForgeReconciler, { Text, useProductContext } from '@forge/react';
import { requestJira } from '@forge/bridge';

const App = () => {
  // automatically gets the product context
  const context = useProductContext();

  // comments variable - for storing comments data
  const [comments, setComments] = React.useState();
  console.log(`Number of comments on this issue: ${comments?.length}`);

  // calls the Jira REST API by using requestJira()
  const fetchCommentsForIssue = async () => {
    // extract issue ID instead expecting one from function input
    const issueId = context?.extension.issue.id;
  
    // modify to take issueId variable
    const res = await requestJira(`/rest/api/3/issue/${issueId}/comment`);
    const data = await res.json();
    return data.comments;
  };

  // automatically runs when context finishes loading
  React.useEffect(() => {
    if (context) {
      // extract issue ID from the context
      const issueId = context.extension.issue.id;

      // updates the data stored in comments variable
      fetchCommentsForIssue().then(setComments);
    }
  }, [context]);

  return (
    <>
      <Text>Hello world!</Text>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);