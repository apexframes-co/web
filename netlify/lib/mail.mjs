// Dërgim opsional emailesh përmes Resend (aktivizohet vetëm nëse janë vendosur RESEND_API_KEY dhe MAIL_FROM).
// Pa to, funksioni punon njësoj dhe thjesht nuk dërgon email.
export function createMailer(env = process.env, fetchFn = fetch) {
  const key = env.RESEND_API_KEY, from = env.MAIL_FROM;
  return {
    enabled: Boolean(key && from),
    async send({ to, subject, html, text }) {
      if (!key || !from) return { skipped: true };
      try {
        const r = await fetchFn('https://api.resend.com/emails', {
          method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ from, to: [].concat(to), subject, html, text }),
        });
        return { ok: r.ok, status: r.status };
      } catch (e) { return { ok: false, error: String(e) }; }
    },
  };
}
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
