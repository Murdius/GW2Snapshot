import React from 'react';
import FilterLink from '../containers/FilterLink';

const Filters = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_NONZERO">
      Non-zero
    </FilterLink>
  </p>
)

export default Filters
