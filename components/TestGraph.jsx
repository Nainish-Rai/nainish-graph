"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

const COMET_SPEED = 0.005;
const COMET_LENGTH = 5;

const resolvedTheme = "dark";
const sampleData = {
  nodes: [
    {
      id: "Axelar",
      label: "Axelar",
      image: "path/to/axelar-logo.png",
      color: "#FFFFFF",
    },
    {
      id: "Ethereum",
      label: "Ethereum",
      image: "path/to/ethereum-logo.png",
      color: "#627EEA",
    },
    {
      id: "Polygon",
      label: "Polygon",
      image: "path/to/polygon-logo.png",
      color: "#8247E5",
    },
    {
      id: "Osmosis",
      label: "Osmosis",
      image: "path/to/osmosis-logo.png",
      color: "#750BBB",
    },
    {
      id: "Optimism",
      label: "Optimism",
      image: "path/to/optimism-logo.png",
      color: "#FF0420",
    },
    {
      id: "Celo",
      label: "Celo",
      image: "path/to/celo-logo.png",
      color: "#FBCC5C",
    },
    {
      id: "BNBChain",
      label: "BNB Chain",
      image: "path/to/bnbchain-logo.png",
      color: "#F0B90B",
    },
    {
      id: "Avalanche",
      label: "Avalanche",
      image: "path/to/avalanche-logo.png",
      color: "#E84142",
    },
    {
      id: "Cosmos",
      label: "Cosmos",
      image: "path/to/cosmos-logo.png",
      color: "#2E3148",
    },
    {
      id: "Fantom",
      label: "Fantom",
      image: "path/to/fantom-logo.png",
      color: "#1969FF",
    },
    {
      id: "Moonbeam",
      label: "Moonbeam",
      image: "path/to/moonbeam-logo.png",
      color: "#53CBC9",
    },
    {
      id: "Kava",
      label: "Kava",
      image: "path/to/kava-logo.png",
      color: "#FF564F",
    },
    {
      id: "Arbitrum",
      label: "Arbitrum",
      image: "path/to/arbitrum-logo.png",
      color: "#2D374B",
    },
    {
      id: "Filecoin",
      label: "Filecoin",
      image: "path/to/filecoin-logo.png",
      color: "#0090FF",
    },
    {
      id: "Sui",
      label: "Sui",
      image: "path/to/sui-logo.png",
      color: "#4DBFFF",
    },
    {
      id: "Mantle",
      label: "Mantle",
      image: "path/to/mantle-logo.png",
      color: "#FFFFFF",
    },
  ],
  links: [
    { source: "Axelar", target: "Ethereum" },
    { source: "Axelar", target: "Polygon" },
    { source: "Axelar", target: "Osmosis" },
    { source: "Axelar", target: "Optimism" },
    { source: "Axelar", target: "Celo" },
    { source: "Axelar", target: "BNBChain" },
    { source: "Axelar", target: "Avalanche" },
    { source: "Axelar", target: "Cosmos" },
    { source: "Axelar", target: "Fantom" },
    { source: "Axelar", target: "Moonbeam" },
    { source: "Axelar", target: "Kava" },
    { source: "Axelar", target: "Arbitrum" },
    { source: "Axelar", target: "Filecoin" },
    { source: "Axelar", target: "Sui" },
    { source: "Axelar", target: "Mantle" },
    { source: "Axelar", target: "Celo" },
    { source: "Axelar", target: "Celo" },
    { source: "Axelar", target: "Celo" },
    { source: "Axelar", target: "Celo" },
  ],
};
const TestGraph = () => {
  const graphRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const fg = graphRef.current;
    fg?.d3Force("link", null);
    fg?.d3Force("charge")?.strength(-100);
    fg?.d3Force("center")?.strength(0.3);
  }, []);

  const nodeCanvasObject = useCallback((node, ctx, globalScale) => {
    const label = node.label;
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2);

    // ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    // background color acc to font color
    ctx.fillStyle = node.color;

    ctx.fillRect(
      node.x - bckgDimensions[0] / 2,
      node.y - bckgDimensions[1] / 2,
      ...bckgDimensions
    );

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = node.color;
    ctx.fillText(label, node.x, node.y);

    // make it circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, bckgDimensions[0] / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fill();
    ctx.lineWidth = 5 / globalScale;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.stroke();

    node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
  }, []);

  const drawNode = (node, ctx, globalScale, isSelected, image) => {
    let { x, y } = node;
    if (x === undefined || y === undefined) return;

    const radius =
      (TIERS.length + 1 + Math.pow(2, TIERS.length + 1 - (node.tier || 1))) / 2;
    const fillStyleOpecity = isSelected ? "1a" : "0d";

    if (selectedNode?.id === node.id) {
      ctx.shadowColor = null;
      ctx.strokeStyle = node.color;
      ctx.fillStyle = `${node.color}${fillStyleOpecity}`;
      ctx.beginPath();
      ctx.lineWidth = 4 / globalScale;

      const animatedPos = node.__animatedPos;
      if (animatedPos && animatedPos.length > 0) {
        const coord = animatedPos.splice(0, 1);
        node.__animatedPos = animatedPos;
        node.x = x = coord[0].x;
        node.y = y = coord[0].y;
      }

      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      ctx.shadowColor = node.color;
      ctx.shadowBlur = 16 * globalScale;
    } else {
      ctx.shadowColor = null;
      ctx.shadowBlur = null;
    }

    if (image) {
      const logoRadius = radius - 0.5;
      ctx.drawImage(
        image,
        x - logoRadius,
        y - logoRadius,
        logoRadius * 2,
        logoRadius * 2
      );
    }
  };

  const drawTitle = (node, ctx, isSelected, theme) => {
    const fontSize = 2;
    const { x, y } = node;
    if (x === undefined || y === undefined) return;

    const radius =
      (TIERS.length +
        1 +
        Math.pow(2, TIERS.length + 1 - (node.tier || 1)) +
        fontSize) /
      2;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${
      isSelected ? "700" : "600"
    } ${fontSize}px Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`;
    ctx.fillStyle =
      theme === "dark"
        ? isSelected
          ? "#f4f4f5"
          : "#d4d4d8"
        : isSelected
        ? "#18181b"
        : "#3f3f46";
    ctx.fillText(node.label, x, y + radius);
  };

  const drawNodeCanvasObject = (
    node,
    ctx,
    globalScale,
    selectedNode,
    links,
    images,
    theme
  ) => {
    if (!node || node.x === undefined || node.y === undefined) return;
    const isSelected = node.id === selectedNode?.id;
    drawNode(node, ctx, globalScale, isSelected, images?.[node.image]);
    drawTitle(node, ctx, isSelected, theme);
  };

  const useNodeCanvasObject = (selectedNode, links, images, theme) =>
    useCallback(
      (node, ctx, globalScale) =>
        drawNodeCanvasObject(
          node,
          ctx,
          globalScale,
          selectedNode,
          links,
          images,
          theme
        ),
      [selectedNode, links, images, theme]
    );

  const COMET_SPEED = 0.0033;
  const COMET_LENGTH = 20;

  const drawLine = (link, ctx, scale, isSelected, theme) => {
    // if (isString(link.source) || isString(link.target)) return;
    if (
      link.source.x != null &&
      link.source.y != null &&
      link.target.x != null &&
      link.target.y != null
    ) {
      ctx.lineWidth = 0.5 / scale;
      ctx.strokeStyle =
        theme === "dark"
          ? isSelected
            ? "#e4e4e7"
            : "#27272a"
          : isSelected
          ? "#52525b"
          : "#e4e4e7";
      ctx.beginPath();
      ctx.moveTo(link.source.x, link.source.y);
      ctx.lineTo(link.target.x, link.target.y);
      ctx.stroke();
    }
  };

  const calculateAndDrawComet = (
    ctx,
    targetX,
    sourceX,
    targetY,
    sourceY,
    commetProgress,
    color,
    theme
  ) => {
    const diffX = targetX - sourceX;
    const diffY = targetY - sourceY;
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);

    const endProgress = commetProgress - COMET_LENGTH / distance;
    const cometEndProgress = endProgress > 0 ? endProgress : 0;
    const cometStartX = sourceX + diffX * commetProgress || 0;
    const cometStartY = sourceY + diffY * commetProgress || 0;
    const cometEndX = sourceX + diffX * cometEndProgress || 0;
    const cometEndY = sourceY + diffY * cometEndProgress || 0;

    const gradient = ctx.createLinearGradient(
      cometStartX,
      cometStartY,
      cometEndX,
      cometEndY
    );

    gradient.addColorStop(
      0.5,
      `${color || (theme === "dark" ? "cyan" : "#18181b")}`
    );
    gradient.addColorStop(
      0,
      `${color || (theme === "dark" ? "orange" : "#18181b")}`
    );
    gradient.addColorStop(
      1,
      `${color || (theme === "dark" ? "#f4f4f5" : "#18181b")}00`
    );

    // make comet longer
    ctx.lineWidth = 0.2;

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(cometStartX, cometStartY);
    ctx.lineTo(cometEndX, cometEndY);
    ctx.stroke();
  };

  const drawCommet = (link, ctx, theme) => {
    if (typeof link.source === "string" || typeof link.target === "string")
      return;
    const { x: sourceX, y: sourceY } = link.source;
    const { x: targetX, y: targetY } = link.target;
    if (
      sourceX === undefined ||
      sourceY === undefined ||
      targetX === undefined ||
      targetY === undefined
    )
      return;

    const comet = link.__comet || { __progress: 0 };
    comet.__progress += COMET_SPEED;
    if (comet.__progress >= 1) {
      link.__comet = undefined;
      return;
    }

    calculateAndDrawComet(
      ctx,
      targetX,
      sourceX,
      targetY,
      sourceY,
      comet.__progress,
      link.color,
      theme
    );
    link.__comet = comet;
  };

  const drawLinkCanvasObject = (link, ctx, scale, selectedNode, theme) => {
    if (!link) return;
    drawLine(
      link,
      ctx,
      scale,
      [link.source?.id, link.target?.id].includes(selectedNode?.id),
      theme
    );
    drawCommet(link, ctx, theme);
  };

  const useLinkCanvasObject = (selectedNode, theme) =>
    useCallback(
      (value, ctx, globalScale) =>
        drawLinkCanvasObject(value, ctx, globalScale, selectedNode, theme),
      [selectedNode, theme]
    );

  const linkCanvasObject = useLinkCanvasObject(selectedNode, resolvedTheme);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ForceGraph2D
        ref={graphRef}
        graphData={sampleData}
        nodeLabel="label"
        nodeCanvasObject={nodeCanvasObject}
        linkCanvasObject={linkCanvasObject}
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = color;
          const bckgDimensions = node.__bckgDimensions;
          bckgDimensions &&
            ctx.fillRect(
              node.x - bckgDimensions[0] / 2,
              node.y - bckgDimensions[1] / 2,
              ...bckgDimensions
            );
        }}
        backgroundColor={resolvedTheme === "dark" ? "#000000" : "#ffffff"}
        showNavInfo={false}
        onNodeClick={(node) => {
          setSelectedNode(node);
        }}
        onLinkClick={() => {
          setSelectedNode(null);
        }}
        onBackgroundClick={() => {
          setSelectedNode(null);
        }}
        cooldownTime={Infinity}
        enableZoomInteraction={true}
        enableNodeDrag={false}
      />
      {selectedNode && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "white",
            padding: 10,
          }}
        >
          Selected: {selectedNode.label}
        </div>
      )}
    </div>
  );
};

export default TestGraph;
