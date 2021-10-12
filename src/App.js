import React, { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { Button } from "antd";
import "./App.css";
import RedCheck from "./redcheck.svg";
import Web3 from "web3";
import BallotMachine from "./Ballot";
import { ethers } from "ethers";
import Yourweb3modal from "./Yourweb3modal";
import "./toastr2.css";
import "./votebooth.jpeg";
import Ballot from "./artifacts/contracts/Ballot.sol/Ballot.json";
import MyImage from "./64px-Checkmark_green.svg.png";
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

function App() {
  const mycontractconnect = process.env.REACT_APP_KEY;

  const [myvar, setmyvar] = useState("");
  const [myvar2, setmyvar2] = useState("");
  const [myvar3, setmyvar3] = useState("");
  const [myvar4, setmyvar4] = useState("");
  const [myvar5, setmyvar5] = useState("");
  const [state, setState] = useState({});

  var provider3 = new ethers.providers.Web3Provider(window.ethereum);
  const signer3 = provider3.getSigner();
  var contract = new ethers.Contract(mycontractconnect, Ballot.abi, signer3);

  async function getBalance() {
    console.log("balance accounts");
    var provider = await detectEthereumProvider();
    var web3 = new Web3(provider);
    var myactzero = await web3.eth.getAccounts();
    console.log("your account " + myactzero);
    var mybal = await web3.eth.getBalance(myactzero[0]);
    setmyvar(mybal);
  }

  async function refreshscreen() {
              window.location.reload();
      }

  async function checkvoted(address, acctnum) {
    var mylogger = new ethers.utils.Logger();
    try {
      setmyvar5(await contract.votedstatus(address));
      const name = myvar5;
      var mynum = acctnum;
      // setState({[mynum]:name})
      setState((prevState) => ({ ...prevState, [mynum]: name }));
      window.location.reload();
    } catch (err) {
      console.log("check vote failed " + JSON.stringify(err));
      var twoerror = mylogger.makeError(err);
    }
  }

  var myaccounts = [
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
    "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
    "0xcd3B766CCDd6AE721141F452C550Ca635964ce71",
    "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",
    "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
    "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
    "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
    "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
    "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
    "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
    "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
    "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
    "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  ];

  useEffect(() => {

    async function findout() {
      console.log("success");
      try {
        for (var i = 0; i < myaccounts.length; i++) {
          var myexcept = await contract.checkrighttovote(myaccounts[i]);
          setState((prevState) => ({
            ...prevState,
            [myaccounts[i]]: myexcept,
          }));
        }
      } catch (err) {
        console.log("error");
      }



      try {
        for (var i = 0; i < myaccounts.length; i++) {
          var myexcept = await contract.votedstatus(myaccounts[i]);
          setState((prevState) => ({ ...prevState, ["acct" + [i]]: myexcept }));
        }
      } catch (err) {
        console.log("error");
      }
    }
    findout();
  }, [myvar3]);

  useEffect(() => {
    async function loadAccounts() {
      console.log("logging accounts");
      var provider = await detectEthereumProvider();

      if (provider !== window.ethereum) {
        console.error("Do you have multiple wallets installed?");
        setmyvar(false);
      }

      if (provider) {
        var web3 = new Web3(provider);
        var myactzero = await web3.eth.getAccounts();
        setmyvar2(myactzero);
        setmyvar3(true);
        console.log("metamask account received");
      } else {
        setmyvar2("Please select a crypto wallet to continue");
      }
    }
    loadAccounts();
  }, []);

  function setaccount(acct) {
    console.log("settting account to " + acct);
    setmyvar4(acct);
  }

  return (
    <div className={"mycontainer"}>
      <div className={"maingrid"}>
        <div
          style={{
            gridColumn: "1 / 4",
            gridRow: 1,
            fontSize: "30pt",
            textAlign: "center",
          }}
        >
          <div className={"headbackground"}>Voting Machine</div>
        </div>
        <div id={"connectmetamask"}>
          Your metamask address : {myvar2} <br />
          Balance : {myvar}
        </div>
        {myvar3 && (
          <div id={"metamaskgetbalance"}>
            <Button type="primary" onClick={getBalance}>
              Get Balance
            </Button>
          </div>
        )}
        {!myvar3 && (
          <div style={{ gridRow: 2 }}>
            <Yourweb3modal />
          </div>
        )}
        <div id={"metamaskgetbalance"}><Button type="primary" onClick={()=>refreshscreen()}>
              Refresh
            </Button></div>
        <div style={{ gridColumn: "3", gridRow: 3 }}>
          {myvar3 && (
            <BallotMachine
              state={state}
              contract={mycontractconnect}
              selacct={myvar4}
            />
          )}
        </div>

        {myvar3 && (
          <div className={"acctlist"}>
            {" "}
            <h1>Sandbox of Accounts</h1>
            <div style={{ fontStyle: "oblique", border: "12px solid red" }}>
              Set Account {myvar4}
            </div>
			  <div id={'checkexplain'}>
            <div>
              <img src={MyImage} /> means account has right to vote
            </div>
            <div>
              <img width='10%' src={RedCheck} /> means account has voted
            </div>
                </div>
            <hr />
            <div>
              <div className={"header-grid-item"}>
                <div style={{ gridColumn: "1/3" }}>Click to change</div>
                <div>Has Right to Vote</div>
                <div>Voted?</div>
              </div>
              {myaccounts.map((object, i) => {
                return (
                  <div className={"test-numbers-grid-item"} key={i}>
                    <div
                      className={"acctnumbercss"}
                      onClick={() => setaccount(object)}
                    >
                      {object}
                    </div>
                    <div className={"checkvotedcss"}>
                      {state[object] == "Has Right" ? (
                        <img
                          src={MyImage}
                          alt=""
                          style={{ height: "30px", width: "auto" }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className={"checkrightscss"}
                      onClick={() => checkvoted(object, i)}
                    >
                      {state["acct" + i] == "voted" ? (
                        <div>
                          <img
                            className={"checkmarksize"}
                            src={RedCheck}
                            alt=""
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.ethereum &&
  window.ethereum.on("chainChanged", (chainId) => {
    window.location.reload();
  });

window.ethereum &&
  window.ethereum.on("accountsChanged", (accounts) => {
    window.location.reload();
  });

window.ethereum &&
  window.ethereum.on("connect", (accounts) => {
    console.log("ethereum on has connected");
    window.location.reload();
  });

export default App;
