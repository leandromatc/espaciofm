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

export type News = {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  audio_url: string | null;
  audio_label: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};
