import Banner from "@leafygreen-ui/banner";
import { ChatInput } from "./TextInput";
import { Message, MessageData } from "./Message";

import styles from "./Chat.module.css";

const messages = [
  {
    id: "1",
    text: "What is the best flavor of ice cream?",
    sender: {
      id: "asdf",
      type: "user",
    },
  },
  {
    id: "2",
    text: `As an AI, I don't have personal preferences, but I can tell you that the "best" flavor of ice cream is subjective and varies depending on individual tastes. Some popular flavors include vanilla, chocolate, strawberry, mint chocolate chip, cookies and cream, and many more. Ultimately, the best flavor of ice cream is the one that you enjoy the most!`,
    sender: {
      id: "asdf",
      type: "assistant",
    },
  },
  {
    id: "3",
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    sender: {
      id: "asdf",
      type: "user",
    },
  },
] satisfies MessageData[];

export function Chat() {
  return (
    <div className={styles.chat}>
      <div className={styles.message_list}>
        {
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        }
      </div>
      <Banner>
        This is an experimental AI chatbot. All information should be verified
        prior to use.
      </Banner>
      <ChatInput />
    </div>
  );
}
