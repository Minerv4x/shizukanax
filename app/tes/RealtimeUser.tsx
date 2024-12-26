"use client"
import { useEffect, useState } from "react";
import { database, ref, onValue } from "../../firebaseConfig";

export default function RealtimeUsers() {
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const usersRef = ref(database, "visitors");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      setActiveUsers(data ? Object.keys(data).length : 0);
    });
  }, []);

  return <div>Active Users: {activeUsers}</div>;
}
