import Icon from "@leafygreen-ui/icon";
import { Body } from "@leafygreen-ui/typography";
import styles from "./Message.module.css";

export type SenderType = "user" | "assistant" | "system";

export type MessageData = {
  id: string;
  text: string;
  sender: {
    id: string;
    type: SenderType;
  };
};

function Avatar({ type }: { type: SenderType }) {
  const className = {
    user: `${styles.message_avatar} ${styles.message_avatar_user}`,
    assistant: `${styles.message_avatar} ${styles.message_avatar_assistant}`,
    system: `${styles.message_avatar} ${styles.message_avatar_system}`,
  }[type];

  const glyph = {
    user: "Person",
    assistant: "Wizard",
    system: "Settings",
  }[type];

  const color = {
    user: "#000000",
    assistant: "#00ff00",
    system: "#ff0000",
  }[type];

  return (
    <div className={className}>
      <Icon
        className={styles.message_avatar_icon}
        glyph={glyph}
        color={color}
      />
    </div>
  );
}

export function Message({ message }: { message: MessageData }) {
  return (
    <div className={styles.message}>
      <Avatar type={message.sender.type} />
      <Body className={styles.message_text}>{message.text}</Body>
    </div>
  );
}
