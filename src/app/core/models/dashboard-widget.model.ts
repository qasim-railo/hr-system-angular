export interface DashboardWidget {
  key: string;
  title: string;
  icon: string;
  value: number;
  visible: boolean;
  sortOrder: number;
}

export interface DashboardWidgets {
  planCode: string;
  roles: string[];
  widgets: DashboardWidget[];
}
