import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  
   interface Pokemon {
    name: string;
    image: string;
  }
  const [loading, setLodaing] = useState("Loading.....");
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  useEffect(() => {
    fetchPokemons(); 
  }, [])

  async function fetchPokemons() {
     try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pok: any) => {
          const res = await fetch(pok.url);
          const details =  await res.json();
          return {
            name: pok.name,
            image: details.sprites.front_default,
          }
        })
      );
      setLodaing("");
      setPokemon(detailedPokemons);
     } catch (error) {
      console.log(error)
     }
  }
  return (
    <ScrollView style={{ padding: 20, marginTop: 50 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", display: "flex", justifyContent: "center" }}>Pokedex</Text>
      {loading && <Text style={{ padding: 10, marginTop: 100, borderRadius: 20, borderWidth: 1, borderColor: "black", backgroundColor: "lightgray", color: "black" }}>{loading}</Text>}
      {pokemon.map((pok) => (
        <View>
            <Text key={pok.name}>{pok.name}</Text>
            <Image
              source={{ uri: pok.image }}
              style={{ width: 100, height: 100 }}
            />
        </View>
        
      ))}
    </ScrollView>
  );
}