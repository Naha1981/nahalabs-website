import { useEffect } from 'react';
import { toast } from 'sonner';

interface ShortcutHandlers {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
  onNavigateSystems?: () => void;
  onToggleTheme: () => void;
  onCloseModals?: () => void;
  onOpenCommandPalette?: () => void;
}

export const useKeyboardShortcuts = ({
  onNavigateHome,
  onNavigateContact,
  onNavigateSystems,
  onToggleTheme,
  onCloseModals,
  onOpenCommandPalette,
}: ShortcutHandlers) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow Cmd+K or Ctrl+K anywhere (even if inside inputs)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        if (onOpenCommandPalette) {
          e.preventDefault();
          onOpenCommandPalette();
          return;
        }
      }

      // Avoid intercepting regular keypresses if typing inside an interactive text input
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Avoid intercepting if modifier keys (Ctrl, Alt, Meta/Cmd) are pressed
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      const key = e.key.toLowerCase();

      if (key === 'k' && onOpenCommandPalette) {
        e.preventDefault();
        onOpenCommandPalette();
      } else if (key === 'c') {
        e.preventDefault();
        onNavigateContact();
        toast.info('Navigated to Contact [C]', {
          duration: 2000,
          description: 'Jumped to commercial engagement inquiry desk.',
        });
      } else if (key === 'h') {
        e.preventDefault();
        onNavigateHome();
        toast.info('Navigated to Overview [H]', {
          duration: 2000,
          description: 'Returned to primary systems engineering overview.',
        });
      } else if (key === 't') {
        e.preventDefault();
        onToggleTheme();
      } else if (key === 's' && onNavigateSystems) {
        e.preventDefault();
        onNavigateSystems();
        toast.info('Navigated to Systems [S]', {
          duration: 2000,
          description: 'Jumped to autonomous systems catalog.',
        });
      } else if (e.key === 'Escape' && onCloseModals) {
        onCloseModals();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNavigateHome, onNavigateContact, onNavigateSystems, onToggleTheme, onCloseModals, onOpenCommandPalette]);
};

