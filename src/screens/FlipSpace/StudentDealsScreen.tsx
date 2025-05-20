import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import StudentDealCard from '../../components/StudentDealCard';
import { deal } from '../../types/types';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { supabase } from '../../../supabaseClient';


const StudentDealsScreen: React.FC = () => {
  const [deals, setDeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const {state} = useGlobalContext();
  
    const fetchDeals = async () => {
      const { data, error } = await supabase.from('Deals').select('*').neq('owner', state.currentUserId).order('created_at', { ascending: false });
  
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
      {
       deals.map((deal, index)=>(
        <TouchableOpacity key={index}>
        <StudentDealCard
           image={{uri:deal.image}}
           price= {deal.price}
           instructions = {deal.instructions}
           userId= {deal.owner}
         />
        </TouchableOpacity>
       )

       )
      }
      
    
    </ScrollView>
  );
};

export default StudentDealsScreen;
