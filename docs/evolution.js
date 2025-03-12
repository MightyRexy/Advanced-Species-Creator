import { useEffect } from "react";

export default function EvolutionSimulator({ species, environment }) {
  useEffect(() => {
    if (species.length === 0) return;

    console.log("Simulating evolution based on environment:", environment);

    species.forEach((specie) => {
      console.log(`Species: ${specie.name} adapting...`);
      // Add more complex adaptation logic here
    });
  }, [species, environment]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2">Evolution Simulator</h2>
      <p>Tracking species adaptation over time...</p>
    </div>
  );
}
