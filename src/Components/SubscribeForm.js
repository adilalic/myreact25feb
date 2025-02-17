import { useState } from "react";
import Swal from 'sweetalert2'

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      // Step 1: Check if email already exists in API
      const checkResponse = await fetch("https://adilapp-18198216f43b.herokuapp.com/api/subscribers");
      const checkData = await checkResponse.json();

      const existingSubscriber = checkData.data.find((subscriber) => subscriber.Email === email);
      if (existingSubscriber) {

        Swal.fire({
            title: "Already Subscribed",
            text: "",
            icon: "question"
          });

        setMessage("This email is already subscribed. ❌");
        return;
      }

      // Step 2: If email doesn't exist, submit it
      const response = await fetch("https://adilapp-18198216f43b.herokuapp.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { Email: email }, // Send email in the expected format
        }),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {

        Swal.fire({
            title: "Good job!",
            text: "Subscribed Successfully",
            icon: "success"
          });


        setMessage("Subscription successful! ✅");
        setEmail(""); // Clear input after successful submission
      } else {
        setMessage("Failed to subscribe. ❌");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>SUBSCRIBE TO OUR NEWSLETTER</h2>
      <div className="input-group">
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <span className="input-group-btn">
          <button className="btn" type="submit">Subscribe Now</button>
        </span>
      </div>
      {message && <p>{message}</p>} {/* Display success or error message */}
    </form>
  );
};

export default SubscribeForm;
