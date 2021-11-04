import { ComponentType } from "react";

export interface Route {
  name: string;
  path: string;
  exact: boolean;
  Component: ComponentType;
}
