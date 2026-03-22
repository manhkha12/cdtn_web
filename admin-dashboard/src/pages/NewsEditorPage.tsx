import React from "react";
import {
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import Input from "../components/common/Input";
import { publishedNews } from "../mocks/news.mock";

const HistoryItem: React.FC<{ item: (typeof publishedNews)[number] }> = ({
  item,
}) => (
  <div className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{item.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="info" className="text-xs">
            {item.category}
          </Badge>
          <p className="text-xs text-gray-500">{item.date}</p>
        </div>
      </div>
      <Badge variant="success" className="text-xs flex-shrink-0">
        {item.status === "published" ? "Published" : "Draft"}
      </Badge>
    </div>
  </div>
);

export default function NewsEditorPage() {
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("announcements");
  const [audience, setAudience] = React.useState("all-students");
  const [pushNotification, setPushNotification] = React.useState(false);
  const [content, setContent] = React.useState("");

  return (
    <AdminLayout
      topbarTitle="News Editor"
      topbarRightAction={
        <div className="flex gap-3">
          <Button variant="secondary" size="md">
            Save as Draft
          </Button>
          <Button variant="primary" size="md">
            Publish Now
          </Button>
        </div>
      }
      showSearch={false}
    >
      <div className="grid grid-cols-4 gap-6">
        {/* Left Sidebar - History */}
        <div>
          <Card className="p-0 h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-900 text-sm">
                Published History
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              {publishedNews.map((item) => (
                <HistoryItem key={item.id} item={item} />
              ))}
            </div>
          </Card>
        </div>

        {/* Main Editor */}
        <div className="col-span-3">
          {/* Editor Header */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Editor Workspace
                </h2>
              </div>
              <Badge variant="warning">draft</Badge>
            </div>

            {/* Title Input */}
            <Input
              type="text"
              placeholder="Enter announcement title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-bold text-xl mb-6"
            />

            {/* Top Controls */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="announcements">Announcements</option>
                  <option value="academic">Academic</option>
                  <option value="events">Events</option>
                  <option value="facilities">Facilities</option>
                  <option value="career">Career</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all-students">All Students</option>
                  <option value="specific-class">Specific Class</option>
                  <option value="faculty">Faculty</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
            </div>

            {/* Push Notification Toggle */}
            <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
              <input
                type="checkbox"
                checked={pushNotification}
                onChange={(e) => setPushNotification(e.target.checked)}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <label className="text-sm font-medium text-gray-700 cursor-pointer">
                Send push notification to users
              </label>
            </div>
          </Card>

          {/* Cover Image Upload */}
          <Card className="p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Cover Image</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-red-500 hover:bg-red-50 transition-colors cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <ImageIcon size={32} className="text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Editor */}
          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Content</h3>

            {/* Toolbar */}
            <div className="flex items-center gap-2 p-3 border-b border-gray-200 bg-gray-50">
              <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                <Bold size={18} />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                <Italic size={18} />
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                <List size={18} />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                <LinkIcon size={18} />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                <ImageIcon size={18} />
              </button>
              <div className="flex-1"></div>
              <p className="text-xs text-gray-600">
                {content.length} characters
              </p>
            </div>

            {/* Editor Area */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your announcement content here... You can format text and add images."
              className="w-full p-4 focus:outline-none resize-none"
              rows={12}
            />

            {/* Editor Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <p className="text-xs text-gray-600">Last saved: 2 minutes ago</p>
              <Button variant="primary" size="md">
                Save Changes
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
