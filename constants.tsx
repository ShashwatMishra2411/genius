import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";

export const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "#4A90E2", // new blue
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "#9B59B6", // new purple
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "#E91E63", // new pink
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "#FF5722", // new orange
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "#4CAF50", // new green
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "#006400", // new green
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "white", // new purple
  },
];
