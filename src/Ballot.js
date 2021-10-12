import React, { useState } from "react";
import { ethers } from "ethers";
import { Button, Radio } from "antd";
import "antd/dist/antd.css";
import Ballot from "./artifacts/contracts/Ballot.sol/Ballot.json";
import toastr from "toastr";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function MyBallot(props) {
  const [myvar4, setmyvar4] = useState("");
  const [myvar7, setmyvar7] = useState("");
  const [myvar8, setmyvar8] = useState("");
  const [myvar9, setmyvar9] = useState([]);
  const [myvar10, setmyvar10] = useState([]);
  const [myvar11, setmyvar11] = useState([]);
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");

  console.log("contract connect " + props.contract);
  console.log("selected account " + props.selacct);

  try {
    var provider2 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider2.getSigner();

    var contract = new ethers.Contract(props.contract, Ballot.abi, signer);
    console.log("getting contract info");
  } catch (err) {
    console.log("failed " + err);
    toastr.error(err);
  }

  async function dovote(event) {
    console.log("your proposal number " + event);
    var provider3 = new ethers.providers.Web3Provider(window.ethereum);
    const signer3 = provider3.getSigner();
    console.log("getting contract info");
    var contract = new ethers.Contract(props.contract, Ballot.abi, signer3);
    var mylogger = new ethers.utils.Logger();
    try {
      await contract.vote(event);
      toastr.success("You successfully Voted");
    } catch (err) {
      console.log("voting failed " + JSON.stringify(err));
      var twoerror = mylogger.makeError(err);
      console.log(twoerror);
      console.log(err.data.message);
      toastr.error("ERRROR " + err.data.message);
      // mylogger.throwError();
    }
  }

  async function votedifferent(event) {
    console.log("voting different " + event);
    if (document.getElementById("propnum").value !== "") {
      console.log(
        "propnum doesnt equal null " + document.getElementById("propnum").value
      );
      var mylogger = new ethers.utils.Logger();
      try {
        await contract.othervote(event, props.selacct);
        toastr.success("You successfully Voted");
      } catch (err) {
        console.log("voting failed " + err);
        try {
          toastr.error("voting failed " + err.data.message);
        } catch (err) {
          console.log("no error message");
        }
      }
    } else {
      toastr.error("please enter a proposal number");
    }
  }

  async function getwinning() {
    try {
      setmyvar4(await contract.winningProposal());
      console.log("great winning proposal " + myvar4);
    } catch (err) {
      console.log("epic fail");
      toastr.error("Blockchain error " + err)
    }
  }

  async function resetVoting() {
    console.log("resetting accounts ");
    try {
      await contract.resetVoting();
      window.location.reload();
      toastr.info("Voting Reset");
    } catch (err) {
      console.log("epic fail " + JSON.stringify(err));
      toastr.error("ERROR " + err);
    }
  }

  async function tallyVoting() {
    try {
      setmyvar9(await contract.tallyVoting());
      toastr.info("TALLY RESULTS " + myvar9);
    } catch (err) {
      console.log("epic fail " + JSON.stringify(err));
      var tallyerror = ethers.logger.makeError(err);
      toastr.error("ERROR " + tallyerror);
    }
  }

  async function testVoted() {
    try {
      if (props.selacct) {
        var myreturnvar2 = await contract.votedstatus(props.selacct);
        toastr.info(myreturnvar2);
      } else {
        toastr.error("Please select an account");
      }
      console.log("test return  " + myreturnvar2);
    } catch (err) {
      toastr.error("ERROR " + err);
    }
  }

  async function winnername() {
    try {
      setmyvar7(await contract.winnerName());
      console.log("great winning proposal " + myvar7);
    } catch (err) {
      console.log("epic fail");
    }
  }

  async function delegate() {
    if (props.state[props.selacct] == "Has Right") {
      try {
        setmyvar11(await contract.delegate(props.selacct, myvar8));
        toastr.success("You delegated to " + myvar8);
      } catch (err) {
        console.log("epic fail");
        toastr.error("ERROR " + err.data.message);
      }
    } else {
      toastr.error("Must first give right to vote");
    }
  }

  async function giveRightToVote() {
    try {
      await contract.giveRightToVote(props.selacct);
      toastr.info("Gave Right to Vote");
      console.log("gave right to vote on proposal ");
    } catch (err) {
      console.log("epic fail " + err);
      toastr.error("ERROR " + err.data.message);
    }
  }

  var myChangeHandler = (event) => {
    console.log("your metamask prop " + event);
    if (event == 0 || event == 1) {
      try {
        dovote(event);
      } catch (err) {
        toastr.error(err.data.message);
      }
    } else {
      toastr.error("please enter a proposal number");
    }
  };

  var getdelegate = (event) => {
    console.log("delegate to vote thing " + event.target.value);
    // giveRightToVote(event.target.value);
    setmyvar8(event.target.value);
  };

  console.log("props " + JSON.stringify(props));

  return (
    <div className="App">
      <div className={"proposalscss"}>
        <h2>Proposals:</h2>
        <li>
          <h3>0. Solidity is the Best Crypto language</h3>
          "0x6c10000000000000000000000000000000000000000000000000000000000000",
        </li>
        <li>
          <h3>1. Learning Other languages is Best</h3>
          "0x6c20000000000000000000000000000000000000000000000000000000000000",
        </li>
      </div>

      <div id={"yourmetamask"}>
        <h2>Vote Using your MetaMask </h2>
        <Radio.Group
          onChange={(e) => setInput2(e.target.value)}
          id={"propnum"}
          value={input2}
        >
          <Radio value={0}>A</Radio>
          <Radio value={1}>B</Radio>
        </Radio.Group>
        <Button type="primary" onClick={() => myChangeHandler(input2)}>
          Vote
        </Button>
      </div>
      <div id={"othervoting"}>
        <h1>Choose(Click) a different address on the Left to keep voting </h1>
        <h2>You are voting as : {props.selacct} </h2>
        <Button type="primary" onClick={giveRightToVote}>
          GiveRightToVote
        </Button>
        <br />
        <Radio.Group onChange={(e) => setInput(e.target.value)} value={input}>
          <Radio value={0}>0</Radio>
          <Radio value={1}>1</Radio>
        </Radio.Group>
        <Button type="primary" onClick={() => votedifferent(input)}>
          Vote{" "}
        </Button>
        <br />
        <input type={"text"} placeholder={"address"} onChange={getdelegate} />
        <Button type="primary" onClick={() => delegate()}>
          Delegate
        </Button>
        <br />
        <Button type="primary" onClick={() => testVoted()}>
          Check if Address Voted
        </Button>
      </div>

      <div id={"votingresults"}>
        <h1>Voting Results</h1>
        <Button type="primary" onClick={getwinning}>
          Get Winning:{myvar4.toString()}
        </Button>
        <br />
        <Button type="primary" onClick={winnername}>
          Get Winning Proposal Address
        </Button>
        <h3>
          <div style={{ fontSize: 12 }}>{myvar7}</div>
        </h3>
        <Button type="primary" onClick={resetVoting}>
          Reset Voting
        </Button>
        <Button type="primary" onClick={tallyVoting}>
          Tally Voting {myvar10}
        </Button>
      </div>
    </div>
  );
}

export default MyBallot;
