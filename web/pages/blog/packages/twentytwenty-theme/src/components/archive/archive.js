import { connect, decode } from "frontity";
import React, { Fragment, useEffect } from "react";
import Article from "../post/post-item";
import ArchiveHeader from "./archive-header";
import Pagination from "./archive-pagination";
import PostSeparator from "../post/post-separator";
import Post from "../post";

const Archive = ({ state, showExcerpt, showMedia }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);
  const { primary } = state.theme.colors;

  // Whether the show the excerpt instead of the full content
  // If passed as prop, we'll respect that. Else, we'll use the theme settings
  const _showExcerpt = showExcerpt || !state.theme.showAllContentOnArchive;

  useEffect(() => {
    Post.preload();
  }, []);

  return (
    <>
      {/* If the list is a taxonomy, we render a title. */}
      {data.isTaxonomy && (
        <ArchiveHeader labelColor={primary} label={data.taxonomy}>
          <span>{decode(state.source[data.taxonomy][data.id].name)}</span>
        </ArchiveHeader>
      )}

      {/* If the list is for a specific author, we render a title. */}
      {data.isAuthor && (
        <ArchiveHeader labelColor={primary} label="Author">
          <b>{decode(state.source.author[data.id].name)}</b>
        </ArchiveHeader>
      )}

      {/* Iterate over the items of the list. */}
      {data.items.map(({ type, id }, index) => {
        const isLastArticle = index === data.items.length - 1;
        const item = state.source[type][id];
        // Render one Item component for each one.
        return (
          <Fragment key={item.id}>
            <Article
              key={item.id}
              item={item}
              showExcerpt={_showExcerpt}
              showMedia={showMedia}
            />
            {!isLastArticle && <PostSeparator />}
          </Fragment>
        );
      })}

      {data.totalPages > 1 && (
        <>
          <PostSeparator />
          <Pagination size="thin" />
        </>
      )}
    </>
  );
};

export default connect(Archive);
