import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import EnviromentButton from "../components/EnvironmentButton";
import Header from "../components/Header";
import PlantCardPrimary from "../components/PlantCardPrimary";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import api from "../services/api";
interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  }
}

function PlantSelect() {
  const [enviroments, setEnviroments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState('all');
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);

  useEffect(() => {
    async function fetchEnvironments() {
      const { data } = await api.get('/plants_environments?_sort=title&_order=asc');
      setEnviroments([
        {
          key: 'all',
          title: 'Todos'
        },

        ...data
      ]);
    }
    fetchEnvironments();
  }, []);
  
  useEffect(() => {
    async function fetchPlants() {
      const { data } = await api.get('/plants?_sort=name&_order=asc');
      setPlants(data);
      setFilteredPlants(data);
    }

    fetchPlants();
  }, []);

  function handleSelectEnvironment(environment: string) {
    setSelectedEnvironment(environment);

    if(environment === 'all') 
      return setFilteredPlants(plants); 

    const filtered = plants.filter(plant => plant.environments.includes(environment));

    setFilteredPlants(filtered);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>Você quer colocar sua planta?</Text>
      </View>
      
      <View>
        <FlatList
          data={enviroments}
          renderItem={({item}) => (
            <EnviromentButton 
              title={item.title} 
              key={item.key}
              active={selectedEnvironment === item.key}
              onPress={() => handleSelectEnvironment(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
          fadingEdgeLength={60}
        />
      </View>

      <View style={styles.plants}>
            <FlatList
              data={filteredPlants}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              renderItem={({item}) => (
                <PlantCardPrimary 
                  key={item.id} 
                  data={item}
                />
              )}
            />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },

  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },

  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingLeft: 32,
    marginVertical: 32
  },

  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  },
});

export default PlantSelect;
