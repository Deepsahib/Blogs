import React, { useState } from "react";
import { resetPasswordService } from "../../services/userService.js";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setemail] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const response = await resetPasswordService(email);
      console.log("response", response.message);
      toast.success(response.data.message);
    } catch (error) {
      console.log("error is ",error)
      console.dir("error is ",error)
      toast.error(error.response.data.error);
    }
  }

  return (
    <div>
      Please enter your email for verification
      <form onSubmit={handleSubmit} action="" method="get">
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          type="email"
          placeholder="Please enter your email here for verification"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
