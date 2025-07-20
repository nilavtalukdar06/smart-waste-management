"use client";

import { useChat, type UseChatOptions } from "@ai-sdk/react";

import { cn } from "@/lib/utils";
import { Chat } from "@/components/ui/chat";

type ChatDemoProps = {
  initialMessages?: UseChatOptions["initialMessages"];
};

export default function AiChat(props: ChatDemoProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    status,
    setMessages,
  } = useChat({
    ...props,
    api: "/api/chat",
  });

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className={cn("flex", "flex-col", "h-full", "w-full", "p-5 sm:p-10")}>
      <Chat
        className="grow"
        messages={messages}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={isLoading}
        stop={stop}
        append={append}
        setMessages={setMessages}
        suggestions={[
          "What is the weather in San Francisco?",
          "Explain step-by-step how to solve this math problem: If x² + 6x + 9 = 25, what is x?",
          "Design a simple algorithm to find the longest palindrome in a string.",
        ]}
      />
    </div>
  );
}
