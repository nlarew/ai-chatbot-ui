import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import ChatbotModal from "./Modal";

function App() {
  return (
    <>
      <ChatbotModal />
    </>
  );
}

export default function LGApp() {
  return (
    <LeafyGreenProvider>
      <App />
    </LeafyGreenProvider>
  );
}
