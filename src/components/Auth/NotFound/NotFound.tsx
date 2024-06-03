import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        display: "grid",
        height: "100vh",
        placeContent: "center",
        padding: "0 16px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "10rem", color: "gray" }}>404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p
          style={{
            marginTop: "16px",
            color: "GrayText",
          }}
        >
          We can't find that page.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-block",
            marginTop: "1.5rem",
            borderRadius: "0.375rem",
            padding: "0.375rem 0.75rem",
            backgroundColor: "#6B30ED",
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            fontWeight: "500",
            color: "#FFFFFF",
          }}
          //   className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
