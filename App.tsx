import { useState } from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>RestForMore</Text>
        <Text style={styles.description}>Je React Native-app is klaar om te bouwen.</Text>
        <Pressable accessibilityRole="button" onPress={() => setCount((current) => current + 1)} style={styles.button}>
          <Text style={styles.buttonText}>Teller: {count}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f6fb' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { color: '#211734', fontSize: 32, fontWeight: '700', marginBottom: 12 },
  description: { color: '#625b70', fontSize: 16, textAlign: 'center', marginBottom: 24 },
  button: { backgroundColor: '#7139bd', borderRadius: 10, paddingHorizontal: 24, paddingVertical: 14 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
})
