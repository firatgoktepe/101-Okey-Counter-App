import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, LogBox } from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import StepModal from "react-native-step-modal";
import { Confetti } from "native-confetti";
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "1",
    value: 1
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "2",
    value: 2
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "3",
    value: 3
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    title: "4",
    value: 4
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d74",
    title: "5",
    value: 5
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d75",
    title: "6",
    value: 6
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d76",
    title: "7",
    value: 7
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d77",
    title: "8",
    value: 8
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d78",
    title: "9",
    value: 9
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d79",
    title: "10",
    value: 10
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d33",
    title: "11",
    value: 11
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d56",
    title: "12",
    value: 12
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d88",
    title: "13",
    value: 13
  },
];

const Item = ({ item, onPress }) => (
  <TouchableOpacity style={styles.piecesButton} onPress={onPress}>
    <Text style={{ color: '#fff' }}>{item.title}</Text>
  </TouchableOpacity>
);


export default function App() {
  const [count, setCount] = useState(0);
  const [notification, setNotification] = useState('');
  const [buttonValues, setButtonValues] = useState([]);


  const handleCounter = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {

          setCount(count + (Number(item.value) * 3));
          setButtonValues(buttonValues.concat(item.value * 3));
        }
        }
      />
    );
  }
  const handleSideCounter = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {

          setCount(count + Number(item.value));
          setButtonValues(buttonValues.concat(item.value));
        }
        }
      />
    );
  }

  const undoCounter = (e) => {
    setButtonValues(buttonValues.slice(0, -1));
    setCount(count - Number(buttonValues[buttonValues.length - 1]));
  }

  const enabled = count

  useEffect(() => {
    if (count >= 101) {
      setNotification('A??abiliyorsun Bravo :)')
    } else if (count < 101 && count >= 90) {
      setNotification('Az kald?? ha gayret!')
    } else if (count < 90 && count >= 60) {
      setNotification('Sab??rl?? ol!')
    } else if (count < 60 && count > 0) {
      setNotification('Bu elin i??i zor!')
    } else {
      setNotification('Asagidan sayilari girebilirsin')
    }
  }, [count, notification])

  const resetCount = () => {
    setCount(0)
    setButtonValues([])
  }

  let Component1 = (
    <View>
      <Text style={{ fontSize: 25, fontStyle: 'bold', textAlign: 'center' }}>Nasil Kullanilir?</Text>
      <Text></Text>
      <Text></Text>
      <Text style={{ fontSize: 18, textAlign: 'center' }}>Ilk ??nce elinizdeki 3'lulerin herbirinin ortasindaki sayilari giriniz</Text>
      <Text></Text>
      <Text></Text>
    </View>
  );
  let Component2 = (
    <View>
      <Text style={{ fontSize: 25, fontStyle: 'bold', textAlign: 'center' }}>Nasil Kullanilir?</Text>
      <Text></Text>
      <Text></Text>
      <Text style={{ fontSize: 18, textAlign: 'center' }}>Sonra varsa 3'lulerin yanindaki sayilari (??r: 4'luler 5'liler vb) giriniz</Text>
      <Text></Text>
      <Text></Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.counterBox}>
        <View>
          <StepModal stepComponents={[Component1, Component2]} />
        </View>
        {
          count >= 101 && (
            <View style={{ marginRight: 260 }}>
              <Confetti />
            </View>

          )
        }
        <Text style={styles.paragraph}>Elinin Toplami</Text>
        <Text style={[styles.paragraph, count < 101 ? styles.red : styles.green]}>{count}</Text>
        <Text style={[count < 101 && count > 0 ? styles.redNotifySize : count == 0 ? styles.zero : styles.greenNotifySize]}>{notification}</Text>
      </View>
      <View style={styles.piecesBox}>
        <View style={styles.piecesBoxHeading}>
          <Text style={{ fontSize: 20 }}>Orta Gir</Text>
          <TouchableOpacity style={styles.piecesBoxHeadingButton} disabled={!enabled} onPress={resetCount}><Text style={{ color: '#fff' }}>Sifirla</Text></TouchableOpacity>
          <TouchableOpacity style={styles.piecesBoxHeadingButton} disabled={!enabled} onPress={undoCounter}><Text style={{ color: '#fff' }}>Geri Al</Text></TouchableOpacity>
        </View>
        <View style={styles.pieces}>
          <FlatList
            data={DATA}
            renderItem={handleCounter}
            keyExtractor={(item) => item.id}
            numColumns={7}
          />
        </View>
        <View>
          <Text style={{ fontSize: 20 }}>Yan Gir</Text>
        </View>
        <View style={styles.pieces}>
          <FlatList
            data={DATA}
            renderItem={handleSideCounter}
            keyExtractor={(item) => item.id}
            numColumns={7}
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  counterBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
    padding: 40,
  },
  heading: {
    fontSize: 30,
  },
  paragraph: {
    fontSize: 28,
  },
  red: {
    color: 'red',
    fontSize: 38,
  },
  green: {
    color: 'green',
    fontSize: 38,
  },
  zero: {
    color: 'green',
    fontSize: 18,
  },
  redNotifySize: {
    color: 'red',
    fontSize: 28,
  },
  greenNotifySize: {
    color: 'green',
    fontSize: 28,
  },
  piecesBox: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
    padding: 20,
  },
  piecesBoxHeading: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  piecesBoxHeadingButton: {
    backgroundColor: 'red',
    borderRadius: 6,
    fontSize: 18,
    padding: 10,
  },
  pieces: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    marginTop: 20,
  },
  piecesButton: {
    backgroundColor: 'gray',
    borderRadius: 6,
    fontSize: 18,
    flex: 1,
    padding: 15,
    alignItems: 'center',
    marginBottom: 30,
    marginRight: 5,
    height: 'auto'
  },

});

