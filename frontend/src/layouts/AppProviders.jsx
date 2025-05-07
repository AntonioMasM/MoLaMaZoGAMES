// src/layouts/AppProviders.jsx
import { AuthProvider } from "@/features/auth";
import { UserProvider, AlertQueueProvider, ModalProvider } from "@/context";
import ModalRenderer from "@/components/Modals/ModalRenderer";

const providers = [
  UserProvider,
  AuthProvider,
  AlertQueueProvider,
  ModalProvider,
];

export default function AppProviders({ children }) {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    <>
      {children}
      <ModalRenderer />
    </>
  );
}
