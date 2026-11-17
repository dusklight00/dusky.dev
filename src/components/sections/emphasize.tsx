import { Fragment } from "react";

/** Matches impact figures such as "40%", "40–60%", "70%+", "500+", "10+". */
const IMPACT = /(\d+(?:[–-]\d+)?(?:%\+?|\+))/g;

/** Returns `text` with every numeric impact figure rendered in bold ink. */
export function emphasizeNumbers(text: string): React.ReactNode {
  return text.split(IMPACT).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-ink tabular-nums">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
