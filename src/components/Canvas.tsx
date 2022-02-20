import React, { useState } from 'react';


const Canvas = () => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  const [curPos, setCurPos] = useState([0, 0]);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const curX = e.clientX - canvas.offsetLeft;
    const curY = e.clientY - canvas.offsetTop
    setCurPos([curX, curY]);
    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = 'black';
      ctx.fillRect(curX, curY, 2, 2);
      ctx.closePath();
    }
  };

  const draw = (prevX: number, prevY: number, curX: number, curY: number) => {
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(curX, curY);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
    }
  }

  const moveMouse = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    const [prevX, prevY] = curPos;
    const curX = e.clientX - canvas.offsetLeft;
    const curY = e.clientY - canvas.offsetTop;
    setCurPos([curX, curY]);
    draw(prevX, prevY, curX, curY);
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons === 1) {
      setCurPos([e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop]);
      setIsDrawing(true);
    }
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);
    if (e.buttons === 1) {
      const [prevX, prevY] = curPos;
      const curX = e.clientX - canvas.offsetLeft;
      const curY = e.clientY - canvas.offsetTop;
      draw(prevX, prevY, curX, curY);
    }
  };

  const clearCanvas = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div>
      <canvas ref={cvs => {
        if (cvs) {
          canvas = cvs;
          ctx = cvs.getContext('2d');
        }
      }}
        width={500}
        height={300}
        style={{ border: '1px solid black', margin: '0 auto', display: 'block', marginTop: '30px' }}
        onMouseDown={startDraw} onMouseMove={moveMouse} onMouseLeave={onMouseLeave}
        onMouseUp={() => setIsDrawing(false)} onMouseEnter={onMouseEnter}
      />
      <button onClick={clearCanvas}>
        Clear
      </button>
    </div>
  );
};

export default Canvas;
