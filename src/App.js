import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    const checkUser = async () => {
      const response = await axios('/api/user')
      setUser(response.data.user)
    }

    checkUser()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {user ? <p>Hello {user.given_name}</p> : <a href={`https://${process.env.REACT_APP_AUTH0_DOMAIN}/login?client=${process.env.REACT_APP_AUTH0_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_AUTH0_REDIRECT_URI}`}>
          Login
        </a>}
      </header>
    </div>
  );
}

export default App;
