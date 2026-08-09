/** Honeypot: campo invisível que só um bot preenche — a Server Action descarta em silêncio. */
export function CampoHoneypot() {
  return (
    <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor="website">Não preencha este campo</label>
      <input
        type="text"
        id="website"
        name="website"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
