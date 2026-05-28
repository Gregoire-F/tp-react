import type { FormEvent, ReactNode } from "react";

interface ModalProps {
  title: string;
  formError?: string;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
  children: ReactNode;
}

export default function ServeurFormModal({
  title,
  formError,
  onSubmit,
  onCancel,
  children,
}: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-lg min-w-80 flex flex-col gap-3"
      >
        <h3>{title}</h3>
        {formError && <p className="text-red-500">{formError}</p>}
        {children}
        <div className="flex gap-2 justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white border-0 rounded cursor-pointer"
          >
            Enregistrer
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 border-0 rounded cursor-pointer"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
