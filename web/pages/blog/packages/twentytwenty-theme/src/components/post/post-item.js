import React from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import FeaturedMedia from "./featured-media";
import PostMeta from "./post-meta";
import PostCategories from "./post-categories";
import PostTags from "./post-tags";

/**
 * Article Component
 *
 * It renders the preview of a blog post. Each blog post contains
 * - Title: clickable title of the post
 * - Author: name of author and published date
 * - FeaturedMedia: the featured image/video of the post
 */
const PostItem = ({
  state,
  item,
  libraries,
  showExcerpt,
  showMedia = true,
}) => {
  // Get all categories
  const allCategories = state.source.category;
  /**
   * The item's categories is an array of each category id
   * So, we'll look up the details of each category in allCategories
   */
  const categories =
    item.categories && item.categories.map((catId) => allCategories[catId]);

  // Get all tags
  const allTags = state.source.tag;
  /**
   * The item's categories is an array of each tag id
   * So, we'll look up the details of each tag in allTags
   */
  const tags = item.tags && item.tags.map((tagId) => allTags[tagId]);

  const content = showExcerpt ? item.excerpt : item.content;
  const { Component: Html2React } = libraries.html2react;
  return (
    <Post>
      <PostHeader>
        <SectionContainer>
          {/* If the post has categories, render the categories */}
          {item.categories && <PostCategories categories={categories} />}

          {/* The clickable heading for the post */}
          <PostLink link={item.link}>
            <PostTitle
              className="heading-size-1"
              dangerouslySetInnerHTML={{ __html: item.title.rendered }}
            />
          </PostLink>

          {/* The post's metadata like author, publish date, and comments */}
          <PostMeta item={item} />
        </SectionContainer>
      </PostHeader>

      {/*
       * If the want to show featured media in the
       * list of featured posts, we render the media.
       */}
      {state.theme.featuredMedia.showOnArchive && showMedia && (
        <FeaturedMedia id={item.featured_media} />
      )}

      {/* If the post has an excerpt (short summary text), we render it */}
      {content && (
        <PostInner size="thin">
          {/* TODO: Change this to HTML2React */}
          {/* dangerouslySetInnerHTML={{ __html: content.rendered }} */}
          <EntryContent>
            <Html2React html={content.rendered} />
          </EntryContent>
          {/* If the post has tags, render it */}
          {item.tags && <PostTags tags={tags} />}
        </PostInner>
      )}
    </Post>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(PostItem);

// All styles :)

export const Post = styled.article`
  &:first-of-type {
    padding: 4rem 0 0;
  }

  @media (min-width: 700px) {
    &:first-of-type {
      padding: 8rem 0 0;
    }
  }
`;

export const PostHeader = styled.header`
  text-align: center;
`;

// Header sizes bases on style.css
const maxWidths = {
  thin: "58rem",
  small: "80rem",
  medium: "100rem",
};

const getMaxWidth = (props) => maxWidths[props.size] || maxWidths["medium"];

export const SectionContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: calc(100% - 4rem);
  max-width: ${getMaxWidth};

  @media (min-width: 700px) {
    width: calc(100% - 8rem);
  }
`;

export const PostTitle = styled.h1`
  margin: 0;
  @media (min-width: 700px) {
    font-size: 6.4rem !important;
  }
`;

const PostLink = styled(Link)`
  color: #000000;
  text-decoration: none;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`;

export const PostInner = styled(SectionContainer)`
  padding-top: 5rem;
  @media (min-width: 700px) {
    padding-top: 8rem;
  }
`;

export const EntryContent = styled.div`
  line-height: 1.5;
  max-width: 58rem;
  font-family: "Hoefler Text", Garamond, "Times New Roman", serif;
  letter-spacing: normal;

  @media (min-width: 700px) {
    font-size: 2.1rem;
  }

  > *:first-of-type {
    margin-top: 0;
  }

  figure {
    margin: 2em 0;
    max-width: 100%;
  }
`;
