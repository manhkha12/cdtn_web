import type { NewsItem } from "../types";

export const publishedNews: NewsItem[] = [
  {
    id: "1",
    title: "Spring Semester Begins",
    category: "Academic",
    date: "2024-03-15",
    status: "published",
  },
  {
    id: "2",
    title: "New Library Hours",
    category: "Facilities",
    date: "2024-03-10",
    status: "published",
  },
  {
    id: "3",
    title: "Internship Program Launch",
    category: "Career",
    date: "2024-03-05",
    status: "published",
  },
  {
    id: "4",
    title: "Sports Day 2024",
    category: "Events",
    date: "2024-02-28",
    status: "published",
  },
  {
    id: "5",
    title: "Campus Renovation Update",
    category: "Announcements",
    date: "2024-02-20",
    status: "published",
  },
];

export const newsEditorInitialState = {
  title: "",
  category: "announcements",
  targetAudience: "all-students",
  pushNotification: false,
  content: "",
  coverImage: null,
};
