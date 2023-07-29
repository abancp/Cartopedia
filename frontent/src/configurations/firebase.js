import { initializeApp } from "firebase/app"

const firebaseConfig={
    storageBucket: "gs://cartopedia-56f2f.appspot.com"
}

export const app = initializeApp(firebaseConfig)