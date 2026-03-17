// src/Components/Certifications.jsx
import React from "react";
import { CERTIFICATIONS } from "../constants";

export default function Certifications() {
  const items = Array.isArray(CERTIFICATIONS) ? CERTIFICATIONS : [];

  return (
    <section id="certifications" className="mt-12"> {/* reduced spacing */}

      <h2 className="text-2xl sm:text-[28px] font-semibold text-white mb-5">
        Certifications & Learning
      </h2>

      <ul className="space-y-2 text-neutral-200 text-sm sm:text-[15px] max-w-3xl">
        {items.map((c, i) => {
          if (typeof c === "string") {
            return (
              <li key={i} className="leading-relaxed">
                • {c}
              </li>
            );
          }

          const { name, link } = c || {};

          return (
            <li key={name || link} className="leading-relaxed">
              •{" "}
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-purple-300 transition"
                >
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