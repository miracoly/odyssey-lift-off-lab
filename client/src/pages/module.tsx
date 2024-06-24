import {Layout, ModuleDetail, QueryResult} from '../components';
import React from 'react';
import {useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import {gql} from '../__generated__';

const GET_MODULE_AND_PARENT_TRACK = gql(`
  query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
    track(id: $trackId) {
      modules {
        title
        length
        id
      }
      id
      title
    }
    module(id: $moduleId) {
      videoUrl
      title
      content
      id
    }
  }`);

type Params = {
  trackId: string;
  moduleId: string;
}

const Module: React.FC = () => {
  const {trackId = "", moduleId = ""} = useParams<Params>();
  const {
    loading,
    error,
    data
  } = useQuery(GET_MODULE_AND_PARENT_TRACK, {variables: {trackId, moduleId}});
  return (
    <Layout fullWidth={true}>
      <QueryResult loading={loading} error={error} data={data}>
        <ModuleDetail track={data?.track} module={data?.module}/>
      </QueryResult>
    </Layout>
  );
}

export default Module;