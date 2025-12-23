import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Template } from '../types';

interface AppState {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;

  // Current draft
  currentDraft: {
    content: string;
    templateId?: string;
  };
  setCurrentDraft: (draft: { content: string; templateId?: string }) => void;
  clearDraft: () => void;

  // Selected template for viewing
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template | null) => void;

  // UI state
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Modal states
  isTemplateModalOpen: boolean;
  setTemplateModalOpen: (open: boolean) => void;

  isScheduleModalOpen: boolean;
  setScheduleModalOpen: (open: boolean) => void;

  isPreviewModalOpen: boolean;
  setPreviewModalOpen: (open: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        localStorage.removeItem('contentforge_token');
        set({ user: null });
      },

      // Current draft
      currentDraft: { content: '' },
      setCurrentDraft: (draft) => set({ currentDraft: draft }),
      clearDraft: () => set({ currentDraft: { content: '' } }),

      // Selected template
      selectedTemplate: null,
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),

      // UI state
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      // Modals
      isTemplateModalOpen: false,
      setTemplateModalOpen: (open) => set({ isTemplateModalOpen: open }),

      isScheduleModalOpen: false,
      setScheduleModalOpen: (open) => set({ isScheduleModalOpen: open }),

      isPreviewModalOpen: false,
      setPreviewModalOpen: (open) => set({ isPreviewModalOpen: open }),
    }),
    {
      name: 'linkedin-content-engine',
      partialize: (state) => ({
        currentDraft: state.currentDraft,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
