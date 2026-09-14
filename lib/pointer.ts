/**
 * Live cursor position, shared between components/pointer-tracker.tsx
 * (the sole `pointermove` listener) and components/particle-field.tsx —
 * used both by the permanent SiteBackground and by the copies layered on
 * top of specific section images — so the ambient particles can be
 * repelled ("dented") away from the cursor. Stays at (-9999, -9999) —
 * i.e. nowhere near any particle — until the tracker actually starts
 * writing to it, which itself only happens on fine-pointer devices.
 */
export const pointer = { x: -9999, y: -9999 };
