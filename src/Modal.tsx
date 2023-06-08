import Card from "@leafygreen-ui/card";
import Badge from "@leafygreen-ui/badge";
import { H3 } from "@leafygreen-ui/typography";

import { Chat } from "./Chat";

import styles from "./Modal.module.css";

export default function ChatbotModal() {
  return (
    <Card className={styles.modal}>
      <div className={styles.modal_title}>
        <H3>MongoDB AI</H3>
        <Badge variant="green">Experimental</Badge>
      </div>
      <Chat />
    </Card>
  );
}
