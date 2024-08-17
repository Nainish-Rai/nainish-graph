import SimpleGraph from "@/components/SimpleGraph";
import Image from "next/image";
import graphData from "../graphData.json";
import Graph from "@/components/NetworkGraph";
import NetworkGraph from "@/components/NetworkGraph";
export default function Home() {
  // Sample data for the graph
  const sampleData = {
    nodes: [
      { id: "1", color: "red" },
      { id: "2", color: "green" },
      { id: "3", color: "blue" },
    ],
    links: [
      { source: "1", target: "2" },
      { source: "2", target: "3" },
    ],
  };

  return (
    <main className="w-full min-h-screen bg-black flex justify-center items-center">
      <NetworkGraph />
    </main>
  );
}
