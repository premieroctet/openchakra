import { connect, decode } from "frontity";
import React, { Fragment } from "react";
import { TagIcon } from "../icons";
import Link from "../link";
import { PostMetaList, PostMetaWrapper } from "./post-meta";
import PostMetaItem from "./post-meta-item";

const PostTags = ({ tags }) => {
  // Remove empty or undefined tags
  const postTags = tags.filter(Boolean);

  if (postTags.length === 0) {
    return null;
  }

  return (
    <PostMetaWrapper>
      <PostMetaList style={{ justifyContent: "flex-start" }}>
        <PostMetaItem icon={TagIcon} label="Post Tags">
          {postTags.map((tag, index) => {
            const isLastTag = index === postTags.length - 1;
            return (
              <Fragment key={tag.id}>
                <Link link={tag.link}>{decode(tag.name)}</Link>
                {!isLastTag && <>, </>}
              </Fragment>
            );
          })}
        </PostMetaItem>
      </PostMetaList>
    </PostMetaWrapper>
  );
};

export default connect(PostTags);
