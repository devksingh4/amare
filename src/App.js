import logo from './logo.svg';
import './App.css';
import React from 'react';
import { getApp } from './firebase'
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, getDocs, collection } from 'firebase/firestore';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    }
    this.incrementCounter = this.incrementCounter.bind(this);
    this.addResponse = this.addResponse.bind(this);
  }
  componentDidMount() {
    this.addResponse();
  }
  incrementCounter() {
    this.setState({ counter: this.state.counter += 1 })
  }

  async addResponse() {
    console.log("h")
    const app = getApp();
    const db = getFirestore()
    const auth = getAuth();
    signInAnonymously(auth)
      .then(async () => {
        const querySnapshot = await getDocs(collection(db, "responses"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });

    // const res = await db.collection('responses').add({
    //   response: "Test 123"
    // })
    // console.log(res)
  }


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> {this.state.counter} save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={this.addResponse}>
            Add to Firebase
          </button>
        </header>

      </div>
    );
  }
}