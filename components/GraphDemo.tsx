'use client';

import {
  TaskGraphData,
  TaskNodeData,
  TaskNodeStatus,
  createInitialGraph,
  calculateNodeSize,
  calculateConnectionColor,
  getNodeColor,
  getBloomIntensity,
  branchNode,
  completeNode,
  FDG_CONFIG,
  TaskLinkData,
  TaskNode,
  TaskLink,
} from '../common';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ForceGraphMethods } from 'react-force-graph-3d';
import * as THREE from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const ForceGraph = dynamic(() => import('react-force-graph-3d'), { ssr: false });

export default function GraphDemo() {
  const fgRef = useRef<any>(null);
  const [data, setData] = useState<TaskGraphData>(createInitialGraph());

  // Setup UnrealBloomPass post-processing effect
  useEffect(() => {
    if (typeof window === 'undefined') return; // Only run on client

    if (fgRef.current) {
      // Configure renderer for proper dark background
      const renderer = fgRef.current.renderer ? fgRef.current.renderer() : null;
      const scene = fgRef.current.scene ? fgRef.current.scene() : null;

      if (renderer) {
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.toneMappingExposure = 1.0;
        renderer.setClearColor(new THREE.Color('#0b0b0e'), 1.0);
      }

      if (scene) {
        scene.background = new THREE.Color('#0b0b0e');
      }

      if (fgRef.current.postProcessingComposer) {
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 10.0, 1.0, 0.0);
        fgRef.current.postProcessingComposer().addPass(bloomPass);
      }
    }
  }, []); // Re-run when data changes to ensure proper setup

  // Create simple node objects that work well with bloom
  const createNodeObject = useCallback((node: TaskNode) => {
    // Create a simple box with basic material (no lighting)
    const geometry = new THREE.BoxGeometry(2, 2, 2); // 2x2x2 box
    const material = new THREE.MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: 0,
    });

    return new THREE.Mesh(geometry, material);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const workingNodes = prev.nodes.filter((node) => node.status === TaskNodeStatus.WORKING);

        // Don't exceed max nodes
        if (prev.nodes.length >= FDG_CONFIG.MAX_NODES) {
          return prev;
        }

        // If no working nodes, just force re-render for bloom updates
        if (workingNodes.length === 0) {
          return {
            nodes: [...prev.nodes],
            links: [...prev.links],
          };
        }

        // Choose only one random working node per interval
        const randomIndex = Math.floor(Math.random() * workingNodes.length);
        const selectedNode = workingNodes[randomIndex];

        const runtimeMs = Date.now() - selectedNode.startedAt.getTime();
        const runtimeFactor = runtimeMs * FDG_CONFIG.RUNTIME_MULTIPLIER;
        const actionProbability = FDG_CONFIG.BASE_ACTION_PROBABILITY + runtimeFactor;

        // Don't apply action if random check fails
        if (Math.random() > actionProbability) {
          // Force re-render for bloom updates even when no action
          return {
            nodes: [...prev.nodes],
            links: [...prev.links],
          };
        }

        // Check if all children are complete
        const allChildrenComplete = selectedNode.children.every((childId: number) => {
          const childNode = prev.nodes.find((n) => n.id === childId);
          return childNode?.status === TaskNodeStatus.COMPLETE;
        });

        // If we have fewer than 20 nodes, always branch instead of completing
        if (prev.nodes.length < 20) {
          // Force branching when node count is low
          const branchCount = Math.floor(Math.random() * (FDG_CONFIG.MAX_BRANCHES - FDG_CONFIG.MIN_BRANCHES + 1)) + FDG_CONFIG.MIN_BRANCHES;

          if (prev.nodes.length + branchCount <= FDG_CONFIG.MAX_NODES) {
            return branchNode(prev, selectedNode.id as number, branchCount);
          }
        }

        // If node has children and they're all complete, consider completion
        if (allChildrenComplete) {
          if (Math.random() < FDG_CONFIG.COMPLETION_PROBABILITY) {
            return completeNode(prev, selectedNode.id as number);
          }
        }

        // Otherwise, consider branching (but don't branch if we'd exceed max nodes)
        const branchCount = Math.floor(Math.random() * (FDG_CONFIG.MAX_BRANCHES - FDG_CONFIG.MIN_BRANCHES + 1)) + FDG_CONFIG.MIN_BRANCHES;

        if (prev.nodes.length + branchCount <= FDG_CONFIG.MAX_NODES) {
          return branchNode(prev, selectedNode.id as number, branchCount);
        }

        // If we can't branch due to node limit, just return updated arrays for bloom
        return {
          nodes: [...prev.nodes],
          links: [...prev.links],
        };
      });
    }, FDG_CONFIG.SIMULATION_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <ForceGraph
        ref={fgRef}
        graphData={data}
        width={undefined}
        height={undefined}
        nodeRelSize={3}
        backgroundColor="#000000"
        showNavInfo={false}
        forceEngine="d3"
        d3VelocityDecay={0.96}
        nodeLabel={(n) => {
          const runtime = n.finishedAt ? n.finishedAt.getTime() - n.startedAt.getTime() : Date.now() - n.startedAt.getTime();
          return `${n.id} | ${n.status === TaskNodeStatus.WORKING ? 'Working' : 'Complete'} | Runtime: ${Math.round(runtime / 1000)}s | Descendants: ${n.descendants}`;
        }}
        linkLabel={(l) => `${typeof l.source === 'object' ? l.source.id : l.source} -> ${typeof l.target === 'object' ? l.target.id : l.target}`}
        nodeVal={(node) => calculateNodeSize(node as TaskNode)}
        linkColor={(link) => calculateConnectionColor(link.descendants)}
        nodeColor={(n) => getNodeColor(n as TaskNode)}
        // linkDirectionalParticles={(l) => (l.descendents ?? 0) + 1}
        // linkDirectionalParticleColor={(l) => "#ff7f00"}
        linkDirectionalParticleSpeed={(l) => 0.003}
        linkDirectionalParticles={1}
        linkDirectionalParticleWidth={2}
        linkWidth={2}
        linkOpacity={1}
      />
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          color: 'white',
          fontFamily: 'monospace',
          fontSize: '14px',
          background: 'rgba(0,0,0,0.7)',
          padding: '10px',
          borderRadius: '5px',
        }}
      >
        <div>Total Nodes: {data.nodes.length}</div>
        <div>Working Nodes: {data.nodes.filter((n) => n.status === TaskNodeStatus.WORKING).length}</div>
        <div>Complete Nodes: {data.nodes.filter((n) => n.status === TaskNodeStatus.COMPLETE).length}</div>
        <div>Total Links: {data.links.length}</div>
      </div>
    </div>
  );
}
