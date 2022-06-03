import { Text, StyleSheet, View, LogBox } from 'react-native'
import { db } from '../../firebase'
import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Feather'

const styles = StyleSheet.create({
  background: {
    height: '100%',
    backgroundColor: '#254EDB',
  },
  container: {
    height: '40%',
    minHeight: 400,
    alignItems: 'center',
    marginTop: 40,
    padding: 20,
    borderBottomWidth: 0,
  },
  card: {
    flex: 2,
    alignSelf: 'stretch',
    margin: 10,
    backgroundColor: '#84A9FF',
    borderColor: '#84A9FF',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const Main = () => {
  const [temp, setTemp] = useState('')
  const [tempMin, setTempMin] = useState()
  const [tempMax, setTempMax] = useState()
  const [date, setDate] = useState()

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
      setTemp({ temp: tempArray[0].toFixed(1), time: timeArray[0] })
    })

    tempArray = tempArray.sort((a, b) => a - b)
    setTempMin(tempArray[0].toFixed(1))
    setTempMax(tempArray[tempArray.length - 1].toFixed(1))

    const date = new Date(timeArray[0] * 1000)

    setDate(
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
          <Text style={{ fontSize: 90 }}>{temp.temp}</Text>
          <Text style={{ fontSize: 20 }}>{date}</Text>
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
              <Icon name='arrow-up' size={30} color='#8B0000' />
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
