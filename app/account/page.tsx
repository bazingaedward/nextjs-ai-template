import { AccountClient } from "./AccountClient";

export default async function AccountPage() {
  // TODO: Implement auth and subscription fetching using Next.js patterns
  // For now, we'll use mock data or nulls to allow the page to render
  const user = { email: "user@example.com", user_metadata: { name: "User" } };
  const subscription = null;

  return <AccountClient user={user} subscription={subscription} />;
}
