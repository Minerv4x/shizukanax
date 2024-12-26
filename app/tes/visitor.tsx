"use client"
import { useEffect } from "react";
import { database, ref, set } from "../../firebaseConfig";

export default function Page() {
    useEffect(() => {
        const userRef = ref(database, `visitors/${Date.now()}`);
        set(userRef, { active: true })
            .then(() => {
                console.log("User visitor data written successfully.");
            })
            .catch((error) => {
                console.error("Error writing user visitor data: ", error);
            });

        return () => set(userRef, null); // Optional cleanup
    }, []);

    return <div>Your Page Content</div>;
}
