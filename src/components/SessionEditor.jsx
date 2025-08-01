import { Save, Rocket, X } from "lucide-react";

const SessionEditor = ({
  formData,
  isSaving,
  isPublishing,
  onChange,
  onSave,
  onPublish,
  onCancel,
  isEditing,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-700 ">
        {isEditing ? "Edit Wellness Session" : "Create New Session"}
      </h2>

      <form onSubmit={onSave} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">
            Session Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="E.g., Morning Flow"
            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            JSON File URL
          </label>
          <input
            type="text"
            name="json_file_url"
            value={formData.json_file_url}
            onChange={onChange}
            placeholder="https://..."
            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={onChange}
            placeholder="calm, energy, sleep"
            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-start items-center gap-3 pt-6 text-center sm:text-left">
          <button
            type="submit"
            disabled={isSaving}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold shadow transition flex items-center justify-center gap-2 ${
              isSaving
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Draft"}
          </button>

          <button
            type="button"
            onClick={onPublish}
            disabled={isPublishing}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold shadow transition flex items-center justify-center gap-2 ${
              isPublishing
                ? "bg-green-300 text-white cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            <Rocket className="w-4 h-4" />
            {isPublishing ? "Publishing..." : "Publish"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold border border-red-500 text-red-500 hover:bg-red-50 shadow-sm transition flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionEditor;
