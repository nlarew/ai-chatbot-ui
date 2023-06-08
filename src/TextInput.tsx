import TextInput, { TextInputProps } from "@leafygreen-ui/text-input";
import Icon, { glyphs } from "@leafygreen-ui/icon";

import styles from "./TextInput.module.css";

type IconInputProps = Omit<TextInputProps, "sizeVariant" | "state"> & {
  glyph: keyof typeof glyphs;
};

export function IconInput({ glyph, ...props }: IconInputProps) {
  if (!props["aria-label"]) {
    console.warn("IconInput requires an aria-label prop");
  }
  return (
    <div className={styles.input_wrapper}>
      <TextInput
        {...props}
        className={styles.input_field}
        aria-label={props["aria-label"] ?? ""}
        sizeVariant="small"
        state="none"
      />
      <Icon className={styles.input_icon} glyph={glyph} />
    </div>
  );
}

export function ChatInput() {
  return (
    <IconInput
      glyph="SMS"
      aria-label="MongoDB AI Chatbot Message Input"
      placeholder={`Type a message or type "/" to select a prompt`}
    />
  );
}

export function WizardInput() {
  return (
    <IconInput
      glyph="Wizard"
      aria-label="MongoDB AI Chatbot Message Input"
      placeholder="Ask MongoDB AI a Question"
    />
  );
}
