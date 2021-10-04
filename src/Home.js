import './Home.css';
import React from 'react';
import { getFirebaseApp } from './firebase'
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
      response: ''
    }
    this.addResponse = this.addResponse.bind(this);
    this.pushToFirebase = this.pushToFirebase.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ response: event.target.value });
  }
  async pushToFirebase(db, responseString) {
    if (!responseString || responseString === "") {
      return alert("Response cannot be empty!");
    }
    const docRef = await addDoc(collection(db, "responses"), {
      response: responseString,
      timestamp: new Date()
    });
    console.log("New document ID: ", docRef.id)
  }
  async addResponse() {
    if (!this.state.response || this.state.response === "") {
      return alert("Response cannot be empty!");
    }
    const app = getFirebaseApp()
    const auth = getAuth(app);
    signInAnonymously(auth)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage)
        return alert("There was an error submitting your response. Please try again.")
      });
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const db = getFirestore(app);
        try {
          await this.pushToFirebase(db, this.state.response)
          this.setState({response: ''})
          alert("Submitted!")
        } catch {
          console.error("Error submitting to Firebase.")
          alert("There was an error submitting your response. Please try again.")
        }
      }
    });
  }


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <input
            type="text"
            value={this.state.response}
            onChange={this.handleChange}
          />
          <button onClick={this.addResponse}>
            Submit
          </button>
        </header>

      </div>
    );
  }
}