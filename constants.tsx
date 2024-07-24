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

export const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "#9B59B6", // new purple
    bgcolor: "#9B59B61A", // purple with 10% opacity
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "#E91E63", // new pink
    bgcolor: "#E91E631A", // pink with 10% opacity
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "#FF5722", // new orange
    bgcolor: "#FF57221A", // orange with 10% opacity
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "#4CAF50", // new green
    bgcolor: "#4CAF501A", // green with 10% opacity
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "#006400", // dark green
    bgcolor: "#0064001A", // dark green with 10% opacity
  },
];

export const amountOptions = [
  {
    value: "1",
    label: "1 Photo",
  },
  {
    value: "2",
    label: "2 Photo",
  },
  {
    value: "3",
    label: "3 Photo",
  },
  {
    value: "4",
    label: "4 Photo",
  },
  {
    value: "5",
    label: "5 Photo",
  },
];

export const resolutionOptions = [
  {
    value: "256x256",
    label: "256x256",
  },
  {
    value: "512x512",
    label: "512x512",
  },
  {
    value: "1024x1024",
    label: "1024x1024",
  },
];

export const apilimit = 5;
