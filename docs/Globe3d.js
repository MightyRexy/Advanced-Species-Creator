import { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

export default function Globe3D({ editable }) {
    const canvasRef = useRef(null);

    useEffect(() => {
       const canvas = canvasRef.current;
       const engine = new BABYLON.Engine(canvas, true);
       const scene = new BABYLON.Scene(engine);

       const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 3, 10, BABYLON.Vector3.Zero(), scene);
       camera.attachControl(canvas, true);

       const light = new BABYLON.HemisphericLight("Light", new BABYLON.Vector3(1, 1, 0), scene);

       const sphere = BABYLON.MeshBuilder.CreateSphere("earth", { diameter: 5 }, scene);
       const material = new BABYLON.StandardMaterial("earthMaterial", scene);
       material.diffuseTexture = new BABYLON.Texture("https://www.solarsystemscope.com/texture/download/8k_earth_daymap.jpg", scene);
       sphere.material = material;

       if (editable) {
        sphere.actionManager = new BABYLON.ActionManager(scene);
        sphere.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
                sphere.scaling.y += 0.1;
            })
        );
       }

       engine.runRenderLoop(() => {
           scene.render();
       });

       window.addEventListener("resize", () => {
           engine.resize();
       })

       return () => {
           engine.dispose();
       };
    }, [editable]);

    return <canvas ref={canvasRef} className="w-full h-96" />;
}
