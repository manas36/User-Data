import { useState, useEffect, useRef } from "react";
import { ROLES } from "./UserModal.jsx";

// Single dropdown button: "All roles" first, then every role.
export default function RoleSelect({ value, onChange, count }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const away = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  const label = value === "All" ? "All roles" : value;

  return (
    <div className="dd" ref={ref}>
      <button
        type="button"
        className="dd-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span>
          {label}
          <small>{count(value)}</small>
        </span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="dd-menu" role="listbox">
          {["All", ...ROLES].map((r) => (
            <button
              key={r}
              type="button"
              role="option"
              aria-selected={value === r}
              className={"dd-item" + (value === r ? " sel" : "")}
              onClick={() => {
                onChange(r);
                setOpen(false);
              }}
            >
              <span>{r === "All" ? "All roles" : r}</span>
              <small>{count(r)}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
