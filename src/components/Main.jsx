import { Text, StyleSheet, View } from 'react-native'
import { db } from '../../firebase'
import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { LogBox } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

const styles = StyleSheet.create({
  background: {
    height: '100%',
    backgroundColor: '#065535',
  },
  container: {
    height: '40%',
    minHeight: 400,
    alignItems: 'center',
    marginTop: 40,
    padding: 20,
  },
  card: {
    flex: 2,
    alignSelf: 'stretch',
    margin: 10,
    backgroundColor: '#bada55',
    borderColor: '#bada55',
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const Main = () => {
  const [temp, setTemp] = useState('')
  const [tempMin, setTempMin] = useState()
  const [tempMax, setTempMax] = useState()

  LogBox.ignoreLogs(['Setting a timer'])

  const readTemp = async () => {
    let tempArray = []
    let timeArray = []
    const q = query(
      collection(db, 'temperature'),
      orderBy('time', 'desc'),
      limit(24)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      tempArray.push(doc.data().temp)
      timeArray.push(doc.data().time)
      setTemp({ temp: tempArray[0], time: timeArray[0] })
    })
    tempArray = tempArray.sort((a, b) => a - b)
    setTempMin(tempArray[0])
    setTempMax(tempArray[tempArray.length - 1])
  }

  const timestampToDate = () => {
    const date = new Date(temp.time * 1000)
    return (
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes()
    )
  }

  useEffect(() => {
    readTemp()
  }, [])

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={{ fontSize: 80 }}>{temp.temp}</Text>
          <Text style={{ fontSize: 20 }}>{timestampToDate()}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1.5,
            alignSelf: 'stretch',
          }}
        >
          <View style={[styles.card]}>
            <Text style={{ fontSize: 25 }}>
              <Icon name='arrow-down' size={30} color='blue' />
              24h
            </Text>
            <Text style={{ fontSize: 40 }}>{tempMin}</Text>
          </View>
          <View style={[styles.card]}>
            <Text style={{ fontSize: 25 }}>
              <Icon name='arrow-up' size={30} color='red' />
              24h
            </Text>
            <Text style={{ fontSize: 40 }}>{tempMax}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Main
