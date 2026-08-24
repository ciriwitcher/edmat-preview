"use client";

export function DeleteEntityButton({
  action,
  confirmMessage,
  label = "Usuń",
}: {
  action: () => Promise<void>;
  confirmMessage: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      <button type="submit" className="border border-accent/40 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/5">
        {label}
      </button>
    </form>
  );
}
