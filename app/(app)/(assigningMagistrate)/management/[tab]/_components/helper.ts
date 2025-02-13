export interface ToolbarConfig {
  headerTitleAllTab: string;
  headerDescriptionAllTab: string;
  headerTitlePendingTab: string;
  headerDescriptionPendingTab: string;
  inviteButtonText: string;
  searchPlaceholder: string;
}

export const toolbarConfigByRole: { [role: string]: ToolbarConfig } = {
  CHIEF_JUDGE: {
    headerTitleAllTab: "Presiding Magistrate",
    headerDescriptionAllTab:
      "View and manage all presiding magistrates responsible for presiding over cases. Monitor their activity, case requests and re-assignment requests across districts.",
    headerTitlePendingTab: "Pending Invitations",
    headerDescriptionPendingTab:
      "Review and manage pending invitations sent to magistrates. Track invitation statuses and resend or revoke invitations as needed.",
    inviteButtonText: "INVITE NEW MAGISTRATE",
    searchPlaceholder: "Search Magistrate Name",
  },
  DIRECTOR_MAGISTRATE: {
    headerTitleAllTab: "Director's Overview",
    headerDescriptionAllTab:
      "Manage all magistrates through a director's lens with additional filtering and oversight options.",
    headerTitlePendingTab: "Director - Pending Invitations",
    headerDescriptionPendingTab:
      "Review pending invitations with director-specific controls.",
    inviteButtonText: "ADD MAGISTRATE",
    searchPlaceholder: "Search Magistrate (Director)",
  },
  DEFAULT: {
    headerTitleAllTab: "All Magistrates",
    headerDescriptionAllTab: "Manage your magistrates.",
    headerTitlePendingTab: "Pending Invitations",
    headerDescriptionPendingTab: "Review pending invitations.",
    inviteButtonText: "INVITE MAGISTRATE",
    searchPlaceholder: "Search Magistrate",
  },
};
