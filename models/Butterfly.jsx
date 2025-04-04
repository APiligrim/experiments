/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 scene.gltf --transform 
Files: scene.gltf [2.73MB] > /Users/anastasiya/Desktop/sites/experiments/public/models/butterfly/scene-transformed.glb [43.67MB] (-1500%)
Author: heddathunell (https://sketchfab.com/heddathunell)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/butterfly-bb7a9781c2674e59a0f335fb8efb77d3
Title: Butterfly
*/

import React from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function Butterfly(props) {
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTF('/models/butterfly/scene-transformed.glb');
  // const { actions } = useAnimations(animations, group);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Object_3">
          <group name="Object_4" position={[2.473, -1.185, 1.224]} rotation={[-Math.PI / 2, 0, 0]}>
            <group name="Object_8" position={[0.144, -1.17, 1.185]}>
              <group name="Object_9" position={[29.774, 0.869, 0]}>
                <group name="MorphMainGroup">
                  <mesh name="Line001_8" geometry={nodes.Line001_8.geometry} material={materials.Line001} />
                </group>
                <group name="MorphMainGroup_1">
                  <mesh name="Line001_9" geometry={nodes.Line001_9.geometry} material={materials.Line001} />
                </group>
              </group>
              <group name="Object_14" position={[29.774, 0.869, 0]}>
                <group name="MorphMainGroup_2">
                  <mesh name="Line001_10" geometry={nodes.Line001_10.geometry} material={materials.Line001} />
                </group>
                <group name="MorphMainGroup_3">
                  <mesh name="Line001_11" geometry={nodes.Line001_11.geometry} material={materials.Line001} />
                </group>
              </group>
            </group>
            <group name="Object_19" position={[0.128, -1.891, 1.185]}>
              <group name="Object_20" position={[-31.618, -4.184, 0]}>
                <group name="MorphMainGroup_4">
                  <mesh name="Line004_8" geometry={nodes.Line004_8.geometry} material={materials.Line004} />
                </group>
                <group name="MorphMainGroup_5">
                  <mesh name="Line004_9" geometry={nodes.Line004_9.geometry} material={materials.Line004} />
                </group>
              </group>
              <group name="Object_25" position={[-31.618, -4.184, 0]}>
                <group name="MorphMainGroup_6">
                  <mesh name="Line004_10" geometry={nodes.Line004_10.geometry} material={materials.Line004} />
                </group>
                <group name="MorphMainGroup_7">
                  <mesh name="Line004_11" geometry={nodes.Line004_11.geometry} material={materials.Line004} />
                </group>
              </group>
            </group>
            <group name="Object_30" position={[0.768, 11.672, 1.185]} rotation={[-1.309, 0, 0]}>
              <group name="TimeframeMainGroup_2">
                <group name="Object_32">
                  <mesh name="Cylinder001_16_0" geometry={nodes.Cylinder001_16_0.geometry} material={materials.PaletteMaterial001} />
                </group>
              </group>
              <group name="TimeframeMainGroup_3">
                <group name="Object_35">
                  <mesh name="Cylinder001_16_0_1" geometry={nodes.Cylinder001_16_0_1.geometry} material={materials.PaletteMaterial001} />
                </group>
              </group>
            </group>
            <group name="Object_37" position={[4.48, 24.828, 4.709]} rotation={[-1.309, 0.532, 3.006]}>
              <group name="TimeframeMainGroup_4">
                <group name="Object_39">
                  <mesh name="Sphere002_21_0" geometry={nodes.Sphere002_21_0.geometry} material={materials.PaletteMaterial001} />
                </group>
              </group>
              <group name="TimeframeMainGroup_5">
                <group name="Object_42">
                  <mesh name="Sphere002_21_0_1" geometry={nodes.Sphere002_21_0_1.geometry} material={materials.PaletteMaterial001} />
                </group>
              </group>
            </group>
            <group name="Object_44" position={[-1.041, 11.672, 1.185]} rotation={[-1.309, 0, Math.PI]}>
              <group name="TimeframeMainGroup_6">
                <group name="Object_46">
                  <mesh name="Cylinder002_23_0" geometry={nodes.Cylinder002_23_0.geometry} material={materials.PaletteMaterial001} />
                </group>
              </group>
              <group name="TimeframeMainGroup_7">
                <group name="Object_49">
                  <mesh name="Cylinder002_23_0_1" geometry={nodes.Cylinder002_23_0_1.geometry} material={materials.PaletteMaterial001} />
                </group>
              </group>
            </group>
            <group name="Object_51" position={[-4.749, 24.826, 4.726]} rotation={[-1.309, -0.532, -3.006]}>
              <group name="TimeframeMainGroup_8">
                <group name="Object_53">
                  <mesh name="Sphere001_28_0" geometry={nodes.Sphere001_28_0.geometry} material={materials.PaletteMaterial001} />
                </group>
              </group>
              <group name="TimeframeMainGroup_9">
                <group name="Object_56">
                  <mesh name="Sphere001_28_0_1" geometry={nodes.Sphere001_28_0_1.geometry} material={materials.PaletteMaterial001} />
                </group>
              </group>
            </group>
            <group name="TimeframeMainGroup">
              <group name="Object_6">
                <mesh name="Box001_2_0_1" geometry={nodes.Box001_2_0_1.geometry} material={materials.PaletteMaterial001} />
              </group>
            </group>
            <group name="Object_58" position={[-4.749, 24.826, 4.726]} rotation={[-1.309, -0.532, -3.006]}>
              <group name="TimeframeMainGroup_10">
                <group name="Object_60">
                  <mesh name="Sphere001_28_0_2" geometry={nodes.Sphere001_28_0_2.geometry} material={materials.PaletteMaterial001} />
                </group>
              </group>
              <group name="TimeframeMainGroup_11">
                <group name="Object_63">
                  <mesh name="Sphere001_28_0_3" geometry={nodes.Sphere001_28_0_3.geometry} material={materials.PaletteMaterial001} />
                </group>
              </group>
            </group>
            <group name="Object_65" position={[-1.041, 11.672, 1.185]} rotation={[-1.309, 0, Math.PI]}>
              <group name="TimeframeMainGroup_12">
                <group name="Object_67">
                  <mesh name="Cylinder002_23_0_2" geometry={nodes.Cylinder002_23_0_2.geometry} material={materials.PaletteMaterial001} />
                </group>
              </group>
              <group name="TimeframeMainGroup_13">
                <group name="Object_70">
                  <mesh name="Cylinder002_23_0_3" geometry={nodes.Cylinder002_23_0_3.geometry} material={materials.PaletteMaterial001} />
                </group>
              </group>
            </group>
            <group name="Object_72" position={[4.48, 24.828, 4.709]} rotation={[-1.309, 0.532, 3.006]}>
              <group name="TimeframeMainGroup_14">
                <group name="Object_74">
                  <mesh name="Sphere002_21_0_2" geometry={nodes.Sphere002_21_0_2.geometry} material={materials.PaletteMaterial001} />
                </group>
              </group>
              <group name="TimeframeMainGroup_15">
                <group name="Object_77">
                  <mesh name="Sphere002_21_0_3" geometry={nodes.Sphere002_21_0_3.geometry} material={materials.PaletteMaterial001} />
                </group>
              </group>
            </group>
            <group name="Object_79" position={[0.768, 11.672, 1.185]} rotation={[-1.309, 0, 0]}>
              <group name="TimeframeMainGroup_16">
                <group name="Object_81">
                  <mesh name="Cylinder001_16_0_2" geometry={nodes.Cylinder001_16_0_2.geometry} material={materials.PaletteMaterial001} />
                </group>
              </group>
              <group name="TimeframeMainGroup_17">
                <group name="Object_84">
                  <mesh name="Cylinder001_16_0_3" geometry={nodes.Cylinder001_16_0_3.geometry} material={materials.PaletteMaterial001} />
                </group>
              </group>
            </group>
            <group name="Object_86" position={[0.128, -1.891, 1.185]}>
              <group name="Object_87" position={[-31.618, -4.184, 0]}>
                <group name="MorphMainGroup_8">
                  <mesh name="Line004_12" geometry={nodes.Line004_12.geometry} material={materials.Line004} />
                </group>
                <group name="MorphMainGroup_9">
                  <mesh name="Line004_13" geometry={nodes.Line004_13.geometry} material={materials.Line004} />
                </group>
              </group>
              <group name="Object_92" position={[-31.618, -4.184, 0]}>
                <group name="MorphMainGroup_10">
                  <mesh name="Line004_14" geometry={nodes.Line004_14.geometry} material={materials.Line004} />
                </group>
                <group name="MorphMainGroup_11">
                  <mesh name="Line004_15" geometry={nodes.Line004_15.geometry} material={materials.Line004} />
                </group>
              </group>
            </group>
            <group name="Object_97" position={[0.144, -1.17, 1.185]}>
              <group name="Object_98" position={[29.774, 0.869, 0]}>
                <group name="MorphMainGroup_12">
                  <mesh name="Line001_12" geometry={nodes.Line001_12.geometry} material={materials.Line001} />
                </group>
                <group name="MorphMainGroup_13">
                  <mesh name="Line001_13" geometry={nodes.Line001_13.geometry} material={materials.Line001} />
                </group>
              </group>
              <group name="Object_103" position={[29.774, 0.869, 0]}>
                <group name="MorphMainGroup_14">
                  <mesh name="Line001_14" geometry={nodes.Line001_14.geometry} material={materials.Line001} />
                </group>
                <group name="MorphMainGroup_15">
                  <mesh name="Line001_15" geometry={nodes.Line001_15.geometry} material={materials.Line001} />
                </group>
              </group>
            </group>
            <group name="TimeframeMainGroup_1">
              <group name="Object_109">
                <mesh name="Box001_2_0_2" geometry={nodes.Box001_2_0_2.geometry} material={materials.PaletteMaterial001} />
              </group>
            </group>
          </group>
        </group>
        <mesh name="Box001_2_0" geometry={nodes.Box001_2_0.geometry} material={materials.PaletteMaterial001} position={[2.473, -1.185, 1.224]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh
          name="Line001"
          geometry={nodes.Line001.geometry}
          material={materials.Line001}
          morphTargetDictionary={nodes.Line001.morphTargetDictionary}
          morphTargetInfluences={nodes.Line001.morphTargetInfluences}
          position={[32.391, 0, 1.526]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh name="Line001_1" geometry={nodes.Line001_1.geometry} material={materials.Line001} position={[32.391, 0, 1.526]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh name="Line001_2" geometry={nodes.Line001_2.geometry} material={materials.Line001} position={[32.391, 0, 1.526]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh name="Line001_3" geometry={nodes.Line001_3.geometry} material={materials.Line001} position={[32.391, 0, 1.526]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh name="Line001_4" geometry={nodes.Line001_4.geometry} material={materials.Line001} position={[32.391, 0, 1.526]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh name="Line001_5" geometry={nodes.Line001_5.geometry} material={materials.Line001} position={[32.391, 0, 1.526]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh name="Line001_6" geometry={nodes.Line001_6.geometry} material={materials.Line001} position={[32.391, 0, 1.526]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh name="Line001_7" geometry={nodes.Line001_7.geometry} material={materials.Line001} position={[32.391, 0, 1.526]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh
          name="Line004"
          geometry={nodes.Line004.geometry}
          material={materials.Line004}
          morphTargetDictionary={nodes.Line004.morphTargetDictionary}
          morphTargetInfluences={nodes.Line004.morphTargetInfluences}
          position={[-29.017, 0, 7.299]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh name="Line004_1" geometry={nodes.Line004_1.geometry} material={materials.Line004} position={[-29.017, 0, 7.299]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh name="Line004_2" geometry={nodes.Line004_2.geometry} material={materials.Line004} position={[-29.017, 0, 7.299]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh name="Line004_3" geometry={nodes.Line004_3.geometry} material={materials.Line004} position={[-29.017, 0, 7.299]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh name="Line004_4" geometry={nodes.Line004_4.geometry} material={materials.Line004} position={[-29.017, 0, 7.299]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh name="Line004_5" geometry={nodes.Line004_5.geometry} material={materials.Line004} position={[-29.017, 0, 7.299]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh name="Line004_6" geometry={nodes.Line004_6.geometry} material={materials.Line004} position={[-29.017, 0, 7.299]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh name="Line004_7" geometry={nodes.Line004_7.geometry} material={materials.Line004} position={[-29.017, 0, 7.299]} rotation={[-Math.PI / 2, 0, 0]} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/butterfly/scene-transformed.glb');
