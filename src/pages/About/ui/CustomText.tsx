import clsx from "clsx";
export const ArtilleryText = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) => {
  return (
    <span {...props} className={clsx(className, "text-artillery")}>
      Artillery
    </span>
  );
};

export const TargetText = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) => {
  return (
    <span {...props} className={clsx(className, "text-target")}>
      Target
    </span>
  );
};
