import Icon from "@leafygreen-ui/icon";
import { Body } from "@leafygreen-ui/typography";
import styles from "./Message.module.css";

function Avatar() {
  return (
    <div className={styles.message_avatar}>
      <Icon className={styles.message_avatar_icon} glyph="Person" />
    </div>
  );
}

export type MessageData = {
  id: string;
  text: string;
  sender: {
    id: string;
    type: "user" | "assistant" | "system";
  };
};

export function Message({ message }: { message: MessageData }) {
  return (
    <div className={styles.message}>
      <Avatar />
      <Body className={styles.message_text}>{message.text}</Body>
    </div>
  );
}
