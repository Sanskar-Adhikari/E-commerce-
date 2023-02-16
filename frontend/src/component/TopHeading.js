import React, { useEffect } from 'react';
function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}

function TopHeading({title}) {
  return (
    <div>
      <PageTitle title={title} />
    </div>
  );
}

export default TopHeading;