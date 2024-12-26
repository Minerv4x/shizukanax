"use client"
import { useEffect, useState } from "react";
import { database, ref, set, onValue, get, runTransaction } from "../../firebaseConfig";

export default function Page() {
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const visitorsRef = ref(database, "activeUsers"); // Reference to the active users count in the database
    const userRef = ref(database, `visitors/${Date.now()}`); // Unique reference for each visitor

    // Fetch the current active users count from Firebase when the page loads
    const getInitialCount = async () => {
      const snapshot = await get(visitorsRef);
      if (snapshot.exists()) {
        setActiveUsers(snapshot.val()); // Set the initial active user count
      }
    };

    getInitialCount(); // Call to fetch the initial active user count

    // Increment active users count if this is the user's first visit in this session
    if (!sessionStorage.getItem('userVisited')) {
      // Mark the user as visited to prevent counting them on refresh
      sessionStorage.setItem('userVisited', 'true');

      // Set user data for this session
      set(userRef, { active: true })
        .then(() => {
          // Increment the active users count using a transaction
          runTransaction(visitorsRef, (currentCount) => {
            return (currentCount || 0) + 1; // Safely increment count
          }).then(() => {
            // After increment, update the active users in the state
            getInitialCount(); // Re-fetch to update the state
          }).catch((error) => console.error("Error updating active users:", error));
        })
        .catch((error) => console.error("Error writing user data:", error));
    }

    // Cleanup when the user leaves (decrement active user count)
    return () => {
      set(userRef, null); // Remove user data when leaving

      // Decrement the active users count
      runTransaction(visitorsRef, (currentCount) => {
        return (currentCount && currentCount > 0) ? currentCount - 1 : 0; // Decrement count safely
      }).then(() => {
        // After decrement, update the active users in the state
        getInitialCount(); // Re-fetch to update the state
      }).catch((error) => console.error("Error decrementing active users:", error));
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <h1>Active Users: {activeUsers}</h1>
      <p>Your Page Content</p>
    </div>
  );
}
