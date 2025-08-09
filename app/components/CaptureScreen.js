import React, {useState} from 'react';
import { View, Button, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';

export default function CaptureScreen({ navigation }){
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function pickImage(){
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if(!permission.granted) return Alert.alert('Permission required');

    const result = await ImagePicker.launchCameraAsync({ base64: true, quality: 0.6 });
    if(!result.cancelled){
      setImage(result.uri);
      setLoading(true);
      try{
        const response = await api.uploadImage(result.base64);
        setLoading(false);
        navigation.navigate('Result', { diagnosis: response.data });
      }catch(err){
        setLoading(false);
        Alert.alert('Upload failed');
      }
    }
  }

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      {image && <Image source={{uri:image}} style={{width:300,height:300,marginBottom:10}} />}
      <Button title="Take Photo" onPress={pickImage} />
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
}
