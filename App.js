import Main from './src/components/Main'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName

            if (route.name === 'main') {
              iconName = 'temperature-celsius'
            } else if (route.name === 'second') {
              iconName = 'calculator'
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#00008B',
            borderTopColor: '#00008B',
          },
        })}
      >
        <Tab.Screen name='main' component={Main}></Tab.Screen>
        <Tab.Screen name='second' component={Main}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  )
}
