import { WhatsAppIcon } from '@/components/common/SocialIcons';
import { getWhatsAppChatUrl } from '@/utils/whatsapp';

/**
 * Sticky mobile-only WhatsApp launcher. Fixed to the bottom-right, sitting
 * above the mobile safe-area inset so it clears home-indicator gestures.
 */
export function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppChatUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact JobVeda on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-200 ease-out hover:scale-105 active:scale-95 md:hidden"
      style={{
        right: 'max(16px, env(safe-area-inset-right))',
        bottom: 'calc(16px + env(safe-area-inset-bottom))',
      }}
    >
      <WhatsAppIcon width={28} height={28} aria-hidden="true" />
      <span
        role="tooltip"
        className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-[var(--shadow-soft)] transition-opacity duration-200 group-active:opacity-100"
      >
        Chat on WhatsApp
      </span>
    </a>
  );
}
