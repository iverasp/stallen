import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { Category } from './Category';
import { Hamburger } from './Hamburger';
import { usePersistedState } from '../../hooks/usePersistedState';

const StyledSidebar = styled.div`
  z-index: 1;
  position: absolute;
  top: 5px;
  left: 5px;
`;

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = usePersistedState('showSidebar', false);

  const data = useStaticQuery(graphql`
    query MyQuery {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              category
              title
            }
          }
        }
      }
    }
  `);

  const categories = [];
  data.allMdx.edges.forEach((d) => {
    const { node: { frontmatter: { category } } } = d;
    const { node } = d;
    if (Object.keys(categories).indexOf(category) !== -1) {
      categories[category].push(node);
    } else {
      categories[category] = [node];
    }
  });

  return (
    <StyledSidebar>
      <Hamburger onClick={() => setShowSidebar(!showSidebar)} />
      {showSidebar && Object.keys(categories).sort().map((key) => (
        <Category key={key} name={key} pages={categories[key]} />
      ))}
    </StyledSidebar>
  );
};

export default Sidebar;
