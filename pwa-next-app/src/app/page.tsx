
"use client"

import { useEffect, useState } from "react";

export default function Home() {

  const [secondsLeft, setSecondsLeft] = useState(15);
  const [mounted, set_mounted] =useState(false)

  useEffect(() => {
    set_mounted(true)
   if(mounted){
    const timer =  setTimeout(() => {
      if(secondsLeft > 0){
        alert("time out")
      }else {
        setSecondsLeft((prev) => prev - 1 )
      }
      return () => {
        clearTimeout(timer)
      }
    }, 1000)
   }

  },[ secondsLeft])

  return (
    <main className="">
      <h1>hELLO {secondsLeft} </h1>
    </main>
  );
}
