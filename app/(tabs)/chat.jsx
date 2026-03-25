import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { main } from '../../assets/colors';

export default function Chat() {


  const [messages, setMessages] = useState([
    { id: '1', text: 'Moi ootko missä?', side: 'left', time: '09:12' },
    { id: '2', text: 'Kaupassa oon tarviiko tuoda mitään??', side: 'right', time: '09:13' },
    { id: '3', text: 'Tuo sipsiä ja karkkia, esim yks kpl pätkis pussi ja neljä kpl estrella sour cream ', side: 'left', time: '09:14' },
    { id: '4', text: 'Joo joo mut huomena sit lenkille!!!', side: 'right', time: '09:15' },
    { id: '5', text: 'ei milläään jaksais lenkille ', side: 'left', time: '09:17' },
    { id: '6', text: 'niimut tommosen määrän jälkee sipsei ja karkkei olis aika tärkee', side: 'right', time: '09:17' },
    { id: '7', text: 'tiedetään mut noista sipseistä riittää kyl huomisellekki niin ehkä ylihuomena lenkille ', side: 'left', time: '09:18' },
    { id: '8', text: 'vai oisko et mennää heti sitku tuun kpast niin mennää lenkille, ja sit ei tarvii miettii huome tai ylihuomen mitää', side: 'right', time: '09:20' },
    { id: '9', text: 'No se vois oikeestaan olla ihan hyvä, pikanen lenkki ja sitte hullut mätöt', side: 'left', time: '09:20' },
    { id: '10', text: 'jep jep, ja jos viel juostaan mäet niinku kläbo niin saadaan kyl palkkioks hakee viel ylim pätkis pussi', side: 'right', time: '09:21' },
    { id: '11', text: 'no jos me kläbon lailla mennää nii ihan hyvin voidaan kyl hakee paljo enemmänki', side: 'left', time: '09:23' },
    { id: '12', text: 'ja ehkis mieluummin suklaalevyjä enempi mitä toinen pätkis pussi', side: 'left', time: '09:23' },
  ]);
  const [input, setInput] = useState('');
  const [nextSide, setNextSide] = useState('right');
  const scrollRef = useRef(null);


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const side = nextSide;
    const nextMsg = {
      id: String(Date.now()),
      text,
      side,
      time: new Date().toLocaleTimeString().slice(0, 5),
    };
    setMessages(prev => [...prev, nextMsg]);
    setInput('');

    setNextSide(prev => (prev === 'right' ? 'left' : 'right'));

  };

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={styles.container}
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(msg => {
          const isRight = msg.side === 'right';
          return (
            <View
              key={msg.id}
              style={[
                styles.messageRow,
                isRight ? styles.rowRight : styles.rowLeft
              ]}
            >
              <View style={[
                styles.bubble,
                isRight ? styles.bubbleRight : styles.bubbleLeft
              ]}>
                <Text style={styles.messageText}>{msg.text}</Text>
                <Text style={styles.messageTime}>{msg.time}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Kirjoita viesti..."
          placeholderTextColor="#999"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
          multiline={false}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main.background,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: main.fade,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  messagesContainer: {
    padding: 12,
    paddingBottom: 30,
    marginTop: 30
  },
  messageRow: {
    marginVertical: 6,
    flexDirection: 'row',
  },
  rowLeft: {
    justifyContent: 'flex-start',
  },
  rowRight: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '82%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  bubbleLeft: {
    backgroundColor: main.accent,
    borderTopLeftRadius: 4,
  },
  bubbleRight: {
    backgroundColor: '#28C76F',
    borderTopRightRadius: 4,
  },
  messageText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 6,
  },
  messageTime: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
    textAlign: 'right',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: main.background,
    marginBottom: 15,
    paddingTop: 20,

  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: main.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});