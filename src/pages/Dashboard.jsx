import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import debounce from "lodash.debounce";
import { List, PlusCircle } from "lucide-react";

import API from "../utils/axiosInstance";
import SessionList from "../components/SessionList";
import SessionEditor from "../components/SessionEditor";

const Dashboard = () => {
  const [view, setView] = useState("sessions");
  const [sessions, setSessions] = useState([]);
  const [editingSession, setEditingSession] = useState(null);
  const [canAutoSave, setCanAutoSave] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    json_file_url: "",
  });

  const debouncedAutoSave = useRef(null);
  const autoSaveLockRef = useRef(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        const res = await API.get("/my-sessions");
        setSessions(res.data);
      } catch (err) {
        console.error("Failed to fetch sessions", err);
        toast.error("Failed to load sessions");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSessions();
  }, []);

  useEffect(() => {
    debouncedAutoSave.current = debounce(() => {
      if (
        !canAutoSave ||
        !formData.title.trim() ||
        !formData.json_file_url.trim()
      ) {
        return;
      }
      console.log("⏱️ Auto-saving after 5s inactivity...");
      handleSaveDraft(new Event("autosave"));
    }, 5000);
  }, [formData, canAutoSave]);

  useEffect(() => {
    const interval = setInterval(() => {
      const hasData = formData.title.trim() && formData.json_file_url.trim();
      if (hasData && view === "editor") {
        console.log("🕒 Auto-saving every 30 seconds...");
        handleSaveDraft(new Event("autosave"));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [view, formData, editingSession]);

  const openEditor = (session) => {
    setEditingSession(session);
    setFormData({
      title: session?.title || "",
      tags: session?.tags?.join(", ") || "",
      json_file_url: session?.json_file_url || "",
    });
    setView("editor");
  };

  const handleChange = (e) => {
    const updatedForm = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedForm);
    debouncedAutoSave.current();
  };

  const handleSaveDraft = async (e) => {
    e.preventDefault();

    if (e.type === "autosave" && autoSaveLockRef.current) return;
    if (e.type === "autosave") {
      autoSaveLockRef.current = true;
      setTimeout(() => {
        autoSaveLockRef.current = false;
      }, 3000);
    }
    if (!editingSession && e.type === "submit") {
      setCanAutoSave(true);
    }

    setIsSaving(true);

    const payload = {
      title: formData.title,
      tags: formData.tags.split(",").map((t) => t.trim()),
      json_file_url: formData.json_file_url,
      sessionId: editingSession?._id,
    };

    try {
      const res = await API.post("/my-sessions/save-draft", payload);
      setEditingSession(res.data);

      if (e.type !== "autosave") {
        toast.success("Draft saved!");
      } else {
        toast("Auto-saved ✅", { icon: "💾" });
      }

      setSessions((prev) => {
        const exists = prev.find((s) => s._id === res.data._id);
        const updatedSessions = exists
          ? prev.map((s) => (s._id === res.data._id ? res.data : s))
          : [...prev, res.data];

        return updatedSessions.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
      });

      if (e.type !== "autosave") {
        setView("sessions");
      }
    } catch (err) {
      console.error("Save failed", err);
      toast.error("Failed to save draft");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!editingSession?._id) {
      return toast.error("Please save as draft first.");
    }

    setIsPublishing(true);

    try {
      const res = await API.post("/my-sessions/publish", {
        sessionId: editingSession._id,
      });

      toast.success("Session published!");
      setSessions((prev) =>
        prev.map((s) => (s._id === res.data._id ? res.data : s))
      );
      setView("sessions");
    } catch (err) {
      console.error("Publish failed", err);
      toast.error("Failed to publish");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-2">
          Wellness Dashboard
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Manage your meditation and wellness sessions.
        </p>

        <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-lg w-full sm:w-fit shadow-sm">
          <button
            onClick={() => setView("sessions")}
            aria-current={view === "sessions" ? "page" : undefined}
            className={`px-4 py-2 flex items-center gap-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              view === "sessions"
                ? "bg-white text-purple-700 shadow border"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            <List size={16} />
            Sessions
          </button>

          <button
            onClick={() => openEditor(null)}
            aria-current={view === "editor" ? "page" : undefined}
            className={`px-4 py-2 flex items-center gap-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              view === "editor"
                ? "bg-white text-purple-700 shadow border"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            <PlusCircle size={16} />
            New Session
          </button>
        </div>
      </div>

      {view === "sessions" && (
        <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">
            My Sessions
          </h2>
          {isLoading ? (
            <div className="animate-pulse text-sm text-gray-400">
              Fetching sessions...
            </div>
          ) : (
            <SessionList sessions={sessions} onEdit={openEditor} />
          )}
        </div>
      )}

      {view === "editor" && (
        <SessionEditor
          formData={formData}
          isSaving={isSaving}
          isPublishing={isPublishing}
          onChange={handleChange}
          onSave={handleSaveDraft}
          onPublish={handlePublish}
          onCancel={() => setView("sessions")}
          isEditing={!!editingSession}
        />
      )}
    </div>
  );
};

export default Dashboard;
