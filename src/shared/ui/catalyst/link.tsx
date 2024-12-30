import * as Headless from "@headlessui/react";
import React, { forwardRef } from "react";
import { Link as RouterLink, LinkProps } from "react-router";

export const Link = forwardRef(function Link(
  props: {
    href: string | LinkProps["to"];
  } & React.ComponentPropsWithoutRef<"a">,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <Headless.DataInteractive>
      <RouterLink to={props.href} {...props} ref={ref} />
    </Headless.DataInteractive>
  );
});
