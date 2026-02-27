import { Link } from "expo-router";

import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  
   interface Pokemon {
    name: string;
    image: string;
    imageBack: string;
    types: PokemonType[];
  }

  interface PokemonType {
    type: {
      name: string;
      url: string;
    }
  }

  const colorsByType: { [key: string]: string } = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC",
    normal: "#A8A878",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    steel: "#B8B8D0",
    flying: "#A890F0",
  };


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
            types: details.types
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
    <ScrollView contentContainerStyle={{gap: 16, padding: 16 }}>
      {loading && <Text style={{ margin: "auto", width: 200, padding: 10, marginTop: 100, borderRadius: 20, borderWidth: 1, borderColor: "black", backgroundColor: "tomato", color: "black" }}>{loading}</Text>}
      {pokemon.map((pok) => (
        <Link 
        key={pok.name} 
        href={{pathname: "/details", params: {name: pok.name}}}
        style={{ backgroundColor:  colorsByType[pok.types[0]?.type.name] + 50, marginBottom: 20, borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 20 }}>
          <View style={{ alignItems: "center", width: "100%" }}>
              <Text style={styles.name} key={pok.name}>{pok.name}</Text>
              <Text style={styles.type}>{pok.types[0]?.type.name}</Text>
              <View style={{ flexDirection: "row", marginTop: 10}}>
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
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
});