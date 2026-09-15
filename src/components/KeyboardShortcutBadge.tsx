import React, { useState } from 'react';
import { Command, X } from 'lucide-react';

interface KeyboardShortcutBadgeProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
  onToggleTheme: () => void;
  onOpenCommandPalette?: () => void;
  isAmbient?: boolean;
}

export const KeyboardShortcutBadge: React.FC<KeyboardShortcutBadgeProps> = ({
  onNavigateHome,
  onNavigateContact,
  onToggleTheme,
  onOpenCommandPalette,
  isAmbient = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="Global Keyboard Shortcuts" className="fixed bottom-4 right-4 z-40 print:hidden hidden sm:block">
      {isOpen ? (
        <div className="bg-[#121315]/95 backdrop-blur-md border border-[#2a2b2f] text-[#F3F0EA] rounded-lg p-3 shadow-2xl space-y-2.5 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-[#222428] pb-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#C8AE82]">
              <Command className="w-3 h-3" />
              <span>Keyboard Shortcuts</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#777] hover:text-[#F3F0EA] p-0.5 rounded cursor-pointer"
              aria-label="Close shortcuts helper"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5 text-xs font-mono">
            {onOpenCommandPalette && (
              <button
                onClick={() => {
                  onOpenCommandPalette();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between text-left p-1 rounded hover:bg-[#1c1e22] text-[#A5A29B] hover:text-[#F3F0EA] transition-colors cursor-pointer"
              >
                <span className="font-semibold text-[#F3F0EA]">Search / Command</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[#202226] border border-[#33373d] text-[10px] font-bold text-[#C8AE82]">
                  K
                </kbd>
              </button>
            )}

            <button
              onClick={onNavigateHome}
              className="w-full flex items-center justify-between text-left p-1 rounded hover:bg-[#1c1e22] text-[#A5A29B] hover:text-[#F3F0EA] transition-colors cursor-pointer"
            >
              <span>Overview / Home</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#202226] border border-[#33373d] text-[10px] font-bold text-[#C8AE82]">
                H
              </kbd>
            </button>

            <button
              onClick={onNavigateContact}
              className="w-full flex items-center justify-between text-left p-1 rounded hover:bg-[#1c1e22] text-[#A5A29B] hover:text-[#F3F0EA] transition-colors cursor-pointer"
            >
              <span>Contact Desk</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#202226] border border-[#33373d] text-[10px] font-bold text-[#C8AE82]">
                C
              </kbd>
            </button>

            <button
              onClick={onToggleTheme}
              className="w-full flex items-center justify-between text-left p-1 rounded hover:bg-[#1c1e22] text-[#A5A29B] hover:text-[#F3F0EA] transition-colors cursor-pointer"
            >
              <span>Toggle Ambient Mode</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#202226] border border-[#33373d] text-[10px] font-bold text-[#C8AE82]">
                T
              </kbd>
            </button>
          </div>

          <div className="text-[9px] font-mono text-[#666] pt-1 border-t border-[#1f2024] text-center">
            Press keys anywhere outside text inputs
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#121315]/85 hover:bg-[#1a1c20] border border-[#26282c] hover:border-[#C8AE82]/60 text-xs font-mono text-[#A5A29B] hover:text-[#F3F0EA] shadow-xl backdrop-blur-sm transition-all duration-200 cursor-pointer group"
          title="Press K (Search), H (Home), C (Contact), T (Toggle Theme)"
          aria-label="View keyboard shortcuts"
        >
          <Command className="w-3 h-3 text-[#C8AE82] group-hover:rotate-12 transition-transform" />
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="flex items-center gap-0.5">
              <kbd className="px-1 rounded bg-[#1f2024] border border-[#333] text-[9px] font-bold text-[#C8AE82]">K</kbd>
            </span>
            <span className="flex items-center gap-0.5">
              <kbd className="px-1 rounded bg-[#1f2024] border border-[#333] text-[9px] font-bold text-[#C8AE82]">H</kbd>
            </span>
            <span className="flex items-center gap-0.5">
              <kbd className="px-1 rounded bg-[#1f2024] border border-[#333] text-[9px] font-bold text-[#C8AE82]">C</kbd>
            </span>
            <span className="flex items-center gap-0.5">
              <kbd className="px-1 rounded bg-[#1f2024] border border-[#333] text-[9px] font-bold text-[#C8AE82]">T</kbd>
            </span>
          </div>
        </button>
      )}
    </aside>
  );
};
