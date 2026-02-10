//PROFILE PAGE
export async function fetchUser(id: string) {
  const res = await fetch(`/api/users/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}
