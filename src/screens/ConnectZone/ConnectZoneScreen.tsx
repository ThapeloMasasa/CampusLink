import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import GroupCard from '../../components/GroupCard';
import { groupItem, RootStackParamList   } from '../../types/types';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { supabase } from '../../../supabaseClient';
type ConnectZoneNavigationProp = StackNavigationProp<RootStackParamList, 'ConnectZone', 'GroupChat'>;


const ConnectZoneScreen = () => {
  
  const navigation = useNavigation<ConnectZoneNavigationProp>();
  const {state} = useGlobalContext();
  const [createdGroups, setCreatedGroups] = useState<groupItem[]>([]);

  useEffect(()=>{
     loadGroups();
  },[])

  const loadGroups = async () => {
  if (!state.currentUserId) {
    console.warn('currentUserId is undefined');
    return;
  }

  const { data: groups, error: groupsError } = await supabase
    .from('Groups')
    .select('*')
    .eq('admin', state.currentUserId);

  if (groupsError) {
    console.error('Error fetching groups:', groupsError);
    Alert.alert("Group fetch failed");
    return;
  }


  if (groups) {
    const groupsWithSectionArray = groups.map(group => ({
      ...group,
      sections: group?.sections?.split('/'),
    }));
    console.log('Processed groups:', groupsWithSectionArray);
    setCreatedGroups(groupsWithSectionArray);
  }
};

  const handleGroupEntrance = (item: any)=>{
    if (item.has_sections){
        navigation.navigate('SectionScreen', { group: item, })
    }else{
       navigation.navigate('GroupChat', {
                section: '',
                groupName: item.name,
                admin: item.admin
      })
    }
    
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={createdGroups}
        keyExtractor={(item, index) => item?.name?.toString() ?? index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
           {
          item?.has_sections ? <GroupCard
                groupName= {item.name}
                isOpen={true}
                onPress={() => navigation.navigate('SectionScreen', { group: item })}
                backgroundImage={item.image}
/> :<GroupCard
                groupName= {item.name}
                isOpen={true}
                onPress={() => navigation.navigate('GroupChat', {
                section: '',
                groupName: item.name,
                admin: item.admin
              })
            }
                backgroundImage={item.image}
/>
           }
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  groupCard: {
    backgroundColor: '#e0cfcf',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  groupText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConnectZoneScreen;
