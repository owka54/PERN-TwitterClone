import './App.css'

function App() {

  return (
    <div className="App">
      <header>
        <h1>TwitterClone</h1>
        <ul id="links">
          <li><a href="">My posts</a></li>
          <li><a href="">Login</a></li>
        </ul>
      </header>

      <div id="posts">
        <div className="post">
          <h3>Username</h3>
          <p>i ate pasta todayy</p>
        </div>
        <div className="post">
          <h3>Username</h3>
          <p>i ate pasta todayy</p>
        </div>
      </div>
    </div>
  )
}

export default App
