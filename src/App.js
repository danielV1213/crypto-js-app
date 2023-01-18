import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./routes/Home";
import SignIn from './routes/SignIn'
import SignUp from './routes/SignUp'
import Account from './routes/Account'
import CoinPage from './routes/CoinPage'
import axios from "axios";

function App() {
  const [coins, setCoins] = useState([])

  // In this particular case, we're not getting any keys, that's why we don't use .env files or similar tools to hide information.
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
      // console.log(response.data)
    })
  }, [url])
  // Dependency array ⬆

  return (
    <ThemeProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home coins={coins} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<Account />} />
        <Route path="/coin/:coinId" element={<CoinPage />}>
          <Route path=":coinId" />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
