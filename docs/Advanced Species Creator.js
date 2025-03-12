import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Globe3D } from "@/components/3d/globe3D";
import { Species3D } from "@/components/3d/species3D";
import { AIChatBox } from "@/components/ai/chatbox";
import { EvolutionSimulator } from "@/components/3d/evolution";
import { GeneticAlgorithm } from "@/components/genetics/algorithm";

export default function AdvancedSpeciesCreator() {
    const [species, setSpecies] = useState([]);
    const [newSpecies, setNewSpecies] = useState({
        name: "",
        traits: "",
        enviroment: "",
        dna: "",
    });

    useEffect(() => {
        GeneticAlgorithm.initialize();
    }, []);

    const addSpecies = () => {
        if (newSpecies.name && newSpecies.traits && newSpecies.environment && newSpecies.dna) {
            const evolvedSpecies = GeneticAlgorithm.evolve(newSpecies);
            setSpecies([...species, evolvedSpecies]);
            setNewSpecies({ name: "", traits: "", enviroment: "", dna: "" });
        }
    };

    return (
        <div className="p-6 flex-col gap-6">
            <h1 className="text-4xl font-bold">Extreme Species Creator</h1>

            <div className="flex gap-4">
                <Input
                   placeholder="Species Name"
                   value={newSpecies.name}
                   onChange={(e) => setNewSpecies({ ...newSpecies, name: e.target.value })}
                />
                <Input
                   placeholder="traits (e.g., Mammal, Reptile, etc.)"
                   value={newSpecies.traits}
                   onChange={(e) => setNewSpecies({ ...newSpecies, traits: e.target.value })}
                />
                <Input
                   placeholder="Preffered Environment"
                   value={newSpecies.environment}
                   onChange={(e) => setNewSpecies({ ...newSpecies, environment: e.target.value })}
                />
                <Input
                   placeholder="DNA Sequence"
                   value={newSpecies.dna}
                   onChange={(e) => setNewSpecies({ ...newSpecies, dna: e.target.value })}
                />
                <Button onClick={addSpecies}>Create & Simulate Evolution</Button>
            </div>

            <AIChatBox prompt="Assist in species creation and evolution predictions." />

            <Globe3D editable={true} />

            <EvolutionSimulator species={species} environment={newSpecies.environment} />

            <div className="grid grid-cols-3 gap-4">
                {species.map((specie, index) => (
                    <Card key={index}>
                        <CardContent>
                            <h2 className="text-xl font-semibold">{specie.name}</h2>
                            <p><strong>Traits:</strong> {specie.traits}</p>
                            <p><strong>Environment:</strong> {specie.environment}</p>
                            <p><strong>DNA:</strong> {specie.dna}</p>
                            <p><strong>Evolutionary Status:</strong> {specie.evolutionaryStatus}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}