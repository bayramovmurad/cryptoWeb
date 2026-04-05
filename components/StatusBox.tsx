"use client";

type Props = {
  type: "loading" | "error" | "empty";
  message: string;
  action?: React.ReactNode;
};

function StatusBox({ message, action }: Props) {
  return (
    <div className="p-6 rounded-[18px] bg-[rgba(18,25,45,0.86)] border border-white/10 flex flex-col gap-4">
      <p>{message}</p>
      {action}
    </div>
  );
}

export default StatusBox;