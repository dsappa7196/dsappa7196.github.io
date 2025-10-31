// src/Components/Certifications.jsx
import React from "react";
import { CERTIFICATIONS } from "../constants";

export default function Certifications() {
  const items = Array.isArray(CERTIFICATIONS) ? CERTIFICATIONS : [];
  return (
    <section id="certifications" className="mt-16">
      <h2 className="text-2xl font-semibold text-white mb-4">Certifications</h2>
      <ul className="space-y-2 text-neutral-300">
        {items.map((c, i) => {
          if (typeof c === "string") return <li key={i}>{c}</li>;
          const { name, link } = c || {};
          return (
            <li key={name || link}>
              {link ? (
                <a href={link} target="_blank" rel="noreferrer" className="underline hover:text-purple-300">
                  {name || link}
                </a>
              ) : (
                <span>{name || "Certification"}</span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
