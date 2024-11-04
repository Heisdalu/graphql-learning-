import React from "react";
import { Layout, QueryResult } from "../components";
import { gql } from "../__generated__/";
import { useQuery } from "@apollo/client";
import TrackCard from "../containers/track-card";

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */

const GET_TRACKS = gql(`
   query GetTracks {
    tracksForHome {
      id
      title
      thumbnail
      length
      modulesCount
      author {
        id
        name
        photo
      }
    }
  }
  `);
const Tracks = () => {
  const { loading, error, data } = useQuery(GET_TRACKS);

  console.log(loading, error, data);

  return (
    <Layout grid>
      <QueryResult error={error} loading={loading} data={data}>
        {data?.tracksForHome?.map((track) => (
          <TrackCard key={track.id} track={track} />
        )).reverse()}
      </QueryResult>
    </Layout>
  );
};

export default Tracks;
