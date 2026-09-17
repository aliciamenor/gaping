// Dynamic import so this never lands in the eagerly-loaded main chunk
// (same reasoning as the posthog-js load in main.tsx) — only fetched when
// someone actually clicks a tracked CTA, and only in production.
export function trackCtaClick(channel: 'email' | 'linkedin', location: string) {
  if (!import.meta.env.PROD) return;
  import('posthog-js').then(({ default: posthog }) => {
    posthog.capture('cta_click', { channel, location });
  });
}
