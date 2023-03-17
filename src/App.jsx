import { useState } from "react";
import validator from "validator";
import axios from "axios";
import "./css/App.css";

const server = axios.create({
  baseURL: "http://thepwnexperts.com:3002/",
});

const App = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [otpGenerated, setOtpGenerated] = useState(false);

  const submit = async () => {
    if (!validator.isEmail(email)) {
      return;
    }

    try {
      const res = await server.post("/otp", { to: email });
      if (res.status != 200) {
        console.log("Some problem occured while sending OTP: \n", res);
      }
      setOtpGenerated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h1>OTP Validation</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          className={!validEmail ? "wrongInput" : ""}
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validator.isEmail(email)
              ? setValidEmail(true)
              : setValidEmail(false);
          }}
          required
        />
        {otpGenerated && (
          <input
            type="password"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            required
          />
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
