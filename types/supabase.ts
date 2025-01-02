export type Database = {
  programming: {
    id: number;
    name: string;
    days: string[];
    start_time: string;
    end_time: string;
    description: string;
  };
  special_events: {
    id: number;
    name: string;
    date: string;
    start_time: string;
    end_time: string;
    description: string;
  };
};
