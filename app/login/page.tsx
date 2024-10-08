"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Stack, Button, styled } from "@mui/material";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import loadingAnimation from "@/public/assets/loading.json";

const GoogleButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  display: "flex",
  alignItems: "center",
  backgroundColor: "white",
  color: "rgba(0, 0, 0, 0.54)",
  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)",
  padding: "10px 15px",
  borderRadius: "20px",
  border: "1px solid #dadce0",
  fontSize: "14px",
  fontWeight: 500,
  fontFamily: "Roboto, sans-serif",
  "&:hover": {
    backgroundColor: "#f5f5f5",
    boxShadow:
      "0px 2px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12)",
  },
}));

const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
    <path fill="none" d="M0 0h48v48H0z" />
  </svg>
);

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/today");
    }
  }, [status, router]);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signIn("google", { callbackUrl: "/today" });
    } catch (error) {
      console.error("Sign in error:", error);
      setIsSigningIn(false);
    }
  };

  if (status === "loading" || isSigningIn) {
    return <LoadingAnimation animationData={loadingAnimation} />;
  }

  return (
    <Stack justifyContent="center" alignItems="center" height="100vh">
      <GoogleButton
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={handleSignIn}
        disabled={isSigningIn}
      >
        Sign in with Google
      </GoogleButton>
    </Stack>
  );
}
