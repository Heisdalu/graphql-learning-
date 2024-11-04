import React from "react";
import { Layout, QueryResult } from "../components";
import { gql } from "../__generated__";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import TrackDetail from "../components/track-detail";

export const GET_TRACK = gql(`
  query GetTrack($trackId: ID!) {
  track(id: $trackId) {
    id
    title
    author {
      id
      name
      photo
    }
    thumbnail
    length
    modulesCount
    description
    numberOfViews
    modules {
      id
      title
      length
      content
      videoUrl
    }
  }
}
`);

const Track = () => {
  const { trackId = "" } = useParams();

  const { loading, error, data } = useQuery(GET_TRACK, {
    variables: { trackId },
    
  });
  return (
    <Layout>
      <QueryResult error={error} loading={loading} data={data}>
        <TrackDetail track={data?.track} />
      </QueryResult>
    </Layout>
  );
};

export default Track;
