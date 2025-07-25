import { supabase } from "./supabase.js";

export async function checkAuth() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    location.href = "login.html";
  }

  console.log("user", user);
}

export async function logout() {
  if (confirm("Are you sure you want to logout?")) {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error);
    }

    location.href = "login.html";
  }
}
