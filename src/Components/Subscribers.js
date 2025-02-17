import './Subscribers.css';
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editEmail, setEditEmail] = useState(""); // Holds edited email
  const [editingId, setEditingId] = useState(null); // Stores ID of subscriber being edited

  // Fetch Subscribers from API
  const fetchSubscribers = () => {
    fetch("https://adilapp-18198216f43b.herokuapp.com/api/subscribers")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setSubscribers(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Delete Subscriber
  const handleDelete = async (documentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Sending DELETE request to the API
          const response = await fetch(`https://adilapp-18198216f43b.herokuapp.com/api/subscribers/${documentId}`, {
            method: "DELETE",
          });
  
          if (response.ok) {
            // Show success message
            Swal.fire({
              title: "Deleted!",
              text: "Your subscriber has been deleted.",
              icon: "success",
            });
  
            // Update the subscribers list by filtering out the deleted subscriber
            setSubscribers(subscribers.filter((subscriber) => subscriber.documentId !== documentId));
          } else {
            // If something goes wrong with the delete request
            Swal.fire({
              title: "Error!",
              text: "There was a problem deleting the subscriber.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting subscriber:", error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  // Start Editing
  const handleEdit = (subscriber) => {
    setEditingId(subscriber.documentId);
    setEditEmail(subscriber.Email);
  };

  // Save Edited Email
  const handleSave = async () => {
    try {
      const response = await fetch(`https://adilapp-18198216f43b.herokuapp.com/api/subscribers/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { Email: editEmail } }),
      });

      if (response.ok) {
        setSubscribers(
          subscribers.map((subscriber) =>
            subscriber.documentId === editingId ? { ...subscriber, Email: editEmail } : subscriber
          )
        );
        setEditingId(null); // Exit edit mode
      } else {
        console.error("Failed to update subscriber");
      }
    } catch (error) {
      console.error("Error updating subscriber:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="subscribers-container">
    <h2 className="subscribers-title">Subscribers</h2>
    <p className="total-count">Total Subscribers: {subscribers.length}</p> {/* Show total count */}

    <ol className="subscribers-list">
      {subscribers.map((subscriber) => (
        <li key={subscriber.documentId} className="subscriber-item">
          {editingId === subscriber.documentId ? (
            <div className="edit-mode">
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="email-input"
              />
              <button onClick={handleSave} className="save-btn">Save</button>
              <button onClick={() => setEditingId(null)} className="cancel-btn">Cancel</button>
            </div>
          ) : (
            <div className="view-mode">
              <span className="subscriber-email">{subscriber.Email}</span>
              <button onClick={() => handleEdit(subscriber)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(subscriber.documentId)} className="delete-btn">Delete</button>
            </div>
          )}
        </li>
      ))}
    </ol>
  </div>
  );
};

export default Subscribers;
