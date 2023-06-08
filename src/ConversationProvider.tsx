import { createContext, useContext, useReducer, useCallback } from "react";
import { MessageData, SenderType, createMessage } from "./Message";

type ConversationState = {
  messages: MessageData[];
};

type ConversationAction =
  | { type: "addMessage"; sender: SenderType; text: string }
  | { type: "modifyMessage"; messageId: MessageData["id"]; text: string }
  | { type: "deleteMessage"; messageId: MessageData["id"] };

function conversationReducer(
  state: ConversationState,
  action: ConversationAction
) {
  switch (action.type) {
    case "addMessage": {
      return {
        ...state,
        messages: [
          ...state.messages,
          createMessage(action.sender, action.text),
        ],
      };
    }
    case "modifyMessage": {
      const messageIndex = state.messages.findIndex(
        (message) => message.id === action.messageId
      );
      if (messageIndex === -1) {
        console.error(`Message(${action.messageId}) not found in state`);
        return state;
      }
      return {
        ...state,
        messages: [
          ...state.messages.slice(0, messageIndex),
          { ...state.messages[messageIndex], text: action.text },
          ...state.messages.slice(messageIndex + 1),
        ],
      };
    }
    case "deleteMessage": {
      const messageIndex = state.messages.findIndex(
        (message) => message.id === action.messageId
      );
      if (messageIndex === -1) {
        console.error(`Message(${action.messageId}) not found in state`);
        return state;
      }
      return {
        ...state,
        messages: [
          ...state.messages.slice(0, messageIndex),
          ...state.messages.slice(messageIndex + 1),
        ],
      };
    }
    default: {
      console.error("Unhandled action", action);
      throw new Error(`Unhandled action type`);
    }
  }
}

const messages = [
  {
    id: "1",
    text: "What is the best flavor of ice cream dog?",
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

const defaultState = {
  messages,
} satisfies ConversationState;

type ConversationProviderValue = ConversationState & {
  addMessage: (sender: SenderType, text: string) => void;
  modifyMessage: (messageId: string, text: string) => void;
  deleteMessage: (messageId: string) => void;
};

export const ConversationContext = createContext<ConversationProviderValue>({
  ...defaultState,
  addMessage: () => {
    return null;
  },
  modifyMessage: () => {
    return null;
  },
  deleteMessage: () => {
    return null;
  },
});

export default function ConversationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(conversationReducer, defaultState);

  const addMessage = useCallback((sender: SenderType, text: string) => {
    dispatch({ type: "addMessage", sender, text });
  }, []);

  const modifyMessage = useCallback((messageId: string, text: string) => {
    dispatch({ type: "modifyMessage", messageId, text });
  }, []);

  const deleteMessage = useCallback((messageId: string) => {
    dispatch({ type: "deleteMessage", messageId });
  }, []);

  const providerValue = {
    ...state,
    addMessage,
    modifyMessage,
    deleteMessage,
  } satisfies ConversationProviderValue;

  return (
    <ConversationContext.Provider value={providerValue}>
      {children}
    </ConversationContext.Provider>
  );
}
