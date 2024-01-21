// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAT2IGx-jLh11MQ7V6NWfe3fxc5wf3IYpQ',
  authDomain: 'superblog-a6b58.firebaseapp.com',
  projectId: 'superblog-a6b58',
  storageBucket: 'superblog-a6b58.appspot.com',
  messagingSenderId: '96917150076',
  appId: '1:96917150076:web:71f408246da0b6bc4eacf9',
}

// Initialize Firebase

export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export const storeUserInfo = async (userId, userName) => {
  const userDocRef = doc(db, 'users', userId)

  try {
    await setDoc(userDocRef, {
      userName,
    })
    console.log('nombre registrado exitosamente')
  } catch (err) {
    console.error('problema al registrar al usuario: ' + err.me)
  }
}

export const getUserNameFromFirebase = async (userId) => {
  const userDocRef = doc(db, 'users', userId)

  try {
    const userDocSnaphot = await getDoc(userDocRef)

    if (userDocSnaphot.exists()) {
      const userData = userDocSnaphot.data()
      const userName = userData.userName
      console.log(`El nombre del usuario con ID ${userId} es: ${userName}`)
      return userName
    } else {
      console.log(`No se encontró información para el usuario con ID ${userId}`)
    }
  } catch (e) {
    console.error('Error al recuperar el nombre del usuario:', error.message)
    return null
  }
}

export const addPostForUser = async (userId, title, content) => {
  try {
    const userDocRef = doc(db, 'users', userId)
    const userPostsCollection = collection(userDocRef, 'posts')

    const postData = {
      title,
      content,
      timestamp: serverTimestamp(),
    }

    await addDoc(userPostsCollection, postData)

    console.log('Post agregado con éxito para el usuario con UID:', userId)
    return true
  } catch (error) {
    console.error('Error al agregar el post:', error.message)
    return false
  }
}

export const postRef = collection(db, 'posts')
export const postUserName = collection(db, 'users')
