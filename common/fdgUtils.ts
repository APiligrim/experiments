import { GraphData, LinkObject, NodeObject } from 'react-force-graph-3d';

export type TaskGraphData = GraphData<TaskNodeData, TaskLinkData>;

export enum TaskNodeStatus {
  COMPLETE,
  WORKING,
}

export interface TaskNodeData {
  status: TaskNodeStatus;
  startedAt: Date;
  finishedAt?: Date;
  descendants: number;
  children: number[]; // Store child IDs instead of full objects
}

export type TaskNode = NodeObject<TaskNodeData>;

export interface TaskLinkData {
  descendants: number; // For connection coloring
}

export type TaskLink = LinkObject<TaskNodeData, TaskLinkData>;

// Counter for generating unique numeric IDs
let nodeIdCounter = 1; // Start from 1 since root is 0

// Utility to generate next unique node ID
export const getNextNodeId = (): number => {
  return nodeIdCounter++;
};

// Utility to calculate node size based on runtime
export const calculateNodeSize = (node: TaskNode): number => {
  const now = new Date();
  const startTime = node.startedAt.getTime();
  const endTime = node.finishedAt?.getTime() || now.getTime();
  const runtimeMs = endTime - startTime;

  // Base radius of 1, with volume proportional to runtime
  // Volume = (4/3) * π * r³, so r = cbrt(volume / ((4/3) * π))
  const baseVolume = (4 / 3) * Math.PI; // volume when r = 1
  const volumeMultiplier = 1 + runtimeMs / 10000; // Scale factor
  const volume = baseVolume * volumeMultiplier;
  const radius = Math.cbrt(volume / ((4 / 3) * Math.PI));

  return Math.max(1, Math.min(radius, 5)); // Clamp between 1 and 5
};

// Utility to calculate connection color based on descendants (logarithmic)
export const calculateConnectionColor = (descendants: number): string => {
  if (descendants === 0) return 'rgba(255, 165, 0, 0.1)'; // Near transparent orange

  const maxDescendants = 1000; // Assume max for scaling
  const logValue = Math.log(descendants + 1) / Math.log(maxDescendants + 1);
  const opacity = 0.1 + logValue * 0.9; // Range from 0.1 to 1.0

  return `rgba(${255 * opacity}, ${165 * opacity}, 0, ${Math.min(opacity, 1.0)})`;
};

// Utility to get node color with logarithmic transparency/brightness based on runtime
export const getNodeColor = (node: TaskNode): string => {
  if (node.status === TaskNodeStatus.COMPLETE) {
    return '#FFFFFF'; // White for completed nodes
  }

  // Calculate runtime in seconds
  const now = Date.now();
  const runtimeMs = now - node.startedAt.getTime();
  const runtimeSeconds = runtimeMs / 1000;

  // Logarithmic scaling for opacity/brightness
  const maxRuntimeForColor = 3000; // seconds
  const logValue = Math.log(runtimeSeconds + 1) / Math.log(maxRuntimeForColor + 1);
  const opacity = Math.min(0.1 + logValue * 0.9, 1.0); // Range from 0.1 to 1.0

  return `rgba(${255 * opacity}, ${165 * opacity}, 0, ${opacity})`; // Orange with varying opacity
};

// Utility to calculate bloom intensity based on runtime (logarithmic)
// Returns emissive intensity for UnrealBloomPass
export const getBloomIntensity = (node: TaskNode): number => {
  if (node.status === TaskNodeStatus.COMPLETE) {
    return 0; // No bloom for completed nodes
  }

  // Calculate runtime in seconds
  const now = Date.now();
  const runtimeMs = now - node.startedAt.getTime();
  const runtimeSeconds = runtimeMs / 1000;

  // Logarithmic scaling for bloom intensity
  const maxRuntimeForBloom = 3000; // seconds
  const logValue = Math.log(runtimeSeconds + 1) / Math.log(maxRuntimeForBloom + 1);

  // Return intensity suitable for emissive material (0 to 1 range)
  return Math.min(logValue, 1.0);
};

