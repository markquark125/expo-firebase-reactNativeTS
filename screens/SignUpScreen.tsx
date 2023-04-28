import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
 
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth();

const SignUpScreen: React.FC<StackScreenProps<any>> = ( {navigation} ) => {
  // state to hold user email and password for signing up. Initally empty strings
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  })

  async function signUp() {
    // If we have any empty values
    if (value.email === '' || value.password === '' ) {
      setValue( {
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    // Else, 
    /* setValue( {
      ...value,
      error: ''
    }) */
    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValue( {
        ...value,
        //error: error.message,
        error: error.message
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text>Signup Screen!</Text>

      { /* 
        Conditional rendering. { True && expression } evalutes to expression, i.e., if 
        we have an error message (nonempty string), it will display <View> component
        will error message. 
        */
      }
      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

      <View style={styles.controls}>

        <Input
          placeholder='Enter Email'
          containerStyle={styles.control}
          value={value.email}
          onChangeText ={ (text) => setValue({ ...value, email: text}) }
          leftIcon= { <Icon name='envelope' size={16} /> }
        />

        <Input
        placeholder='Enter Password'
        containerStyle={styles.control}
        value={value.password}
        onChangeText ={ (text) => setValue({ ...value, password: text}) }
        secureTextEntry={ true }
        leftIcon= { <Icon name='key' size={16} /> }
        />

        <Button title="Sign up"  onPress={signUp}/>

      </View>
    </View>
  );
}

// Creates a StyleSheet style reference from the given object.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controls: {
    flex: 1,
    width: '60%'
  },

  control: {
    marginTop: 10
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});

export default SignUpScreen;