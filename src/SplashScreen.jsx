import React from "react";

export default function SplashScreen() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "#111",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
      }}
    >
      <div
        style={{
          fontSize: "70px",
          marginBottom: "20px",
        }}
      >
        📰
      </div>

      <h1
        style={{
          color: "#d60000",
          fontSize: "38px",
          fontWeight: "bold",
          margin: 0,
        }}
      >
        FlashNews24
      </h1>

      <p
        style={{
          color: "#bbb",
          marginTop: "12px",
          fontSize: "16px",
          textAlign: "center",
        }}
      >
        Breaking News • World • India
        <br />
        Politics • Technology • Sports
        Version 1.0.0
© FlashNews24
      </p>

      <div
        style={{
          width: "220px",
          height: "6px",
          background: "#333",
          borderRadius: "50px",
          overflow: "hidden",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#d60000",
            animation: "loading 2s linear infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes loading {
          0% {transform: translateX(-100%);}
          100% {transform: translateX(100%);}
        }
      `}</style>
    </div>
  );
}
