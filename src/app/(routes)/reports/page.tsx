"use client";
import Pusher from "pusher-js";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Reports() {
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    const channel = pusher.subscribe("waste-channel");
    channel.bind("waste-reported", (data: any) => {
      toast(data.message, { icon: "😁" }) || "New waste reported";
    });

    return function () {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  return (
    <section>
      <h2>Reports</h2>
    </section>
  );
}
