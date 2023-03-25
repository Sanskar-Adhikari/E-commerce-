import React, { useEffect } from 'react';


/**/
/*
PageTitle
NAME
    PageTitle
SYNOPSIS
    PageTitle({ title })
    title -> string, title to be set for the page
DESCRIPTION
    This component sets the document title of the page based on the title prop passed to it
RETURNS
    null
*/
/**/
function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}
/* PageTitle({ title }) */


/**/
/*
TopHeading
NAME
    TopHeading
SYNOPSIS
    TopHeading({ title })
    title -> string, title to be set for the page
DESCRIPTION
    This is a functional component that renders the page title. 
RETURNS
    jsx element with PageTitle component in the page header section.
*/
/**/
function TopHeading({title}) {
  return (
    <div>
      <PageTitle title={title} />
    </div>
  );
}
/* TopHeading({ title }) */

export default TopHeading;