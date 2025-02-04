import React from "react";

const ThreeBodyLoader = ({ size = 35, speed = 0.8, color = "#5D3FD3" }) => {
  const styles = {
    threeBody: {
      "--uib-size": `${size}px`,
      "--uib-speed": `${speed}s`,
      "--uib-color": color,
      position: "relative",
      display: "inline-block",
      height: "var(--uib-size)",
      width: "var(--uib-size)",
      animation: "spin78236 calc(var(--uib-speed) * 2.5) infinite linear",
    },
    dot: {
      position: "absolute",
      height: "100%",
      width: "30%",
    },
    dotAfter: {
      content: '""',
      position: "absolute",
      height: "0%",
      width: "100%",
      paddingBottom: "100%",
      backgroundColor: "var(--uib-color)",
      borderRadius: "50%",
    },
    dot1: {
      bottom: "5%",
      left: "0",
      transform: "rotate(60deg)",
      transformOrigin: "50% 85%",
    },
    dot1After: {
      bottom: "0",
      left: "0",
      animation: "wobble1 var(--uib-speed) infinite ease-in-out",
      animationDelay: "calc(var(--uib-speed) * -0.3)",
    },
    dot2: {
      bottom: "5%",
      right: "0",
      transform: "rotate(-60deg)",
      transformOrigin: "50% 85%",
    },
    dot2After: {
      bottom: "0",
      left: "0",
      animation:
        "wobble1 var(--uib-speed) infinite calc(var(--uib-speed) * -0.15) ease-in-out",
    },
    dot3: {
      bottom: "-5%",
      left: "0",
      transform: "translateX(116.666%)",
    },
    dot3After: {
      top: "0",
      left: "0",
      animation: "wobble2 var(--uib-speed) infinite ease-in-out",
    },
    "@keyframes spin78236": {
      "0%": {
        transform: "rotate(0deg)",
      },
      "100%": {
        transform: "rotate(360deg)",
      },
    },
    "@keyframes wobble1": {
      "0%, 100%": {
        transform: "translateY(0%) scale(1)",
        opacity: 1,
      },
      "50%": {
        transform: "translateY(-66%) scale(0.65)",
        opacity: 0.8,
      },
    },
    "@keyframes wobble2": {
      "0%, 100%": {
        transform: "translateY(0%) scale(1)",
        opacity: 1,
      },
      "50%": {
        transform: "translateY(66%) scale(0.65)",
        opacity: 0.8,
      },
    },
  };

  return (
    <div style={{ ...styles.threeBody }}>
      <style>
        {`
          @keyframes spin78236 {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes wobble1 {
            0%, 100% {
              transform: translateY(0%) scale(1);
              opacity: 1;
            }
            50% {
              transform: translateY(-66%) scale(0.65);
              opacity: 0.8;
            }
          }
          @keyframes wobble2 {
            0%, 100% {
              transform: translateY(0%) scale(1);
              opacity: 1;
            }
            50% {
              transform: translateY(66%) scale(0.65);
              opacity: 0.8;
            }
          }
        `}
      </style>
      <div style={{ ...styles.dot, ...styles.dot1 }}>
        <div style={{ ...styles.dotAfter, ...styles.dot1After }} />
      </div>
      <div style={{ ...styles.dot, ...styles.dot2 }}>
        <div style={{ ...styles.dotAfter, ...styles.dot2After }} />
      </div>
      <div style={{ ...styles.dot, ...styles.dot3 }}>
        <div style={{ ...styles.dotAfter, ...styles.dot3After }} />
      </div>
    </div>
  );
};

export default ThreeBodyLoader;
