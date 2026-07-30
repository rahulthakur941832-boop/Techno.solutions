import React, { useState, useEffect } from "react";
import {
  Mail,
  Search,
  CheckCircle2,
  Trash2,
  Phone,
  Calendar,
  X,
  AlertTriangle,
  Eye,
  Filter,
  User,
  MessageSquare,
  Send,
} from "lucide-react";
import {
  getStoredContacts,
  updateContactStatus,
  deleteStoredContact,
  saveStoredContacts,
  StoredContact,
} from "../../utils/adminStorage";

interface ContactManagerProps {
  token: string;
}

export default function ContactManager({ token }: ContactManagerProps) {
  const [contacts, setContacts] = useState<StoredContact[]>(() => getStoredContacts());
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedContact, setSelectedContact] = useState<StoredContact | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const local = getStoredContacts();
      setContacts(local);

      const query = new URLSearchParams({
        search: searchTerm,
        status: statusFilter,
      });
      const res = await fetch(`/api/admin/contacts?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let data: any = {};
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (data && Array.isArray(data.contacts) && data.contacts.length > 0) {
        const serverContacts = data.contacts;
        const mergedMap = new Map<string, StoredContact>();
        local.forEach((c) => mergedMap.set(c.id, c));
        serverContacts.forEach((sc: any) => {
          if (!mergedMap.has(sc.id)) {
            mergedMap.set(sc.id, sc);
          }
        });
        const mergedList = Array.from(mergedMap.values());
        saveStoredContacts(mergedList);
        setContacts(mergedList);
      }
    } catch (err) {
      console.warn("Backend fetch contacts notice (using persistent local storage):", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [searchTerm, statusFilter, token]);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "unread" ? "read" : "unread";
    try {
      updateContactStatus(id, newStatus);
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact({ ...selectedContact, status: newStatus });
      }

      // Best-effort server sync
      fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      }).catch((e) => console.warn("Backend status update notice:", e));

      setContacts(getStoredContacts());
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      deleteStoredContact(deleteId);

      // Best-effort server delete
      fetch(`/api/admin/contacts/${deleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }).catch((e) => console.warn("Backend delete notice:", e));

      if (selectedContact && selectedContact.id === deleteId) {
        setSelectedContact(null);
      }
      setDeleteId(null);
      setContacts(getStoredContacts());
    } catch (err) {
      console.error("Error deleting contact lead:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#0F2D63]" />
            <span>Contact Enquiries</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage, view, and respond to lead submissions received from the website contact forms.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-blue-50 text-[#0F2D63] text-xs font-bold self-start sm:self-auto">
          Total Leads: {contacts.length}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by name, email, phone, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-[#0F2D63] focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-hidden"
          >
            <option value="all">All Submissions</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs">Loading contact enquiries...</div>
        ) : contacts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Contact Person</th>
                  <th className="py-3.5 px-4">Phone & Email</th>
                  <th className="py-3.5 px-4">Service Required</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      contact.status === "unread" ? "bg-amber-50/30" : ""
                    }`}
                  >
                    <td className="py-4 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        {contact.status === "unread" && (
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                        )}
                        <span>{contact.name}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-slate-600">
                      <div className="font-medium text-slate-900">{contact.email}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{contact.phone}</div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#0F2D63] font-semibold text-[11px]">
                        {contact.service}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-500 text-[11px]">
                      {new Date(contact.timestamp).toLocaleString()}
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleStatus(contact.id, contact.status)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase cursor-pointer transition-all ${
                          contact.status === "unread"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {contact.status}
                      </button>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedContact(contact);
                            if (contact.status === "unread") {
                              toggleStatus(contact.id, "unread");
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#0F2D63] hover:bg-[#11326c] text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>

                        <button
                          onClick={() => setDeleteId(contact.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 text-xs">
            No contact submissions found matching filters.
          </div>
        )}
      </div>

      {/* Enquiry Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 md:p-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0F2D63] flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedContact.name}</h3>
                  <p className="text-[11px] text-slate-400">Lead Submission Detail</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="font-bold text-[#0F2D63] hover:underline block break-all"
                  >
                    {selectedContact.email}
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Phone Number
                  </span>
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="font-bold text-slate-900 hover:underline block"
                  >
                    {selectedContact.phone || "Not Provided"}
                  </a>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Service Requested
                </span>
                <span className="px-3 py-1 rounded-lg bg-blue-50 text-[#0F2D63] font-bold inline-block">
                  {selectedContact.service}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Submission Date & Time
                </span>
                <span className="text-slate-600 font-mono">
                  {new Date(selectedContact.timestamp).toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Message Details
                </span>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed whitespace-pre-wrap font-sans text-xs">
                  {selectedContact.message}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-6 border-t border-slate-200 mt-6">
              <button
                onClick={() => toggleStatus(selectedContact.id, selectedContact.status)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
              >
                Mark as {selectedContact.status === "unread" ? "Read" : "Unread"}
              </button>

              <a
                href={`mailto:${selectedContact.email}?subject=Re: Inquiry regarding ${selectedContact.service}`}
                className="px-5 py-2 rounded-xl bg-[#0F2D63] hover:bg-[#11326c] text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#E5AF2B]" />
                <span>Reply via Email</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Contact Enquiry?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete this enquiry lead? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
