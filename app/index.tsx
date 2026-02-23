import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  
   interface Pokemon {
    name: string;
    image: string;
    imageBack: string;
  }
  const [loading, setLodaing] = useState("Loading...........");
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
            imageBack: details.sprites.back_default,
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
      {loading && <Text style={{ margin: "auto", width: 200, padding: 10, marginTop: 100, borderRadius: 20, borderWidth: 1, borderColor: "black", backgroundColor: "lightgray", color: "black" }}>{loading}</Text>}
      {pokemon.map((pok) => (
        <View key={pok.name} style={{ marginBottom: 20, borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 20 }}>
            <Text key={pok.name}>{pok.name}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
              <Image
                source={{ uri: pok.image }}
                style={{ width: 100, height: 100 }}
              />
              <Image
                source={{ uri: pok.imageBack }}
                style={{ width: 100, height: 100 }}
              />
              </View>
        </View>
        
      ))}
    </ScrollView>
  );
}