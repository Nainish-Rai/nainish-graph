"use client";
import React, { useState, useCallback } from "react";
import ForceGraph2D, { NodeObject } from "react-force-graph-2d";

// Define the types for the props
interface SimpleGraphProps {
  data: {
    nodes: NodeObject[];
    links: { source: string | number; target: string | number }[];
  };
  height: number;
}

// Define the type for the node, extending NodeObject if needed
interface CustomNodeObject extends NodeObject {
  color?: string;
}

const SimpleGraph: React.FC<SimpleGraphProps> = ({ data, height }) => {
  const [selectedNode, setSelectedNode] = useState<CustomNodeObject | null>(
    null
  );

  // Basic node drawing function
  const drawNode = useCallback(
    (node: CustomNodeObject, ctx: CanvasRenderingContext2D) => {
      const { x, y } = node;
      if (x !== undefined && y !== undefined) {
        const radius = 5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = node.color || "blue";
        ctx.fill();
      }
    },
    []
  );

  // Handle node clicks
  const handleNodeClick = useCallback((node: CustomNodeObject) => {
    setSelectedNode(node);
  }, []);

  return (
    <div>
      <ForceGraph2D
        graphData={data}
        nodeCanvasObject={drawNode}
        onNodeClick={handleNodeClick}
        enableZoomInteraction={true}
        enableNodeDrag={true}
        backgroundColor="#ffffff"
        height={height}
      />
      {selectedNode && <div>Selected Node: {selectedNode.id}</div>}
    </div>
  );
};

export default SimpleGraph;
