import React from 'react';
import {ScrollView, TouchableOpacity } from 'react-native';
import StudentDealCard from '../../components/StudentDealCard';
import { deal } from '../../types/types';


const images = {'TV': require('../../../assets/TV.png'),
  'Books': require('../../../assets/Books.png'),
  'Calculator': require('../../../assets/Calculator.png'),
  'Futon': require('../../../assets/futon.png'),
  'Instrument': require('../../../assets/InstrumentSet.png'),
  'Coffee': require('../../../assets/futon.png'), 
}

const deals: deal[]= [{price: '45', image: images['TV'], message: "Please contact me about when to do the deal at this email: bob@gmail.com"},
                      {price: '80', image: images['Calculator'], message: "Open to baugaining, please call me at 5740000000"},
                      {price: '120', image: images['Books'], message: "Selling them as group, open to individual selling, contact at Jessica@hotmail.com"},
                      {price: '30', image: images['Futon'], message: "I am graduating so need someone who needs it, Inbox me here"},
                      {price: '50', image: images['Instrument'], message: "Please Know I am not going any lower, Thank you. email karen@gmail.com"},
                      {price: '0', image: images['Coffee'], message: "I am actually getting rid of it for free, hit me up by friday noon, 6461233445"}]

const StudentDealsScreen: React.FC = () => {
  return (
    <ScrollView>
      {
       deals.map((deal, index)=>(
        <TouchableOpacity key={index}>
        <StudentDealCard
           image={deal.image}
           price= {deal.price}
           message = {deal.message}
         />
        </TouchableOpacity>
       )

       )
      }
      
    
    </ScrollView>
  );
};

export default StudentDealsScreen;
