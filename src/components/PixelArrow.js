// Drawn as pixels rather than ◀/▶, which iOS renders as emoji.
function PixelArrow({ direction = 'right' }) {
  return (
    <svg
      className={`pixel-arrow pixel-arrow--${direction}`}
      viewBox="0 0 5 7"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <path fill="currentColor" d="M0 0h1v7H0zM1 1h1v5H1zM2 2h1v3H2zM3 3h1v1H3z" />
    </svg>
  );
}

export default PixelArrow;
