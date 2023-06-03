"use client"

export default function LoginForm() {
  const onLogin = () => {
    fetch("/api/sessions", {
      method: "POST"
    }).then((res) => res.json())
    .then((json) => {
      console.log(json)
    })
  }
  return (
    <>
      <button className="pointer bg-slate-800 py-3 px-5" onClick={onLogin}>Login</button>
    </>
  )
}
