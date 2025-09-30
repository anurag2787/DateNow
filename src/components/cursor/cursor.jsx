import { useEffect } from "react";

function Cursor() {
  useEffect(() => {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");

    const colors = [
      "#ffb56b",
      "#fdaf69",
      "#f89d63",
      "#f59761",
      "#ef865e",
      "#ec805d",
      "#e36e5c",
      "#df685c",
      "#d5585c",
      "#d1525c",
      "#c5415d",
      "#c03b5d",
      "#b22c5e",
      "#ac265e",
      "#9c155f",
      "#950f5f",
      "#830060",
      "#7c0060",
      "#680060",
      "#60005f",
      "#48005f",
      "#3d005e",
    ];

    // Assign colors to circles
    circles.forEach((circle, index) => {
      circle.style.backgroundColor = colors[index % colors.length];
      circle.x = 0;
      circle.y = 0;
    });

    // Track mouse movement
    const handleMouseMove = (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    };


    const animateCircles = () => {
      let x = coords.x;
      let y = coords.y;

      circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.scale = (circles.length - index + 3) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
    };

    // Add event listener and start animation
    window.addEventListener("mousemove", handleMouseMove);
    animateCircles();
  }, []);

  return (
    <>
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="cur hidden lg:block circle h-6 w-6 fixed pointer-events-none rounded-full z-[99999999]"
          ></div>
        ))}
    </>
  );
}

export default Cursor;
