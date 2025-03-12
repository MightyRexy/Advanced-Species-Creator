import { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

export default function Species3D({ speciesData }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    
    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 3, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    let speciesMesh;
    
    if (speciesData.traits.includes("Mammal")) {
      speciesMesh = BABYLON.MeshBuilder.CreateBox("mammal", { size: 1.5 }, scene);
    } else if (speciesData.traits.includes("Reptile")) {
      speciesMesh = BABYLON.MeshBuilder.CreateCylinder("reptile", { diameter: 1, height: 2 }, scene);
    } else {
      speciesMesh = BABYLON.MeshBuilder.CreateSphere("default", { diameter: 1 }, scene);
    }

    speciesMesh.position.y = 1;
    const material = new BABYLON.StandardMaterial("speciesMaterial", scene);
    material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
    speciesMesh.material = material;
    
    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, [speciesData]);

  return <canvas ref={canvasRef} className="w-full h-64" />;
}
