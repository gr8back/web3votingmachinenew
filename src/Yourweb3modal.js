import React, { useState } from "react";
import { Button } from "antd";
import WalletConnectProvider from "@walletconnect/web3-provider";
import BurnerConnectProvider from "@burner-wallet/burner-connect-provider";
import "./App.css";
import Web3Modal from "web3modal";

function Yourweb3modal() {
  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "c199a2603e274f03849c82d5a60f524c", // required
        },
      },
      burnerconnect: {
        package: BurnerConnectProvider, // required
        options: {
          defaultNetwork: "100",
        },
      },
    },
  });


  const modalButtons = [];

  const loadWeb3Modal = async () => {
    const provider = await web3Modal.connect();
  };

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <Button
          key="logoutbutton"
          style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4 }}
          shape="round"
          size="large"
          onClick={logoutOfWeb3Modal}
        >
          logout
        </Button>
      );
    } else {
      modalButtons.push(
        <Button
          key="loginbutton"
          style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4 }}
          shape="round"
          size="large"
          onClick={loadWeb3Modal}
        >
          Connect A Wallet
        </Button>
      );
    }
  }

  return (
    <div style={{ gridColumn: "1/4", gridRow: "3", textAlign: "center" }}>
      {modalButtons}
      <h2>{web3Modal.cachedProvider}</h2>
      <h3>{web3Modal.default}</h3>
    </div>
  );
}

export default Yourweb3modal;