// Create initial graph data with a root node
export const createInitialGraph = (): TaskGraphData => {
  const rootNode: TaskNode = {
    id: 0,
    status: TaskNodeStatus.WORKING,
    startedAt: new Date(),
    descendants: 0,
    children: [],
  };

  return {
    nodes: [rootNode],
    links: [],
  };
};

// Utility to calculate total descendants recursively
const calculateTotalDescendants = (nodes: TaskNode[], nodeId: number): number => {
  const node = nodes.find((n) => n.id === nodeId);
  if (!node) return 0;

  let totalDescendants = node.children.length; // Start with direct children count

  // Recursively add descendants of each child
  for (const childId of node.children) {
    totalDescendants += calculateTotalDescendants(nodes, childId);
  }

  return totalDescendants;
};

// Utility to update all descendants counts for all nodes
const updateAllDescendantsCounts = (nodes: TaskNode[], links: TaskLink[]): void => {
  // Update descendants count for each node
  nodes.forEach((node) => {
    node.descendants = calculateTotalDescendants(nodes, node.id as number);
  });

  // Update descendants count for each link based on target node
  // The link represents the "flow" to the target, so it should reflect
  // how many descendants the target node has (including the target itself)
  links.forEach((link) => {
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    const targetNode = nodes.find((n) => n.id === targetId);
    if (targetNode) {
      // For leaf nodes (no children), the link should have descendants = 1 (the node itself)
      // For nodes with children, the link should represent all descendants + 1 (the node itself)
      link.descendants = targetNode.descendants + 1;
    }
  });
};

// Utility function to branch nodes (replaces branch reducer case)
export const branchNode = (data: TaskGraphData, nodeId: number, count: number): TaskGraphData => {
  const parentNode = data.nodes.find((n) => n.id === nodeId);
  if (!parentNode || parentNode.status !== TaskNodeStatus.WORKING) {
    return data;
  }

  const newNodes: TaskNode[] = [];
  const newLinks: TaskLink[] = [];

  // Create new child nodes
  for (let i = 0; i < count; i++) {
    const childId = getNextNodeId();
    const childNode: TaskNode = {
      id: childId,
      status: TaskNodeStatus.WORKING,
      startedAt: new Date(),
      descendants: 0,
      children: [],
      x: (parentNode.x ?? 0) + 0.01,
      y: (parentNode.y ?? 0) + 0.01,
      z: (parentNode.z ?? 0) + 0.01,
    };

    newNodes.push(childNode);

    // Create link from parent to child
    const link: TaskLink = {
      source: nodeId,
      target: childId,
      descendants: 0,
    };
    newLinks.push(link);
  }

  // Modify parent node's children list in-place (but keep the same object reference)
  parentNode.children.push(...newNodes.map((n) => n.id as number));

  // Create new arrays but reuse existing objects + add new ones
  const allNodes = [...data.nodes, ...newNodes];
  const allLinks = [...data.links, ...newLinks];

  // Update descendants count for all nodes (recursive calculation)
  updateAllDescendantsCounts(allNodes, allLinks);

  return {
    nodes: allNodes,
    links: allLinks,
  };
};

// Utility function to complete a node (replaces complete reducer case)
export const completeNode = (data: TaskGraphData, nodeId: number): TaskGraphData => {
  const nodeToComplete = data.nodes.find((n) => n.id === nodeId);
  if (!nodeToComplete || nodeToComplete.status !== TaskNodeStatus.WORKING) {
    return data;
  }

  // Modify the node in-place (same object reference)
  nodeToComplete.status = TaskNodeStatus.COMPLETE;
  nodeToComplete.finishedAt = new Date();

  // Create new data object with new array references but same node objects
  const newData = {
    nodes: [...data.nodes], // New array, same node objects
    links: [...data.links], // New array, same link objects
  };

  // Update descendants count for all nodes (in case completion affects counts)
  updateAllDescendantsCounts(newData.nodes, newData.links);

  return newData;
};
