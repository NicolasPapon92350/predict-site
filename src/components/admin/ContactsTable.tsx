"use client";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string | null;
  employees?: string | null;
  formType: string;
  leadScore?: number | null;
  createdAt: string;
}

interface ContactsTableProps {
  contacts: Contact[];
  compact?: boolean;
}

export default function ContactsTable({ contacts, compact = false }: ContactsTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {!compact && (
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-foreground">Contacts</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-surface">
              <th className="text-left px-6 py-3 font-medium text-muted">Nom</th>
              <th className="text-left px-6 py-3 font-medium text-muted">Email</th>
              <th className="text-left px-6 py-3 font-medium text-muted">Entreprise</th>
              <th className="text-left px-6 py-3 font-medium text-muted">Type</th>
              {!compact && <th className="text-left px-6 py-3 font-medium text-muted">Score</th>}
              <th className="text-left px-6 py-3 font-medium text-muted">Date</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-b border-gray-50 hover:bg-surface/50 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">
                  {c.firstName} {c.lastName}
                </td>
                <td className="px-6 py-4 text-muted">{c.email}</td>
                <td className="px-6 py-4 text-muted">{c.company}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      c.formType === "DEMO_REQUEST"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary/20 text-secondary-dark"
                    }`}
                  >
                    {c.formType === "DEMO_REQUEST" ? "Démo" : "Guide"}
                  </span>
                </td>
                {!compact && (
                  <td className="px-6 py-4 text-muted">{c.leadScore ?? "-"}</td>
                )}
                <td className="px-6 py-4 text-muted">
                  {new Date(c.createdAt).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan={compact ? 5 : 6} className="px-6 py-12 text-center text-muted">
                  Aucun contact pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
