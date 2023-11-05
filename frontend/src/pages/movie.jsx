import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function MoviePage() {
  return (
    <>
      <Helmet>
        <title> Movies </title>
      </Helmet>

      <UserView />
    </>
  );
}
