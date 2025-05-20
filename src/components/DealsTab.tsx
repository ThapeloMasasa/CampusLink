import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { supabase } from '../../supabaseClient'; // Adjust to your actual path
import StudentDealCard from './StudentDealCard';
import { useGlobalContext } from '../contexts/GlobalContext';

const DealsTab = () => {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const {state} = useGlobalContext();

  const fetchDeals = async () => {
    const { data, error } = await supabase.from('Deals').select('*').eq('owner', state.currentUserId).order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching deals:', error.message);
    } else {
      setDeals(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView>
      {deals.length > 0 ? (
        deals.map((deal, index) => (
          <StudentDealCard
            key={index}
            instructions={deal.instructions}
            price={deal.price}
            image= {{uri:deal.image}}
            userId= {deal.owner}
          />
        ))
      ) : (
        <View style={{ marginTop: 50, alignItems: 'center' }}>
          <Text>No deals available.</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default DealsTab;
