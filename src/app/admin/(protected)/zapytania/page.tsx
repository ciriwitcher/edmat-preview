import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";
import { deleteContactSubmission } from "@/lib/actions/admin-contact";

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("pl-PL", { dateStyle: "medium", timeStyle: "short" }).format(new Date(dateString));
}

export default async function AdminContactSubmissionsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: submissions } = supabase
    ? await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div>
      <h1 className="text-2xl text-ink">Zapytania z formularza</h1>
      <p className="mt-1 text-sm text-ink-soft">{submissions?.length ?? 0} zgłoszeń</p>

      <div className="mt-8 space-y-4">
        {submissions && submissions.length > 0 ? (
          submissions.map((submission) => {
            const deleteWithId = deleteContactSubmission.bind(null, submission.id);
            return (
              <div key={submission.id} className="border border-line bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">{submission.name}</p>
                    <p className="text-sm text-ink-soft">{submission.contact_method}</p>
                  </div>
                  <div className="text-right text-xs text-ink-faint">
                    <p>{formatDate(submission.created_at)}</p>
                    <p className="mt-1">{submission.interest}</p>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm text-ink-soft">{submission.message}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className={`px-2 py-0.5 text-xs font-medium ${submission.email_delivered ? "bg-accent/10 text-accent" : "bg-ink/10 text-ink-soft"}`}>
                    {submission.email_delivered ? "E-mail wysłany" : "E-mail niewysłany"}
                  </span>
                  <DeleteEntityButton action={deleteWithId} confirmMessage="Usunąć to zgłoszenie?" />
                </div>
              </div>
            );
          })
        ) : (
          <p className="border border-line bg-white px-5 py-8 text-center text-ink-soft">Brak zgłoszeń.</p>
        )}
      </div>
    </div>
  );
}
