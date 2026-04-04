"use client";

type Props = {
  type: "loading" | "error" | "empty";
  message: string;
  action?: React.ReactNode;
};

function StatusBox({ message, action }: Props) {
  return (
    <div>
      <p>{message}</p>
      {action}
    </div>
  );
}

export default StatusBox;