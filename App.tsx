/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import mqtt from 'mqtt/dist/mqtt';
import { Client } from 'mqtt';
import { IPublishPacket } from 'mqtt-packet';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const MqttFeature: React.FC = () => {

  const clientRef = React.useRef<Client|null>(null)
  
  const onReceivedMqttMessage = (topic:string, message: Buffer, packet: IPublishPacket):void => {
    console.log(`mqtt client: message received from topic ${topic}`)
  }

  React.useEffect(() => {
    console.log("MQTT client: connecting to broker...")
    clientRef.current = mqtt.connect("ws://test.mosquitto.org:8080")

    clientRef.current?.on('connect',() => {
      console.log("MQTT client: connected")
    })

    clientRef.current?.on('end',() => {
      console.log("MQTT client: end")
    })

    clientRef.current?.on('close',() => {
      console.log("MQTT client: closed")
    })

    clientRef.current?.on('error',(error) => {
      console.error("MQTT client: error", error)
    })

    clientRef.current?.on('message', onReceivedMqttMessage)

    clientRef.current?.subscribe('123')

    return () => {
      console.log("MQTT client: clearing up...")
      if (clientRef.current) {//} && clientRef.current.connected) {
        clientRef.current.end()
      }
    }
  })
    
  return (
    <Text>MQTT Client</Text>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <MqttFeature/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
