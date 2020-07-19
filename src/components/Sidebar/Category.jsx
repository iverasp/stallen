import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { usePersistedState } from '../../hooks/usePersistedState';

const Name = styled.div``;
const Pages = styled.div`
  display: ${props => props.show ? 'inline' : 'none'};
`;
const Page = styled.div``;

export const Category = (props) => {

  const { name, pages } = props;
  const [showPages, setShowPages] = usePersistedState(`show-sidebar-category-${name}`, false);

  return (
    <div>
      <Name onClick={() => setShowPages(!showPages)}>{name}</Name>
      <Pages show={showPages}>
        {pages.map((page) => (
          <Page key={page.id}><Link to={page.fields.slug}>{page.frontmatter.title}</Link></Page>
        ))}
      </Pages>
    </div>
  );
};
