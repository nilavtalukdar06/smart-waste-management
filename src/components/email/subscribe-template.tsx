import * as React from "react";

interface EmailTemplateProps {
  userEmail: string;
}

export function SubscribeTemplate({ userEmail }: EmailTemplateProps) {
  return (
    <div>
      <p>Hi Nilav, {userEmail} has subscribed to Eco Swachh</p>
    </div>
  );
}
