import React from "react";
import { styled } from "frontity";
import Link from "../link";
import ScreenReaderText from "../styles/screen-reader";

const PostMetaItem = ({ icon: Icon, label, link, children }) => {
  return (
    <ListItem>
      <MetaIcon>
        <ScreenReaderText>{label}</ScreenReaderText>
        <Icon />
      </MetaIcon>

      <MetaText>
        {link ? <Link link={link}>{children}</Link> : children}
      </MetaText>
    </ListItem>
  );
};

const MetaIcon = styled.span`
  flex-shrink: 0;
  margin-right: 1rem;
`;

const MetaText = styled.span`
  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const ListItem = styled.li`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  flex-shrink: 0;
  letter-spacing: -0.016875em;
  margin: 1rem 0 0 2rem;
  max-width: calc(100% - 2rem);
  text-transform: capitalize;

  @media (min-width: 700px) {
    margin: 1.4rem 0 0 3rem;
    max-width: calc(100% - 3rem);
  }
`;

export default PostMetaItem;
