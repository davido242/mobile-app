import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Details() {
    const params = useLocalSearchParams();

    // useEffect(() => {
    //     if (params.name) {
    //         fetchPokemonByName(params.name);
    //     }
    // }, [params.name]);

    async function fetchPokemonByName(name: string) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Stack.Screen options={{
                title: params.name as string
            }} />
        <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
            <View style={styles.name}>
                <Text>{params.name}</Text>
                <Text>{params.name}</Text>
                <Text>{params.name}</Text>
                <Text>{params.name}</Text>
                <Text>{params.name}</Text>
                <Text>{params.name}</Text>
                <Text>{params.name}</Text>
                <Text>{params.name}</Text>
                <Text>{params.name}</Text>
                <Text>{params.name}</Text>
                <Text>{params.name}</Text>
            </View>
        </ScrollView>
            </>
    );
}

const styles = StyleSheet.create({
    name: {
        backgroundColor: "red",
    },

});