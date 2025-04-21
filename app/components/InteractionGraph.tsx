
'use client'
import React from 'react';
import { CharacterInteractions } from '../types/model';
import { buildGraphData, updateLinkCanvasObject, buildLinkLabel, updateNodeCanvasObject } from '../utils/graph-parameters';

import dynamic from 'next/dynamic';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

interface CharacterGraphProps {
  data: CharacterInteractions
}

const InteractionGraph: React.FunctionComponent<CharacterGraphProps> = ({ data }) => {
  return (
    <ForceGraph2D
      graphData={buildGraphData(data)}
      nodeLabel="id"
      linkLabel={(link) => buildLinkLabel(link)}
      nodeCanvasObject={(node, ctx, globalScale) => updateNodeCanvasObject(node, ctx, globalScale)}
      linkCanvasObject={(link, ctx, globalScale) => updateLinkCanvasObject(link, ctx, globalScale)}
    />
  );
};

export default InteractionGraph;
