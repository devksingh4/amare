import { initializeApp } from 'firebase/app';

export function getFirebaseApp() {
    const firebaseConfig = {
        apiKey: "AIzaSyA5PWfwZi3KJY_mLFjbSyxDRNN1P6o2q08",
        authDomain: "amare-650e9.firebaseapp.com",
        projectId: "amare-650e9",
        storageBucket: "amare-650e9.appspot.com",
        messagingSenderId: "549313195564",
        appId: "1:549313195564:web:3915c2d973cad306c0eb89"
    };

    return initializeApp(firebaseConfig);
}