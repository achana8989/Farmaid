import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import api from '../services/api';

export default function ResultScreen({ route }){
  const { diagnosis } = route.params;

  async function requestDelivery(type='motorbike'){
    try{
      const res = await api.requestDelivery({ type, items: diagnosis.recommendations });
      Alert.alert('Delivery requested', `ID: ${res.data.id}`);
    }catch(err){
      Alert.alert('Delivery failed');
    }
  }

  return (
    <View style={{padding:20}}>
      <Text style={{fontSize:20, fontWeight:'bold'}}>Diagnosis</Text>
      <Text>Disease: {diagnosis.disease}</Text>
      <Text>Confidence: {(diagnosis.confidence*100).toFixed(0)}%</Text>
      <Text style={{marginTop:10}}>Recommendations:</Text>
      {diagnosis.recommendations.map((r,i)=>(<Text key={i}>- {r}</Text>))}

      <View style={{marginTop:20}}>
        <Button title="Request motorbike delivery" onPress={()=>requestDelivery('motorbike')} />
        <View style={{height:10}} />
        <Button title="Request drone delivery" onPress={()=>requestDelivery('drone')} />
      </View>
    </View>
  );
}
