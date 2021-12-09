import { Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"

const GoogleSignin = () => {
  const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false)
  const [user, setUser] = useState(undefined)

  const initializeGsi = () => {
    // Typescript will complain about window.google
    // Add types to your `react-app-env.d.ts` or //@ts-ignore it.
    if (!window.google || gsiScriptLoaded) return

    setGsiScriptLoaded(true)
    window.google.accounts.id.initialize({
      client_id: process.env.GOOGLE_CLIENT_ID,
      callback: handleGoogleSignIn,
    })
  }

  useEffect(() => {
    if (user?._id || gsiScriptLoaded) return

    // const initializeGsi = () => {
    //   // Typescript will complain about window.google
    //   // Add types to your `react-app-env.d.ts` or //@ts-ignore it.
    //   if (!window.google || gsiScriptLoaded) return

    //   setGsiScriptLoaded(true)
    //   window.google.accounts.id.initialize({
    //     client_id: GOOGLE_CLIENT_ID,
    //     callback: handleGoogleSignIn,
    //   })
    // }

    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.onload = initializeGsi
    script.async = true
    script.id = "google-client-script"
    document.querySelector("body")?.appendChild(script)

    return () => {
      // Cleanup function that runs when component unmounts
      window.google?.accounts.id.cancel()
      document.getElementById("google-client-script")?.remove()
    }
  }, [handleGoogleSignIn, initializeGsi, user?._id])




  const handleGoogleSignIn = (res) => {
    if (!res.clientId || !res.credential) return setUser(val.data?.login.user)
      // Implement your login mutations and logic here.
      // Set cookies, call your backend, etc. 
  }

  return (
    <div>
      <button className={"g_id_signin"} />
    </div>
  )

}

export default GoogleSignin;